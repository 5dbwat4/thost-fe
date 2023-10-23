<template>
    <n-button @click="enterFaRETMode">错题抽查</n-button>
<div v-for="ii in FailedColl" class="centered"> 
    <n-card hoverable>
<question-block :qcontent="ii"/>
<template #action>
      <n-button  type="primary" dashed size="small"  round @click="SeeRecord(ii.id)">查看答题记录</n-button>
      <n-button  type="warning" dashed size="small"  round @click="RemoveFromColl(ii.id)">移除出错题本</n-button>
    </template>
</n-card>
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
import { ref, onMounted } from "vue";
import { API } from "../../shared/APIHelper";

import questionBlock from "./ild/cmp.questionBlockBasic.ild.vue"
import { NCard,NButton,NModal,NSpin,NImage,NImageGroup,NSpace } from "naive-ui";
const FailedColl=ref([])


import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()



API.get("/zujuan-ink-be-core/data/list/failedcoll").then(v=>{
    FailedColl.value=v
})







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
    window.bankid=15
    router.push("../room-ild")
}


const RemoveFromColl=(id)=>{
  API.get("/zujuan-ink-be-core/data/removeFailedColl/"+id).then(v=>{
    })
}
</script>


<style scoped>
.centered{
    width: 70%;
    margin: auto auto;
}
</style>