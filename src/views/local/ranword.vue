<template>
<n-input-group>
<n-input-group-label>local/ranword</n-input-group-label>
<n-input v-model="SearchParams" placeholder="搜索"/>
<n-button @click="handleSearch">     <template #icon><n-icon :component="SearchOutline"/></template></n-button>
<n-button @click="Refresh">     <template #icon><n-icon :component="RefreshOutline"/></template></n-button>

<n-button  strong @click="$router.push('./ranword/new?template=a4-basic')">
    <template #icon>
        <n-icon :component="AddCircleOutline"></n-icon>
      </template>
      新建标准A4
    </n-button>
    <n-button  strong @click="$router.push('./ranword/new?template=b5-basic')">

      新建标准B5
    </n-button>
<n-button  strong @click="$router.push('./ranword/new')">
      新建...
    </n-button>

    <n-tooltip trigger="hover">
    <template #trigger>
        <n-button  strong @click="$router.push('./ranword/upload')">
    <template #icon>
        <n-icon :component="CloudUploadOutline"></n-icon>
      </template>
    </n-button>
    </template>
    上传文件<br/>
    Upload File
    </n-tooltip>
    <n-tooltip trigger="hover">
    <template #trigger>
        <n-button  strong @click="revealInFileExplorer">
    <template #icon>
        <n-icon :component="FolderOpenOutline"></n-icon>
      </template>
    </n-button>
    </template>
    在文件资源管理器中打开<br/>
    Reveal in file explorer
    </n-tooltip>
    
    <n-button>
      <template #icon>
        <n-icon :component="SettingsOutline"></n-icon>
      </template>
      设置
    </n-button>
</n-input-group>
<n-data-table  :loading="loadingData" :pagination="paginationReactive"
:data="items" :columns="columns"
    @update:checked-row-keys="handleCheck" :row-key="(row)=>row.id" visual-scroll/>
</template>
<script setup>
import { ref,h } from "vue";
// import pageHeader from "./ranword.header.vue"

import {NVirtualList,NDataTable,NTime,NButton,NInputGroup,NInputGroupLabel,NIcon
,NInput ,NTooltip}from "naive-ui"
import { API } from "../../shared/APIHelper";
import RanwordActions from "./ranword.list-actions.vue"
import {SettingsOutline,AddCircleOutline,SearchOutline,RefreshOutline,CloudUploadOutline,
FolderOpenOutline} from "@vicons/ionicons5"
import {filesize} from "filesize";

const items=ref([])
const columns=[
{
    title:"Name",
    key:"name"
},
{
    title:"Size",
    key:"size",
    render(row){
        return h("span",{},filesize(row.size, {standard: "jedec"}))
    },sorter: 'default'
}
,{
    title:"Create Time",
    key:"created",
    render(row){
        return h(NTime,{
            time:row.created,
            to:(new Date()).getTime(),
            type:"relative"
        })
    },
    // defaultSortOrder: 'ascend',
    sorter: 'default'
},{
    title:"Modified Time",
    key:"modified",
    render(row){
        return h(NTime,{
            time:row.modified,
            to:(new Date()).getTime(),
            type:"relative"
        })
    },
    // defaultSortOrder: 'ascend',
    sorter: 'default'
},{
    title:"Actions",
    render(row){
        return h(RanwordActions,{
            filename:row.name
        })
    }
}
]
API.get("/api/local/ranword/list").then(opo=>{
    items.value=opo
})


const revealInFileExplorer=()=>{
    API.get("/api/local/ranword/reveal-in-file-explorer")
}

</script>