<template>
    <p>请输入新paperSource，可选的：</p>
    <p v-for="i in soos">{{ i }}</p>
    <n-input type="textarea" v-model:value="name"></n-input>
    <n-button @click="submit">SUBMIT</n-button>
    </template>
    <script setup>
    import { ref } from "vue";
    
    import { NInput,NButton } from "naive-ui";
    import { API } from "../../shared/APIHelper";
    
    import { useRouter,useRoute } from "vue-router";

    const soos=ref([])
    const router=useRouter(),route=useRoute()
    
    const name=ref("")
    
    
    API.get("/api/data/get/"+route.params.id).then(oo=>{
        name.value=oo.origin
        soos.value=oo.paperSources.split(",")
        for (let ii = 0; ii < soos.value.length; ii++) {
            const kid = soos.value[ii];
            API.get("/api/data/getPaperNameFromId/"+kid).then(osos=>{
                soos.value[ii]=osos.name
            })
        }
    })
    
    const submit=()=>{
        API.post("/api/data/edit-origin/"+route.params.id,{
            origin:name.value
        }).then(oo=>{
    })
    
    }
    </script>