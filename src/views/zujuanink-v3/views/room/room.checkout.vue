<template>
  <div class="block_main">
    <n-checkbox-group v-model:value="pictosaves">
    <div v-for="(i, index) in TList">
      <div :id="'DrawableBlock-' + index">
        <canvas
          :id="'drawableCanvas-' + index"
          class="drawableCanvas"
          @pointermove="($event) => DrawTools.onpointermove(index, $event)"
          @mouseup="($event) => DrawTools.onmouseup(index, $event)"
          @mousedown="($event) => DrawTools.onmousedown(index, $event)"
          :style="{ height: paintheight[index] + 'px' }"
        ></canvas>
        <div class="hanged_container">
          <n-space vertical>
            <n-button @click="scrollToNextT(index)" :disabled="index==TList.length-1">NEXT</n-button>
            <n-button @click="SubmitToFailedColl(index)" >收录错题集</n-button>
            <n-button @click="SubmitToFTC(index)" >收录ftc session</n-button>
            <n-checkbox :value="index" label="保存本题答题图片" />
            </n-space>
            <!-- <n-button @click="generateImg(index)" >Generate</n-button> -->
        </div>
        
        <!-- <n-space>
          <p class="header-info">{{ i.diff.name }}({{ i.diff.value }})</p>
          <n-divider vertical />
          <p class="header-info">{{ i.type.name }}</p>
          <n-divider vertical />
          <p class="header-info">ID:{{ i.id }}</p>
          <n-divider vertical />
          <p class="header-info">
            Knowledge:
            <n-ellipsis style="max-width: 240px">{{
              i.knowledgeInfo
            }}</n-ellipsis>
          </p>
        </n-space>
        <div v-html="normalizeq(i.body, { source: i.title })"></div>
        <div>
          <p class="paperSource">Included by:</p>
          <p
            v-for="oo in i.paperSources"
            class="paperSource"
            :style="{
              fontWeight: oo.name.includes('江苏') ? 600 : 400,
            }"
          >
            {{ oo.name }}<span class="paperSourceId"> ID:{{ oo.id }}</span>
          </p>
        </div> -->

        <component :is="createComponent(i)"/>
        
<div :style="{height:(extendheight[i]||0)+'px'}" class="extendHeightBlock"></div>
        <answer-img :id="q_component=='zjw'?i.id:i.qid" :width="700" />
      </div>
      
    </div>
  </n-checkbox-group>
    <div>
        <n-button @click="FINISH">Finish.</n-button>
    </div>
  </div>




  <n-modal v-model:show="showAddFTCModal " style="width:50%"   
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="将这道题目收录到FTC Session"
    :bordered="false"
    size="huge"
    :segmented="segmented">
    <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging" 
>
      <NFormItem label="quid">
        <n-input disabled :value="FTCaddDisc.quid"></n-input>
      </NFormItem>
      <NFormItem label="你的感想">
        <n-input type="textarea" v-model:value="FTCaddDisc.insights" placeholder="对这道题目的想法，收获的知识点，等等"></n-input>

      </NFormItem>
      <NFormItem label="注释">

        <n-input type="textarea" v-model:value="FTCaddDisc.note" placeholder="显示在题目前的信息 e.g. 错题的小题号"></n-input>

      </NFormItem>
      <NFormItem label="评级">
          <n-rate allow-half :count="10" :on-update:value="(v)=>{FTCaddDisc.rate=v*10}"/><n-p>{{ FTCaddDisc.rate }}</n-p>

      </NFormItem>
      <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="submitFTCadd"
          >
            收录
          </n-button>
        </div>
    </n-form>
  </n-modal>

  <n-modal v-model:show="showUploadingModal" style="width:50%"   
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="请稍候"
    :bordered="false"
    size="huge"
    :segmented="segmented">
    <div v-if="UploadingModalView==1">
    <n-alert type="warning">
    该应用的后端没有原子性，而此过程中的API往返较多，因此，请不要在提交过程中断开联网，或取消保存
    </n-alert>  <n-spin>
        <template #description>
        {{ UploadStatus }}
      </template>
      </n-spin>
    </div>
    <div v-if="UploadingModalView==2">
    <n-button @click="$router.push('../preparing-room')">返回准备室</n-button>
    <n-button @click="$router.push('../home')">返回首页</n-button>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, onMounted, h } from "vue";
