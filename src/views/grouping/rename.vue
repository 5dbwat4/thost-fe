<template>
<p>请输入新名称</p>
<n-input v-model:value="name"></n-input>
<n-button @click="submit">SUBMIT</n-button>
</template>
<script setup>
import { ref } from "vue";

import { NInput,NButton } from "naive-ui";
import { API } from "../../shared/APIHelper";

import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()

const name=ref("")


API.get("/api/group/get/"+route.params.id).then(oo=>{
    name.value=oo.title
})

const submit=()=>{
    API.post("/api/group/rename/"+route.params.id,{
        title:name.value
    }).then(oo=>{
})

}
</script>