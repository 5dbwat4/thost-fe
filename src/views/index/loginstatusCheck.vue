<template>
<p>登陆状态：{{ loginStates }}</p>
<n-button @click="$router.push('./login')">改变登陆状态</n-button>
</template>
<script setup>
import { ref } from "vue";
import { API } from "../../shared/APIHelper";
import { NButton } from "naive-ui";



const loginStates=ref("")
API.post("/api/xkw-helper/____sensitive/get_zujuan_app_content",{
    method:"GET",url:"/app-server/v1/user/info"
}).then(vv=>{
  if(vv.code!=0){
    loginStates.value="未登录或登录失效"
  }else{
    loginStates.value=`已作为【${vv.data.username}】登录`
  }
})
</script>