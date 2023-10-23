<template>
<p>{{uuids}}</p>
</template>

<script setup>
import { ref } from "vue";
import { API } from "../../shared/APIHelper";

const uuids=ref("Loading")

API.get("/api/list/v2/all_uuids").then(v=>{
    console.log(v);
    uuids.value=v.map(v=>v.id).join(",")
})
</script>

<style>

</style>