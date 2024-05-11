<!-- @format -->

<template>
  <n-back-top></n-back-top>
  <n-button-group>
  <n-button class="noprint" @click="shown.q = !shown.q">Q</n-button>
  <!-- <n-button class="noprint" @click="shown.a = !shown.a">A</n-button>
  <n-button class="noprint" @click="shown.p = !shown.p">P</n-button> -->
  <n-button class="noprint" @click="getAllAP">显示全部答案解析</n-button>
  <n-button
    class="noprint"
    @click="router.push('/grouping/preexport-1/' + route.params.id)"
    >开始排版</n-button
  >
  <n-dropdown :options="MorePrintOptions">
      <n-button>
      <template #icon>
        <n-icon :component="EllipsisVerticalOutline"></n-icon>
      </template>
    </n-button>
  </n-dropdown>

  <n-button
    class="noprint"
    @click="router.push('/export/' + route.params.id + '/a')"
    >打印答案</n-button
  >

  <!-- <n-button class="noprint" @click="markAsDoneAll"
    >将本group内所有试题标记为done</n-button
  > -->
</n-button-group>
  <!-- <n-checkbox
    class="noprint"
    v-model:checked="displayADirectly"
    @update:checked="handledisplayADirectlyCheckedChange"
  >
    直接从组卷网获取答案解析数据而非从oss缓存
  </n-checkbox> -->

  <div :style="{ width: '18.76cm', 'line-height': 'normal' }" id="oonom">
    <div class="noprint">
      <!-- <div class="labi-container">
            <div class="labi-block" v-for="rr in [1,2,3,4,5,6,7]" :key="rr" 
    :style="{height:1045+'px'}">Page # {{rr}}</div>
    </div> -->
    </div>
    <n-anchor
      class="noprint"
      :show-rail="true"
      :show-background="true"
      style="position: fixed; right: 100px"
    >
      <n-anchor-link
        :title="'第' + (i + 1) + '题'"
        v-for="(oo, i) in chunk2array(Tlist)"
        :href="'#' + (i + 1)"
      />
    </n-anchor>

    <n-table  striped>
    <tbody>
      <tr>
        <td>Title ...   <n-button text @click="router.push('/grouping/rename/' + route.params.id)"
    >修改</n-button
  ></td>
        <td>{{groupInfo.title}}</td>
      </tr>      
      <tr>
        <td>Updated at</td>
        <td>{{(new Date(groupInfo.timestamp)).toLocaleDateString()}}</td>
      </tr>  
      <tr>
        <td>学科</td>
        <td>{{subjectsmapFlattened[""+groupInfo.bankid]}}</td>
      </tr>  
      <tr>
        <td>备注...<n-button text @click="router.push('/grouping/edit-desc/' + route.params.id)">编辑</n-button></td>
        <td>{{groupInfo.desc}}</td>
      </tr>  
      <tr>
        <td>ID</td>
        <td>{{ groupInfo.id }}</td>
      </tr>

      <tr>
        <td>题量</td>
        <td>{{groupInfo.entry.split(",").length}}</td>
      </tr>
    </tbody>
  </n-table>
    <n-image-group>
      <div
        id="corehtml"
        :style="{ width: '18.76cm', columns: 1, 'line-height': 'normal' }"
      >

        <div v-for="(oo, i) in chunk2array(Tlist)" :key="oo.id" :id="i + 1">
          <p style="font-size: 9.5pt; margin: 0px; font-family: Cambria, 仿宋">
            UUID:<span style="font-family: 'courier new'">{{ oo.id }}</span> |
            qid:<span style="font-family: 'courier new'">{{ oo.qid }}</span>
            <span v-if="shown.q"
              >| {{ quesTypeList["" + oo.bankid]["" + oo.type] }} |
              {{ diffMap["" + oo.diff] }} | Origin: {{ oo.origin }}</span
            >
          </p>
          <div
            v-if="shown.q"
            v-html="normalizeq(oo.q, { ret2: Noptions_ret2, tindex: i + 1 })"
            :style="{ fontSize: '12pt', fontFamily: 'Cambria' }"
          ></div>
          <div
            v-if="shown.q"
            :style="{ display: 'block', height: (oo._extb_height || 0) + 'px' }"
          ></div>


            <n-image
              v-if="showTL [oo.id]"
              lazy
              :src="(XKWGetFile[oo.id] || { a: '' }).a"
              :width="700"
              ><template #placeholder><n-spin /></template
            ></n-image>
            <n-image
              v-if="showTL[oo.id]"
              lazy
              :src="(XKWGetFile[oo.id] || { p: '' }).p"
              :width="700"
              ><template #placeholder><n-spin /></template
            ></n-image>

            <div>
          </div>
          <!-- <n-button class="noprint" text @click="markAsDone(oo)"
            >标记为已完成</n-button
          >
          <n-text class="noprint">完成状态：{{ doneinfo[oo.id] }}</n-text> -->
          <n-space  vertical>
          <div><n-button class="noprint" @click="getsingleAP(oo)"
            >显示本题答案</n-button
          >          <n-button class="noprint" @click="router.push('/view/'+oo.id)"
            >Single</n-button
          ></div>
          <!-- <n-button class="noprint" @click="$router.push('/mistakes_coll/coll_by_ques/'+oo.id)"
            >收录错题</n-button
          > -->
          <miscoll-banner :id="oo.id"/>
        </n-space>
          <n-divider/>
        </div>
      </div>
    </n-image-group>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute(),
  router = useRouter();

