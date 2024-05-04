<template>
    <div>
    <router-view></router-view>
    <n-tooltip trigger="hover">
    <template #trigger>
        <n-float-button :right="10" :bottom="10" type="primary" @click="router.push('/home')">
      <n-icon>
        <back-icon />
      </n-icon>
    </n-float-button>
    </template>
    返回主页
  </n-tooltip>
</div>
</template>
<script setup>
import { RouterView } from "vue-router";
import {NFloatButton,NIcon,NTooltip} from "naive-ui"
import {ReturnUpBackOutline as BackIcon} from "@vicons/ionicons5";
import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()
</script>