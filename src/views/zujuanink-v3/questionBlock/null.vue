<template>
    <n-space>
          <p class="header-info">
            <n-skeleton text  style="width: 60%" />
          </p>
          <n-divider vertical />
          <n-skeleton text  style="width: 60%"/>
          <n-divider vertical />
          <n-skeleton text  style="width: 60%" />
          <n-divider vertical />
          <n-skeleton text  style="width: 60%" />
        </n-space>
        <div
        > <n-skeleton text  style="width: 60%"  /><n-skeleton text :repeat="6" /></div>
    </template>
    
    
    <script setup>
    import{NSpace,NDivider,NEllipsis,NText,NSkeleton}from "naive-ui"
    
    </script>


<style scoped>

.paperSource {
  font-size: 0.75rem;
  margin: 0 0;
}
.paperSourceId {
  background-color: aliceblue;
  font-size: 0.65rem;
}
</style>