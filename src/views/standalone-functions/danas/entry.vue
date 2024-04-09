<template>
    <n-card v-if="showAddToQueuePanel">
      <n-form-item label="Subject"> 
        <!-- <n-input-number v-model:value="options.APIargments.bid" /> -->
        <n-cascader
      v-model:value="bankid"
      :options="BasicInfo.subjectsmap"
      check-strategy="child"
      :show-path="true"
      :on-update:value="(v)=>{currentArgs.knowledges=0,
      currentArgs.types=0,
        bankid=v}"
    />
    </n-form-item>
        <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging" v-if="LoadingBasicInfo">
    <n-form-item  label="难度(diffs)"> 
      <n-cascader v-model:value="currentArgs.diffs"
      :options="BasicInfo.diffsmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="areas"> 
      <n-cascader v-model:value="currentArgs.areas"
      :options="BasicInfo.areasmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="sources"> 
      <n-cascader v-model:value="currentArgs.sources"
      :options="BasicInfo.sourcesmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="types"> 
      <n-cascader v-model:value="currentArgs.types"
      :options="BasicInfo.typesmap[''+bankid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="knowledgeInfo"> 
      <n-cascader v-model:value="currentArgs.knowledges"
      :options="BasicInfo.knowledgeInfomap[''+bankid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="排序(orderBy)"> 
      <n-cascader v-model:value="currentArgs.orderBy"
      :options="BasicInfo.orderbymap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年份(years)"> 
      <n-cascader v-model:value="currentArgs.years"
      :options="BasicInfo.yearsmap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年级(grades)"> 
      <n-cascader v-model:value="currentArgs.grades"
      :options="BasicInfo.gradesmap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="pageIndex"> 
      <n-input-number v-model:value="currentArgs.pageIndex" :min="0"
    />  </n-form-item>
    <n-form-item  label="pageSize"> 
      <n-input-number v-model:value="currentArgs.pageSize"
    />  </n-form-item>

   <n-button @click="fetchForNewT">加入至DA List</n-button>
   <n-button @click="Analysis0">分析</n-button>
    </n-form>



</n-card>

<n-card>
<n-p>Currently On Queue:</n-p>

<n-p>Count:{{DATList.length}}</n-p>
<n-p>平均难度:{{ DATListInfo.avgdiff}}</n-p>
<n-p>平均组卷次:{{ DATListInfo.avgUseCount}}</n-p>
<n-p>平均用于试卷:{{ DATListInfo.avgPaperSourceCount}}</n-p>

</n-card>

<n-card v-if="showAnalysisCard">
  <n-button @click="GoOnToAddDATList">...继续</n-button>
  <n-button @click="deleteCollected">删除已收录</n-button>
  <n-button @click="CollectTs(15)">收录15题</n-button>
  <n-button @click="CollectTs(CollectTsCount)">收录...</n-button>
  <n-input-number v-model:value="CollectTsCount" :width="80"></n-input-number>
  <n-popover trigger="hover"  v-for="liv in DATList">
    <template #trigger>
     <n-space> <n-p>Rate:{{ liv.danas_info.best_t_rate }} | useCount:{{  liv.useCount }} | 
    updatedAt:{{ liv.time }} | ID: {{ liv.id }} | {{ liv.diff.name }} | {{ liv.type.name }} | </n-p><n-button text @click="RemoveDAChunk(liv)">Remove</n-button>
    </n-space></template>
    <question-block style="width: 700px;height:300px;overflow-y: scroll;" :qcontent="liv"></question-block>
  </n-popover>


  </n-card>
</template>

<script setup>

import { ref,useAttrs } from "vue";
import { NForm,NFormItem,NCard,NModal,NButton,NInputNumber,
  NSpace,NPopover,NTabs,NTab,NTabPane,NCascader,NSwitch,NSpin,NP } from "naive-ui";
import { useRouter,useRoute } from "vue-router";
import QuestionBlock from "@/shared/questionBlock.zjw.a.vue"
const router=useRouter(),route=useRoute()
import { DateTime } from "luxon";
const LoadingBasicInfo=ref(false)
const BasicInfo=ref({

"subjectsmap":[],          
"areasmap":[],             
"diffsmap":[],             
"sourcesmap":[],           
"typesmap":{},             
"orderbymap":[],           
"yearsmap":[],             
"gradesmap":[],            
"knowledgeInfomap":{},     
})
Promise.all([
{varname:"subjectsmap",co:()=>import("@/shared/base-zj-data/subjects.json")},
{varname:"areasmap",co:()=>import("@/shared/base-zj-data/areas.json")},
{varname:"diffsmap",co:()=>import("@/shared/base-zj-data/diffs.json")},
{varname:"sourcesmap",co:()=>import("@/shared/base-zj-data/sources.json")},
{varname:"typesmap",co:()=>import("@/shared/base-zj-data/questypeList.tree.json")},
{varname:"orderbymap",co:()=>import("@/shared/base-zj-data/orderby.json")},
{varname:"yearsmap",co:()=>import("@/shared/base-zj-data/years.json")},
{varname:"gradesmap",co:()=>import("@/shared/base-zj-data/grades.json")},
{varname:"knowledgeInfomap",co:()=>import("@/shared/base-zj-data/knowl-full.json")}
].map((ra)=>{
  return new Promise(async(res,rej)=>{
    BasicInfo.value[ra.varname]=(await ra.co()).default
    res()
  })
})).then(v=>{
    LoadingBasicInfo.value=true
})

