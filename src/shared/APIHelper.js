const APICallCount=ref(0),APICallRemains=ref(0)
const API={
    get:async(url)=>{
        // console.log(await fetch(localStorage.getItem("__5dbwat_proj__thost_apihost")+url).then(v.json()));
        APICallRemains.value++
        CheckAPICallN()
        return await fetch(localStorage.getItem("__5dbwat_proj__thost_apihost")+url, {credentials:"include"} ).then(v=>{
          APICallRemains.value--
          CheckAPICallN()
          return v.json()}).catch(e=>{
            _Notificate(url,"GET",e)
          })
    },
    /**
     * 
     * @param {String} url URL
     * @param {JSON} body 
     * @returns 
     */
    post:async(url,body)=>{
      APICallRemains.value++
      CheckAPICallN()
        return await fetch(localStorage.getItem("__5dbwat_proj__thost_apihost")+url,{"method":"POST","body":JSON.stringify(body),"headers":{"Content-Type":"application/json"}, credentials:"include" }).then(v=>{
          APICallRemains.value--
          CheckAPICallN()
          return v.json()}).catch(e=>{
            _Notificate(url,"POST",e)
          })
    },
    get host(){
        return localStorage.getItem("__5dbwat_proj__thost_apihost")
    }
}
import { useLoadingBar,useNotification } from 'naive-ui'
import ACTe from "./APICallingTe.vue"
import { h, ref, watch } from 'vue'

const ntf=ref(),acteInstance=h(ACTe,{
  ACC:APICallCount,
  ACR:APICallRemains
})
let timeoutId=0
let ___once=false,___currentHasNtf=false
let notification={},loadingBar={},loadingbarStarted=false
const initAPINotif=()=>{
  if(!___once){
    notification=useNotification()
    loadingBar=useLoadingBar()
    // console.log(useNotification);
    // ntf.value=notification.create({
    //     title: 'API Calling.',
    //     closable: false,
    //     content:()=>acteInstance,
    //     onClose: () => {
    //       ntf.value = null
    //     }
    //   })
    // }
    // ___currentHasNtf=true
      ___once=true
      // 
      // setInterval(()=>{
        // if(___currentHasNtf){
          // ntf.value.destroy()
      //     loadingBar.finish()
      //     ___currentHasNtf=false
      //   }
      // },1000)
  }
}

const CheckAPICallN=()=>{
  if(___once){
  // const notification=useNotification()
  if(APICallRemains.value==0){
    // console.log("jk1000");
    // timeoutId=setTimeout(()=>{
      // console.log("jk2000");
      // if(___currentHasNtf){
        // ntf.value.destroy()
        // loadingBar.finish()
        // ___currentHasNtf=false
      // }
    // },500)
    // if(loadingbarStarted)
    loadingBar.finish()
    loadingbarStarted=false
    // console.log(timeoutId);
  }else{
    // console.log("jk3",ntf.value);
    // if(!___currentHasNtf){
      // if(timeoutId!=0)clearTimeout(timeoutId)
      // ntf.value=notification.create({
      //   title: 'API Calling.',
      //   closable: false,
      //   content:()=>acteInstance,
      //   // onClose: () => {
      //   //   ntf.value = null
      //   // }
      // })
      if(!loadingbarStarted){
loadingBar.start()
loadingbarStarted=true
      }
      // ___currentHasNtf=true
    }
    }
}


const _Notificate=(url,me,e)=>{
  if(___once){
    notification.error({
      content: 'Network error.',
      closable: true,
      meta:`Network error when ${me} [${url}].error:${e} `
      // duration:3000
    })
  }
  }


  const destroyAllNotif=()=>{
    if(___once){
      notification.destoryAll()
    }
  }

export{API,initAPINotif,destroyAllNotif}