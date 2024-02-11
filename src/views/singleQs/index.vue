<template>
    <div v-if="LoadingQ">
        <n-skeleton text :repeat="9" />
</div>
<div v-else>
<div v-html="normalizeq(T.q)"></div>
<n-button @click="deleteq()">Delete</n-button>
<n-button @click="editq()">Edit</n-button>
<n-button @click="showQA()">Show Q &amp; A</n-button>
<div ><img :src='"/oss-storage/"+T.a.replace("<answerparser>","").replace("</answerparser>","").split("|")[0]+".png"'/></div>
<div ><img :src='"/oss-storage/"+T.a.replace("<answerparser>","").replace("</answerparser>","").split("|")[1]+".png"'/></div>
<div >
    <img :src="XKWGetFile.a" style="width:600px;display:block;">
    <img :src="XKWGetFile.p" style="width:600px;display:block;">
</div>
</div>
</template>

<script setup>

import { onMounted, ref } from "vue"
import {useRoute,useRouter} from "vue-router"
import { normalizeq } from "../../shared/normalize_q/toScreenDSingle"
import swal from "sweetalert"
import { NButton,NSkeleton } from "naive-ui"
import {API} from "../../shared/APIHelper" 
const route=useRoute(),router=useRouter()

const LoadingQ=ref(true)

const T=ref({})

const XKWGetFile=ref({a:"",p:""})



API.get("/api/data/get/"+route.params.id).then(v=>{
    T.value=v
    LoadingQ.value=false
})

const showQA=()=>{
    API.get("/api/xkw-helper/get_more_detail/600/"+T.value.bankid+"/"+T.value.qid).then(r=>{
        XKWGetFile.value={
            a:"/api/xkw-helper/route-pic?purl="+btoa(r.data.answerImg.replace("@2","@3")),
            p:"/api/xkw-helper/route-pic?purl="+btoa(r.data.parseImg.replace("@2","@3")),
        }
})
}

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


</script>

<style>

</style>