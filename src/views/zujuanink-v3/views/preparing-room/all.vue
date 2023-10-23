<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing title="刷组卷网" content-style="margin-top: 10px;" @click="$router.push('/zujuanink/preparing-room/queslist')">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              Hot
            </n-tag>
            <n-tag :bordered="false" type="success" size="small">
              组卷网
            </n-tag>
          </n-space>
        </template>
        数据来源：<n-text code>zujuanappserver.xkw.com/app-server/v1/ques/list/</n-text>
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="刷套卷" content-style="margin-top: 10px;" @click="$router.push('/zujuanink/preparing-room/paper')">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              Hot
            </n-tag>
            <n-tag :bordered="false" type="success" size="small">
              组卷网
            </n-tag>
          </n-space>
        </template>
        数据来源：<n-text code>zujuanappserver.xkw.com/app-server/v1/paper/detail/:bankid/:PaperId</n-text>
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="刷个人题库" content-style="margin-top: 10px;" @click="$router.push('/zujuanink/preparing-room/userbank')">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="success" size="small">
              组卷网
            </n-tag>
          </n-space>
        </template>
        数据来源：<n-text code>zujuanappserver.xkw.com/app-server/v1/userBank/ques/list</n-text>
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="刷试题篮" content-style="margin-top: 10px;" @click="$router.push('/zujuanink/preparing-room/basket')">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="success" size="small">
              组卷网
            </n-tag>
          </n-space>
        </template>
        数据来源：<n-text code>zujuanappserver.xkw.com/app-server/v1/basket/:subjectId</n-text>
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="刷错题本" content-style="margin-top: 10px;" @click="$router.push('/zujuanink/preparing-room/incorr-coll')">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="success" size="small">
              Local
            </n-tag>
          </n-space>
        </template>
        推荐从<n-button text @click="$router.push('/zujuanink/list/incorr-coll')">错题本</n-button>页面进入
      </n-thing>
    </n-list-item>
  </n-list>
</template>
<script setup>
import { NList,NListItem,NThing,NTag,NSpace,NButton,NText } from "naive-ui";
</script>