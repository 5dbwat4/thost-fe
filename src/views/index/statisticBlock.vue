<template>
   <n-row>
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=10')" label="Chinese" :value="statistic_qcount.cn"></n-statistic>         </n-col>
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=11')" label="Math" :value="statistic_qcount.ma"></n-statistic>            </n-col>
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=12')" label="English" :value="statistic_qcount.en"></n-statistic>         </n-col>
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=13')" label="Physics" :value="statistic_qcount.ph"></n-statistic>         </n-col>
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=14')" label="Chemistry" :value="statistic_qcount.ch"></n-statistic>       </n-col> 
    <n-col :span="2"><n-statistic @click="$router.push('/list?filter=subject&subject=15')" label="Biology" :value="statistic_qcount.bi"></n-statistic>         </n-col>
    <n-col :span="2"><n-statistic @click="$router.push('/list')" label="Total" :value="statistic_qcount.all"></n-statistic>          </n-col>
    </n-row>

    <div  id="Ts-svg-root"></div>
    <div  id="Groups-svg-root"></div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import {NStatistic,NButton,NRow,NCol} from "naive-ui"
import { API } from "../../shared/APIHelper"

const statistic_qcount=ref({
  ph:"Loading",
  en:"Loading",
  cn:"Loading",
  ch:"Loading",
  bi:"Loading",
  ma:"Loading",
  all:"Loading"
})

API.get("/api/statistics/qcount").then(v=>{statistic_qcount.value=v})


import { SVGGraph, CanvasGraph, StrGraph } from 'calendar-graph';
import {format,parse}from "date-fns"
onMounted(async()=>{

const data = (await API.get("/api/stat/count_by_date/ts"))
// .map(v=>{
//   console.log(format(parse(v.date,"EEE MMM d y",new Date()),"Y-MM-d"),parse(v.date,"EEE MMM d y",new Date()),v);
//   return {date:format(parse(v.date,"EEE MMM d y",new Date()),"Y-MM-d"),count:v.count}
// });

// const data=[
//   {date:"2023-08-10",count:100},
//   {date:"2023-08-11",count:6}
// ]


new SVGGraph('#Ts-svg-root', data, {
  startDate: new Date('2023-04-01'),
  endDate: new Date('2024-07-01'),
});
})
</script>

<style>

</style>