import { ZujuanAPI } from "@/shared/zujuan-api";

// const subjectsmap=import("./basicinfo/subjects.json",import.meta.url)
const attrs=useAttrs()
const OBJECT_KEYS = (o) => Object.keys(o);
// const options=ref(getLastAPIOption())
const view=ref(1)

const currentArgs=ref({
    types: 0,
              sources: 0,
              pageIndex: 1,
              pageSize: 10,
              orderBy: 2,
              areas: 0,
              grades: 0,
              diffs: 0,
              knowledges: 0,
              years: 0
})

// const Preference=ref({
//   showUBlock:false
// })
// import example from "../../basicinfo/init-blank-q"
import { API } from "@/shared/APIHelper";
// import { router_push } from "../../utils/router-goto";
const bankid=ref(12)
import {resolveKData} from "@/shared/base-zj-data/resolve_k_data"


const TList=ref([])

const DATListInfo=ref({
  avgdiff:0,
  avgPaperSourceCount:0,
  avgUseCount:0
})
const showAddToQueuePanel=ref(true),
showAnalysisCard=ref(false)


const DATList=ref([])

const fetchForNewT = async () => {
    // Loading.value = true;
    function generateFetchURL() {
      return (
        "/app-server/v1/ques/list/" +
        bankid.value +
        "?" +
        Object.entries(currentArgs.value)
          .map((v) => v[0] + "=" + v[1])
          .join("&")
      );
    }
    await ZujuanAPI(generateFetchURL()).then((v) => {

    DATList.value.push(...v.data.list)
    console.log(DATList.value);
    updateListInfo(DATList.value)

    });
  };


function updateListInfo(listn){
  let diffall=0,useCountCount=0,
  paperEddCount=0
  listn.forEach(obitem => {
    
    diffall+=obitem.diff.value
    useCountCount+=obitem.useCount
    paperEddCount+=obitem.paperSources.length
    if(!obitem.danas_info){
      obitem.danas_info={}
      obitem.danas_info.day_to_now_CTN=
      Math.floor(((new Date()).getTime()-(new Date(obitem.time)).getTime())/1000/60/24)
      if(obitem.danas_info.day_to_now_CTN<7){
        obitem.danas_info.day_to_now_CTN=7
      }
      obitem.danas_info.uc_t_rate=obitem.useCount/obitem.danas_info.day_to_now_CTN
      obitem.danas_info.ucpps_t_rate=(obitem.useCount+obitem.paperSources.length*10)/obitem.danas_info.day_to_now_CTN
      obitem.danas_info.best_t_rate=(obitem.useCount+obitem.paperSources.length*10)/obitem.danas_info.day_to_now_CTN
    }
  });
  DATListInfo.value={
    avgdiff:diffall/listn.length,
    avgUseCount:useCountCount/listn.length,
    avgPaperSourceCount:paperEddCount/listn.length,
  }
}


const Analysis0=()=>{
  showAddToQueuePanel.value=false
  showAnalysisCard.value=true
  DATList.value=DATList.value.sort((a,b)=>b.danas_info.best_t_rate-a.danas_info.best_t_rate)
  // console.log(DATList.value);
}
const CollectTsCount=ref(5)
const CollectTs=(insn)=>{
  let obts=DATList.value.slice(0,insn)
  console.log(obts);
 ZujuanAPI("/app-server/v1/basket/"+bankid.value,"POST",{
  ids:obts.map(v=>v.id).join(",")
 })
}

const deleteCollected=async()=>{
let optmp=[],idslist=[]
Promise.all(
  DATList.value.map(os=>{
    return new Promise((res,rej)=>{
      API.get("/api/qapi/is_collected/"+bankid.value+"/"+os.id).then(ra=>{
        if(!ra.found){
          if(!idslist.includes(os.id)){
optmp.push(os)
idslist.push(os.id)
          }
        }
        res()
      })
    })
  })
).then(sc=>{
  console.log(optmp)
  DATList.value=optmp.sort((a,b)=>b.danas_info.best_t_rate-a.danas_info.best_t_rate)
})
}


const GoOnToAddDATList=()=>{
  showAddToQueuePanel.value=true
  showAnalysisCard.value=false
}
</script>