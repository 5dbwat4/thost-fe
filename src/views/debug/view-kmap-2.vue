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
import {resolveKData} from "../../shared/base-zj-data/resolve_k_data"

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

    code.value=JSON.stringify(await resolveKData(v),null,4)
}

</script>