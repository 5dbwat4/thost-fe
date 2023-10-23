<template>
<n-button @click="shown.q=!shown.q">Q</n-button>
<n-button @click="shown.a=!shown.a">A</n-button>
<n-button @click="shown.p=!shown.p">P</n-button>
<btog-form :ql="$route.params.ids"/>
<div style="width:18.76cm">
<div v-for="oo in chunk2array(Tlist)" :key="oo.id" >
    <p style="font-size:9.5pt">UUID:<span style="font-family:'courier new'">{{oo.id}}</span> | qid:<span style="font-family:'courier new'">{{oo.qid}}</span> <span v-if="shown.q">| Info: {{_JSONparse(oo.extra).info}} | Origin: {{_JSONparse(oo.extra).from}}</span></p>
<div v-if="shown.q" v-html="normalizeq(oo.q)" style="font-size:10.5pt;font-family:Cambria , 宋体" ></div>
<div v-if="shown.a"><img :src='"/oss-storage/"+oo.a.replace("<answerparser>","").replace("</answerparser>","").split("|")[0]+".png"'/></div>
<div v-if="shown.p"><img :src='"/oss-storage/"+oo.a.replace("<answerparser>","").replace("</answerparser>","").split("|")[1]+".png"'/></div>
</div></div>
</template>

<script setup>


import { onMounted, ref } from "vue"
import {useRoute,useRouter} from "vue-router"
const route=useRoute(),router=useRouter()
import btogForm from "./batch2groupForm.vue"
import {API} from "../../shared/APIHelper"

import {NButton} from "naive-ui"

import {normalizeq} from "../../shared/nomorlize_q"

const shown=ref({
    q:true,
    a:false,
    p:false
})

import {qtypes} from "../../shared/define_basic_qtypes"

const Tlist=ref({})

route.params.ids.split(",").forEach(v => {
    Tlist.value[v]=qtypes
});

Promise.all(route.params.ids.split(",").map(v=>new Promise((res,rej)=>{
API.post("/api/get",{id:v}).then(i=>{
    Tlist.value[v]=i
})
}))).then(()=>{
// fetch("/api/get",{"method":"POST","body":JSON.stringify({id:v}),"headers":{"Content-Type":"application/json"}}).then(o=>o.json()).then(i=>{
//     Tlist.value[v]=i
// })
// }))).then(()=>{

})




const _JSONparse=(v)=>{return JSON.parse(v)}




,chunk2array=mm=>Object.entries(mm).map(o=>o[1])
</script>

<style>

</style>
