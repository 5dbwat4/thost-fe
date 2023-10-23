<template>
    <div class="block_main">
    <n-spin :show="Loading">
      <n-input-group>
        <n-button @click="controls.prev()">&lt; PREV </n-button>
        <n-input-group-label
          >{{ currentTIndex + 1 }} / {{ TList.length }}</n-input-group-label>
        <n-button @click="bundledTs.index+1==bundledTs.count?initValidateAns():controls.next()">
            {{currentTIndex == TList.length - 1?"CHECKOUT":"NEXT &gt;"}}</n-button>
          <n-button v-if="currentTIndex != TList.length - 1" @click="checkoutInAdvance()">
            CIV</n-button>
        
        <!-- <n-input-group-label>Bundled {{ bundledTs.index+1}} / {{ bundledTs.count }}</n-input-group-label> -->
        <n-button @click="controls.next()">Skip</n-button>
      </n-input-group>
  
      
      <div>
    <div id="DrawableBlock">
      <canvas id="drawableCanvas" 
      @pointermove="$event=>DrawTools.onpointermove($event)"
      @mouseup="$event=>DrawTools.onmouseup($event)"
      @mousedown="$event=>DrawTools.onmousedown($event)"
      :style="{height:paintheight+'px'}"
      ></canvas>
    <n-space>
      <p class="header-info">
        {{ TList[currentTIndex].diff.name }}({{ TList[currentTIndex].diff.value }})
      </p>
      <n-divider vertical />
      <p class="header-info">{{ TList[currentTIndex].type.name }}</p>
      <n-divider vertical />
      <p class="header-info">ID:{{ TList[currentTIndex].id }}</p>
      <n-divider vertical />
      <p class="header-info">
        Knowledge:
        <n-ellipsis style="max-width: 240px">{{
          TList[currentTIndex].knowledgeInfo
        }}</n-ellipsis>
      </p>
    </n-space>
    <div
      v-html="normalizeq(TList[currentTIndex].body, { source: TList[currentTIndex].title })"
    ></div>
    <div>
      <p class="paperSource">Included by:</p>
      <p
        v-for="oo in TList[currentTIndex].paperSources"
        class="paperSource"
        :style="{
          fontWeight: oo.name.includes('江苏') ? 600 : 400,
        }"
      >
        {{ oo.name }}<span class="paperSourceId"> ID:{{ oo.id }}</span>
      </p>
    </div>
    <!-- <n-space>
      <n-button @click="$attrs.control.prev()">&lt; PREV </n-button>
      <n-button @click="$attrs.control.next()">NEXT &gt;</n-button>
    </n-space> -->
    <!-- <div>
      <p>作答：</p>
      <n-input
        v-model:value="yourAnswer"
        type="textarea"
        placeholder="输入你的答案"
      />
    </div> -->
    </div>
    <!-- <n-divider />
    <n-button @click="ValidateAnswer" :loading="loadingAnswer"
      >Validate</n-button
    >
    <div v-if="displayAnswer">
      <n-image-group>
        <n-space>
          <n-image :width="ImageWidth" :src="AnswerImageSrc" />
          <n-image :width="ImageWidth" :src="ParseImageSrc" />
        </n-space>
      </n-image-group>
    </div> -->
  </div>


    </n-spin></div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch,nextTick } from "vue";
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
    NForm,NP,NText,  NEllipsis,
  NSpace,
  NDivider,
  NInput,
  NImage,NSlider,
  NImageGroup
  } from "naive-ui";
  import { emitEvent } from "../../shared/globalEventMessageHelper";
  //ZujuanAPI("/app-server/v1/ques/list/13?types=0&sources=0&pageIndex=1&pageSize=10&orderBy=2&areas=0&grades=0&diffs=0&knowledges=0&years=0")

  const Loading = ref(false);
  const TList=ref([]);TList.value=window.TList
  let useranswer={}
  const currentTIndex = ref(0)
    // TList = ref([example]);
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
      useranswer[currentTIndex.value]=getuseranswer()
    //   console.log(useranswer);
      // console.log("executed");
      if (currentTIndex.value == 0) {
        if (options.value.leftFormCycle) {
          currentTIndex.value = TList.value.length - 1;
        }
      } else {
        currentTIndex.value--;
      }
    //   emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
    },
    next: async() => {
      useranswer[currentTIndex.value]=getuseranswer()
    //   console.log(useranswer);
    //   if (currentTIndex.value == TList.value.length - 1) {
    //     if (options.value.rightFormCycle) {
    //       currentTIndex.value = 0;
    //     } else {
    //       options.value.APIargments.searchp.pageIndex++
    //       await fetchForNewT();
    //       currentTIndex.value++;
    //     }
    //   } else {
    //     currentTIndex.value++;
    //   }
    //   if(!options.value.rightFormCycle){
  
    //   }
    //   emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
    if (currentTIndex.value == TList.value.length - 1) {
        checkout()
    }else{
        currentTIndex.value++;
    }
    },
  };
  
  const UpdateOptions=(opt)=>{
    currentTIndex.value = 0;
    options.value=opt
    TList.value = [example]
    fetchForNewT()
    // emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
  },getCurrentOptions=()=>{
    return options.value
  },GetTblockParams=()=>{
    return {
      bid:options.value.APIargments.bid,
      width:700
    }
  }
  
