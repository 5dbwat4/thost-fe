<template>
   <n-input-group>
    <n-input-group-label>好题本</n-input-group-label>
      <n-button @click="enterFaRETMode" :disabled="FailedColl.length==0">抽查</n-button>
      <n-input-group-label>筛选学科</n-input-group-label>
      <n-cascader
      v-model:value="bankid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
      @update:value="refreshFiCList"
    />
    <n-input-group-label>共有{{ FailedColl.length }}道错题</n-input-group-label>
    <n-dropdown :options="options">
      <n-button>
      <template #icon>
        <n-icon :component="EllipsisVerticalOutline"></n-icon>
      </template>
    </n-button>
  </n-dropdown>

    </n-input-group>
<div v-for="ii in FailedColl" class="centered" v-if="FailedColl.length>0"> 
    <n-card hoverable>
<t-wrapper :qcontent="ii"/>
</n-card>
</div>
<div v-else>
  <n-empty description="找不到。">
    <template #extra>
      <n-p>原因可能是：</n-p>
      <n-li>你一道题都没做过（还不快去<n-button text @click="$router.push('/zujuanink/preparing-room/all')">做题</n-button>？？？）</n-li>
      <n-li>你解决了所有错题（祝贺你！所以还不快去<n-button text @click="$router.push('/zujuanink/preparing-room/all')">做更多题</n-button>？？？）</n-li>
    </template>
  </n-empty>
</div>
</template>
<script setup>
import { ref, onMounted ,h} from "vue";
import { API } from "../../../../shared/APIHelper";

import questionBlock from "../../questionBlock/ild.vue"
import { NCard,NButton,NModal,NSpin,NImage,NImageGroup,NSpace,
NInput,NInputGroup,NInputGroupLabel,NCascader,NDropdown,
NEmpty,NP,NLi,NIcon } from "naive-ui";
import subjectsmap from "../../basicinfo/subjects.json"
import {EllipsisVerticalOutline,AddCircleOutline,ExitOutline}from "@vicons/ionicons5"
import { useRouter,useRoute } from "vue-router";
import { router_push } from "../../utils/router-goto";
import TWrapper from "./twrapper.vue";
import {generateExpHTMLCode}from "./generateTemplate"
const router=useRouter(),route=useRoute()

const FailedColl=ref([])

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const exportEXT=ref({
  title:"testtest",
  numberEachT:true
})

const options=[
        {
          label: "手动添加错题",
          key: "manualAdd",
          icon: renderIcon(AddCircleOutline),
          props: {
            onClick: () => {
              router_push(router,"/ftc/manualadd?bankid="+bankid.value)
              
            }
          }
        },        {
          label: "导出错题",
          key: "export",
          icon: renderIcon(ExitOutline),
          props: {
            onClick: async() => {
              window.vhtmlTemplate=await generateExpHTMLCode(FailedColl.value,exportEXT.value)
              router_push(router,"/ftc/export")
            }
          }
        }
      ]


const bankid=ref(12)

if(route.query.bankid){
  bankid.value=parseInt(route.query.bankid)
}

// API.get("/zujuan-ink-be-core/data/list/failedcoll").then(v=>{
//     FailedColl.value=v
// })

const refreshFiCList=()=>{
  API.get("/zujuan-ink-be-core/ftc/list/filter/subject/"+bankid.value).then(v=>{
    FailedColl.value=v
})
}

refreshFiCList()



const showRecords=ref(false),recInfo=ref([]),loadingRecords=ref(true)
const SeeRecord=(id)=>{
    showRecords.value=true
    API.get("/zujuan-ink-be-core/donerec/filter/quuid/all/"+id).then(v=>{
        recInfo.value=v
        loadingRecords.value=false
    })
}


const enterFaRETMode=()=>{
    window.TList=FailedColl.value
    window.TList.forEach((v,i)=>window.TList[i].quid=window.TList[i].id)
    window.bankid=bankid.value
    window.qcomponent="ild"
    router.push("/zujuanink/room")
}


const RemoveFromColl=(id)=>{
  API.get("/zujuan-ink-be-core/data/removeFailedColl/"+id).then(v=>{
    })
}
</script>
<style scoped>
.centered{
    width: 90%;
    margin: auto auto;
}
</style>