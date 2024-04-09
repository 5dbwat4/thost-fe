<template>
    <n-loading-bar-provider>
    <n-notification-provider>

<div v-if="AllowedEntry">
        <router-view/>

</div>
<div v-else>
    <api-reminder/>
</div>
</n-notification-provider></n-loading-bar-provider>
</template>

<script setup>

import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";
import ApiReminder from "./views/index/APIReminder.vue"
import {emitEvent,createEvent} from "./shared/globalEventMessageHelper"
import {NNotificationProvider,NLoadingBarProvider}from "naive-ui"


const AllowedEntry=ref(false)

createEvent("entryAllowStateUpdate",(value,message)=>{
    console.log(value,message);
    AllowedEntry.value=value
    // emitEvent("apiStatusUpdateNote",params.message)
})


// 
</script>

