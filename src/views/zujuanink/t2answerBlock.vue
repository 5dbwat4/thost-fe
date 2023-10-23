<template>
<div style="position: fixed;left: 0;">
  <n-space style="height: 300px; justify-content: center">
  <n-slider :default-value="0" vertical :min="-200" :max="200"/>
  <n-slider :default-value="0" vertical :min="-200" :max="200"/>
  </n-space>
</div>

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
        {{ $attrs.data.diff.name }}({{ $attrs.data.diff.value }})
      </p>
      <n-divider vertical />
      <p class="header-info">{{ $attrs.data.type.name }}</p>
      <n-divider vertical />
      <p class="header-info">ID:{{ $attrs.data.id }}</p>
      <n-divider vertical />
      <p class="header-info">
        Knowledge:
        <n-ellipsis style="max-width: 240px">{{
          $attrs.data.knowledgeInfo
        }}</n-ellipsis>
      </p>
    </n-space>
    <div
      v-html="normalizeq($attrs.data.body, { source: $attrs.data.title })"
    ></div>
    <div>
      <p class="paperSource">Included by:</p>
      <p
        v-for="oo in $attrs.data.paperSources"
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
    <n-divider />
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
    </div>
  </div>
</template>

<script setup>
import { useAttrs, ref, watch,onMounted, nextTick } from "vue";
import {
  NEllipsis,
  NSpace,
  NDivider,
  NButton,
  NInput,
  NImage,NSlider,
  NImageGroup
} from "naive-ui";
import { normalizeq } from "./nomorlize_q-tailored";
import { ZujuanAPI } from "./zujuan-api";
import { API } from "../../shared/APIHelper";
import { createEvent, emitEvent } from "../../shared/globalEventMessageHelper";
import { PaintTools } from "./painttools";
const attrs = useAttrs();
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
  const params = attrs.getParams();
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

createEvent("zujuanink:qidupdated", async(currentAnswer) => {
  yourAnswer.value = currentAnswer;
  displayAnswer.value = false;
  AnswerImageSrc.value = "";
  ParseImageSrc.value = "";
  await nextTick()
  DrawTools.recalculateSize()
  DrawTools.clear()
});
createEvent("zujuanink:getuseranswer", () => {
  return yourAnswer.value;
});


const observer=new ResizeObserver(_=>{
 DrawTools. recalculateSize()
})

let pt={}

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
  }
}
</script>

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
