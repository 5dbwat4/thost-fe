<template>
  <n-row>
    <n-col :span="12">
      <n-statistic label="已经做过">
        {{ statData.donecount }} 题
      </n-statistic>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-statistic label="错题集">
        {{ statData.incorrcollcount }} 题
      </n-statistic>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-statistic label="刷过">
        {{ statData.recordscount }} 次题
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="共计">
        {{ statData.donereccount }}
      </n-statistic>
    </n-col>
  </n-row>
  <div  id="svg-root"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { API } from '../../../shared/APIHelper';
import { NCol, NIcon, NRow, NStatistic } from 'naive-ui';

const statData=ref({
"donecount": -1,
  "incorrcollcount": -1,
  "collcount": -1,
  "donereccount": -1,
  "recordscount": -1
})


API.get("/zujuan-ink-be-core/stats/count/full").then(v=>{
statData.value=v
})

import { SVGGraph, CanvasGraph, StrGraph } from 'calendar-graph';
import {format,parse}from "date-fns"
onMounted(async()=>{

const data = (await API.get("/zujuan-ink-be-core/stats/group/donerec")).map(v=>{
  console.log(format(parse(v.date,"EEE MMM d y",new Date()),"Y-MM-d"),parse(v.date,"EEE MMM d y",new Date()),v);
  return {date:format(parse(v.date,"EEE MMM d y",new Date()),"Y-MM-d"),count:v.count}
});

// const data=[
//   {date:"2023-08-10",count:100},
//   {date:"2023-08-11",count:6}
// ]


new SVGGraph('#svg-root', data, {
  startDate: new Date('2023-08-01'),
  endDate: new Date('2024-07-01'),
  // colorFun: (v) => {
  //   return '#d6e685';
  // }
});
})
</script>