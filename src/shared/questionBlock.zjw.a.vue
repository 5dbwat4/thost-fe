<template>
  <div>
<n-space>
      <p class="header-info">
        {{ $attrs.qcontent.diff.name }}({{ $attrs.qcontent.diff.value }})
      </p>
      <n-divider vertical />
      <p class="header-info">{{ $attrs.qcontent.type.name }}</p>
      <n-divider vertical />
      <p class="header-info">ID:{{ $attrs.qcontent.id }}</p>
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
    <div>
      <p class="paperSource">Included by:</p>
      <p
        v-for="oo in $attrs.qcontent.paperSources"
        class="paperSource"
        :style="{
          fontWeight: oo.name.includes('江苏') ? 600 : 400,
        }"
      >
        {{ oo.name }}<span class="paperSourceId"> ID:{{ oo.id }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
    import{NSpace,NDivider,NEllipsis,NText}from "naive-ui"
    import {normalizeq} from "./normalize_q/toScreenDSingle"
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