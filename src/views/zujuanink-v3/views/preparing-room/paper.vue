<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
    <n-card hoverable>
        <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging">
    <n-form-item  label="BankId"> 
    <n-input-number v-model:value="bankid"></n-input-number>
    </n-form-item>    <n-form-item  label="paperId"> 
    <n-input-number v-model:value="PaperId"></n-input-number>
    </n-form-item>
    <n-button @click="initTList">进入</n-button>
</n-form></n-card></n-gi>
<n-gi>
    <n-card hoverable>

    <n-p>您可以输入试卷对应的网址</n-p>
    <n-input placeholder="e.g. https://zujuan.xkw.com/12p1623524.html"
    @change="paperURLUpdated" v-model:value="paperURL"></n-input>
    <n-button @click="paperURLUpdated();initTList()">进入</n-button>
</n-card></n-gi></n-grid>
    </template>
    <script setup>
    import { ref } from 'vue';
    import { ZujuanAPI } from '../../utils/zujuan-api';
    import{polishingupTlist} from "./polishinguptlist"
    
    import { useRouter,useRoute } from "vue-router";
    import { NInputNumber,NButton,NForm,NFormItem,NCard,NInput,NGrid,NGi,NP } from 'naive-ui';
import { router_push } from '../../utils/router-goto';
    const router=useRouter(),route=useRoute()
    const PaperId=ref(0),bankid=ref(0),paperURL=ref("")
    
    
    if(route.query.bankid){
        bankid.value=parseInt(route.query.bankid)
    }
    if(route.query.paper){
        PaperId.value=parseInt(route.query.PaperId)
    }
    
    import isNumber from "../../../../shared/lib/is-number-strict";
import swal from 'sweetalert';
    const initTList=()=>{
        if(!isNumber(bankid.value)&&isNumber(PaperId.value)){
            swal({
  title: "请输入合法的数字",
  icon: "error",
})
        }
        ZujuanAPI(`/app-server/v1/paper/detail/${bankid.value}/${PaperId.value}`,"GET").then(async(vv)=>{
        window.TList=vv.data.quesList
        window.TList=await polishingupTlist(bankid.value,window.TList)
        window.bankid=bankid.value
        window.qcomponent="zjw"
            router_push(router,"/room")
    }) 
    }

    const paperURLUpdated=()=>{
        const res=/zujuan\.xkw\.com\/(\d*)p(\d*).html/.exec(paperURL.value)
        if(res){

            bankid.value=parseInt(res[1])
            PaperId.value=parseInt(res[2])
        }
    }
    
    </script>