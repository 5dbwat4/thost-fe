<template>
    <div class="ContainerAA">
<div v-for="ii in Tlist" v-html="normalizeq(ii.body)" style="font-size:9.5pt;line-height: normal;"></div>
</div>
</template>
<script setup>
import { ref } from "vue";
import {normalizeq}from "./nomorlize_q"
const Tlist=ref([])
Tlist.value=window.TList
</script>


<style>
  .ContainerAA   td {
        padding: 0
    }

    .ContainerAA{
        width: 18.76cm;
    }
</style>