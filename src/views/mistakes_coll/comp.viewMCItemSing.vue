<template>
    <n-card v-if="LoadingQ"
    ><n-skeleton :repeat="8"></n-skeleton></n-card>
<n-card v-else>
    <n-text>收录于：</n-text><n-time :time="McInfo.T.collTime" :to="getNow" type="relative" />
    <n-text>| Tags:</n-text>    
    <n-tag v-for="tag in McInfo.T.tags" @click="$router.push('/mistakes_coll/list/filter/tag/'+tag.value)">{{ tag.label }}</n-tag>
<div v-html="generateHTMLCodeQ4CardDisplay(McInfo.T,McInfo.Q)"></div>
<n-button @click="deleteq()">Delete</n-button>
<n-button @click="$router.push('/mistakes_coll/edit/'+McInfo.T.id)">Edit</n-button>
<n-button @click="showQA()">Show Q &amp; A</n-button>
<n-checkbox :value="McInfo.T.id"></n-checkbox>
<div v-if="showQA_flag">
    <p>答案</p>
<div v-html="McInfo.T.answer"></div>
<p>解析</p>
<div v-html="McInfo.T.parse"></div>
<p>注释</p>
<div v-html="McInfo.T.note"></div>
</div>
<!-- <div >
    <img :src="XKWGetFile.a" style="width:600px;display:block;">
    <img :src="XKWGetFile.p" style="width:600px;display:block;">
</div> --></n-card>
</template>

<script setup>

import { onMounted, ref,useAttrs } from "vue"
import {useRoute,useRouter} from "vue-router"
import { normalizeq } from "@/shared/normalize_q/toScreenDSingle"
import swal from "sweetalert"
import { NButton,NSkeleton,NCard,NTime,NTag,NCheckbox,NText } from "naive-ui"
import {API} from "@/shared/APIHelper" 
import { useSettings } from '@/stored/settings'
import {generateHTMLCodeQ4CardDisplay}from "./generateHTMLCode"

const store = useSettings()
const route=useRoute(),router=useRouter()

const LoadingQ=ref(true)

const getNow=(new Date()).getTime()

const XKWGetFile=ref({a:"",p:""})

const showQA_flag=ref(false)
const attrs=useAttrs()
const McInfo=ref({T:{},Q:{}})

API.get("/api/data/mistakes_coll/get/full_with_question/"+attrs.ItemId).then(Op=>{
McInfo.value.T=Op.mistakes_coll
McInfo.value.Q=Op.quesRecord
LoadingQ.value=false
})

const showQA=()=>{
    showQA_flag.value=true
//     API.get("/api/xkw-helper/getCachedImg/"+T.value.bankid+"/"+T.value.qid+"/600").then(r=>{
//         XKWGetFile.value={
//             a:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.answer.replace("@2","@3")),
//             p:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.parse.replace("@2","@3")),
//         }
// })
}
//e217b45e97cef0e2850ca10b3360e62867b4
// const deleteq=()=>{
//     swal("Are you sure?",{
//         dangerMode:true,buttons:true
//     }).then(v=>{
//         if(v){
//             API.get("/api/qapi/delete/"+route.params.id).then(v=>{
//                 swal(JSON.stringify(v,null,4))
//             })
//         }
//     })
// }


</script>

<style>

</style>