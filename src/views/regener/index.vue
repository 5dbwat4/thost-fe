<template>
<n-card v-if="step==1">
<n-input v-model:value="meterial" type="textarea" />
<n-input v-model:value="bid"/>
<n-button @click="help1">RUN</n-button>
</n-card>
<n-card v-if="step==2">
    <div v-html="ranges.join('<br/>')"></div>
    <div v-html="meterial.replaceAll('\n','<br/>')"></div>
        <n-button @click="help2">RUN</n-button>
        <n-button @click="help3">RUN using ifr</n-button>
</n-card>
<n-card v-if="step==32">
    <n-button @click="regenatteachedHelper">GOTO zujuan.xkw.com</n-button>
</n-card>
<n-card v-if="step==32">
    <div v-for="ror in ranges" :key="ror.key">
        <div  v-if="ror.display">
        <p>{{ror.met}}</p>
        <iframe  :src="'https://zujuan.xkw.com/quessearch/?keyword='+ror.met"></iframe>
        <n-button @click="ranges[helpertmp_i].display=false;helpertmp_i++;ranges[helpertmp_i].display=true">&lt; next</n-button>
        <n-button @click="ranges[helpertmp_i].display=false;helpertmp_i--;ranges[helpertmp_i].display=true">prev &gt;</n-button>
        </div>
    </div>

</n-card>
<n-card v-if="step==31">
    <div v-for="ror in ranges" :key="ror.met">
        <p>{{ror.met}}</p>
        <div v-html="ror.tdp.body"></div>
        <p>QID:{{ror.tdp.id}}   ||   {{foundlist[ror.tdp.id]}}</p>
        <n-button @click="Save(ror.tdp.id)" :loading="saving[ror.tdp.id]">SAVE</n-button>
        <n-button @click="ror.tdp=ror.list[--ror.index]">&lt; CHANGE</n-button>
        <n-button @click="ror.tdp=ror.list[++ror.index]">CHANGE &gt;</n-button>
    </div>

</n-card>
<div></div>
</template>

<script setup>
import {NInput,NButton,NCard}from "naive-ui"
import { ref } from "vue";
import { API } from "../../shared/APIHelper";



const meterial=ref(""),step=ref(1),ranges=ref([]),bid=ref(""),foundlist=ref({}),saving=ref({})

const _kpafunc=(e)=>{
    if(e.key=="Enter"){
        let range=window.getSelection().toString() 
        // .slice(0,25)
        ranges.value.push(range)
    }
}
const help1=()=>{
step.value=2
document.addEventListener("keypress",_kpafunc)
}
const help2=async()=>{
step.value=31
let ooo=ranges.value
ranges.value=ranges.value.map(o=>{return {met:o,list:[],tdp:{}}})
for (let i = 0; i < ranges.value.length; i++) {
    await API.get("/api/xkw-helper/qsearch/"+bid.value+"/"+ranges.value[i].met.slice(0,40)).then(r=>{
        ranges.value[i].list=r.data.list
        ranges.value[i].index=0
        ranges.value[i].tdp=ranges.value[i].list[ranges.value[i].index]
        r.data.list.forEach((o,j) => {
            if(j<6){
                WhetherFound(bid.value,o.id)
            }
        });
    })
}

}

const helpertmp_i=ref(0)
const help3=async()=>{
step.value=32
let ooo=ranges.value
ranges.value=ranges.value.map(o=>{return {met:o,list:[],tdp:{}}})
for (let i = 0; i < ranges.value.length; i++) {
ranges.value[i].display=false
}
ranges.value[0].display=!false

}

const WhetherFound=async(bid,qid)=>{
    await API.get("/api/qapi/is_collected/"+bid+"/"+qid).then(r=>{
        foundlist.value[qid]=JSON.stringify(r)
    })
}

const Save=async(qid)=>{
    saving.value[qid]=true
    await API.get("/api/data/add/"+bid.value+"/"+qid)
}



const regenatteachedHelper=()=>{
    API.post("/api/regen-attach/state-update/contentupd",ranges.value.map(v=>encodeURIComponent( v.met.replaceAll("\r\n"," ").replaceAll(/[ \t]/g," ").slice(0,100)))).then(p=>{
            location.href=API.host+"/api/regen-attach/router/begin"
        })
}
</script>

<style>

</style>