<template>
<n-button @click="initWS">开始监听</n-button>
<n-statistic label="已进行的Request">
        {{ States.count }}
      </n-statistic>
      <n-statistic label="最新Req时间(ms)">
        {{ States.aliveTime }}
      </n-statistic>
      <n-log :log="States.recentReqList.toReversed().join('\n')" :rows="50"></n-log>
</template>
<script setup>
import { NButton,NStatistic,NLog } from 'naive-ui';
import { API } from '../../shared/APIHelper';
import { ref } from 'vue';


const States=ref({
    count:0,
    serverHealthy:false,
    recentReqList:[],
    aliveTime:0
})
const initWS=()=>{
    var ws = new WebSocket('ws://'+(new URL(API.host)).host);
ws.onmessage = function(event) { 
    States.value.count=JSON.parse(event.data).count
    States.value.aliveTime=JSON.parse(event.data).aliveTime
    States.value.recentReqList.push(JSON.parse(event.data).msg)
 };
}
</script>