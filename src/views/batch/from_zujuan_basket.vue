<template>
    <n-alert type="warning">
        请您知悉，试题篮属于是与个人信息相连的敏感数据，数据取决于您保存于后端的token。请确认您在后端提供了正确的token信息。
    </n-alert>
    <n-card hoverable>
        The best practice is:<br/>
        先在组卷网的网页端中找到所有想收录的题目，将它们加入试题篮，然后再回来，选择学科，并单击ENTER.
        <n-cascader
          v-model:value="bankid"
          :options="subjectsmap"
          check-strategy="child"
          :show-path="true"
        />
        <n-input v-model:value="iiiiititle"></n-input>
        <n-button @click="enterRoom">ENTER</n-button>
        <n-button v-if="groupsaved" @click="$router.push('/group/'+groupid)">View</n-button>

    </n-card>
    </template>
    <script setup>
    import { NAlert,NCard,NInputNumber,NButton,NCascader,NInput } from 'naive-ui';
    import { ZujuanAPI } from '../../shared/zujuan-api';
    import {ref} from "vue"
    import subjectsmap from "../../shared/subjects.json"
    
    import { useRouter,useRoute } from "vue-router";
import { API } from '../../shared/APIHelper';
    const router=useRouter(),route=useRoute()
    const bankid=ref(15),iiiiititle=ref("")
    const saveGroupLoading=ref(false),groupsaved=ref(false),groupid=ref("")
    const enterRoom=async()=>{
        // ZujuanAPI("/app-server/v1/basket/"+bankid.value).then(async(v)=>{
        // API.get("/app-server/v1/basket/"+bankid.value).then(async(v)=>{
        API.get("/api/xkw-helper/relay-proxy/getBasketContent/"+bankid.value).then(async(v)=>{
            let TL=[]
            v.data.structure.forEach(r=>{
                TL.push(...r.list)
            })
    
            console.log(TL)

            let grp=[]

            for (let ii = 0; ii < TL.length; ii++) {
                
           

        //    const o = TL[ii]
        //     let op = {
        //         qid: o.id,
        //         bankid: bankid.value,
        //         q: o.body,
        //         a: "<answerparser>unsaved|u</answerparser>",
        //         extra: JSON.stringify({
        //             from: o.paperSources[0] ? o.paperSources[o.paperSources.length - 1].name : "",
        //             knowledgepoint: o.knowledgeInfo.split("，"),
        //             info: [o.type.name, o.diff.name + "(" + o.diff.value + ")"]

        //         }),
        //         timestamp: (new Date()).getTime()
        //     }

            await API.get("/api/data/add/"+bankid.value+"/"+TL[ii].id).then(v=>{
                grp.push(v.id)
            })
 }
await  API.post("/api/group/new", {
                entry: grp.join(","),
                timestamp: (new Date()).getTime(),
                title:iiiiititle.value,
                desc:""
            }).then(i => {
                groupsaved.value = true
            groupid.value = i.id
        })
        })
    }
    </script>