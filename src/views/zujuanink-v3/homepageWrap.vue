<template>
        <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
      
      >
 <n-menu :options="menuOptions" 
  :default-expanded-keys="['do-it']"/>

</n-layout-sider>
      <n-layout>
        <!-- <span>内容</span>    
        <n-button @click="$router.push('./preparing-room')">开始刷组卷网</n-button>
    <n-button @click="$router.push('./preparing-room/paper')">开始刷套卷</n-button>
    <n-button @click="$router.push('./list/failedcoll')">错题本</n-button>
    <n-button @click="$router.push('./list/coll')">好题本</n-button>
    <n-button @click="$router.push('./records')">做题记录</n-button> -->
    <router-view>
</router-view>
      </n-layout>
    </n-layout>
</template>

<script setup>

import {ProjRoutePrefix} from "./CONFIG.js"


import { NButton,NMenu,NLayout,NLayoutSider } from "naive-ui";
import { defineComponent, h, shallowRef } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink, onBeforeRouteUpdate,RouterView } from "vue-router";
import {
  BookOutline as BookIcon,
  StatsChartOutline as StatsChartIcon,
  SettingsOutline as SettingsIcon,
  HomeOutline as HomeIcon,
  FootstepsOutline,EllipsisHorizontalOutline,PencilOutline,HelpCircleOutline
} from "@vicons/ionicons5";
import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()



const maincomp=shallowRef()



const RenderRouterLinkA=(name,path)=>{
  return () =>
      h(
        RouterLink,
        {
          to: ProjRoutePrefix+path
        },
        { default: () => name }
      )
}


function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: RenderRouterLinkA("主页","/home"),
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
    icon: renderIcon(PencilOutline),
    children: [
      {
        label: RenderRouterLinkA("刷组卷网","/preparing-room/queslist"),
        key: "do-ques",
        icon: renderIcon(PencilOutline),
      },
      {
        label: RenderRouterLinkA("刷套卷","/preparing-room/paper"),
        key: "do-papers",
        icon: renderIcon(PencilOutline),
      },
      {
        label: RenderRouterLinkA("刷错题","/preparing-room/incorr-coll"),
        key: "do-failcoll",
        icon: renderIcon(PencilOutline),
      },
      {
        label: RenderRouterLinkA("更多","/preparing-room/all"),
        key: "do-more",
        icon: renderIcon(EllipsisHorizontalOutline),
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
    icon: renderIcon(FootstepsOutline),
    children: [
      {
        label: RenderRouterLinkA("错题集","/list/incorr-coll"),
        key: "record-fail",
        icon: renderIcon(BookIcon),
      },
      {
        label: RenderRouterLinkA("好题本","/list/coll"),
        key: "record-good",
        icon: renderIcon(BookIcon),
      },
      {
        label: RenderRouterLinkA("刷题记录","/records"),
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
    label: RenderRouterLinkA("统计","/stats"),
    key: "statistics",
    icon: renderIcon(StatsChartIcon)
    
  },{
    label: RenderRouterLinkA("导出","/export/tl"),
    key: "export",
    icon: renderIcon(StatsChartIcon)
    
  },{
    label: RenderRouterLinkA("设置","/settings"),
    key: "settings",
    icon: renderIcon(SettingsIcon)
    
  },{
    label: RenderRouterLinkA("关于","/about"),
    key: "about",
    icon: renderIcon(HelpCircleOutline)
    
  }
];

onBeforeRouteUpdate((to,from)=>{

})






//Autologin logic block

</script>