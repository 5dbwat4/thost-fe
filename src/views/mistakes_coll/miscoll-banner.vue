<template>
    <n-button-group>
<n-input-group-label v-if="CurrentMiscollStatus!=1">{{ CurrentMiscollStatus==0?"正在加载错题信息":
CurrentMiscollStatus==1?"已收录为错题":
CurrentMiscollStatus==2?"未收录为错题":
"未知错误" }}</n-input-group-label>
<n-input-group-label v-if="CurrentMiscollStatus==1">  <n-gradient-text type="info">
    已收录为错题
  </n-gradient-text></n-input-group-label>

<n-button v-if="CurrentMiscollStatus==1" @click="$router.push('/mistakes_coll/view/'+collid)">查看</n-button>
<n-button @click="$router.push('/mistakes_coll/coll_by_ques/'+$attrs.id)">收录错题</n-button>
<n-button @click="fastcollectInfo.show=true">快速</n-button>
</n-button-group>
<n-space vertical v-if="fastcollectInfo.show">
    <n-button-group>
<n-input-group-label>Q</n-input-group-label>
<n-button @click="()=>{
if(fastcollectInfo.qType=='AS-IS')fastcollectInfo.qType='ASIS_with_MDNote';
 else fastcollectInfo.qType='AS-IS';
 }">{{ fastcollectInfo.qType }}</n-button>
<n-input v-if="fastcollectInfo.qType=='ASIS_with_MDNote'" placeholder="Note..."
v-model:value="fastcollectInfo.q"/>
</n-button-group>
<n-button-group>
<n-input-group-label>A</n-input-group-label>
<n-button @click="()=>{
if(fastcollectInfo.answerType=='AS-IS')fastcollectInfo.answerType='ASIS_with_MDNote';
 else fastcollectInfo.answerType='AS-IS';
 }">{{ fastcollectInfo.answerType }}</n-button>
<n-input v-if="fastcollectInfo.answerType=='ASIS_with_MDNote'" placeholder="Note..."
v-model:value="fastcollectInfo.answer"/>
</n-button-group>
<n-button-group>
<n-input-group-label>P</n-input-group-label>
<n-button @click="()=>{
if(fastcollectInfo.parseType=='AS-IS')fastcollectInfo.parseType='ASIS_with_MDNote';
 else fastcollectInfo.parseType='AS-IS';
 }">{{ fastcollectInfo.parseType }}</n-button>
<n-input v-if="fastcollectInfo.parseType=='ASIS_with_MDNote'" placeholder="Note..."
v-model:value="fastcollectInfo.parse"/>
</n-button-group>
<n-button-group>
<n-input-group-label>N</n-input-group-label>
<n-input placeholder="Markdown..." v-model:value="fastcollectInfo.note"/>
</n-button-group>
<n-button-group>
<n-input-group-label>T</n-input-group-label>
<tag-tree-select v-model:tags="fastcollectInfo.tags"></tag-tree-select>
</n-button-group>
<n-button @click="handleFastCollectFin">Collect</n-button>
</n-space>
</template>
<script setup>


import { ref, useAttrs } from "vue";
import { useRouter,useRoute } from "vue-router";
import {NButton,NButtonGroup,NInputGroupLabel,NSpace,NInput,NGradientText} from "naive-ui"
import { API } from "../../shared/APIHelper";
import TagTreeSelect from "./handleTagTreeSelect.vue"

const router=useRouter(),route=useRoute()

const attrs=useAttrs()
/**
 * 0 - 加载中
 * 1 - 已收录
 * 2 - not collected
 */
const CurrentMiscollStatus=ref(0),collid=ref("0")

API.get("/api/data/mistakes_coll/whethercollected/"+attrs.id).then(ro=>{
    if(ro.found){
        CurrentMiscollStatus.value=1
        collid.value=ro.data.id
    }else{
        CurrentMiscollStatus.value=2

    }
})

const fastcollectInfo=ref({
    show:false,
q            :"",
qType        :"AS-IS",
answer       :"",
answerType   :"AS-IS",
parse        :"",
parseType    :"AS-IS",
note         :"",
noteType     :"AS-IS",
tags :[]
})


const handleFastCollectFin=()=>{
    API.get("/api/data/get/"+attrs.id).then(ro=>{
        API.post("/api/data/mistakes_coll/add", {
    relatedQID: attrs.id,
    bankid: ro.bankid,
    q: fastcollectInfo.value.q,
    qType: fastcollectInfo.value.qType,
    answer: fastcollectInfo.value.answer,
    answerType: fastcollectInfo.value.answerType,
    parse: fastcollectInfo.value.parse,
    parseType: fastcollectInfo.value.parseType,
    note: fastcollectInfo.value.note,
    noteType: fastcollectInfo.value.noteType,
    tags: fastcollectInfo.value.tags,
    collTime: new Date().getTime(),
    rate: 5,
  }).then(fo=>{
    CurrentMiscollStatus.value=2
    collid.value=fo.id
  })
    })
 
}
</script>