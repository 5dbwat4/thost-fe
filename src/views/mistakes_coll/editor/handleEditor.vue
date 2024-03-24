<template>
 <n-radio-group v-model:value="type" name="radiobuttongroup1" @update:value="logit">
      <n-radio-button
        v-for="_type in types"
        :key="_type.value"
        :value="_type.value"
        :label="_type.label"
      />
    </n-radio-group>
<div v-if="type=='HTML'">
<wangeditor v-model:content="content"/>
</div>
<div v-if="type=='MD'">
<milkdown v-model:content="content"/>
</div>
<div v-if="type=='Text'">
<n-input v-model:value="content"   
      type="textarea"/>
</div>
</template>
<script setup>
import wangeditor from "./wangeditor.vue"
import milkdown from "./MilkdownEditorWrapper.vue"
import { NRadio,NRadioButton,NRadioGroup,NInput } from "naive-ui";
import {defineModel}from "vue"


const type = defineModel('type')
const content = defineModel('content')
const types=[
  {label:"HTML",value:"HTML"},
  {label:"Markdown",value:"MD"},
  {label:"Text",value:"Text"},
  {label:"As-is",value:"AS-IS"}
]

const logit=(f)=>{console.log(f,type);}
</script>