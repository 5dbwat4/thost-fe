<template>
 <n-input-group>
<n-input placeholder="Search" v-model:value="searchParams" :loading="LoadingSearch" :on-input="SearchUpdate"/>
<n-button @click="handleSearch">     <template #icon><n-icon :component="SearchOutline"/></template></n-button>
<n-cascader
      v-model:value="bankid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
      @update:value="Refresh"
    />
<n-button @click="Refresh">     <template #icon><n-icon :component="RefreshOutline"/></template></n-button>

<n-tooltip trigger="hover">
    <template #trigger>
        <n-button  strong @click="exportHandle">
    <template #icon>
        <n-icon :component="ExitOutline"></n-icon>
      </template>
    </n-button>
    </template>
    导出<br/>
    Export
    </n-tooltip>

<n-dropdown :options="MoreOptions">
      <n-button>
      <template #icon>
        <n-icon :component="EllipsisVerticalOutline"></n-icon>
      </template>
    </n-button>
  </n-dropdown>
</n-input-group>
<n-checkbox-group v-model:value="checkedMCI"  @update:checked="handleUpdateChecked">
   


<div>
    
    <mcitem v-for="item in data" :ItemId="item.id"></mcitem>
    <!-- <n-checkbox :value="Beijing" label="Beijing" /> -->
</div>
</n-checkbox-group>
<n-pagination v-model:page="paginationReactive.page"     :item-count="paginationReactive.itemCount"     show-size-picker
    :page-sizes="paginationReactive.pageSizes"
    :on-update:page-size="Refresh" :on-update:page="Refresh"/>


    <n-modal
    v-model:show="showExportModal"
    class="custom-card"
    preset="card"
    title="Naming"
    :bordered="false"
    size="huge"
  >
    <p>为导出的错题集Session命名</p>
<n-input v-model:value="exportTitle"></n-input>
<n-button @click="submitSession">好的</n-button>
  </n-modal>
</template>
<script setup>
import { NButton, NPagination,NInputGroup,NInput,NIcon,NTime,NCascader,
NTooltip,NDropdown,NCheckboxGroup,NP,NModal } from "naive-ui";
import { h, ref,useAttrs } from "vue";
import { API } from "@/shared/APIHelper"
import {useRoute,useRouter} from "vue-router"
import { SearchOutline,RefreshOutline,ExitOutline,EllipsisVerticalOutline,
CreateOutline } from "@vicons/ionicons5";
import mcitem from "./comp.viewMCItemSing.vue"
import subjectsmap from "@/shared/base-zj-data/subjects.json"
const route=useRoute(),router=useRouter()
const attrs=useAttrs()
const loadingData=ref(true),LoadingSearch=ref(false),searchParams=ref("")
const data=ref([])
const checkedMCI=ref([])
const bankid=ref(0)

      const  paginationReactive = ref({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      itemCount:0,
      pageSizes: [5,10,20,50,100,200],
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
        let urlgen=""
        if(attrs.page=="basic"){
            urlgen=`/api/data/mistakes_coll/list.id?offset=${(paginationReactive.value.page-1)*paginationReactive.value.pageSize}&pagesize=${paginationReactive.value.pageSize}${bankid.value!=0?"&bankid="+bankid.value:""}`
        }else if(attrs.page=="tag"){
            urlgen=`/api/data/mistakes_coll/list.id/filter/tag/${route.params.id}?offset=${(paginationReactive.value.page-1)*paginationReactive.value.pageSize}&pagesize=${paginationReactive.value.pageSize}${bankid.value!=0?"&bankid="+bankid.value:""}`
        }
        API.get(urlgen).then(v=>{
    data.value=v.data
    paginationReactive.value.itemCount=v.count
    loadingData.value=false
    LoadingSearch.value=false
})
    }

    Refresh()


    const exportTitle=ref(""),showExportModal=ref(false)
    const  exportHandle=()=>{
        console.log(checkedMCI.value);
        showExportModal.value=true
    }
    const handleUpdateChecked=()=>{console.log(checkedMCI.value);}

    const submitSession=()=>{
        API.post("/api/data/mistakes_coll/session/create",{
list      :checkedMCI.value.join(",")   ,
timestamp :(new Date()).getTime()       ,
bankid    :bankid.value                 ,
title     :exportTitle.value            ,
generator :`${attrs.page}${attrs.page=="tag"?"@"+route.params.id:""}${bankid.value!=0?"+bankid@"+bankid.value:""}`                          
        }).then(vs=>{
            router.push("/mistakes_coll/preexport-1/"+vs.id)
        })
    }



    const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};
    const MoreOptions=[
        {
          label: "编辑Tags",
          key: "edit-tags",
          icon: renderIcon(CreateOutline),
          props: {
            onClick: () => {
              router.push("/mistakes_coll/edit-tags")
              
            }
          }
        }
      ]
</script>