<template>
  <n-config-provider :hljs="hljs">
<div v-if="syncbatchstartedStatusOnNetworking==0"><span>正在查询Syncbatch状态</span></div>

<div v-if="syncbatchstartedStatusOnNetworking==1&&!syncbatchInfo.started"><span>尚未开始Syncbatch</span>
<n-input v-model:value="SessionTitle"/>
<n-button @click="StartSyncbatch">现在开始</n-button></div>
<div v-if="syncbatchInfo.started">
    <span>已经开始Syncbatch</span><span v-if="syncbatchstartedStatusOnNetworking==2">正在发送API请求</span>
    <n-spin :show="syncbatchstartedStatusOnNetworking==2">
<n-code :code="_JSONStringify(syncbatchInfo)"></n-code>
    </n-spin>
<n-input v-model:value="SessionTitle"/>
<n-button @click="editTitle">修改Title</n-button>
    <n-button @click="saveGroup">保存为Group</n-button>
    <n-button @click="killSession">终止</n-button>
    <n-button v-if="groupsaved" @click="$router.push('/group/'+groupid)">View</n-button>
</div>

      </n-config-provider>
<div>

</div>
</template>

<script setup>
import { NInput ,NButton,NProgress,NCode,NConfigProvider,NSpin} from "naive-ui";
import { onUnmounted, ref } from "vue";
 import hljs from 'highlight.js/lib/core'
  import json from 'highlight.js/lib/languages/json'
import { keep } from "naive-ui/lib/_utils";
import { onBeforeRouteLeave } from "vue-router";
import { API } from "../../shared/APIHelper";

  hljs.registerLanguage('json', json)



const syncbatchstartedStatusOnNetworking=ref(0),syncbatchInfo=ref({
  started:false,
  currentids:[],
  title:""
}),SessionTitle=ref("")

API.get("/api/syncbatch/sync-session").then(v=>{
    syncbatchInfo.value=v.data
    syncbatchstartedStatusOnNetworking.value=1

    if(syncbatchInfo.value.started){
        SessionTitle.value=syncbatchInfo.value.title
        sync()
    }
})
const StartSyncbatch=()=>{
    syncbatchstartedStatusOnNetworking.value=2
    API.post("/api/syncbatch/start-session",{title:SessionTitle.value,time:(new Date()).getTime()}).then(v=>{
        syncbatchInfo.value=v.data
        syncbatchstartedStatusOnNetworking.value=1
        sync()
    })
}

let keepSyncing=true

onBeforeRouteLeave(()=>{
    keepSyncing=false
})

const sync=()=>{
    syncbatchstartedStatusOnNetworking.value=2
    API.get("/api/syncbatch/sync-session").then(v=>{
        syncbatchInfo.value=v.data
        syncbatchstartedStatusOnNetworking.value=1
        if(keepSyncing){
            setTimeout(sync,1500)
        }
    })
}

const editTitle=()=>{
    syncbatchstartedStatusOnNetworking.value=2
    API.post("/api/syncbatch/edit-title",{title:SessionTitle.value}).then(v=>{
        syncbatchInfo.value=v.data
        syncbatchstartedStatusOnNetworking.value=1
    })
}


const killSession=()=>{
    syncbatchstartedStatusOnNetworking.value=2
        API.get("/api/syncbatch/kill-session").then(v=>{
        syncbatchstartedStatusOnNetworking.value=1
    })
}

const saveGroupLoading=ref(false),groupsaved=ref(false),groupid=ref("")
const saveGroup=()=>{
    saveGroupLoading.value=true
API.post("/api/group/new", {
                entry: syncbatchInfo.value.currentids.join(","),
                timestamp: (new Date()).getTime(),
                title:syncbatchInfo.value.title,
                desc:""
            }).then(i => {
            saveGroupLoading.value = false
            groupsaved.value = true
            groupid.value = i.id
        })
}


const _JSONStringify=(o)=>JSON.stringify(o,undefined,4)


</script>

<style>

</style>