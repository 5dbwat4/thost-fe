<!--
<submit-form
:fileConfig="fileConfig"
:filename="String"//任选其一
:disabled="Boolean"
:createCallback="Function(filename,fileConfig)"
/>
-->


<template>
    <n-form :disabled="$attrs.disabled"
    ref="formRef"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
  <n-form-item label="文件名">
    <n-input :value="generateFilename(FileConfig)" placeholder="文件名" disabled></n-input>
    </n-form-item>
  <n-form-item label="显示日期">
    <n-switch v-model:value="FileConfig.dateIncluded" />
    </n-form-item>

 
    <n-form-item label="学科">
    <n-radio-group v-model:value="FileConfig.subject" name="subject">
    <n-space>
      <n-radio v-for="subject in subjects" :key="subject" :value="subject">
        {{ subject }}
      </n-radio>
    </n-space>
  </n-radio-group>
  </n-form-item>
  <n-form-item label="嵌入随机字段">
    <n-switch v-model:value="FileConfig.InsertUUID" />
    </n-form-item>
  <n-form-item label="标题">
    <n-input v-model:value="FileConfig.title" placeholder="标题"/>
    </n-form-item>
  <n-form-item label="拓展名">
    <n-input v-model:value="FileConfig.extension" placeholder="标题"/>
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="submitCreate"
          >
            创建
          </n-button>
        </div>
  </n-form>
</template>
<script setup>
import { ref, useAttrs } from 'vue';
import { NSpace,NButton,NInput,
NRadio,NRadioGroup,NForm,NFormItem,NSwitch } from "naive-ui";
import {v4 as uuid_v4} from "uuid"

const attrs=useAttrs()
const subjects=[
    "语文","数学","英语","物理","化学","生物","其它"
]

const FileConfig=ref({
    subject:"",
    dateIncluded:true,
    title:"",
    InsertUUID:false,
    extension:"docx"
})

if(attrs.fileConfig){
    FileConfig.value=attrs.fileConfig
}
if(attrs.filename){
    ({basename:FileConfig.value.title,extension:FileConfig.value.extension}=getFilenameAndExtension(attrs.filename))
}

const submitCreate=()=>{
 attrs.createCallback(generateFilename(FileConfig.value),FileConfig.value)
}


const generateFilename=(fc)=>{
    // console.log(fc);
    return `${((new Date()).getMonth())+1}-${(new Date()).getDate()} ${fc.subject} ${fc.title}${fc.InsertUUID?' '+uuid_v4():""}.${fc.extension}`
}


function getFilenameAndExtension(filePath) {
    const lastSlashIndex = filePath.lastIndexOf('/');
    const fileNameWithExtension = filePath.substring(lastSlashIndex + 1);
    
    const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return { basename: fileNameWithExtension, extension: '' };
    }
    
    const basename = fileNameWithExtension.substring(0, lastDotIndex);
    const extension = fileNameWithExtension.substring(lastDotIndex + 1);
    
    return { basename, extension };
}
</script>