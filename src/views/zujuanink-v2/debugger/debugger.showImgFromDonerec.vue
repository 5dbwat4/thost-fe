<template>
<n-image :src="Rv"></n-image>
</template>
<script setup>
import { NImage } from 'naive-ui';
import { API } from '../../../shared/APIHelper';
import { useRouter,useRoute } from "vue-router";
import { ref } from 'vue';
const router=useRouter(),route=useRoute()


const Rv=ref("")

API.get("/zujuan-ink-be-core/donerec/get/"+route.params.id).then(v=>{
Rv.value=v.image
})
</script>