import { NSpace, NEllipsis, NButton, NDivider,NInput,NAlert,NForm,NCard,NRate,NModal,NSpin,NP,NCheckboxGroup,NCheckbox, NFormItem } from "naive-ui";
import AnswerImg from "./room.answerImgHelper.vue";
import { normalizeq } from "../../utils/nomorlize_q-tailored";
import { PaintTools } from "../../utils/painttools";
import { API } from "../../../../shared/APIHelper";
import ComponentILD from "../../questionBlock/ild.vue"
import ComponentZJW from "../../questionBlock/zjw.vue"
const tPaths = ref([]);
tPaths.value = window.useranswerPaths;
const TList = ref([]);
TList.value = window.TList;
const paintheight = ref([]);
const UploadStatus=ref(""),showUploadingModal=ref(false)
const observer = TList.value.map(
  (il, i) =>
    new ResizeObserver((_) => {
      DrawTools.recalculateSize(i);
    })
);

let pt = [];

window.PaintCONFIG.color="red"

onMounted(() => {
  for (let ii = 0; ii < TList.value.length; ii++) {
    const Tcol = TList.value[ii];
    document.getElementById("drawableCanvas-" + ii).width =
      document.getElementById("DrawableBlock-" + ii).clientWidth * 3;
    document.getElementById("drawableCanvas-" + ii).height =
      document.getElementById("DrawableBlock-" + ii).clientHeight * 3;
      document.getElementById("drawableCanvas-" + ii).style.height =
      document.getElementById("DrawableBlock-" + ii).clientHeight+"px";
    paintheight.value[ii] = document.getElementById(
      "DrawableBlock-" + ii
    ).clientHeight;
    pt[ii] = new PaintTools(document.getElementById("drawableCanvas-" + ii));
    observer[ii].observe(document.getElementById("DrawableBlock-" + ii));
    DrawTools.initPaint(ii,window.useranswerPaths[ii]|| [])
  }
});

const DrawTools = {
  onpointermove: (i, e) => {
    console.log(i);
    if (pt[i].onpointermove) {
      pt[i].onpointermove(e);
    }
  },
  onmouseup: (i, e) => {
    if (pt[i].onmouseup) {
      pt[i].onmouseup(e);
    }
  },
  onmousedown: (i, e) => {
    if (pt[i].onmousedown) {
      pt[i].onmousedown(e);
    }
  },
  recalculateSize: (i) => {
    // console.log(i);
    document.getElementById("drawableCanvas-" + i).width =
      document.getElementById("DrawableBlock-" + i).clientWidth * 3;
    //   document.getElementById("drawableCanvas-" + i).style.width=document.getElementById("DrawableBlock-" + i).clientWidth
    document.getElementById("drawableCanvas-" + i).height =
      document.getElementById("DrawableBlock-" + i).clientHeight * 3;
    paintheight.value[i] = document.getElementById(
      "DrawableBlock-" + i
    ).clientHeight;
  },
  clear: (i) => {
    pt[i].clear();
  },
  export: (i) => {
    return pt[i].export();
  },
  initPaint: (i, pl) => {
    pt[i].paintlines = pl;
    pt[i].refreshCanvas();
  },
};

const extendheight=ref([]);extendheight.value=window.extendheight





const scrollToNextT=(ii)=>{
    document.getElementById("DrawableBlock-" + (ii+1)).scrollIntoView()
}


import * as htmlToImage from 'html-to-image';
import blankpic from "../../utils/blankpic";
const generateImg=(ii)=>{
  var node = document.getElementById("DrawableBlock-" + ii);

  node.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/formula/")){
            v.src=v.src.replace("https://staticzujuan.xkw.com/quesimg/Upload/formula/",API.host+"/api/xkw-helper/route-formula-svg/").replace(".svg","")
            // v.style.width=(v.width*.8)+"px"
        }
    })
    node.querySelector("canvas").style.position="fixed"
    node.querySelector("canvas").style.top="0"
    node.querySelector("canvas").style.left="0"
    node.style.backgroundColor="white"
return new Promise((res,rej)=>{
  htmlToImage.toJpeg(node, { quality: 0.8,includeQueryParams:true })
  .then(function (dataUrl) {
    node.style.display="none"
    res(dataUrl)
  })
  .catch(function (error) {
    // console.error('oops, something went wrong!', error);
  });
})

}


const q_component=ref("");q_component.value=window.qcomponent

const createComponent=(ii)=>{
  return h(window.qcomponent=="zjw"?ComponentZJW:ComponentILD,{
    qcontent:ii
  })
}

