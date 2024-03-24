<!-- @format -->

<template>
  <p>
    正在编辑<n-text code>{{ $route.params.id }}</n-text
    >的错题
  </p>
  <n-steps v-model:current="step">
    <n-step title="编辑题干" />
    <n-step title="编辑答案" />
    <n-step title="编辑解析" />
    <n-step title="设置相关属性" />
  </n-steps>
  <!-- <n-button-group>
        <n-button @click="prev">
          <template #icon>
            <n-icon>
              <ArrowBackOutline />
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next">
          <template #icon>
            <n-icon>
              <ArrowForwardOutline />
            </n-icon>
          </template>
        </n-button>
      </n-button-group> -->
  <div v-if="step == 1">
    <editor v-model:type="FormContent.qType" 
    v-model:content="FormContent.q" ></editor>
    <n-button @click="step = 2">开始编辑答案</n-button>
  </div>
  <div v-if="step == 2">
    <editor v-model:type="FormContent.answerType" v-model:content="FormContent.answer"></editor>
    <n-button
      @click="
        FormContent.answerType = 'AS_IS';
        step = 3;
      "
      >标记为AS-IS</n-button
    >
    <n-button @click="step = 3">开始编辑解析</n-button>
    <n-p>此处显示为标答</n-p>
    <n-image :src="XKWGetFile.a" :width="600"></n-image>
    <n-button @click="InjectData_A">一键插入</n-button>
    <pre>OCR结果为:{{ OCRRes.a }}</pre>
  </div>
  <div v-if="step == 3">
    <editor v-model:type="FormContent.parseType" v-model:content="FormContent.parse"></editor>
    <n-button
      @click="
        FormContent.parseType = 'AS_IS';
        step = 4;
      "
      >标记为AS-IS</n-button
    >
    <n-button @click="step = 4">开始编辑相关属性</n-button>
    <n-p>此处显示为解析</n-p>
    <n-image :src="XKWGetFile.p" :width="600"></n-image>
    <n-button @click="InjectData_P">一键插入</n-button>
    <pre>OCR结果为:{{ OCRRes.p }}</pre>
  </div>
  <div v-if="step == 4">
    <n-p>编辑注释 e.g.错解、注意点 etc</n-p>
    <editor v-model:type="FormContent.noteType" v-model:content="FormContent.note"></editor>
    <n-p>为这道错题评分（从重要性角度）：</n-p>
    <n-rate allow-half :count="10" v-model:value="FormContent.rate"></n-rate>
    <n-p>为这个错题设置tag:</n-p>
    <tag-tree-select v-model:tags="tagsRef"></tag-tree-select>
    <n-button @click="Submit()">完成</n-button>
  </div>
  <!-- <div v-if="step==5">
<n-p>即将上传的数据：</n-p> -->
  <!-- <n-config-provider :hljs="hljs">

<n-code
        :code="generateCodeAboutToSubmit(FormContent)"
        language="json"
      /> </n-config-provider> -->
  <!-- </div>  -->
</template>
<script setup>
import editor from "./editor/handleEditor.vue";
import { API } from "@/shared/APIHelper";
import { onBeforeUnmount, ref, shallowRef, onMounted, useAttrs } from "vue";
import {
  NText,
  NButton,
  NSteps,
  NStep,
  NIcon,
  NButtonGroup,
  NImage,
  NP,
  NRate,
  NCode,
  NConfigProvider,
} from "naive-ui";
import { ArrowBackOutline, ArrowForwardOutline } from "@vicons/ionicons5";
import { useRouter, useRoute } from "vue-router";
import { normalizeq } from "@/shared/normalize_q/toEditorFriendly";
import TagTreeSelect from "./handleTagTreeSelect.vue";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);
const attrs = useAttrs();
const router = useRouter(),
  route = useRoute();

const step = ref(1);
const T = ref({}),
  XKWGetFile = ref({ a: "", p: "" }),
  OCRRes = ref({ a: "", p: "" });

const FormContent = ref({
    q: "",
    qType: "HTML",
    answer: "",
    answerType: "HTML",
    parse: "",
    parseType: "HTML",
    note: "",
    noteType: "HTML",
    rate: 5,
  }),
  tagsRef = ref([]);

