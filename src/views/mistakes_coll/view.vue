<template>
    <div v-if="LoadingQ">
        <n-skeleton text :repeat="9" />
</div>
<div v-else>
<div v-html="generateHTMLCodeQ(T,Q)"></div>
<n-button @click="deleteq()">Delete</n-button>
<n-button @click="$router.push('../edit/'+$route.params.id)">Edit</n-button>
<n-button @click="showQA()">Show Q &amp; A</n-button>
<div v-if="showQA_flag">
    <p>答案</p>
<div v-html="T.answer"></div>
<p>解析</p>
<div v-html="T.parse"></div>
<p>注释</p>
<div v-html="T.note"></div>
</div>
<!-- <div >
    <img :src="XKWGetFile.a" style="width:600px;display:block;">
    <img :src="XKWGetFile.p" style="width:600px;display:block;">
</div> -->
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
import { generateHTMLCodeQ } from "./generateHTMLCode"


const store = useSettings()
const route=useRoute(),router=useRouter()

const LoadingQ=ref(true)

const T=ref({}),Q=ref({})

const XKWGetFile=ref({a:"",p:""})

const showQA_flag=ref(false)



API.get("/api/data/mistakes_coll/get/full_with_question/"+route.params.id).then(v=>{
    T.value=v.mistakes_coll
    Q.value=v.quesRecord
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