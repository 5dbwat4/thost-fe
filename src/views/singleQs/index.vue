<template>
    <div v-if="LoadingQ">
        <n-skeleton text :repeat="9" />
</div>
<div v-else>
<div v-html="normalizeq(T.q)"></div>
<n-button @click="deleteq()">Delete</n-button>
<n-button @click="editq()">Edit</n-button>
<n-button @click="showQA()">Show Q &amp; A</n-button>
<n-button @click="router.push('/view/'+route.params.id+'/printParse')">PrintParse</n-button>
<n-button @click="router.push('/view/'+route.params.id+'/editOrigin')">editOrigin</n-button>
<n-button @click="showAtZujuan">组卷网中的这道题</n-button>
<div >
    <img :src="XKWGetFile.a" style="width:600px;display:block;">
    <img :src="XKWGetFile.p" style="width:600px;display:block;">
</div>
</div>
</template>

<script setup>

import { onMounted, ref } from "vue"
import {useRoute,useRouter} from "vue-router"
import { normalizeq } from "@/shared/normalize_q/toScreenDSingle"
import swal from "sweetalert"
import { NButton,NSkeleton } from "naive-ui"
import {API} from "@/shared/APIHelper" 
import { useSettings } from '@/stored/settings'


const store = useSettings()
const route=useRoute(),router=useRouter()

const LoadingQ=ref(true)

const T=ref({})

const XKWGetFile=ref({a:"",p:""})



API.get("/api/data/get/"+route.params.id).then(v=>{
    T.value=v
    LoadingQ.value=false
})

const showQA=()=>{
    API.get("/api/xkw-helper/getCachedImg/"+T.value.bankid+"/"+T.value.qid+"/600").then(r=>{
        XKWGetFile.value={
            a:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.answer.replace("@2","@3")),
            p:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.parse.replace("@2","@3")),
        }
})
}
//e217b45e97cef0e2850ca10b3360e62867b4
const deleteq=()=>{
    swal("Are you sure?",{
        dangerMode:true,buttons:true
    }).then(v=>{
        if(v){
            API.get("/api/qapi/delete/"+route.params.id).then(v=>{
                swal(JSON.stringify(v,null,4))
            })
        }
    })
}


const showAtZujuan=()=>{
    window.open("https://zujuan.xkw.com/"+T.value.bankid+"q"+T.value.qid+".html")
}

</script>

<style>

</style>