if(attrs.page=="edit"){
  API.get("/api/data/mistakes_coll/get/"+route.params.id).then(oj=>{
    FormContent.value={
    q: oj.q,
    qType: oj.qType,
    answer:       oj.answer,
    answerType:   oj.answerType,
    parse:        oj.parse,    
    parseType:    oj.parseType, 
    note:         oj.note,     
    noteType:     oj.noteType,  
    rate:         oj.rate      
  }
  tagsRef.value=oj.tags.split("|")
  API.get("/api/data/get/" + oj.relatedQID).then((v) => {
  T.value = v;
  // FormContent.value.q = normalizeq(v.q);
  API.get(
    "/api/xkw-helper/getCachedImg/" +
      T.value.bankid +
      "/" +
      T.value.qid +
      "/600"
  ).then((r) => {
    XKWGetFile.value = {
      a:
        API.host +
        "/api/xkw-helper/route-pic?purl=" +
        btoa(r.answer.replace("@2", "@3")),
      p:
        API.host +
        "/api/xkw-helper/route-pic?purl=" +
        btoa(r.parse.replace("@2", "@3")),
    };
    API.post("/ocr-service", {
      url: XKWGetFile.value.a.replace("c2", "c1"),
      psm: 8,
      lang: "eng+chi_sim",
    }).then((v) => {
      OCRRes.value.a = v.result;
    });
    API.post("/ocr-service", {
      url: XKWGetFile.value.p,
      psm: 3,
      lang: "chi_sim+eng",
    }).then((v) => {
      OCRRes.value.p = v.result;
    });
  });
});

  })
}else if(attrs.page=="new"){
  API.get("/api/data/get/" + route.params.id).then((v) => {
  T.value = v;
  FormContent.value.q = normalizeq(v.q);
  API.get(
    "/api/xkw-helper/getCachedImg/" +
      T.value.bankid +
      "/" +
      T.value.qid +
      "/600"
  ).then((r) => {
    XKWGetFile.value = {
      a:
        API.host +
        "/api/xkw-helper/route-pic?purl=" +
        btoa(r.answer.replace("@2", "@3")),
      p:
        API.host +
        "/api/xkw-helper/route-pic?purl=" +
        btoa(r.parse.replace("@2", "@3")),
    };
    API.post("/ocr-service", {
      url: XKWGetFile.value.a.replace("c2", "c1"),
      psm: 8,
      lang: "eng+chi_sim",
    }).then((v) => {
      OCRRes.value.a = v.result;
    });
    API.post("/ocr-service", {
      url: XKWGetFile.value.p,
      psm: 3,
      lang: "chi_sim+eng",
    }).then((v) => {
      OCRRes.value.p = v.result;
    });
  });
});

}
// const QuesContent=ref(""),AnsContent=ref(""),ParseContent=ref(""),NoteContent=ref("")

const InjectData_A = () => {
  FormContent.value.answer = OCRRes.value.a;
};
const InjectData_P = () => {
  FormContent.value.parse = OCRRes.value.p;
};

const Submit = () => {
  console.log(FormContent.value, tagsRef.value);
  if(attrs.page=="edit"){
    API.post("/api/data/mistakes_coll/edit/"+route.params.id, {
    relatedQID: T.value.id,
    bankid: T.value.bankid,
    q: FormContent.value.q,
    qType: FormContent.value.qType,
    answer: FormContent.value.answer,
    answerType: FormContent.value.answerType,
    parse: FormContent.value.parse,
    parseType: FormContent.value.parseType,
    note: FormContent.value.note,
    noteType: FormContent.value.noteType,
    tags: tagsRef.value,
    rate: FormContent.value.rate,
  });

  }else if(attrs.page=="new"){
    API.post("/api/data/mistakes_coll/add", {
    relatedQID: T.value.id,
    bankid: T.value.bankid,
    q: FormContent.value.q,
    qType: FormContent.value.qType,
    answer: FormContent.value.answer,
    answerType: FormContent.value.answerType,
    parse: FormContent.value.parse,
    parseType: FormContent.value.parseType,
    note: FormContent.value.note,
    noteType: FormContent.value.noteType,
    tags: tagsRef.value,
    collTime: new Date().getTime(),
    rate: FormContent.value.rate,
  });
  }

};
// const generateCodeAboutToSubmit=(_FormContent)=>{
//     return JSON.stringify(_FormContent.value,null,4)
// }
</script>
