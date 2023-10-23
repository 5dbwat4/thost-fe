<template>
<div v-html="content"></div>
</template>

<script setup>
import { ref, useAttrs } from "vue";
import { API } from "../../shared/APIHelper";

const attrs=useAttrs()
const content=ref("")

API.get("/api/qapi/get/"+attrs.id).then(o=>{
content.value=o.q
})
</script>

<style>

</style>