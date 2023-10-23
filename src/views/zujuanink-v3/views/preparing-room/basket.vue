<template>
<n-alert type="warning">
    请您知悉，试题篮属于是与个人信息相连的敏感数据，数据取决于您保存于后端的token。请确认您在后端提供了正确的token信息。
</n-alert>
<n-card hoverable>
    The best practice is:<br/>
    先在组卷网的网页端中找到所有想用zujuanink抽查的题目，将它们加入试题篮，然后再回来，选择学科，并单击ENTER.
    <n-cascader
      v-model:value="bankid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
    />
    <n-button @click="enterRoom">ENTER</n-button>
</n-card>
</template>
<script setup>
import { NAlert,NCard,NInputNumber,NButton,NCascader } from 'naive-ui';
import { ZujuanAPI } from '../../utils/zujuan-api';
import {ref} from "vue"
import subjectsmap from "../../basicinfo/subjects.json"
import { polishingupTlist } from './polishinguptlist';
import { router_push } from '../../utils/router-goto';

import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()
const bankid=ref(15)

const enterRoom=async()=>{
    ZujuanAPI("/app-server/v1/basket/"+bankid.value).then(async(v)=>{
        let TL=[]
        v.data.structure.forEach(r=>{
            TL.push(...r.list)
        })

        window.TList=TL
        window.TList=await polishingupTlist(bankid.value,window.TList)
        window.bankid=bankid.value
        window.qcomponent="zjw"
            router_push(router,"/room")
    })
}
</script>