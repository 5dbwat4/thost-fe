<template>
<n-input v-model:value="widthqq" class="noprint"></n-input>
<n-button @click="showQA" class="noprint">GO</n-button>
<n-button @click="showPlaceholder=!showPlaceholder" class="noprint">showPlaceholder</n-button>
<div style="width:650px;">
    <div style="display:inline-block;width:310px" v-show="showPlaceholder"></div>
<img :src="XKWGetFile.p" :style="{width:widthqq+'px',display:'block',display:'inline-block'}"></div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import {useRoute,useRouter} from "vue-router"
import { NButton,NInput } from "naive-ui"
import {API} from "@/shared/APIHelper" 
import { useSettings } from '@/stored/settings'


const store = useSettings()
const route=useRoute(),router=useRouter()
const widthqq=ref(600)
const T=ref({})

const showPlaceholder=ref(false)

const XKWGetFile=ref({a:"",p:""})



API.get("/api/data/get/"+route.params.id).then(v=>{
    T.value=v
    showQA()
})
const showQA=()=>{
    API.get("/api/xkw-helper/getCachedImg/"+T.value.bankid+"/"+T.value.qid+"/"+widthqq.value).then(r=>{
        XKWGetFile.value={
            a:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.answer.replace("@2","@3")),
            p:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.parse.replace("@2","@3")),
        }
})
}


</script>

<style>
@media print{
    .noprint{
        display: none;
    }

}

</style>