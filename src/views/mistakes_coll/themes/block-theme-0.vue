<template>
<p
style="font-size: 6.5pt; margin: 0px; font-family: Cambria, 仿宋"
>
ID:<span style="font-family: 'courier new'">{{ $attrs.data.id }}</span>~QUID:<span style="font-family: 'courier new'">{{ $attrs.data.relatedQID }}</span>
</p>
<p
style="font-size: 6.5pt; margin: 0px; font-family: Cambria, 仿宋"
>
Rate {{ $attrs.data.rate }} of 10 | Tag <span v-for="tag in $attrs.data.tags">[{{tag.label}}]</span>
</p>
<!-- <div v-if="infoformat % infoformatCount == 0"> -->
<div
  v-html="
    $attrs.data.bankid==0?$attrs.data.q:$attrs.normalizeFun($attrs.data.q, {
      q0b: $attrs.data,
                tindex: $attrs.index + 1
    })
  "
  :style="{ fontSize: '9.5pt', fontFamily: 'Times New Romans,宋体' }"
></div>
<!-- </div> -->
</template>
<script setup>
import { normalizeq } from "../../../shared/normalize_q/toPrint";
import subjectsmapFlattened from "../../../shared/base-zj-data/subjects-flattened-reversed.json"
import quesTypeList from "../../../shared/base-zj-data/questypeList.flattened.json"
import diffMap from "../../../shared/base-zj-data/diff.map.json"
</script>