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
    
    <n-card :title="'补充数据，添加错题('+(currentTIndex+1)+'/'+TLd.length+')'" v-if="step==2">
        <n-button @click="step=0">&gt; BACK</n-button>
        <!-- <n-button
            round
            type="primary"
            @click="submitFTCadd"
          >
            保存试题并创建quid
          </n-button> -->
        <NFormItem label="quid">
        <n-input disabled :value="FTCaddDisc.quid"></n-input>
      </NFormItem>
      <NFormItem label="你的感想">
        <n-input type="textarea" v-model:value="FTCaddDisc.insights" placeholder="对这道题目的想法，收获的知识点，等等"></n-input>

      </NFormItem>
      <NFormItem label="注释">

        <n-input type="textarea" v-model:value="FTCaddDisc.note" placeholder="显示在题目前的信息 e.g. 错题的小题号"></n-input>

      </NFormItem>
      <NFormItem label="评级">
          <n-rate allow-half :count="10" :on-update:value="(v)=>{FTCaddDisc.rate=v*10}"/><n-p>{{ FTCaddDisc.rate }}</n-p>

      </NFormItem>
      <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="SubmitToFTC"
          >
            收录并前往下一个
          </n-button>
          <n-button
            round
            @click="initNext"
          >
            下一个
          </n-button>
        </div>
        <n-card hoverable>
    <question-block :qcontent="TLd[currentTIndex]"/>
    </n-card>
        <n-button @click="confirmII">CONFIRM</n-button>
    </n-card>
    </template>
    <script setup>
    import { NCard,NCascader,NP,NButton,NFormItem,NRate,NInput } from 'naive-ui';
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
    const currentTIndex=ref(0)
    
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
            currentTIndex.value=-1
            initNext()
            
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

  const  FTCaddDisc=ref({
  quid:"",
    insights :"",
    note :"",
    rate :0,
    timestamp :0,
    times:0,
    lastfinishdate :0,
    mastarate :0,
    bankid:0
})

const SubmitToFTC=(index)=>{
    API.post("/zujuan-ink-be-core/ftc/push_to_collection",FTCaddDisc.value).then(o=>{
        initNext()
  })

}

const initNext=()=>{

currentTIndex.value++

    FTCaddDisc.value={
  quid:TLd.value[currentTIndex.value].quid,
    insights :"",
    note :"",
    rate :0,
    timestamp :(new Date()).getTime(),
    times:1,
    lastfinishdate :(new Date()).getTime(),
    mastarate :0,
    bankid:bankid.value
}
}
    
    </script>
    
    <style scoped>
    .centered{
        width: 90%;
        margin: auto auto;
    }
    </style>