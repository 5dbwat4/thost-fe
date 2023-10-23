<template>

</template>


<script setup>
import { ref } from 'vue';
import { API } from '../../shared/APIHelper';



const Records=ref([])
API.get("/zujuan-ink-be-core/records/rec/page/").then(v=>{
    Records.value=v
})
</script>