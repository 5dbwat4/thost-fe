<template>
  <n-progress
    type="line"
    :percentage="Percentage"
    processing
  >{{ DoneCnt }} / {{ attrs.ACC }} </n-progress>

</template>
<script setup>
import { NProgress } from "naive-ui";
import { ref, useAttrs, watch } from "vue";



const attrs=useAttrs()
console.log(attrs);
const Percentage=ref(100)
const DoneCnt=ref(0)
watch([attrs.ACC,attrs.ACR],()=>{
    Percentage.value=(1/(attrs.ACR.value+1)*(attrs.ACC.value-attrs.ACR.value)/attrs.ACC.value)*100
    DoneCnt.value=attrs.ACC.value-attrs.ACR.value
})
</script>