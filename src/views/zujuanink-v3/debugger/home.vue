<template>
        <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
 <n-menu :options="menuOptions" @update:value="handleUpdateValue" />

</n-layout-sider>
      <n-layout>
        <span>内容</span>    
        <n-button @click="$router.push('./preparing-room')">开始刷组卷网</n-button>
    <n-button @click="$router.push('./preparing-room/paper')">开始刷套卷</n-button>
    <n-button @click="$router.push('./list/failedcoll')">错题本</n-button>
    <n-button @click="$router.push('./list/coll')">好题本</n-button>
    <n-button @click="$router.push('./records')">做题记录</n-button>
    <n-button @click="$router.push('./hometest2')">test</n-button>
      </n-layout>
    </n-layout>
</template>

<script setup>
import { NButton,NMenu,NLayout,NLayoutSider } from "naive-ui";
import { defineComponent, h } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: "./home"
      },
      { default: () => "主页" }
    ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon)
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px"
      }
    }
  },{
    label: "刷题",
    key: "do-it",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "刷组卷网",
        key: "do-ques",
        icon: renderIcon(BookIcon),
      },
      {
        label: "刷套卷",
        key: "do-papers",
        icon: renderIcon(BookIcon),
      },
      {
        label: "刷错题",
        key: "do-failcoll",
        icon: renderIcon(BookIcon),
      },
      {
        label: "更多",
        key: "do-more",
        icon: renderIcon(BookIcon),
      },
    ]
  },{
    key: "divider-2",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px"
      }
    }
  },{
    label: "记录",
    key: "record",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "错题集",
        key: "record-fail",
        icon: renderIcon(BookIcon),
      },
      {
        label: "好题本",
        key: "record-good",
        icon: renderIcon(BookIcon),
      },
      {
        label: "刷题记录",
        key: "record-rec",
        icon: renderIcon(BookIcon),
      }
    ]
  },{
    key: "divider-3",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px"
      }
    }
  },{
    label: "统计",
    key: "statistics",
    icon: renderIcon(BookIcon)
    
  },{
    label: "设置",
    key: "settings",
    icon: renderIcon(BookIcon)
    
  }
];

</script>