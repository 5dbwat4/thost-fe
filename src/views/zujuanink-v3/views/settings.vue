<template>
<n-card title="API鉴权" hoverable>
<n-spin :show="APIAuthRelatedRef.loading">
<div v-if="APIAuthRelatedRef.authed">
    <n-alert title="鉴权状态有效" type="success">
      当前使用的API地址为<n-text code>{{ APIAuthRelatedRef.APIURL }}</n-text>(共享自thost)<br/>
      如果您需要取消自动登录，请先撤销鉴权
    </n-alert>
    <n-button type="error" dashed @click="APIAuthRelated.logout" :loading="APIAuthRelatedRef.loginoutLoading">
      撤销鉴权
    </n-button>
</div>
<div v-else>
    <n-alert title="鉴权失败" type="warning">
      这可能会导致您无法使用<n-text code>thost/zujuanink</n-text>的一些功能。
    </n-alert>
    <n-p>您可以通过以下表单重新鉴权</n-p>
    <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
  <n-form-item label="API URL" path="inputValue">
      <n-input v-model:value="APIAuthRelatedRef.APIURL" disabled placeholder="e.g. https://api.example.com" />
    </n-form-item>
    <n-form-item label="Auth Code" path="inputValue">
      <n-input v-model:value="APIAuthRelatedRef.AuthCode" placeholder="e.g. authcode123456" type="password"/>
    </n-form-item>
    <n-form-item label="记住我的Auth Code" path="inputValue">
        <n-switch v-model:value="APIAuthRelatedRef.rememberAuthCode" />
    </n-form-item>
    <n-form-item label="自动登录" path="inputValue">
        <n-switch v-model:value="APIAuthRelatedRef.autologin" :disabled="!APIAuthRelatedRef.rememberAuthCode"/>
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
          <n-button  round  type="primary"  @click="APIAuthRelated.login" :loading="APIAuthRelatedRef.loginoutLoading" >     Authenticate     </n-button>
        </div>
        </n-form>

</div>
</n-spin>
</n-card>
<n-divider />
<n-card title="用户态" hoverable>
    <n-button ghost @click="destroyAllNotif">
      移除所有Notification（例如API错误）
    </n-button>

</n-card>

<n-divider/>
<n-card title="Notification" hoverable>
    <n-button ghost @click="destroyAllNotif">
      移除所有Notification（例如API错误）
    </n-button>

</n-card>

<n-divider/>
<n-card title="开发者选项" hoverable>
    <n-card title="window.*" >
        <n-collapse>
    <n-collapse-item title="window.TList" name="1">
      <pre>{{ GetWindowVar("TList") }}</pre>
    </n-collapse-item>
    <n-collapse-item title="window.bankid" name="2">
      <div>{{ GetWindowVar("bankid") }}</div>
    </n-collapse-item>
    </n-collapse>

</n-card>
<n-card title="SQL Inject" >
    <n-text>这也正是用户不应随意泄露自己的API地址的原因。正如你所见，任一获得了您的API地址和Auth Code的用户将拥有对您的后端数据库的绝对控制能力。</n-text>
    <NInputGroup>
<n-input v-model:value="devloperRef.sqlcontent" placeholder="Type your sql statement."></n-input>
<n-button @click="devloperMethod.execsql">EXEC</n-button>
</NInputGroup>
<pre>{{ devloperRef.sqlresult }}</pre>
</n-card>
</n-card>
</template>
<script setup>
import { NText,NButton,NForm,NFormItem,NCard,NSpin,NAlert,NInput,NP,NSwitch,NDivider,NCollapse,NCollapseItem, NInputGroup } from 'naive-ui';
import { API,destroyAllNotif } from '../../../shared/APIHelper';
import { ref } from "vue";
import swal from 'sweetalert';
// import { useStorage } from '@vueuse/core'


//API Auth Logic
const APIAuthRelatedRef=ref({
    authed:false,
    loading:true,
    APIURL:"",
    AuthCode:"",
    loginoutLoading:false,
    rememberAuthCode:false,
    autologin:false
})
const APIAuthRelated={
    logout:()=>{
        APIAuthRelatedRef.value.loginoutLoading=true
        API.get("/zujuan-ink-be-core/auth/json/logout").then(v=>{
            APIAuthRelatedRef.value.loginoutLoading=false
            APIAuthRelatedRef.value.loading=true
            localStorage.removeItem("__thost_zujuanink_auth")
            API.get("/zujuan-ink-be-core/auth/status").then(v=>{
    APIAuthRelatedRef.value.authed=v.auth
    APIAuthRelatedRef.value.loading=false
})
        })
    },
    login:()=>{
        APIAuthRelatedRef.value.loginoutLoading=true
        API.post("/zujuan-ink-be-core/auth/json/login",{password:APIAuthRelatedRef.value.AuthCode}).then(v=>{
            APIAuthRelatedRef.value.loginoutLoading=false
            if(v.auth){
            APIAuthRelatedRef.value.loading=true
            if(APIAuthRelatedRef.value.rememberAuthCode){

                localStorage.setItem("__thost_zujuanink_auth",JSON.stringify({
                    autologin:APIAuthRelatedRef.value.autologin,
                    rememberAuthCode:APIAuthRelatedRef.value.rememberAuthCode,
                    authcode:APIAuthRelatedRef.value.AuthCode
                }))
            }
            API.get("/zujuan-ink-be-core/auth/status").then(v=>{
    APIAuthRelatedRef.value.authed=v.auth
    APIAuthRelatedRef.value.loading=false
})
            }else{
                swal({
                    icon:"error",
                    title:"鉴权失败"
                })
            }
        })
    }
}
APIAuthRelatedRef.value.APIURL=API.host
API.get("/zujuan-ink-be-core/auth/status").then(v=>{
    APIAuthRelatedRef.value.authed=v.auth
    APIAuthRelatedRef.value.loading=false
})
// const APIAuthSettings = useStorage('__thost_zujuanink_auth', { autologin:false,authcode:"" })






const GetWindowVar=(r)=>window[r]
const devloperRef=ref({sqlcontent:"",sqlresult:null})
const devloperMethod={
    execsql:()=>{
        API.post("/zujuan-ink-be-core/----=-SQL/----exec-",{
            "st":devloperRef.value.sqlcontent
        })
    }
}
</script>