import {
  NButton,
  NCheckbox,
  NP,
  NSpin,NTable,
  NImage,NDivider,NSpace,
  NImageGroup,
  NText,NDropdown,NIcon,
  NAnchor,NButtonGroup,
  NAnchorLink,
} from "naive-ui";

import { normalizeq } from "../../shared/normalize_q/toScreenDisplay";
import { qtypes } from "../../shared/define_basic_qtypes";
import { API } from "../../shared/APIHelper";
import subjectsmapFlattened from "../../shared/base-zj-data/subjects-flattened-reversed.json";
import quesTypeList from "../../shared/base-zj-data/questypeList.flattened.json";
import diffMap from "../../shared/base-zj-data/diff.map.json";
import MiscollBanner from "../mistakes_coll/miscoll-banner.vue";
import swal from "sweetalert";
import {EllipsisVerticalOutline}from "@vicons/ionicons5"
const shown = ref({
  q: true,
  a: false,
  p: false,
});

/**
 * showTL[id]=true/false
 */
const showTL = ref({});

const Noptions_ret2 = ref(false);
const grouptitle = ref(""),groupInfo=ref({
    "id": "...",
    "entry": "...",
    "timestamp": 10,
    "bankid": 11,
    "title": "【标题】",
    "desc": "",
    "tags": null
});

