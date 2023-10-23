<template>
     <n-alert title="Note" type="info">
      This project is still in development.
    </n-alert>
    <n-button @click="$router.push('/list')">List</n-button>
    <n-button @click="$router.push('/grouping/list')">Groups</n-button>
    <n-button @click="$router.push('/regener')">Regener</n-button>
    <n-button @click="$router.push('/batching/syncbatch')">Sync batch</n-button>
    <n-button @click="$router.push('/zujuanink')">刷组卷网</n-button>

    <statistic-block/>
     <div v-html="chunk1">
      </div>
      
      
      </template>

<script setup>
import{NAlert,NButton} from "naive-ui"
import {marked} from "../../shared/lib/marked.esm"
import { ref } from "vue"

import statisticBlock from "./statisticBlock.vue"
const chunk1=marked(`
你正在使用 thost v2 .
`)

</script>

<style>

</style>


<style scoped src="../../shared/lib/sakura.css"></style>