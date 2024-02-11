<template>
    <n-button @click="pdfgen">Generate</n-button>
<div id="coreop"></div>
</template>
<script setup>

import { onMounted } from "vue";
import {NButton} from "naive-ui"

onMounted(()=>{
    document.getElementById("coreop").innerHTML=localStorage.getItem("___thost___html_export")
})


function pdfgen(){
    
}
</script>