<template>
    <p>请输入新desc</p>
    <n-input type="textarea" v-model:value="name"></n-input>
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
        name.value=oo.desc
    })
    
    const submit=()=>{
        API.post("/api/group/edit-desc/"+route.params.id,{
            desc:name.value
        }).then(oo=>{
    })
    
    }
    </script>