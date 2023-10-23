<template>


<div id="GENINIMain"></div>
</template>
<script setup>
import { onMounted } from 'vue';




onMounted(()=>{
    document.getElementById("GENINIMain").innerHTML=window.vhtmlTemplate
})
</script>