<template>
    <n-input-group>
<n-input placeholder="Search" v-model:value="search" /><n-button @click="handleSearch">SEARCH</n-button></n-input-group>
<n-data-table remote :loading="loadingData"
:data="data" :columns="columns"
    @update:checked-row-keys="handleCheck" :row-key="(row)=>row.id" visual-scroll/>
</template>

<script setup>
import { NButton, NDataTable,NInputGroup,NInput } from "naive-ui";
import { h, ref } from "vue";
import { API } from "../../shared/APIHelper"
import {useRoute,useRouter} from "vue-router"
const route=useRoute(),router=useRouter()


const loadingData=ref(true)
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
    title:"submit time",
    render(row){
        return h("p",{},(new Date(row.timestamp)).toISOString())
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



API.get("/api/group/list").then(v=>{
    data.value=v
    loadingData.value=false
})

</script>

<style>

</style>
