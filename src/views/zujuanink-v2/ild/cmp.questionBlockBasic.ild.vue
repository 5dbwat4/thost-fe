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

import {normalizeq} from "../nomorlize_q-tailored"


import typesmap from "../basicinfo/ft-type.json"
import diffsmap from "../basicinfo/diffs.json"

import flatten from "../../../shared/lib/@mskashef/flatten-tree"


const Typesmap_flattened=((ro)=>{
  let re={}
  ro.forEach(v=>{if(v.value!=0)re[v.value]=v.label})
  return re
})(typesmap);

const Diffsmap_flattened=((ro)=>{
  let re={}
  ro.forEach(v=>{if(v.value!=0)re[v.value]=v.label})
  return re
})(flatten(diffsmap));



console.log(Typesmap_flattened);
</script>