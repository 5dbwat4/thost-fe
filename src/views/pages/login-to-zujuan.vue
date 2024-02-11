<template>
 <n-card title="登录组卷服务器" style="margin-bottom: 16px;width: 500px;margin: auto auto;">
    <n-p>登录组卷服务器（<n-text code>zjappserver.xkw.com</n-text>），</n-p>
    <n-tabs type="line" animated>
        <n-tab-pane name="已登录" tab="logged" v-if="loggedin">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="token" tab="使用token登录">
        <n-input v-model:value="token" type="textarea" placeholder="请输入refreshToken"></n-input>
        <n-button type="primary" block secondary strong :loading="logginginState!=0" @click="checkRefreshToken">
          Sign In
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="password" tab="使用账号密码登录">
        <n-input v-model:value="loginConfig.username"  placeholder="请输入用户名"></n-input>
        <n-input v-model:value="loginConfig.password" type="password"  placeholder="请输入密码"></n-input>
        <n-button type="primary" block secondary strong :loading="logginginState!=0" @click="login">
          Sign In
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="sms" tab="使用手机验证码登录">
        <n-input v-model:value="loginConfig.phone"  placeholder="请输入手机号"></n-input>
        <n-button type="primary" block secondary strong :disabled="smsCodeSent"  @click="sendSmscode">
          发送验证码
        </n-button>
        <n-input v-model:value="loginConfig.smscode"  placeholder="请输入验证码"></n-input>
        <n-button type="primary" block secondary strong :loading="logginginState!=0" @click="loginByPhone">
          Sign In
        </n-button>
      </n-tab-pane>
    </n-tabs>
    </n-card>
</template>
<script setup>
import { NTabPane,NTab,NCard,NTabs,NP,NText ,NInput,NButton,NSpin} from "naive-ui";
import { ref } from "vue";
import { API } from "../../shared/APIHelper";
import md5 from "crypto-js/md5"
import encHex from "crypto-js/enc-hex"
import swal from "sweetalert"

const token=ref(""),loggedin=ref(false),smsCodeSent=ref(false),
/**
 * 0 means Null
 * 1 means logging in
 * 2 means success to get token,checking
 * 3 means success to get userinfo
 * 4 means error
 */
logginginState=ref(0),
loginConfig=ref({
    username:"",
    password:"",
    phone:"",
    smscode:""
})
if(localStorage.getItem("___5dbwat4_proj_zjapps_refreshToken")){
    token.value=localStorage.getItem("___5dbwat4_proj_zjapps_refreshToken")
}

//test000 -> password=59df0f6c2697815837cbe3b27501406f
console.log(md5("test000").toString(encHex));
const login=()=>{
//https://zjappserver.xkw.com/app-server/v1/user/loginByUserName
API.post("/api/xkw-helper/____sensitive/returnToken",{
    method:"POST",body:{
username:loginConfig.value.username,
password:md5(loginConfig.value.password).toString(encHex),
terminal:"app"

    },url:"/app-server/v1/user/loginByUserName"
}).then(vv=>{
  if(vv.data.code!=0){
    swal({
      title: "登陆失败",
      icon: "error",
      text:vv.data.msg
    })
  }else{
    console.log(vv.headers);
    token.value=vv.headers.refreshtoken
    console.log(token.value);
    checkRefreshToken()
  }

})
}

const sendSmscode=()=>{
    API.post("/api/xkw-helper/____sensitive/send",{
    method:"POST",body:{
phone:loginConfig.value.phone,
"templateType":"LOGIN"
    },url:"/app-server/v1/user/sendSmsCode"
}).then(vv=>{
  smsCodeSent.value=true
})
}
const loginByPhone=()=>{
    API.post("/api/xkw-helper/____sensitive/returnToken",{
    method:"POST",body:{
      "phone":loginConfig.value.phone,
      "terminal":"app",
      "validateCode":loginConfig.value.smscode
    },url:"/app-server/v1/user/loginByPhone"
}).then(vv=>{
  if(vv.data.code!=0){
    swal({
      title: "登陆失败",
      icon: "error",
      text:vv.data.msg
    })
  }else{
    token.value=vv.headers.refreshtoken
    checkRefreshToken()
  }

})
}

const checkRefreshToken=()=>{
  API.post("/api/xkw-helper/save_refreshtoken",{
    tkn:token.value
  }).then(()=>{
    API.post("/api/xkw-helper/____sensitive/get_zujuan_app_content",{
    method:"GET",url:"/app-server/v1/user/info"
}).then(vv=>{
  if(vv.code!=0){
    swal({
      title: "登陆失败",
      icon: "error",
      text:vv.data.msg
    })
  }else{
    localStorage.setItem("___5dbwat4_proj_zjapps_refreshToken",token.value)
    swal({
      title: "登陆成功",
      icon: "success",
      text:`已作为【${vv.data.username}】登录`
    })
  }
})
  })

}
</script>