<template>
<div>
    <n-p>{{ $attrs.qcontent.note }}</n-p>
    <div v-if="LoadingTFinished"><t-core :qcontent="TContent"/></div>
    <div v-else><t-null :qid="$attrs.qcontent.qid"/></div>
    <n-p>Insights: {{ $attrs.qcontent.insights }}</n-p>
</div>
</template>
<script setup>
import { ref, shallowRef, useAttrs } from "vue";
import TCore from "../../questionBlock/ild.vue"
import TNull from "../../questionBlock/null.vue"
import { NSpin,NP } from "naive-ui";
import { API } from "../../../../shared/APIHelper";


const attrs=useAttrs()
console.log(attrs);
// const STrigger=shallowRef(h(TNull))
const LoadingTFinished=ref(false),
TContent=ref({})



API.get("/zujuan-ink-be-core/data/getq/"+attrs.qcontent.quid).then(o=>{
    TContent.value=o
    LoadingTFinished.value=true
})
</script>