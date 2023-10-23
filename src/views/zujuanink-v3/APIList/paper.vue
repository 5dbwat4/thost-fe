<template>
<n-input-number v-model:value="bankid"></n-input-number>
<n-input-number v-model:value="PaperId"></n-input-number>
<n-button @click="initTList">进入</n-button>
</template>
<script setup>
import { ref } from 'vue';
import { ZujuanAPI } from '../utils/zujuan-api';
import{polishingupTlist} from "./polishinguptlist"

import { useRouter,useRoute } from "vue-router";
import { NInputNumber,NButton } from 'naive-ui';
const router=useRouter(),route=useRoute()
const PaperId=ref(0),bankid=ref(0)


if(route.query.bankid){
    bankid.value=parseInt(route.query.bankid)
}
if(route.query.paper){
    PaperId.value=parseInt(route.query.PaperId)
}


const initTList=()=>{
    ZujuanAPI(`/app-server/v1/paper/detail/${bankid.value}/${PaperId.value}`,"GET").then(async(vv)=>{
    window.TList=vv.data.quesList
    window.TList=await polishingupTlist(bankid.value,window.TList)
        router.push("../room")
}) 
}

</script>