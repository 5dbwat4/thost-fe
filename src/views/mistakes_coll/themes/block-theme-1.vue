<template>
          <div
            v-html="
              $attrs.data.bankid==0?$attrs.data.q:$attrs.normalizeFun($attrs.data.q, {
                q0b: $attrs.data,
                tindex: $attrs.index + 1,
                nqtype: 3,
              })
            "
            :style="{ fontSize: '9.5pt', fontFamily: 'Times New Romans,宋体' }"
          ></div>
</template>
<script setup>
import { normalizeq } from "../../../shared/normalize_q/toPrint";
import subjectsmapFlattened from "../../../shared/base-zj-data/subjects-flattened-reversed.json"
import quesTypeList from "../../../shared/base-zj-data/questypeList.flattened.json"
import diffMap from "../../../shared/base-zj-data/diff.map.json"
</script>