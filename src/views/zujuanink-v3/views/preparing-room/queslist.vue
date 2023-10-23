<template>
    <n-card v-if="view==1">
      <n-form-item label="Subject"> 
        <!-- <n-input-number v-model:value="options.APIargments.bid" /> -->
        <n-cascader
      v-model:value="options.APIargments.bid"
      :options="BasicInfo.subjectsmap"
      check-strategy="child"
      :show-path="true"
      :on-update:value="(v)=>{options.APIargments.searchp.knowledges=0,
      options.APIargments.searchp.types=0,
        options.APIargments.bid=v}"
    />
    </n-form-item>
        <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging" v-if="LoadingBasicInfo">
    <n-form-item  label="难度(diffs)"> 
      <n-cascader v-model:value="options.APIargments.searchp.diffs"
      :options="BasicInfo.diffsmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="areas"> 
      <n-cascader v-model:value="options.APIargments.searchp.areas"
      :options="BasicInfo.areasmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="sources"> 
      <n-cascader v-model:value="options.APIargments.searchp.sources"
      :options="BasicInfo.sourcesmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="types"> 
      <n-cascader v-model:value="options.APIargments.searchp.types"
      :options="BasicInfo.typesmap[''+options.APIargments.bid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="knowledgeInfo"> 
      <n-cascader v-model:value="options.APIargments.searchp.knowledges"
      :options="BasicInfo.knowledgeInfomap[''+options.APIargments.bid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="排序(orderBy)"> 
      <n-cascader v-model:value="options.APIargments.searchp.orderBy"
      :options="BasicInfo.orderbymap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年份(years)"> 
      <n-cascader v-model:value="options.APIargments.searchp.years"
      :options="BasicInfo.yearsmap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年级(grades)"> 
      <n-cascader v-model:value="options.APIargments.searchp.grades"
      :options="BasicInfo.gradesmap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="pageIndex"> 
      <n-input-number v-model:value="options.APIargments.searchp.pageIndex" :min="0"
    />  </n-form-item>
    <n-form-item  label="pageSize"> 
      <n-input-number v-model:value="options.APIargments.searchp.pageSize"
    />  </n-form-item>

   <n-button @click="enterRoom">ENTER</n-button>
    </n-form>




</n-card>

<n-card v-if="view==2" content-style="text-align:center;" >
<n-spin/>
<n-p>正在获取题面</n-p>
</n-card>

</template>

<script setup>

import { ref,useAttrs } from "vue";
import { NForm,NFormItem,NCard,NModal,NButton,NInputNumber,NTabs,NTab,NTabPane,NCascader,NSwitch,NSpin,NP } from "naive-ui";
import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()

const LoadingBasicInfo=ref(true)
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
{varname:"subjectsmap",co:()=>import("../../basicinfo/subjects.json")},
{varname:"areasmap",co:()=>import("../../basicinfo/areas.json")},
{varname:"diffsmap",co:()=>import("../../basicinfo/diffs.json")},
{varname:"sourcesmap",co:()=>import("../../basicinfo/sources.json")},
{varname:"typesmap",co:()=>import("../../basicinfo/types.json")},
{varname:"orderbymap",co:()=>import("../../basicinfo/orderby.json")},
{varname:"yearsmap",co:()=>import("../../basicinfo/years.json")},
{varname:"gradesmap",co:()=>import("../../basicinfo/grades.json")},
{varname:"knowledgeInfomap",co:()=>import("../../basicinfo/knowl-full.json")}
].map((ra)=>{
  return new Promise(async(res,rej)=>{
    BasicInfo.value[ra.varname]=(await ra.co()).default
    res()
  })
}))

// import subjectsmap from "../../basicinfo/subjects.json"
// import areasmap from "../../basicinfo/areas.json"
// import diffsmap from "../../basicinfo/diffs.json"
// import sourcesmap from "../../basicinfo/sources.json"
// import typesmap from "../../basicinfo/types.json"
// import orderbymap from "../../basicinfo/orderby.json"
// import yearsmap from "../../basicinfo/years.json"
// import gradesmap from "../../basicinfo/grades.json"
// import knowledgeInfomap from "../../basicinfo/knowl-full.json"

import {getLastAPIOption,setAPIOption} from "../../storage-rel"
import { ZujuanAPI } from "../../utils/zujuan-api";

// const subjectsmap=import("./basicinfo/subjects.json",import.meta.url)
const attrs=useAttrs()
const OBJECT_KEYS = (o) => Object.keys(o);
const options=ref(getLastAPIOption())
const view=ref(1)


const Preference=ref({
  showUBlock:false
})
import example from "../../basicinfo/init-blank-q"
import { API } from "../../../../shared/APIHelper";
import { router_push } from "../../utils/router-goto";
const tmp=ref(12)
//settings logic

const showSetting = ref(false);

const UpdateOptions= ()=>{
  showSetting.value=false
  attrs.updateOptions(options.value)
}

const TList=ref([example])

const enterRoom=async()=>{
    setAPIOption(options.value)
view.value=2
  await   fetchForNewT()
  window.bankid=options.value.APIargments.bid
  for (let i = 0; i < TList.value.length; i++) {
    await API.get("/zujuan-ink-be-core/data/checkExistanceGetPersonalizedInfo/"+options.value.APIargments.bid +"/"+TList.value[i].id).then(async(v)=>{
      if(!v.data){
      TList.value[i].quid=(await API.post("/zujuan-ink-be-core/data/add",{
body           :  TList.value[i].body ,
timestamp      :  (new Date()).getTime() ,
qid            :  TList.value[i].id ,
bankid         :  window.bankid ,
title          :  TList.value[i].title ,
diffv          :  TList.value[i].diff.id ,
knowledgeInfo  :  TList.value[i].knowledgeInfo ,
typeid         :  TList.value[i].type.id  ,

  })).data
  TList.value[i].failedcoll=false
      TList.value[i].coll=false
    }else{
      TList.value[i].quid=v.data.id
      TList.value[i].failedcoll=v.data.failedcoll
      TList.value[i].coll=v.data.coll
    }
    })
    
    
  }
  window.TList=TList.value
window.qcomponent="zjw"
    router_push(router,"/room")
}




const fetchForNewT = async () => {
    // Loading.value = true;
    function generateFetchURL() {
      return (
        "/app-server/v1/ques/list/" +
        options.value.APIargments.bid +
        "?" +
        Object.entries(options.value.APIargments.searchp)
          .map((v) => v[0] + "=" + v[1])
          .join("&")
      );
    }
    await ZujuanAPI(generateFetchURL()).then((v) => {
      // console.log(TList.value[0] , example , TList.value[0]==example)/;
      if (TList.value[0].id == -1) {
        TList.value = v.data.list;
      }else{
      TList.value.push(...v.data.list);
      }
      if (v.data.finished) options.value.rightFormCycle = true;
  
    //   Loading.value = false;
    });
  };
</script>