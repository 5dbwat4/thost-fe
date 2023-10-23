<template>
    <n-notification-provider>

<div v-if="AllowedEntry">
<router-view/>

</div>
<div v-else>
    <api-reminder/>
</div>
</n-notification-provider>
</template>

<script setup>

import { defineAsyncComponent, onMounted, ref } from "@vue/runtime-core";
import ApiReminder from "./views/index/APIReminder.vue"
import {emitEvent,createEvent} from "./shared/globalEventMessageHelper"
import {NNotificationProvider}from "naive-ui"


const AllowedEntry=ref(false)

createEvent("entryAllowStateUpdate",(value,message)=>{
    console.log(value,message);
    AllowedEntry.value=value
    // emitEvent("apiStatusUpdateNote",params.message)
})


// 
</script>

