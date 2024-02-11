<template>
<n-button-group>
<n-button secondary @click="$router.push('./ranword/view?filename='+$attrs.filename)">浏览</n-button>
<n-button secondary  type="success" @click="openLocally($attrs.filename)">打开</n-button>
  <n-dropdown :options="options">
    <n-button>
      <template #icon>
        <n-icon :component="EllipsisVerticalOutline"></n-icon>
      </template>
    </n-button>
  </n-dropdown>


<!-- <n-button secondary  type="error">删除</n-button> -->
</n-button-group>
</template>
<script setup>
import { NButtonGroup,NButton,NDropdown,NIcon } from "naive-ui";
import { API } from "../../shared/APIHelper";
import { EllipsisVerticalOutline,TrashOutline } from "@vicons/ionicons5";
import { h, ref, useAttrs } from "vue";


const attrs=useAttrs()

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};
const options=[
        {
          label: "删除",
          key: "manualAdd",
          icon: renderIcon(TrashOutline),
          props: {
            onClick: () => {
              
              
            }
          }
        },        {
          label: "重命名",
          key: "export",
        //   icon: renderIcon(ExitOutline),
          props: {
            onClick: () => {
              
            }
          }
        },        {
          label: "在独立页面中打开",
          key: "open",
        //   icon: renderIcon(ExitOutline),
          props: {
            onClick:()=>{
              window.open(API.host+"/api/local/ranword/file/"+attrs.filename)
            }
          }
        }
      ]


const openLocally=(fn)=>{
    API.post("/api/local/ranword/open",{
        filename:fn
    })
}
</script>