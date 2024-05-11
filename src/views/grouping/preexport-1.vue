<template>
  <!-- <n-button class="noprint" @click="shown.q = !shown.q">Q</n-button>
  <n-button class="noprint" @click="shown.a = !shown.a">A</n-button>
  <n-button class="noprint" @click="shown.p = !shown.p">P</n-button> -->

  <!-- <n-button class="noprint" type="success" @click="_Tour__open=true"
    >开始引导</n-button
  > -->
  <!-- <n-button class="noprint" @click="currentClicker = addExtBlank"
    >单击题面时增加空格</n-button
  >
  <n-button class="noprint" @click="fontreset">字体转为Times</n-button> -->
  <n-button
    class="noprint"
    @click="
      printhelper_columns == 2
        ? (printhelper_columns = 1)
        : (printhelper_columns = 2)
    "
    >改变列数
  </n-button>
  <!-- <n-button
    class="noprint"
    @click="
      currentClicker = () => {};
      optiontableInit();
    "
    >修正opttable</n-button
  > -->
  <n-button class="noprint" @click="Noptions_ret2 = true">Retheme 2</n-button>
  <n-button class="noprint" ref="btn1" @click="titleformat++">Title format</n-button>
  <n-button class="noprint" ref="btn2" @click="infoformat++">Info format</n-button>
  <n-button class="noprint" ref="btn3" @click="op2change()" type="success"
    >下一页</n-button
  >
  <div :style="{ width: '18.76cm', 'line-height': 'normal' }" id="oonom">
    <div class="noprint">
      <div class="labi-container">
        <div
          class="labi-block"
          v-for="rr in [1, 2, 3, 4, 5, 6, 7]"
          :key="rr"
          :style="{ height: 1045 + 'px' }"
        >
          Page # {{ rr }}
        </div>
      </div>
    </div>
    <div
      id="corehtml"
      :style="{
        width: '18.95cm',
        columns: printhelper_columns,
        'line-height': 'normal',
      }"
    >

     <head-theme-0  v-if="titleformat % titleformatCount == 0" :data="GroupDataPassed"/>
     <head-theme-1  v-if="titleformat % titleformatCount == 1" :data="GroupDataPassed"/>
     <head-theme-2  v-if="titleformat % titleformatCount == 2" :data="GroupDataPassed"/>
      
      <div
        v-for="(oo, i) in chunk2array(Tlist)"
        :key="oo.id"
        @click="currentClicker(oo.id)"
        class="___core_block"
        :data_id="i"
      >
      <block-theme-0  v-if="infoformat % infoformatCount == 0" :data="oo" :index="i" :normalizeFun="normalizeq"/>
      <block-theme-1  v-if="infoformat % infoformatCount == 1" :data="oo" :index="i" :normalizeFun="normalizeq"/>
      <block-theme-2  v-if="infoformat % infoformatCount == 2" :data="oo" :index="i" :normalizeFun="normalizeq"/>
      <block-theme-3  v-if="infoformat % infoformatCount == 3" :data="oo" :index="i" :normalizeFun="normalizeq"/>
        

        <div v-if="shown.q" :style="{display:'block',height:(oo._extb_height||0)+'px'}" class="extblank"></div>
      </div>
    </div>
  </div>





  <!-- <a-tour :open="open" :mask="false" type="primary" :steps="_Tour_step" /> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";




const route = useRoute(),
  router = useRouter();

import { NButton } from "naive-ui";


import { qtypes } from "../../shared/define_basic_qtypes";

import { API } from "../../shared/APIHelper";


import {normalizeq}from "../../shared/normalize_q/toPrint"

import HeadTheme0 from "./themes/head-theme-0.vue";
import HeadTheme1 from "./themes/head-theme-1.vue";
import HeadTheme2 from "./themes/head-theme-2.vue";
import BlockTheme0 from "./themes/block-theme-0.vue";
import BlockTheme1 from "./themes/block-theme-1.vue";
import BlockTheme2 from "./themes/block-theme-2.vue";
import BlockTheme3 from "./themes/block-theme-3.vue";
const titleformat = ref(0),
  infoformat = ref(0),
  titleformatCount = 3,
  infoformatCount = 4;


const shown = ref({
  q: true,
  a: false,
  p: false,
});



const grouptitle = ref("");

const GroupDataPassed = ref({
  title:"",
  guid:route.params.id
})

