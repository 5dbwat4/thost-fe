<template>
    <n-input-group>
<n-input placeholder="Search" v-model:value="searchParams" :loading="LoadingSearch" :on-input="SearchUpdate"/>
<n-button @click="handleSearch">     <template #icon><n-icon :component="SearchOutline"/></template></n-button>
<n-button @click="Refresh">     <template #icon><n-icon :component="RefreshOutline"/></template></n-button>
</n-input-group>
<n-data-table remote :loading="loadingData" :pagination="paginationReactive"
:data="data" :columns="columns"
    @update:checked-row-keys="handleCheck" :row-key="(row)=>row.id" visual-scroll/>
</template>

<script setup>
import { NButton, NDataTable,NInputGroup,NInput,NIcon,NTime } from "naive-ui";
import { h, ref } from "vue";
import { API } from "../../shared/APIHelper"
import {useRoute,useRouter} from "vue-router"
import { SearchOutline,RefreshOutline } from "@vicons/ionicons5";
import subjectsmapFlattened from "../../shared/base-zj-data/subjects-flattened-reversed.json"
const route=useRoute(),router=useRouter()

const loadingData=ref(true),LoadingSearch=ref(false),searchParams=ref("")
const data=ref([])

const columns=[{
    type:"selection"
},{
    title:"uuid",
    key:"id"
},{
    title:"title",
    key:"title"
},{
    title:"Subjects",
    render(row){
        return h("span",{},subjectsmapFlattened[""+row.bankid])
    }
},{
    title:"submit time",
    render(row){
        return h(NTime,{
            time:row.timestamp,
            to:(new Date()).getTime(),
            type:"relative"
        })
    }
},{
    title:"view",
    render(row){
        return h(NButton,{
            text:true,
            onClick:()=>{
                router.push("/group/"+row.id)
            }
        },{default:()=>"View"})
    }
}]

const checkedRowKeysRef=ref([])
const handleCheck=(rowKeys) =>{
        checkedRowKeysRef.value = rowKeys;
        console.log(rowKeys);
      }

      ,gotobatch=()=>{
        router.push("/batch/"+checkedRowKeysRef.value.join(","))
      }


      const  paginationReactive = ref({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      itemCount:0,
      pageSizes: [5,10,20,50],
      onChange: (page) => {
        paginationReactive.value.page = page
        loadingData.value=true
        Refresh()
      },
      onUpdatePageSize: (pageSize) => {
        paginationReactive.value.pageSize = pageSize
        paginationReactive.value.page = 1
        loadingData.value=true
        Refresh()
      }
    })

const Refresh=()=>{
    if(searchParams.value==""){
        API.get(`/api/v2/group/list?offset=${(paginationReactive.value.page-1)*paginationReactive.value.pageSize}&pagesize=${paginationReactive.value.pageSize}`).then(v=>{
    data.value=v.data
    paginationReactive.value.itemCount=v.count
    loadingData.value=false
    LoadingSearch.value=false
})
    }else{
        API.get(`/api/v2/group/list/search/uuid?q=${encodeURIComponent(searchParams.value)}&offset=${(paginationReactive.value.page-1)*paginationReactive.value.pageSize}&pagesize=${paginationReactive.value.pageSize}`).then(v=>{
    data.value=v.data
    loadingData.value=false
    LoadingSearch.value=false
    })
}
}

,SearchUpdate=(v)=>{
    searchParams.value=v
    LoadingSearch.value=true
    Refresh()
}

// API.get("/api/v2/group/list").then(v=>{
//     data.value=v
//     loadingData.value=false
// })

Refresh()

</script>

<style>

</style>
