<template>
    <n-input-group>
    <n-cascader
      multiple
      cascade
      :options="options"
      check-strategy="child"
      v-model:value="$attrs.tags"
    />
    <n-button @click="showAddTagModal=true">创建新tag</n-button></n-input-group>
    <n-modal v-model:show="showAddTagModal">
    <n-card
      style="width: 600px"
      title="创建新tag"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >

      <p>选择父节点</p>

<n-cascader
  cascade
  :options="options"
  v-model:value="ADD_parentTag"
/>
<p>输入子节点名：</p>

<n-input v-model:value="ADD_tagName"></n-input>

<n-button @click="handleAdd">OK</n-button>

    </n-card>
  </n-modal>

</template>
<script setup>
import { NCascader } from 'naive-ui';
import { API } from '@/shared/APIHelper';
import { ref } from 'vue';
import { NInput,NButton,NModal,NCard,NInputGroup } from 'naive-ui';
const options=ref([])
const showAddTagModal=ref(false)
API.get("/api/data/mistakes_coll/tags/get").then(v=>{
    options.value=v
})

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