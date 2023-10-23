<template>
<n-button @click="$router.push('/list/uuids_all')">ALL UUIDS</n-button>
<n-data-table remote
:data="data" :columns="columns"   :loading="loading"
    @update:checked-row-keys="handleCheck" :row-key="(row)=>row.id" visual-scroll />

     <n-input-group>
      <n-input-group-label>偏移(offset)</n-input-group-label>
     <n-input-number :min="0" v-model:value="offset"/>
     <n-input-group-label>总数(limit)</n-input-group-label>
     <n-input-number  :min="0" v-model:value="limit"/>
      <n-button @click="relist">前往</n-button>
      <n-button @click="relist_nextos">下一组</n-button>
    </n-input-group>
        <n-button @click="gotobatch">BATCH</n-button>
<p>{{data.map(v=>v.id).join(",")}}</p>
</template>

<script setup>
import { NButton, NDataTable,NInputNumber,NInputGroup,NInputGroupLabel } from "naive-ui";
import { h, ref } from "vue";

import {useRoute,useRouter} from "vue-router"
import ExtrntionPreview from "./extention-preview.vue"
import {API} from "../../shared/APIHelper"
const route=useRoute(),router=useRouter()



const data=ref([])

const columns=[{
    type:"selection"
},{
    type:"expand",
    renderExpand(row){
        return h(ExtrntionPreview,{
            id:row.id
        })
    }
},{
    title:"uuid",
    key:"id"
},{
    title:"submit time",
    render(row){
        return h("p",{},(new Date(row.timestamp)).toISOString())
    }
},{
    title:"extra",
    key:"extra"
},{
    title:"view",
    render(row){
        return h(NButton,{
            text:true,
            onClick:()=>{
                router.push("/view/"+row.id)
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


const loading=ref(true),offset=ref(parseInt(route.query.offset||"0")),limit=ref(parseInt(route.query.limit||"50"))
// if(route.query.subject){

// }
// fetch("/api/list/v2",{method:"POST","headers":{"Content-Type":"application/json"},body:
// JSON.stringify(route.query||{})}).then(v=>v.json()).then(v=>{data.value=v})

// switch(route.props.type){
//     case "pure":{
//         fetch("/api/list/v2",{method:"POST"}).then(v=>v.json()).then(v=>{data.value=v})
//     }
// }
// fetch("/api/list/v1",{method:"POST"}).then(v=>v.json()).then(v=>{data.value=v})
console.log(route.query);
if(!route.query.filter){
    API.get("/api/list/v2/directget/"+offset.value+"/"+limit.value).then(v=>{data.value=v;loading.value=false})
}
if(route.query.filter=="subject"){
    // console.log("djtfuf");
    
    API.get("/api/list/v2/filter/subject/"+route.query.subject+"/"+offset.value+"/"+limit.value).then(v=>{data.value=v;loading.value=false})
}

// const relist=()=>{
//     let rpa=route.query
//     rpa.offset=offset.value
//     rpa.limit=limit.value

//     console.log(rpa);
//     router.push({
//         "path":"/list",
//         "query":
//         "query":rpa
//     })
//     // route.query.offset=5
// }

</script>

<style>

</style>
