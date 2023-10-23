<template>
    <n-modal v-model:show="showM">
        <n-card>
        <n-input placeholder="Title" v-model:value="title"/>
        <n-input placeholder="Desc" type="textarea"  v-model:value="desc"/>
        <n-button @click="saveasGroup()">save</n-button>
        </n-card>
    </n-modal>
    <n-button @click="showM=true">save</n-button>
    <n-button v-if="groupsaved" @click="GotoGroup()">View</n-button>
</template>

<script setup>
    import {
        NButton,
        NInput,NModal,NCard
    } from "naive-ui";
    import {
      ref,
        useAttrs
    } from "vue";
import {useRoute,useRouter} from "vue-router"
import { API } from "../../shared/APIHelper";
const route=useRoute(),router=useRouter()

    const attrs = useAttrs()

    const saveasGroup = async () => {
        API.post("/api/group/new",{
                entry: attrs.ql,
                timestamp: (new Date()).getTime(),
                title:title.value,
                desc:desc.value
            }).then(i => {
        // fetch("/api/group/new", {
        //     "method": "POST",
        //     "body": JSON.stringify({
        //         entry: attrs.ql,
        //         timestamp: (new Date()).getTime(),
        //         title:title.value,
        //         desc:desc.value
        //     }),
        //     "headers": {
        //         "Content-Type": "application/json"
        //     }
        // }).then(o => o.json()).then(i => {
            groupsaved.value = true
            groupid.value = i.id
        })
    }, groupsaved = ref(false), groupid = ref(""), GotoGroup = async () => {
        router.push("/group/" + groupid.value)
    }, showM = ref(false)
    ,title=ref(""),desc=ref("")
</script>

<style>

</style>