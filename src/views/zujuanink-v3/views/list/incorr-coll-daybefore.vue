<template>

    <n-input-group>
      <n-button @click="enterFaRETMode" :disabled="FailedColl.length==0">错题抽查</n-button>
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
<question-block :qcontent="ii"/>
<template #action>
      <n-button  type="primary" dashed size="small"  round @click="SeeRecord(ii.id)">查看答题记录</n-button>
      <n-button  type="warning" dashed size="small"  round @click="RemoveFromColl(ii.id)">移除出错题本</n-button>
    </template>
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


<n-modal v-model:show="showRecords">
    <n-card
      style="width: 600px"
      title="答题记录"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >


    <n-spin v-if="loadingRecords"/>


<div  v-if="!loadingRecords">
      <n-image-group show-toolbar-tooltip>
    <n-space>
        <div v-for=" ra in recInfo">
      <n-image
        width="100"
        :src="ra.image"
      />
    </div>
    </n-space>
  </n-image-group>
</div>


    </n-card>
  </n-modal>




</template>
<script setup>
import { ref, onMounted ,h} from "vue";
import { API } from "../../../../shared/APIHelper";

import questionBlock from "../../questionBlock/ild.vue"
import { NCard,NButton,NModal,NSpin,NImage,NImageGroup,NSpace,
NInput,NInputGroup,NInputGroupLabel,NCascader,NDropdown,
NEmpty,NP,NLi,NIcon } from "naive-ui";
import subjectsmap from "../../basicinfo/subjects.json"
import {EllipsisVerticalOutline,AddCircleOutline}from "@vicons/ionicons5"
const FailedColl=ref([])

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const options=[
        {
          label: "手动添加错题",
          key: "manualAdd",
          icon: renderIcon(AddCircleOutline),
          props: {
            onClick: () => {
              message.success('Good!')
            }
          }
        }
      ]


import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()

const bankid=ref(12)

// API.get("/zujuan-ink-be-core/data/list/failedcoll").then(v=>{
//     FailedColl.value=v
// })

const refreshFiCList=()=>{
  API.get(`/zujuan-ink-be-core/data/filter/FailedTsByDate/${(new Date()).getTime()-1000*60*60*24*3}/s/`+bankid.value).then(v=>{
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