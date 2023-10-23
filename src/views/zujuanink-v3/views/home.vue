<template>
    <n-grid x-gap="12" :cols="2">
    <n-gi>
<n-card>
<n-p code>thost/zujuanink@1.3.0 </n-p>
  <img style="width:250px" src="./assets/main1.svg"/>
</n-card>
</n-gi>
<n-gi>
<n-card>
{{ statDataToday.donereccount==0?"你今天尚未做任何题":"" }}

<n-divider/>
<div v-if="failedTscount!=0">
<n-p>推荐先完成3日以前的错题，共{{ failedTscount }} 题</n-p>
<n-button @click="$router.push('./list/incorr-coll/daybefore')">前往错题集</n-button>
</div>

</n-card>
</n-gi>
</n-grid>
</template>
<script setup>
import { NCard,NP,NGi,NGrid,NDivider,NButton } from "naive-ui";
import { API } from '../../../shared/APIHelper';
import { ref,onMounted } from "vue";



  const statDataToday=ref({})
API.get("/zujuan-ink-be-core/stats/count/byday/"+(new Date()).toDateString()).then(v=>{
  statDataToday.value=v
})

const failedTscount=ref(0)

API.get(`/zujuan-ink-be-core/data/filter/FailedTsByDate/${(new Date()).getTime()-1000*60*60*24*3}/count`).then(v=>{
  failedTscount.value=v.count
})

</script>