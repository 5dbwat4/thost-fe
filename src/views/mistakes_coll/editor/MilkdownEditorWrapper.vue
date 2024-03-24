<script setup lang="ts">
import Milkdown from './MilkdownEditor.vue'
import { MilkdownProvider } from '@milkdown/vue';
import {defineModel}from "vue"

const content = defineModel('content')
</script>

<template>
  <MilkdownProvider>
    <Milkdown v-model:content="content"/>
  </MilkdownProvider>
</template>