//   const fetchForNewT = async () => {
//     Loading.value = true;
//     function generateFetchURL() {
//       return (
//         "/app-server/v1/ques/list/" +
//         options.value.APIargments.bid +
//         "?" +
//         Object.entries(options.value.APIargments.searchp)
//           .map((v) => v[0] + "=" + v[1])
//           .join("&")
//       );
//     }
//     await ZujuanAPI(generateFetchURL()).then((v) => {
//       // console.log(TList.value[0] , example , TList.value[0]==example)/;
//       if (TList.value[0].id == -1) {
//         TList.value = v.data.list;
//       }else{
//       TList.value.push(...v.data.list);
//       }
//       if (v.data.finished) options.value.rightFormCycle = true;
  
//       Loading.value = false;
//     });
//   };
  
//   fetchForNewT().then(v=>{
//     // emitEvent("zujuanink:qidupdated",[useranswer[currentTIndex.value]||""])
//   });
  
  
  const initValidateAns=async()=>{
    
  }
  







  import { normalizeq } from "./nomorlize_q-tailored";
import { API } from "../../shared/APIHelper";
import { PaintTools } from "./painttools";
import { checkboxGroupInjectionKey } from "naive-ui/es/checkbox/src/CheckboxGroup";
// const attrs = useAttrs();
// console.log(attrs);
const loadingAnswer = ref(false),
  displayAnswer = ref(false);
const AnswerImageSrc = ref(""),
  ParseImageSrc = ref(""),
  ImageWidth = ref(700);
const yourAnswer = ref("");
const paintheight = ref(0)

const ValidateAnswer = () => {
  loadingAnswer.value = true;
  const params = GetTblockParams();
  ImageWidth.value = params.width;
  ZujuanAPI(
    `/app-server/v1/ques/detail/${params.bid}/${attrs.data.id}?browserWidth=${params.width}`
  ).then((v) => {
    AnswerImageSrc.value =
      API.host +
      "/api/xkw-helper/route-pic?purl=" +
      btoa(v.data.answerImg.replace("@2", "@3"));
    ParseImageSrc.value =
      API.host +
      "/api/xkw-helper/route-pic?purl=" +
      btoa(v.data.parseImg.replace("@2", "@3"));
    loadingAnswer.value = false;
    displayAnswer.value = true;
  });
};


const getuseranswer=()=>{
    return DrawTools.answer;
}


watch(currentTIndex,async()=>{
    
    displayAnswer.value = false;
  AnswerImageSrc.value = "";
  ParseImageSrc.value = "";
  await nextTick()
  DrawTools.recalculateSize()
  DrawTools.clear()
  DrawTools.answer=useranswer[currentTIndex.value]
})
// createEvent("zujuanink:qidupdated", async(currentAnswer) => {
//   yourAnswer.value = currentAnswer;
//   displayAnswer.value = false;
//   AnswerImageSrc.value = "";
//   ParseImageSrc.value = "";
//   await nextTick()
//   DrawTools.recalculateSize()
//   DrawTools.clear()
// });
// createEvent("zujuanink:getuseranswer", () => {
//   return yourAnswer.value;
// });


const observer=new ResizeObserver(_=>{
 DrawTools. recalculateSize()
})

let pt={}

window.PaintCONFIG={
  color:"black"
}

onMounted(()=>{
  document.getElementById("drawableCanvas").width=document.getElementById("DrawableBlock").clientWidth*3
  document.getElementById("drawableCanvas").height=document.getElementById("DrawableBlock").clientHeight*3
  paintheight.value=document.getElementById("DrawableBlock").clientHeight

  pt=new PaintTools(document.getElementById("drawableCanvas"))
  observer.observe(document.getElementById("DrawableBlock"))

})

const DrawTools={
  onpointermove:(e)=>{
    if(pt.onpointermove){
      pt.onpointermove(e)
    }
  },
  onmouseup:(e)=>{
    if(pt.onmouseup){
      pt.onmouseup(e)
    }
  },
  onmousedown:(e)=>{
    if(pt.onmousedown){
      pt.onmousedown(e)
    }
  },
  recalculateSize:()=>{
    document.getElementById("drawableCanvas").width=document.getElementById("DrawableBlock").clientWidth*3
  document.getElementById("drawableCanvas").height=document.getElementById("DrawableBlock").clientHeight*3
  paintheight.value=document.getElementById("DrawableBlock").clientHeight
  },
  clear:()=>{
    pt.clear()
  },
  get answer(){
    return pt.paintlines
  },
 set answer(l){
    pt.paintlines=l||[]
    pt.refreshCanvas()
  },
  export:()=>{
    return pt.export()
  }
}











import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()





const checkout=async()=>{
window.useranswerPaths=useranswer
router.push("./room/checkout")
}

const checkoutInAdvance=async()=>{
  // console.log(TList.value.splice(0,currentTIndex.value+1));
window.TList=TList.value.splice(0,currentTIndex.value+1)
window.useranswerPaths=useranswer
router.push("./room/checkout")
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



<style>
.header-info {
  margin: 0 0;
  padding: 5px;
  display: inline-block;
}
</style>

<style scoped src="../../shared/lib/normalize.css"></style>

<style scoped>
.paperSource {
  font-size: 0.75rem;
  margin: 0 0;
}
.paperSourceId {
  background-color: aliceblue;
  font-size: 0.65rem;
}

#drawableCanvas{
  position: absolute;
  width: 100%;
  height: 100%;

  border: black 1px solid;
}
</style>