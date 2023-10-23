<template>

<div id="canvas-extra">
  <n-space vertical>
  <n-color-picker
    :swatches="[
      '#FFFFFF',
      '#18A058',
      '#2080F0',
      '#F0A020',
      'rgba(208, 48, 80, 1)'
    ]"
    style="width: 40px;height: 40px;"
    class="canvase-pc1"
    :on-update:value="paintConfigColorUpdated"
  />
  <n-button circle @click="extendheight[currentTIndex]=(extendheight[currentTIndex]||0)+50">      <template #icon>
        <n-icon :component="AddOutline"></n-icon>
      </template></n-button></n-space>
</div>


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
 

<component :is="q_component"/>

<div :style="{height:(extendheight[currentTIndex]||0)+'px'}" class="extendHeightBlock"></div>


    </div>

  </div>


    </n-spin></div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch,nextTick, shallowRef, h } from "vue";
  import { ZujuanAPI } from "../../utils/zujuan-api";
  import {
    NSpin,
    NModal,
    NCard,
    NInputGroup,
    NInputGroupLabel,
    NButton,
    NFormItem,
    NInputNumber,
    NForm,NP,NText,  NEllipsis,NColorPicker,NIcon,
  NSpace,
  NDivider,
  NInput,
  NImage,NSlider,
  NImageGroup
  } from "naive-ui";
  import { emitEvent } from "../../../../shared/globalEventMessageHelper";
 import { AddOutline } from "@vicons/ionicons5";
  const Loading = ref(false);
  const TList=ref([]);TList.value=window.TList
  console.log(TList.value);
  let useranswer={}
  const currentTIndex = ref(0)
    // TList = ref([example]);
  // const options = ref({
  //   leftFormCycle: true,
  //   rightFormCycle: false,
  //   APIargments: {
  //     searchp: {
  //       types: 0,
  //       sources: 0,
  //       pageIndex: 1,
  //       pageSize: 10,
  //       orderBy: 2,
  //       areas: 0,
  //       grades: 0,
  //       diffs: 0,
  //       knowledges: 0,
  //       years: 0,
  //     },
  //     bid: 13,
  //   }
  // });
  
  
  
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

    },
    next: async() => {
      useranswer[currentTIndex.value]=getuseranswer()

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
  },getCurrentOptions=()=>{
    return options.value
  },GetTblockParams=()=>{
    return {
      bid:options.value.APIargments.bid,
      width:700
    }
  }

  
  const initValidateAns=async()=>{
    
  }
  





import ComponentILD from "../../questionBlock/ild.vue"
import ComponentZJW from "../../questionBlock/zjw.vue"
  // import { normalizeq } from "../../utils/nomorlize_q-tailored"
import { API } from "../../../../shared/APIHelper";
import { PaintTools } from "../../utils/painttools";
// import { checkboxGroupInjectionKey } from "naive-ui/es/checkbox/src/CheckboxGroup";
// const attrs = useAttrs();
// console.log(attrs);
const loadingAnswer = ref(false),
  displayAnswer = ref(false);
const AnswerImageSrc = ref(""),
  ParseImageSrc = ref(""),
  ImageWidth = ref(700);
const yourAnswer = ref("");
const paintheight = ref(0)

const q_component=shallowRef(h(window.qcomponent=="zjw"?ComponentZJW:ComponentILD,{
    qcontent:TList.value[currentTIndex.value]
  }))



watch([TList,currentTIndex],()=>{
  q_component.value=h(window.qcomponent=="zjw"?ComponentZJW:ComponentILD,{
    qcontent:TList.value[currentTIndex.value]
  })
})


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


const observer=new ResizeObserver(_=>{
 DrawTools. recalculateSize()
})

let pt={}

window.PaintCONFIG={
  color:"#000"
}


// const PaintCONFIGRef=ref({
//   color:"#000"
// })
// watch([PaintCONFIGRef],()=>{
//   console.log("updated");
//   window.PaintCONFIG=PaintCONFIGRef.value
// })

const paintConfigColorUpdated=(v)=>{
  console.log("updated11");
  window.PaintCONFIG.color=v
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











import { useRouter,useRoute,onBeforeRouteLeave } from "vue-router";
const router=useRouter(),route=useRoute()





const checkout=async()=>{
window.useranswerPaths=useranswer
window.extendheight=extendheight.value
router.push("./room/checkout")
}

const checkoutInAdvance=async()=>{
  // console.log(TList.value.splice(0,currentTIndex.value+1));
window.TList=TList.value.splice(0,currentTIndex.value+1)
window.useranswerPaths=useranswer
window.extendheight=extendheight.value
router.push("./room/checkout")
}


onBeforeRouteLeave((t,f)=>{
  observer.disconnect()
})


const extendheight=ref([])

  
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
  margin-top: 28px;
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

<style scoped src="../../../../shared/lib/normalize.css"></style>

<style scoped>

#drawableCanvas{
  position: absolute;
  width: 100%;
  height: 100%;

  border: black 1px solid;
}#canvas-extra{
  position: fixed;
width: fit-content;
top: 20px;
left: 0px;
}
</style>

<style>
.canvase-pc1  .n-color-picker-trigger__value{
  display: none;
}

</style>