<template>
    <n-space>
          <p class="header-info">
            {{ Diffsmap_flattened [$attrs.qcontent.diffv] }}
          </p>
          <n-divider vertical />
          <p class="header-info">{{ Typesmap_flattened [$attrs.qcontent.typeid] }}</p>
          <n-divider vertical />
          <p class="header-info">ID:<n-text code>{{ $attrs.qcontent.id }}</n-text></p>
          <n-divider vertical />
          <p class="header-info">
            Knowledge:
            <n-ellipsis style="max-width: 240px">{{
              $attrs.qcontent.knowledgeInfo
            }}</n-ellipsis>
          </p>
        </n-space>
        <div
          v-html="normalizeq($attrs.qcontent.body, { source: $attrs.qcontent.title })"
        ></div>
    </template>
    
    
    <script setup>
    import{NSpace,NDivider,NEllipsis,NText}from "naive-ui"
    
    import {normalizeq} from "../utils/nomorlize_q-tailored"
    
    
    
import { Diffsmap_flattened } from "./Diffsmap_flattened"
import { Typesmap_flattened } from "./Typesmap_flattened";
    
  
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