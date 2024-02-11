<template>
    <n-cascader
      v-model:value="bankid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
      :on-update:value="UpdateV"
    />
    <n-config-provider :hljs="hljs">
    <n-code :code="code" language="json" show-line-numbers /></n-config-provider>
</template>
<script setup>
import { NAlert,NCard,NInputNumber,NButton,NCascader,NCode,NConfigProvider } from 'naive-ui';
import {ref} from "vue"
import subjectsmap from "../../shared/base-zj-data/subjects.json"
import hljs from 'highlight.js/lib/core'
  import json from 'highlight.js/lib/languages/json'
  hljs.registerLanguage('json', json)
import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()
const bankid=ref(15)


const code=ref("")

const UpdateV=async(v)=>{
    bankid.value=v
    console.log(v);

    switch (bankid.value) {
        case 1: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_1.json"),null,4); break;
        case 2: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_2.json"),null,4); break;
        case 3: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_3.json"),null,4); break;
        case 4: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_4.json"),null,4); break;
        case 5: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_5.json"),null,4); break;
        case 6: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_6.json"),null,4); break;
        case 7: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_7.json"),null,4); break;
        case 8: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_8.json"),null,4); break;
        case 9: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_9.json"),null,4); break;
        case 10: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_10.json"),null,4); break;
        case 11: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_11.json"),null,4); break;
        case 12: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_12.json"),null,4); break;
        case 13: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_13.json"),null,4); break;
        case 14: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_14.json"),null,4); break;
        case 15: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_15.json"),null,4); break;
        case 16: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_16.json"),null,4); break;
        case 17: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_17.json"),null,4); break;
        case 18: code.value=JSON.stringify(await import("../../shared/base-zj-data/k_18.json"),null,4); break;
    
        default:
            break;
    }
}

</script>