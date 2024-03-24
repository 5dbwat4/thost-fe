<template>
      <p>选择父节点</p>

<n-cascader
  cascade
  :options="options"
  v-model:value="ADD_parentTag"
/>
<p>输入子节点名：</p>

<n-input v-model:value="ADD_tagName"></n-input>

<n-button @click="handleAdd">OK</n-button>

</template>
<script setup>
import { NCascader } from 'naive-ui';
import { API } from '@/shared/APIHelper';
import { ref, useAttrs } from 'vue';
import { NInput,NButton,NModal,NCard,NInputGroup } from 'naive-ui';
const options=ref([])
const showAddTagModal=ref(false)
API.get("/api/data/mistakes_coll/tags/get").then(v=>{
    options.value=v
})

const attrs=useAttrs()
console.log(attrs);


const updateV=(a)=>{
    attrs["onUpdate:tags"](a)
}


const tags=ref([])



const ADD_tagName=ref(""),ADD_parentTag=ref("")


const handleAdd=()=>{
    console.log(ADD_parentTag.value,ADD_tagName.value);
    API.post("/api/data/mistakes_coll/tags/add",{
        parent:ADD_parentTag.value,
        childLabel:ADD_tagName.value
    }).then(vccc=>{
        API.get("/api/data/mistakes_coll/tags/get").then(v=>{
    options.value=v
tags.value.push(vccc.id)
showAddTagModal.value=false
})
    })
}
</script>