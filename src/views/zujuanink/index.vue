<template>
  <div class="attached_opts">
    <settings :updateOptions="UpdateOptions" :getCurrentOptions="getCurrentOptions"/>
  <img src="./icon/ginkto.svg" style="width: 40px;vertical-align: middle;display: inline;"/>
  </div>
  <div class="copyrights">
    <p class="copyright_word"><n-text code>@thost/zujuanink v0.2.3</n-text> <span>『刷组卷网』</span></p>
    <p class="copyright_word">Author: <n-text code>@5dbwat4</n-text></p>
    <p class="copyright_word">A project intended to boost study effeciency</p>
  </div>
  <div class="block_main">
  <n-spin :show="Loading">
    <n-input-group>
      <n-button @click="controls.prev()">&lt; PREV </n-button>
      <n-input-group-label
        >{{ currentTIndex + 1 }} / {{ TList.length }}</n-input-group-label>
      <n-button @click="bundledTs.index+1==bundledTs.count?initValidateAns():controls.next()">NEXT &gt;</n-button>
      
      <n-input-group-label>Bundled {{ bundledTs.index+1}} / {{ bundledTs.count }}</n-input-group-label>
      <n-button @click="controls.next()">Skip</n-button>
    </n-input-group>

    
    <tblock
      :data="TList[currentTIndex]"
      :control="controls"
      :getParams="GetTblockParams"
    />
  </n-spin></div>
</template>

<script setup>
import tblock from "./t2answerBlock.vue";
import { ref } from "vue";
import { ZujuanAPI } from "./zujuan-api";
import {
  NSpin,
  NModal,
  NCard,
  NInputGroup,
  NInputGroupLabel,
  NButton,
  NFormItem,
  NInputNumber,
  NForm,NP,NText
} from "naive-ui";
import Settings from "./settings.vue"
import { emitEvent } from "../../shared/globalEventMessageHelper";
//ZujuanAPI("/app-server/v1/ques/list/13?types=0&sources=0&pageIndex=1&pageSize=10&orderBy=2&areas=0&grades=0&diffs=0&knowledges=0&years=0")
const example = {
  audio: "",
  body: "Loading.请等待第一个Chunk被hit",
  childCount: 1,
  collect: false,
  diff: {
    id: 3,
    name: "适中",
    value: 0.65,
  },
  id: -1,
  indexCount: 4,
  knowledgeInfo: "loading",
  paperSources: [],
  time: "2023-07-15 18:02:51",
  title: "loading",
  type: {
    choice: false,
    id: 2904,
    name: "loading",
  },
  useCount: 596,
  video: "",
};
const Loading = ref(true);

let useranswer={}
const currentTIndex = ref(0),
  TList = ref([example]);
const options = ref({
  leftFormCycle: true,
  rightFormCycle: false,
  APIargments: {
    searchp: {
      types: 0,
      sources: 0,
      pageIndex: 1,
      pageSize: 10,
      orderBy: 2,
      areas: 0,
      grades: 0,
      diffs: 0,
      knowledges: 0,
      years: 0,
    },
    bid: 13,
  },
});



const bundledTs=ref({
  index:0,
  count:5,
  offset:0
})

const TblockParams = ref({
  width: 700,
});
const controls = {
  
  prev: async() => {
    useranswer[currentTIndex.value]=emitEvent("zujuanink:getuseranswer")
    // console.log("executed");
    if (currentTIndex.value == 0) {
      if (options.value.leftFormCycle) {
        currentTIndex.value = TList.value.length - 1;
      }
    } else {
      currentTIndex.value--;
    }
    emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
  },
  next: async() => {
    useranswer[currentTIndex.value]=emitEvent("zujuanink:getuseranswer")
    if (currentTIndex.value == TList.value.length - 1) {
      if (options.value.rightFormCycle) {
        currentTIndex.value = 0;
      } else {
        options.value.APIargments.searchp.pageIndex++
        await fetchForNewT();
        currentTIndex.value++;
      }
    } else {
      currentTIndex.value++;
    }
    if(!options.value.rightFormCycle){

    }
    emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
  },
};

const UpdateOptions=(opt)=>{
  currentTIndex.value = 0;
  options.value=opt
  TList.value = [example]
  fetchForNewT()
  emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
},getCurrentOptions=()=>{
  return options.value
},GetTblockParams=()=>{
  return {
    bid:options.value.APIargments.bid,
    width:700
  }
}

const fetchForNewT = async () => {
  Loading.value = true;
  function generateFetchURL() {
    return (
      "/app-server/v1/ques/list/" +
      options.value.APIargments.bid +
      "?" +
      Object.entries(options.value.APIargments.searchp)
        .map((v) => v[0] + "=" + v[1])
        .join("&")
    );
  }
  await ZujuanAPI(generateFetchURL()).then((v) => {
    // console.log(TList.value[0] , example , TList.value[0]==example)/;
    if (TList.value[0].id == -1) {
      TList.value = v.data.list;
    }else{
    TList.value.push(...v.data.list);
    }
    if (v.data.finished) options.value.rightFormCycle = true;

    Loading.value = false;
  });
};

fetchForNewT().then(v=>{
  emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
});


const initValidateAns=async()=>{
  
}


</script>


<style>
.block_main{
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
.attached_opts{
  position: fixed;
right: 0;
}
.copyright_word{
  margin: 0 0;
}
.copyrights{
  position: fixed;
  text-align: right;
  right: 0;
  bottom: 0;
}
</style>