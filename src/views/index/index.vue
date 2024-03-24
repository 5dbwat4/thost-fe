<template>
  <n-card>
     <n-alert title="Note" type="info">
      This project is still in development.
    </n-alert>
    <n-button @click="$router.push('/list')">List</n-button>
    <n-button @click="$router.push('/grouping/list')">Groups</n-button>
    <n-button @click="$router.push('/regener')">Regener</n-button>
    <n-button @click="$router.push('/batching/syncbatch')">Sync batch</n-button>
    <n-button @click="$router.push('/zujuanink')">刷组卷网</n-button>
    <n-button @click="$router.push('/server-status')">服务器状态</n-button>
    <n-button @click="$router.push('/func.danas/entry')">大数据选题（？）</n-button>
    <statistic-block/>
    <loginstate-block/>
     <div v-html="chunk1">
      </div>
      
      </n-card>
      </template>

<script setup>
import{NAlert,NButton,NCard} from "naive-ui"
import {marked} from "../../shared/lib/marked.esm"
import { ref } from "vue"

import statisticBlock from "./statisticBlock.vue"
import loginstateBlock from "./loginstatusCheck.vue"
const chunk1=marked(`
你正在使用 thost v3 .

`)

</script>

<style>

</style>


<style scoped src="../../shared/lib/sakura.css"></style>