const Tlist = ref({});
let groupentry = [];
API.get("/api/group/get/" + route.params.id).then((sss) => {
  sss.entry.split(",").forEach((v) => {
    Tlist.value[v] = qtypes;
  });

  groupentry = sss.entry.split(",");

  grouptitle.value = sss.title;
  
  groupInfo.value=sss
  Promise.all(
    sss.entry.split(",").map(
      (v) =>
        new Promise((res, rej) => {
          API.get("/api/data/get/" + v).then((i) => {
            Tlist.value[v] = i;
          });
          GetDoneInfo(v);
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
};

const 
// doneinfo = ref({}),
  chunk2array = (mm) => Object.entries(mm).map((o) => o[1]);

const markAsDone = async (rel) => {
  console.log(rel);
  await API.post("/api/qapi/doneinfo/mark", {
    quuid: rel.id,
    timestamp: new Date().getTime(),
    displayednote: "",
    note: "",
    rate: 50,
    bankid: rel.bankid,
  });
};

const markAsDoneAll = async () => {
  Promise.all(Object.entries(Tlist.value).map((rr) => markAsDone(rr[1]))).then(
    (v) => {
      swal("ok.");
    }
  );
};

// const GetDoneInfo = async (id) => {
//   doneinfo.value[id] = await API.get("/api/qapi/doneinfo/getbyquuid/" + id);
// };

const displayADirectly = ref(false),
  XKWGetFile = ref({});

const getAllAP=()=>{
  Object.entries(Tlist.value).forEach((v1) => {
    getsingleAP(v1[1])
  })
}
const getsingleAP=(vs)=>{
  API.get("/api/xkw-helper/getCachedImg/"+vs.bankid+"/"+vs.qid+"/600").then(r=>{
        XKWGetFile.value[vs.id]={
            a:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.answer.replace("@2","@3")),
            p:API.host+"/api/xkw-helper/route-pic?purl="+btoa(r.parse.replace("@2","@3")),
        }
        showTL.value[vs.id]=true
        
})
}




const MorePrintOptions=[
        {
          label: "生成Word版",
          key: "export-word-v",
          // icon: renderIcon(AddCircleOutline),
          props: {
            onClick: () => {
              // router_push(router,"/ftc/manualadd?bankid="+bankid.value)
              router.push('/grouping/preexport-1/' + route.params.id + '/word_tailored_version')
            }
          }
        },        {
          label: "已排版的内容",
          key: "historyCode",
          // icon: renderIcon(ExitOutline),
          props: {
            onClick: async() => {
              // window.vhtmlTemplate=await generateExpHTMLCode(FailedColl.value,exportEXT.value)
              // router_push(router,"/ftc/export")
              API.get("/api/group/getExported/"+route.params.id).then(oc=>{
                localStorage.setItem("___thost___html_export",oc.htmlcode)
                router.push("/paper/"+route.params.id)
              })
            }
          }
        },    {
          label: "将本卷的试题加入basket",
          key: "addtoBasket",
          // icon: renderIcon(ExitOutline),
          props: {
            onClick: async() => {
              API.post("/api/xkw-helper/relay-proxy/addtoBasket/"+groupInfo.value.bankid,{
              // console.log({
                ids:groupInfo.value.entry.split(",").map((om)=>{
                  return Tlist.value[om].qid
                }).join(",")
              // })
              })
            }
          }
        },       {
          label: "在学科网搜索这张卷子",
          key: "searchFromZxxk",
          // icon: renderIcon(ExitOutline),
          props: {
            onClick: async() => {
              // window.vhtmlTemplate=await generateExpHTMLCode(FailedColl.value,exportEXT.value)
              // router_push(router,"/ftc/export")
              window.open("https://search.zxxk.com/doc/?kw="+grouptitle.value)
            }
          }
        }
      ]

// const handledisplayADirectlyCheckedChange = (checked) => {
//   // console.log(checked);
//   displayADirectly.value = checked;
//   if (displayADirectly.value) {
//     Object.entries(Tlist.value).forEach((v1) => {
//       console.log(v1);
//       API.get(
//         "/api/xkw-helper/get_more_detail/600/" + v1[1].bankid + "/" + v1[1].qid
//       ).then((r) => {
//         XKWGetFile.value[v1[1].id] = {
//           a:
//             API.host +
//             "/api/xkw-helper/route-pic?purl=" +
//             btoa(r.data.answerImg.replace("@2", "@3").replace("c2", "c1")),
//           p:
//             API.host +
//             "/api/xkw-helper/route-pic?purl=" +
//             btoa(r.data.parseImg.replace("@2", "@3").replace("c2", "c1")),
//         };
//       });
//     });
//   }
// };
</script>

<style>
@media print {
  .noprint {
    display: none;
  }
}

/* .noprint{
    user-select: none;
} */

/* .labi-container{
    display: block;
    height: fit-content;
    width: 100%;
    position: absolute;
    z-index: -1;
}
.labi-block{
    display: block;
    width: 100%;
    border-bottom-color: black;
    border-bottom-width: 2px;
    position:relative;
    border-bottom-style: dotted;
    text-align:right;
} */

td {
  padding: 0;
}
</style>
<style scoped>
img {
  max-width: 700px;
}
</style>

<!-- <style src="../../shared/zujuan-stupid-style-inject.css" /> -->
<style scoped>
wave {
  text-decoration-style: wavy;
  text-decoration-line: underline;
  text-underline-position: auto;
  /* white-space: pre-wrap; */
}

dot {
  position: relative;
  text-emphasis-style: dot;
  text-emphasis-position: under left;
  text-emphasis-color: inherit;
  box-sizing: border-box;
  padding-top: 0.25rem;
}

u {
  text-decoration: underline;
  text-underline-position: under;
  white-space: break-spaces;
}

span > em {
  font-style: normal;
  font-weight: bold;
}
</style>
