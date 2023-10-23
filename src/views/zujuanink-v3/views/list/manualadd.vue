<template>
<n-card title="手动添加错题" v-if="step==1">
    <n-p>将使用来自试题篮的数据</n-p>
    <n-cascader
      v-model:value="bankid"
      :options="subjectsmap"
      check-strategy="child"
      :show-path="true"
    />
    <n-button @click="confirmI">CONFIRM</n-button>
</n-card>

<n-card title="确认错题数据" v-if="step==2">
    <n-button @click="step=0">&gt; BACK</n-button>
    <div v-for="ii in TLd" class="centered"> 
    <n-card hoverable>
<question-block :qcontent="ii"/>
</n-card>
</div>
    <n-button @click="confirmII">CONFIRM</n-button>
</n-card>
</template>
<script setup>
import { NCard,NCascader,NP,NButton } from 'naive-ui';
import subjectsmap from "../../basicinfo/subjects.json"
import { ZujuanAPI } from '../../utils/zujuan-api';
import {ref} from "vue"
import { API } from "../../../../shared/APIHelper";
import { router_push } from '../../utils/router-goto';
import questionBlock from "../../questionBlock/zjw.vue"
import { useRouter,useRoute } from "vue-router";
import { polishingupTlist } from '../preparing-room/polishinguptlist';
import swal from 'sweetalert';
import blankPic from "../../utils/blankpic"
const router=useRouter(),route=useRoute()
const bankid=ref(15)
const step=ref(1)
const TLd=ref([])

if(route.query.bankid){
    bankid.value=parseInt(route.query.bankid)
}

const confirmI=async()=>{
    ZujuanAPI("/app-server/v1/basket/"+bankid.value).then(async(v)=>{
        let TL=[]
        v.data.structure.forEach(r=>{
            TL.push(...r.list)
        })

        TL=await polishingupTlist(bankid.value,TL)
        step.value=2
        TLd.value=TL
//         await API.post("/zujuan-ink-be-core/donerec/add",{
// quid         :     TL[i].quid,
// date         :   (new Date()).toDateString()  ,
// timestamp    :    (new Date()).getTime() ,
// image        :   `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="300" height="50"><body xmlns="http://www.w3.org/1999/xhtml"><p>以手动添加错题的方式被收录</p></body></foreignObject></svg>` ,
// parent       :  "unsaved"  ,
//     })

    })
}

const confirmII=async()=>{
    for (let i = 0; i < TLd.value.length; i++) {
        await API.post("/zujuan-ink-be-core/donerec/add",{
quid         :     TLd.value[i].quid,
date         :   (new Date()).toDateString()  ,
timestamp    :    (new Date()).getTime() ,
image        :    blankPic,
parent       :  "unsaved"  ,
    })
    }
    swal({
        icon:"success",
        title:"OK"
    })
            
}

</script>

<style scoped>
.centered{
    width: 90%;
    margin: auto auto;
}
</style>