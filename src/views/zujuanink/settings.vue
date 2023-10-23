
<template>
      <n-button @click="showSetting = true">设置</n-button>
<n-modal v-model:show="showSetting">
    <n-card
      style="width: 600px"
      title="设置"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      preset="card"
    >
    <n-tabs type="line" animated>
      <n-tab-pane name="Preference" tab="Preference">
        <n-form-item  label="显示作答框">  <n-switch v-model:value="Preference.showUBlock" />  </n-form-item>

      </n-tab-pane>
      <n-tab-pane name="API Settings" tab="API Settings">
        <n-form-item label="Subject"> 
        <!-- <n-input-number v-model:value="options.APIargments.bid" /> -->
        <n-cascader
      v-model:value="options.APIargments.bid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
    />
    </n-form-item>
        <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging">
    <n-form-item  label="难度(diffs)"> 
      <n-cascader v-model:value="options.APIargments.searchp.diffs"
      :options="diffsmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="areas"> 
      <n-cascader v-model:value="options.APIargments.searchp.areas"
      :options="areasmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="sources"> 
      <n-cascader v-model:value="options.APIargments.searchp.sources"
      :options="sourcesmap" check-strategy="child" :show-path="true"
    />  </n-form-item>


    <n-form-item  label="types"> 
      <n-cascader v-model:value="options.APIargments.searchp.types"
      :options="typesmap[''+options.APIargments.bid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="knowledgeInfo"> 
      <n-cascader v-model:value="options.APIargments.searchp.knowledges"
      :options="knowledgeInfomap[''+options.APIargments.bid]" check-strategy="all" :show-path="true"
    />  </n-form-item>

    <n-form-item  label="排序(orderBy)"> 
      <n-cascader v-model:value="options.APIargments.searchp.orderBy"
      :options="orderbymap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年份(years)"> 
      <n-cascader v-model:value="options.APIargments.searchp.years"
      :options="yearsmap" check-strategy="all" :show-path="true"
    />  </n-form-item>
    <n-form-item  label="年级(grades)"> 
      <n-cascader v-model:value="options.APIargments.searchp.grades"
      :options="gradesmap" check-strategy="all" :show-path="true"
    />  </n-form-item>


      <!-- <n-form-item v-for="oo in OBJECT_KEYS(options.APIargments.searchp)"  :label="oo"> 
        <n-input-number v-model:value="options.APIargments.searchp[oo]" />
    </n-form-item> -->
    </n-form>

      </n-tab-pane>
    </n-tabs>
   
      <template #footer>
        <n-button @click="UpdateOptions(options)">确定（将重新加载数据）</n-button>
      </template>
    </n-card>
  </n-modal></template>

  <script setup>
import { ref,useAttrs } from "vue";
import { NForm,NFormItem,NCard,NModal,NButton,NInputNumber,NTabs,NTab,NTabPane,NCascader,NSwitch } from "naive-ui";
import subjectsmap from "./basicinfo/subjects.json"
import areasmap from "./basicinfo/areas.json"
import diffsmap from "./basicinfo/diffs.json"
import sourcesmap from "./basicinfo/sources.json"
import typesmap from "./basicinfo/types.json"
import orderbymap from "./basicinfo/orderby.json"
import yearsmap from "./basicinfo/years.json"
import gradesmap from "./basicinfo/grades.json"
import knowledgeInfomap from "./basicinfo/knowl.json"

// const subjectsmap=import("./basicinfo/subjects.json",import.meta.url)
const attrs=useAttrs()
const OBJECT_KEYS = (o) => Object.keys(o);
const options=ref(attrs.getCurrentOptions())


const Preference=ref({
  showUBlock:false
})

const tmp=ref(12)
//settings logic

const showSetting = ref(false);

const UpdateOptions= ()=>{
  showSetting.value=false
  attrs.updateOptions(options.value)
}
</script>