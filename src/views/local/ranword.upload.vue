<template>
 <n-upload
 multiple
    :action="API.host+'/api/local/ranword/upload'"
    :on-update:file-list="UpdateFileList"
    @finish="handleFinish"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Click or drag a file to this area to upload
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        Strictly prohibit from uploading sensitive information. For example,
        your bank card PIN or your credit card expiry date.
      </n-p>
    </n-upload-dragger>
  </n-upload>

  <n-modal v-model:show="showRenameM" :close-on-esc="false">
    <n-card
      style="width: 900px"
      :title="'命名'+(toRenameIndex+1)+'/'+toRenamelist.length"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <component :is="SubmitFormRef"/>
    </n-card>
  </n-modal>


 <n-button @click="initRename">重命名</n-button>
</template>
<script setup>
import { NUpload,NUploadDragger,NIcon,NText,NP,NButton ,NSkeleton,NModal,NCard} from 'naive-ui';
import { API } from '../../shared/APIHelper';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { h, ref, shallowRef } from 'vue';
import submitForm from "./ranword.submitForm.vue"


const FList=ref([]),SubmitFormRef=shallowRef(h("p")),showRenameM=ref(false)
const toRenamelist=ref([]),toRenameIndex=ref(0)
const UpdateFileList=(list)=>{
  FList.value=list
  console.log("@ufl f",FList.value);
}

const initRename=async()=>{
  // console.log(FList.value);
  showRenameM.value=true
  function RenameRuntime(CTX){
    return new Promise((res,rej)=>{
      console.log(CTX);
      SubmitFormRef.value=h(submitForm,{
      filename:CTX.name,
      createCallback:(fn,fc)=>{
        SubmitFormRef.value=h(NSkeleton,{
          text:true,repeat:10
        })
        API.post("/api/local/ranword/rename",{
          filename:CTX.url.substring(CTX.url.lastIndexOf('/')+1),
          newname:fn
        }).then(ra=>{
          res()
        })
      }
    })
    })

  }
  for (let i = 0; i < toRenamelist.value.length; i++) {
    toRenameIndex.value=i
await RenameRuntime(toRenamelist.value[i])
  }
  toRenamelist.value=[]
  toRenameIndex.value=0
  showRenameM.value=false
}
const handleFinish=({
      file,
      event
    })=>{
      // console.log("@hFin",FList.value,file);
file.url=API.host+"/api/local/ranword/file/"+JSON.parse(event.target.responseText).fid
toRenamelist.value.push(file)
// console.log(event);
if(!showRenameM.value){
  initRename()
}
return file
}

</script>