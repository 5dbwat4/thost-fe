<template>
    <n-modal :show="true">
        <div>
            <n-card style="width: 600px" title="你可能需要指定一个API地址" :bordered="false" size="huge" role="dialog"
                aria-modal="true" v-if="Status=='unspecified'">
                <n-p>你需要配合一个后端API才能正常的使用thost的相关功能。这就要求你指定一个API地址。</n-p>
                <n-p>本版本的thost所需的API为：<n-text code>_5dbwat4_proj_thost_r3_be</n-text> 版本为 <n-text code>r3</n-text>
                </n-p>
                <n-divider />
                <n-input-group>
                    <n-input v-model:value="apihost" />
                    <n-button type="primary" :loading="checkAPIStatusStatement=='checking'" @click="checkAPIStatus">
                        检查API状态
                    </n-button>
                </n-input-group>
                <n-alert title="API地址验证成功" type="success" v-if="checkAPIStatusStatement=='success'">
                    <n-p>API验证成功。开始使用thost吧！</n-p>
                    <n-button type="primary" @click="ConfirmAH" :disabled="checkAPIStatusStatement!='success'">确定
                    </n-button>
                </n-alert>
                <n-alert title="API地址验证失败" type="error" v-if="checkAPIStatusStatement=='error'">
                    API验证失败。以下是相关信息:
                    <n-log :log="APICheckLog"  :rows="5"/>
                </n-alert>
                <template #footer>

                </template>
            </n-card>
            <n-card style="width: 600px" title="我们需要确认你指定的API地址是可用的" :bordered="false" size="huge" role="dialog"
                aria-modal="true" v-if="Status=='checking'">
                <n-p>你需要配合一个后端API才能正常的使用thost的相关功能。你之前可能已经指定过一个。我们需要确认你指定的API地址是可用的。</n-p>
                <n-p>本版本的thost所需的API为：<n-text code>{{ALLOWED_API_ENTITY}}</n-text> 版本为 <n-text code>r3</n-text>
                </n-p>
                <n-p>您指定的API地址是<n-text code>{{apihost}}</n-text><n-button type="text" @click="Status='unspecified',checkAPIStatusStatement='nothing'">(更换API地址)</n-button>
                </n-p>
                
                <n-divider />
                <n-spin :show="checkAPIStatusStatement=='checking'">
                    <n-alert title="正在等待响应" type="info" v-if="checkAPIStatusStatement=='checking'">
                    </n-alert>
                </n-spin>
                <n-alert title="API地址验证成功" type="success" v-if="checkAPIStatusStatement=='success'">
                    <n-p>API验证成功。开始使用thost吧！</n-p>
                    <n-button type="primary" @click="ConfirmAH" :disabled="checkAPIStatusStatement!='success'">确定
                    </n-button>
                    <n-p>以后加载完成后总是自动进入主页面  <n-switch v-model:value="Settings.enterImmediatelyAfterCheckingAPI" /></n-p>
                    
                </n-alert>
                <n-alert title="API地址验证失败" type="error" v-if="checkAPIStatusStatement=='error'">
                    API验证失败。以下是相关信息:
                    <n-log :log="APICheckLog" :rows="5"/>
                </n-alert>
                <template #footer>
                </template>
            </n-card>
            <n-card style="width: 600px" title="Waiting" :bordered="false" size="huge" role="dialog" aria-modal="true"
                v-if="Status=='waiting'">
                正在运行逻辑，请稍等。
            </n-card>
        </div>
    </n-modal>
</template>

<script setup>
    import {
        NCard,
        NModal,
        NText,
        NDivider,
        NInputGroup,
        NInput,
        NButton,
        NLog,
        NSpin,
        NAlert,NSwitch,
        NP
    } from "naive-ui";
    import {
        ref
    } from "vue";
    import {
        emitEvent
    } from "../../shared/globalEventMessageHelper";


    const ALLOWED_API_ENTITY = "_5dbwat4_proj_thost_r3_be"

    const Status = ref("waiting"),
        apihost = ref("https://example.com")


    const checkAPIStatusStatement = ref("n")
    const checkAPIStatus = () => {
        checkAPIStatusStatement.value="checking"
        fetch(apihost.value + "/api/whoareyou").then(v => v.json()).then(r => {
            if (r.entity == ALLOWED_API_ENTITY) {
                checkAPIStatusStatement.value = "success"
                if(Settings.value.enterImmediatelyAfterCheckingAPI){
                    ConfirmAH()
                }
            } else {
                checkAPIStatusStatement.value = "error"
                APICheckLog.value = "Not Match.==>\n" + JSON.stringify(r, null, 4)
            }
        }).catch(w => {
            checkAPIStatusStatement.value = "error"
            APICheckLog.value = "Error Fetching.==>\n" + w
        })
    }

    const APICheckLog = ref("nothing")

    const ConfirmAH = () => {
        localStorage.setItem("__5dbwat_proj__thost_apihost", apihost.value)
        console.log("xxx");
        localStorage.setItem("__5dbwat_proj__thost_preference",JSON.stringify(Settings.value))
        emitEvent("entryAllowStateUpdate", [true])
    }

    if (!localStorage.getItem("__5dbwat_proj__thost_apihost")) {
        Status.value = "unspecified"
    } else {
        apihost.value = localStorage.getItem("__5dbwat_proj__thost_apihost")
        Status.value = "checking"
        checkAPIStatus()
    }

 
 
 
 const Settings=ref(JSON.parse(localStorage.getItem("__5dbwat_proj__thost_preference")||'{"enterImmediatelyAfterCheckingAPI":false}'))

 import { initAPINotif } from "../../shared/APIHelper";
 initAPINotif()


</script>

<style>

</style>