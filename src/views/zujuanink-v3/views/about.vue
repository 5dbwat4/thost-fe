<template>
    <n-card>
  <n-h1>欢迎你使用 <n-text code>thost/zujuanink@1.3.0 </n-text> !</n-h1>
  <img style="width:250px" src="./assets/thost.svg"/>
  <n-p>Credits</n-p>
  <n-p>Programming: <n-text code>@5dbwat4</n-text></n-p>
  <n-p>试题数据来自  <n-button   text tag="a" href="https://zujuan.xkw.com" target="_blank" >组卷网</n-button>。</n-p>
  <n-button text @click="show3rdLicenses=true">查看开源许可证</n-button><br/>
  <n-button text @click="showChangelog=true">查看更新日志</n-button>
  <n-p>提示:build版提供了source-map,以<n-text code>build.sourcemap:"hidden"</n-text>的形式提供。</n-p>
 </n-card>


 <n-modal
    v-model:show="show3rdLicenses"
    class="custom-card"
    preset="card"
    style="width: 700px;"
    title="第三方开源许可证"
    size="huge"
    :bordered="false"
    :segmented="{
        content: 'soft',
        footer: 'soft'
      }"
  >
    <pre>{{_3rd_license_content}}</pre>
  </n-modal>

  
 <n-modal
    v-model:show="showChangelog"
    class="custom-card"
    preset="card"
    style="width: 700px;"
    title="Changelog"
    size="huge"
    :bordered="false"
    :segmented="{
        content: 'soft',
        footer: 'soft'
      }"
  >
    <pre>{{_changelog_content}}</pre>
  </n-modal>

  
</template>
<script setup>
import { NH1,NText,NCard,NP,NImage,NButton,NModal} from "naive-ui";
import { ref } from "vue";

import _3rd_license_content from "./assets/3rd-licenses"
import _changelog_content from "./assets/changelog"
const show3rdLicenses=ref(false)
const showChangelog=ref(false)
</script>