import {API} from "../../../shared/APIHelper"

async function polishingupTlist(vbankid,vTList){
    for (let i = 0; i < vTList.length; i++) {
        await API.get("/zujuan-ink-be-core/data/checkExistanceGetPersonalizedInfo/"+vbankid +"/"+vTList[i].id).then(async(v)=>{
          if(!v.data){
          vTList[i].quid=(await API.post("/zujuan-ink-be-core/data/add",{
    body           :  vTList[i].body ,
    timestamp      :  (new Date()).getTime() ,
    qid            :  vTList[i].id ,
    bankid         :  vbankid ,
    title          :  vTList[i].title ,
    diffv          :  vTList[i].diff.id ,
    knowledgeInfo  :  vTList[i].knowledgeInfo ,
    typeid         :  vTList[i].type.id  ,
    
      })).data
      vTList[i].failedcoll=false
      vTList[i].done=false
          vTList[i].coll=false
        }else{
          vTList[i].quid=v.data.id
          vTList[i].failedcoll=v.data.failedcoll
          vTList[i].coll=v.data.coll
          vTList[i].done=v.data.done
        }
        })
        
        
      }

      return vTList
}


export{polishingupTlist}