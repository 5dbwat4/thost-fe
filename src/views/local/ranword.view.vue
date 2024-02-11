<template>
    <n-input-group>
<n-input-group-label>将预览 {{ $route.query.filename }}</n-input-group-label>
<n-button>重命名</n-button>
</n-input-group>
<n-card v-html="DocumentFileHTML">
    
</n-card>
</template>
<script setup>
import { NCard, NP, NSpin,NInputGroup,NInputGroupLabel,NButton } from "naive-ui";
import { API } from "../../shared/APIHelper";
import { useRouter,useRoute } from "vue-router";
import { ref } from "vue";
import mammoth from "mammoth"

const router=useRouter(),route=useRoute()
const DocumentFileHTML=ref("")
fetch(API.host+"/api/local/ranword/file/"+route.query.filename).then(v=>v.arrayBuffer()).then(v=>{
    // console.log(v);
    mammoth.convertToHtml({
        arrayBuffer: v
    }).then(op=>{
        DocumentFileHTML.value=op.value
    })
   
})
</script>