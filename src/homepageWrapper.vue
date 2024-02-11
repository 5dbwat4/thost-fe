<template>
    <n-layout has-sider  position="absolute">
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger
  
  >
<n-menu :options="menuOptions" 
:default-expanded-keys="['exam','local']"/>

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
<n-layout-footer
        bordered
        style="text-align: center; padding: 20px;"
      >
        {{ ThostCONFIG.name }} {{ ThostCONFIG.version }} | Made by {{ ThostCONFIG.creater5dbwat4 }}
      </n-layout-footer>
  </n-layout>
</n-layout>
</template>

<script setup>

import {ProjRoutePrefix,ThostCONFIG} from "./CONFIG.js"


import { NButton,NMenu,NLayout,NLayoutSider,NLayoutFooter } from "naive-ui";
import { defineComponent, h, shallowRef } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink, onBeforeRouteUpdate,RouterView } from "vue-router";
import {
BookOutline as BookIcon,
StatsChartOutline as StatsChartIcon,
SettingsOutline as SettingsIcon,
HomeOutline as HomeIcon,
FootstepsOutline,EllipsisHorizontalOutline,PencilOutline,HelpCircleOutline,ReceiptOutline,
DocumentsOutline,AddCircleOutline,FileTrayFullOutline,FolderOutline
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
label: "题目",
key: "exam",
icon: renderIcon( DocumentsOutline),
children: [
  {
    label: RenderRouterLinkA("题单","/grouping/list"),
    key: "do-ques",
    icon: renderIcon(ReceiptOutline),
  },
  {
    label: RenderRouterLinkA("试题","/list"),
    key: "do-papers",
    icon: renderIcon(ReceiptOutline),
  },
  {
    label: RenderRouterLinkA("新建题单","/batching/syncbatch"),
    key: "new",
    icon: renderIcon(AddCircleOutline),
  }
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
label: "本地资源",
key: "local",
icon: renderIcon(FileTrayFullOutline),
children: [
  {
    label: RenderRouterLinkA("学科网","/local/zxxk"),
    key: "record-fail",
    icon: renderIcon(BookIcon),
  },
  {
    label: RenderRouterLinkA("自制资源","/local/ranword"),
    key: "record-good",
    icon: renderIcon(FolderOutline),
  },
  {
    label: RenderRouterLinkA("更多","/local/more-cate"),
    key: "record-rec",
    icon: renderIcon(EllipsisHorizontalOutline),
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
// label: RenderRouterLinkA("统计","/stats"),
// key: "statistics",
// icon: renderIcon(StatsChartIcon)

// },{
// label: RenderRouterLinkA("导出","/export/tl"),
// key: "export",
// icon: renderIcon(StatsChartIcon)

// },{
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