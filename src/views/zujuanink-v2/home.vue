<template>

    <n-button @click="$router.push('./preparing-room')">开始刷组卷网</n-button>
    <n-button @click="$router.push('./preparing-room/paper')">开始刷套卷</n-button>
    <n-button @click="$router.push('./list/failedcoll')">错题本</n-button>
    <n-button @click="$router.push('./list/coll')">好题本</n-button>
    <n-button @click="$router.push('./records')">做题记录</n-button>
</template>

<script setup>
import { NButton } from "naive-ui";

</script>