const pictosaves=ref([])

const UploadingModalView=ref(1)
const FINISH=async()=>{
  showUploadingModal.value=true
  UploadStatus.value="Passing on data."
  const RecordsID=(await API.post("/zujuan-ink-be-core/records/add",{
    date:(new Date()).toDateString(),
    timestamp:(new Date()).getTime(),
    count:TList.value.length,
    bankid:window.bankid
  })).data
  for (let i = 0; i < TList.value.length; i++) {
//     const element = TList.value[i];

//     UploadStatus.value=`Checking ${TList.value[i].id} Existance ${i+1} / ${TList.value.length}`
//     const qexistanceData=await API.get("/zujuan-ink-be-core/data/checkExistance/"+window.bankid+"/"+TList.value[i].id)
//     let qqid=0
//     // console.log(qexistanceData.id);
//     if(!qexistanceData.data){
//       UploadStatus.value=`Submitting ${TList.value[i].id} ( ${i+1} / ${TList.value.length})`
//       qqid=(await API.post("/zujuan-ink-be-core/data/add",{
// body           :  TList.value[i].body ,
// timestamp      :  (new Date()).getTime() ,
// qid            :  TList.value[i].id ,
// bankid         :  window.bankid ,
// title          :  TList.value[i].title ,
// diffv          :  TList.value[i].diff.id ,
// knowledgeInfo  :  TList.value[i].knowledgeInfo ,
// typeid         :  TList.value[i].type.id  ,

//   })).data
//     }else{
//       qqid=qexistanceData.data.id
//     }

    UploadStatus.value=`Generate Image ${i+1} / ${TList.value.length}`
    let imgData
    if(pictosaves.value.indexOf(i)!=-1){
      imgData=await generateImg(i)
    }else{
      imgData=`data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="300" height="50"><body xmlns="http://www.w3.org/1999/xhtml"><p>用户选择不收录答题记录图片</p></body></foreignObject></svg>`
    }


    UploadStatus.value=`Submitting Record ${i+1} / ${TList.value.length}`
    await API.post("/zujuan-ink-be-core/donerec/add",{
quid         :     TList.value[i].quid,
date         :   (new Date()).toDateString()  ,
timestamp    :    (new Date()).getTime() ,
image        :   imgData  ,
parent       :   RecordsID  ,
    })
    UploadStatus.value=`Update Data ${i+1} / ${TList.value.length}`
    await API.get("/zujuan-ink-be-core/data/submitAsDone/"+TList.value[i].quid)

  }


  UploadStatus.value=`Done.`


  UploadingModalView.value=2

}


const SubmitToFailedColl=async(i,rt)=>{
  await API.get("/zujuan-ink-be-core/data/addFailedColl/"+TList.value[i].quid)
  TList.value[i].failedcoll=true
}



const showAddFTCModal=ref(false),
FTCaddDisc=ref({
  quid:"",
    insights :"",
    note :"",
    rate :0,
    timestamp :0,
    times:0,
    lastfinishdate :0,
    mastarate :0,
    bankid:0
})

const SubmitToFTC=(index)=>{
  FTCaddDisc.value={
  quid:TList.value[index].quid,
    insights :"",
    note :"",
    rate :0,
    timestamp :(new Date()).getTime(),
    times:1,
    lastfinishdate :(new Date()).getTime(),
    mastarate :0,
    bankid:window.bankid
}
showAddFTCModal.value=true

}

const submitFTCadd=(index)=>{
  API.post("/zujuan-ink-be-core/ftc/push_to_collection",FTCaddDisc.value).then(o=>{
    showAddFTCModal.value=false
  })
}
</script>

<style>
.block_main {
  width: 70%;
  display: block;
  padding-top: 50px;
  background: aliceblue;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
  padding: 40px;
  border-radius: 35px;
}
.attached_opts {
  position: fixed;
  right: 0;
}
.copyright_word {
  margin: 0 0;
}
.copyrights {
  position: fixed;
  text-align: right;
  right: 0;
  bottom: 0;
}
</style>
<style scoped>
.paperSource {
  font-size: 0.75rem;
  margin: 0 0;
}
.paperSourceId {
  background-color: aliceblue;
  font-size: 0.65rem;
}

.drawableCanvas {
  position: absolute;

  border: black 1px solid;
}


.hanged_container{
    position: absolute;
left: auto;
right: calc(15% - 100px);
}


.extendHeightBlock{
  display: block;
width: 30px;
}
</style>
