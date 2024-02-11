<template>
    <div v-if="loadingList">
    <n-skeleton :repeat="10"></n-skeleton>
    </div>
    <div v-else>
  <n-list hoverable clickable>
    <n-list-item v-for="templateObj in templates">
      <n-thing :title="templateObj.name" content-style="margin-top: 10px;" @click="confirmAdd(templateObj)">
        {{ templateObj.desc }}
      </n-thing>
    </n-list-item>
</n-list>

<n-modal  :show="SubmittingFileState==0">
    <n-card :title="'创建一个 '+selectedFileObj.name" style="margin-bottom: 16px;width: 800px;margin: auto auto;">
    <n-p>你正在创建一个 {{ selectedFileObj.name }} ，请完善信息。</n-p>
    <!-- <n-form :disabled="SubmittingFileState==1"
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
    <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="submitCreate"
          >
            创建
          </n-button>
        </div>
  </n-form> -->
  <submit-form :disabled="SubmittingFileState==1" :createCallback="submitCreate"/>
    </n-card>
</n-modal>


<n-modal  :show="SubmittingFileState==2">
    <n-result status="success" title="已创建" :description="'文件'+SubmittedFilename+'已创建'">
    <template #footer>
      <n-button @click="openLocally(SubmittedFilename)">打开</n-button>
      <n-button @click="SubmittingFileState=-1">完成</n-button>
    </template>
  </n-result>
</n-modal>
</div>
</template>


<script setup>
import { NList,NListItem,NThing,NButton,NModal,NCard,NP,NSkeleton,
NResult } from "naive-ui";
import { ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import { API } from "../../shared/APIHelper";
import submitForm from "./ranword.submitForm.vue"

const router=useRouter(),route=useRoute()

const selectedFileObj=ref({
    name:"",
    key:"",
    desc:""
})
,showConfirm=ref(false)
,templates=ref([])
,loadingList=ref(true)
,FileConfig=ref({
    subject:"",
    dateIncluded:true,
    title:"",
    InsertUUID:false
})
/**
 * 0 - 未开始
 * 1 - 正在上传
 * 2 - 上传完成
 */
,SubmittingFileState=ref(-1)
,SubmittedFilename=ref("")


API.get("/api/local/ranword-templates/list").then(op=>{
    templates.value=op
    loadingList.value=false
    if(route.query.template){
        for (let i = 0; i < templates.value.length; i++) {
            if(templates.value[i].key==route.query.template){
                selectedFileObj.value=templates.value[i]
            }
        }
        SubmittingFileState.value=0
}
})

const confirmAdd=(obj)=>{
    selectedFileObj.value=obj
    SubmittingFileState.value=0
} 


const submitCreate=(filename,fileConfig)=>{
  console.log("herer00");
  FileConfig.value= fileConfig
    SubmittingFileState.value=1
    API.post("/api/local/ranword/create",{
        key:selectedFileObj.value.key,
        filename
    }).then(v=>{
        SubmittingFileState.value=2
        SubmittedFilename.value=filename
    })
}

const openLocally=(fn)=>{
    API.post("/api/local/ranword/open",{
        filename:fn
    })
}

</script>