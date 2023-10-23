<template>
    <n-button @click="$router.push('/')">回到主页</n-button>
    <n-button @click="$router.push('/regener')">继续</n-button>
    
</template>

<script setup>
    import {
        NButton,
    } from "naive-ui";
    import {
        ref,h
    } from "vue";
    import {
        useRoute,
        useRouter
    } from "vue-router"
    const route = useRoute(),
        router = useRouter()

</script>

<style>

</style>