const Tlist = ref({});
const Noptions_ret2 = ref(false);
API.get("/api/group/get/"+route.params.id).then((sss) => {
  sss.entry.split(",").forEach((v) => {
    Tlist.value[v] = qtypes;
  });

  GroupDataPassed.value.title= grouptitle.value = sss.title;



  Promise.all(
    sss.entry.split(",").map(
      (v) =>
        new Promise((res, rej) => {
          API.get("/api/data/get/" + v).then((i) => {
            Tlist.value[v] = i;
          });
        })
    )
  ).then(() => {});
  // fetch("/api/get",{"method":"POST","body":JSON.stringify({id:v}),"headers":{"Content-Type":"application/json"}}).then(o=>o.json()).then(i=>{
  //     Tlist.value[v]=i
  // })
  // }))).then(()=>{

  // })
});

//adddddd

const _JSONparse = (v) => {
    return JSON.parse(v);
  },
  chunk2array = (mm) => Object.entries(mm).map((o) => o[1]);

const currentClicker = ref((v) => {});

const addExtBlank = (id) => {
  Tlist.value[id]._extb_height = (Tlist.value[id]._extb_height || 0) + 50;
  console.log(Tlist.value[id]._extb_height);
};

const printhelper_columns = ref(1);

const op2change = () => {
  localStorage.setItem(
    "___thost___html_export",
    document.getElementById("corehtml").outerHTML
  );
  router.push("/grouping/preexport-2/" + route.params.id);
};

const __Fontfamily = ref("Cambria , 宋体");
const fontreset = () => {
  __Fontfamily.value = "Times New Roman , 宋体!important";
};
const optiontableInit = () => {
  document.querySelectorAll("table[name=optionsTable]").forEach((v) => {
    if (v.querySelectorAll("td").length == 4) {
      console.log("oo", v);
      let opts = [],
        lns = 1;
      v.querySelectorAll("td").forEach((oo) => {
        opts.push(oo.outerHTML);
      });
      v.addEventListener("click", () => {
        console.log("click");
        const { ctn, next_lns } = toTable(opts, lns);
        v.innerHTML = ctn;
        lns = next_lns;
      });
    }
  });

  function toTable(opts, lns) {
    if (lns == 1) {
      return {
        ctn: "<tbody><tr>" + opts.join("") + "</tr></tbody>",
        next_lns: 2,
      };
    }
    if (lns == 2) {
      return {
        ctn: `<tbody><tr>${opts[0]}${opts[1]}</tr><tr>${opts[2]}${opts[3]}</tr></tbody>`,
        next_lns: 4,
      };
    }
    if (lns == 4) {
      return {
        ctn: "<tbody><tr>" + opts.join("</tr><tr>") + "</tr></tbody>",
        next_lns: 1,
      };
    }
  }
};

const HandleEnFormat = () => {};

const _LOG = console.log;















//---------------tour

// const _Tour__open=ref(false)
// const btn1=ref(null),btn2=ref(null),btn3=ref(null)

// const _Tour_step=[{
//     title: '调节标题格式',
//     description: '如果这是一张【整卷】，那么你需要将标题改为居中格式。单击一次此按钮。',

//     target: () => btn1.value && btn1.value.$el,
//   },{
//     title: '调节题号格式',
//     description: '如果这是一张【整卷】，那么你需要修改题号样式。单击一次此按钮。',

//     target: () => btn2.value && btn2.value.$el,
//   },{
//     title: '下一部分',
//     description: '单击此按钮进入下一部分',

//     target: () => btn3.value && btn3.value.$el,
//   }]
</script>

<style>
@media print {
  .noprint {
    display: none;
  }
}

.labi-container {
  display: block;
  height: fit-content;
  width: 100%;
  position: absolute;
  z-index: -1;
}

.labi-block {
  display: block;
  width: 100%;
  border-bottom-color: black;
  border-bottom-width: 2px;
  position: relative;
  border-bottom-style: dotted;
  text-align: right;
  right: 30px;
}

/* img { */
/* max-width: 350px; */
/* } */

td {
  padding: 0;
}
</style>


<!-- <style src="../../shared/zujuan-stupid-style-inject.css" /> -->
<style>
wave {
    text-decoration-style: wavy;
    text-decoration-line: underline;
    text-underline-position: auto;
    /* white-space: pre-wrap; */
}

dot{
    position: relative;
    text-emphasis-style: dot;
    text-emphasis-position: under left;
    text-emphasis-color: inherit;
    box-sizing: border-box;
    padding-top: .25rem
}

u {
    text-decoration: underline;
    text-underline-position: under;
    white-space: break-spaces
}

span>em {
    font-style: normal;
    font-weight: bold;
}
</style>