<template>
    <div class="hanged noprint">
        <n-p>图片处理 Current Function:{{ registeredEvents.imageonclick }} <n-button text @click="registeredEvents.imageonclick='none'">Reset</n-button></n-p>
<n-button class="noprint" type="success" @click="registeredEvents.imageonclick='imageresize'">图片大小</n-button>
<n-button class="noprint" type="success" @click="registeredEvents.imageonclick='deleteNum'">删除图片下方的题号</n-button>
<n-button class="noprint" @click="registeredEvents.imageonclick='floatRight'">图片漂浮</n-button>
<n-button class="noprint" @click="registeredEvents.opttabelonclick='filla'">表格fill-available</n-button>
<n-button class="noprint"  @click="deleteInlinePicNum">删除行内图片下方的题号</n-button>
<n-button class="noprint" @click="picreset()">Picture Reset</n-button>
<n-button class="noprint"  type="success" @click="registeredEvents.imageonclick='picreset'">Selected Picture Reset dbclick to do</n-button>
<n-button class="noprint"  type="success" @click="removeUnnecessaryTPicNums">删除多余的题图标记</n-button>

<n-divider/>
<n-p>试题块处理 Current Function:{{ registeredEvents.blockonclick }} <n-button text @click="registeredEvents.blockonclick='none'">Reset</n-button></n-p>
<n-button class="noprint" type="success" @click="registeredEvents.blockonclick='blockextent';">提供空行</n-button>
<n-button class="noprint" type="success" @click="registeredEvents.bodyonclick='cnaddline';">语文：添加横线</n-button>
<n-divider/>
<n-p>全文处理</n-p>
<n-p>Blank处理 Current Function:{{ registeredEvents.bkonclick }} <n-button text @click="registeredEvents.bkonclick='none'">Reset</n-button></n-p>
<n-p>Table处理 Current Function:{{ registeredEvents.tableonclick }} <n-button text @click="registeredEvents.tableonclick='none'">Reset</n-button></n-p>
<n-button class="noprint" type="success" @click="deleteUnnecessaryBRs()">删除多余换行</n-button>
<n-button class="noprint" @click="registeredEvents.bodyonclick='deletedom';registeredEvents.imageonclick='none';registeredEvents.bkonclick='none'">删除选中DOM</n-button>
<n-button class="noprint" @click="blankretheme1">Blank retheme X._______</n-button>
<n-button class="noprint" @click="blankretheme2">Blank retheme 完型</n-button>
<n-button class="noprint" @click="blankretheme3">调节'【小题x】'类展出</n-button>
<n-button class="noprint" type="success" @click="betterfoENMain">OtherFormatter EN</n-button>
<n-button class="noprint" @click="Extendblank">Extendblank</n-button>
<n-button class="noprint" type="success" @click="registeredEvents.bkonclick='extentblank'">Extendblankwhenclick</n-button>
<n-button class="noprint" type="success" @click="registeredEvents.tableonclick='tablerewidth'">表格取消宽度</n-button>
<n-button class="noprint" @click="detable">Destroy table</n-button>
<n-button class="noprint" @click="registeredEvents.blockonclick='addpage'">添加分页符</n-button>

<n-button class="noprint" type="success" @click="optablereset()">Optable Reset</n-button>
<n-button class="noprint" type="success" @click="wordwrap()">WordBreak</n-button>
<n-divider/>
<!-- <n-p>快速处理</n-p>
<n-button class="noprint" type="success" @click="reformatEnglish()">英语套卷</n-button>
<n-divider/> -->
<n-button class="noprint"  type="success" @click="op2change()">导出页</n-button>
<n-button class="noprint"  type="success" @click="op2PDFPage()">导出页</n-button>
<n-button class="noprint" @click="showPagePagenation=!showPagePagenation">Toggle sPP</n-button>
<!-- <div v-for="ev in registeredEvents">
<span>{{ev.name}}</span><n-button text @click="ev.destory">Destroy</n-button>
</div> --></div>
<div class="noprint" v-if="showPagePagenation">
            <div class="labi-container">
                <div class="labi-block" v-for="rr in [1,2,3,4,5,6,7]" :key="rr" :style="{height:1005+'px'}">Page #
                    {{rr}}</div>
            </div>
        </div>
<div id="coreop"></div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import {NButton,NP,NDivider} from "naive-ui"

onMounted(()=>{
    document.getElementById("coreop").innerHTML=localStorage.getItem("___thost___html_export")
})


import {useRoute,useRouter} from "vue-router"
import { API } from "../../shared/APIHelper";
const route=useRoute(),router=useRouter()

const showPagePagenation=ref(true)


const registeredEvents=ref({
    imageonclick:"none",
    bkonclick:"none",
    bodyonclick:"none",
    blockonclick:"none",
    tableonclick:"none",
    opttabelonclick:"none"
})



const wordwrap=()=>{
    document.querySelectorAll("bk[type=underline]").forEach(ee=>{
        ee.style.wordBreak="break-all"
        ee.style.userSelect="none"
    })
}
onMounted(()=>{
    deleteUnnecessaryBRs()
    optablereset()


//imageresize
;(()=>{
    const _runresize=(e)=>{
        if(registeredEvents.value.imageonclick=="imageresize"){
        // console.log(e.target)
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)-30
        e.target.style.width=e.target.dataset.width+"px"
        e.target.width=e.target.dataset.width
    }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _runresizeR=(e)=>{
        if(registeredEvents.value.imageonclick=="imageresize"){
        // console.log(e.target)
        e.preventDefault()
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)+8
        e.target.style.width=e.target.dataset.width+"px"
        e.target.width=e.target.dataset.width
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/dksih/")){
            v.addEventListener("click",_runresize)
            v.addEventListener("contextmenu",_runresizeR)
        }
     })

    //  const destroy=()=>{
    //     let ool=document.getElementById("coreop")
    //  ool.querySelectorAll("img").forEach(v=>{
    //     if(v.src.includes("/dksih/")){
    //         v.removeEventListener("click",_runresize)
    //     }
    //  })
    //  }

    //  registeredEvents.value.push({
    //     name:"cig01",destroy
    //  })


})();

;(()=>{
        /**
     * 
     * @param {MouseEvent} e 
     */
    const _runresize=(e)=>{
        if(registeredEvents.value.imageonclick=="floatRight"){
        // console.log(e.target)
        console.log("here");
        e.target.parentNode.style.float="right"
        e.target.parentNode.style.clear="both"
        let o=e.target.parentNode
        if(o.previousSibling.tagName=="BR")o.parentNode.removeChild(o.previousSibling)
        
    }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _runresizeR=(e)=>{
        if(registeredEvents.value.imageonclick=="imageresize"){
        // console.log(e.target)
        e.preventDefault()
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)+8
        e.target.style.width=e.target.dataset.width+"px"
        e.target.width=e.target.dataset.width
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/dksih/")){
            v.addEventListener("click",_runresize)
            // v.addEventListener("contextmenu",_runresizeR)
        }
     })
})();


;(()=>{
    const _runresize=(e,tgd)=>{
        console.log("tgd");
        if(registeredEvents.value.opttabelonclick=="filla"){
        console.log(e)
        console.log("tgd2");
        tgd.style.width="-webkit-fill-available"
        
    }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _runresizeR=(e)=>{
        if(registeredEvents.value.imageonclick=="imageresize"){
        // console.log(e.target)
        e.preventDefault()
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)+8
        e.target.style.width=e.target.dataset.width+"px"
        e.target.width=e.target.dataset.width
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
            v.addEventListener("click",((v)=>{return (e)=>{_runresize(e,v)}})(v))
     })
})();
//extentblank
;(()=>{
    const _runre=(e)=>{
        if(registeredEvents.value.bkonclick=="extentblank"){
        if(e.target.innerText.includes("_")){
            e.target.innerText=(new Array(e.target.innerText.length+15)).join("_")
        }
    }
    }
    const _runreR=(e)=>{
        if(registeredEvents.value.bkonclick=="extentblank"){
            e.preventDefault()
        if(e.target.innerText.includes("_")){
            e.target.innerText=(new Array(e.target.innerText.length-5)).join("_")
        }
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("bk").forEach(v=>{
            v.addEventListener("click",_runre)
            v.addEventListener("contextmenu",_runreR)

     })

})();


//add-page
;(()=>{
    const _runre=(e,dom)=>{
        if(registeredEvents.value.blockonclick=="addpage"){
dom.style.breakAfter="page"
    }
    }
    const _runreR=(e,dom)=>{
        if(registeredEvents.value.blockonclick=="addpage"){
            e.preventDefault()
        if(e.target.innerText.includes("_")){
            e.target.innerText=(new Array(e.target.innerText.length-5)).join("_")
        }
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll(".___core_block").forEach(v=>{
            v.addEventListener("click",((dom)=>{return (e)=>{_runre(e,dom)}})(v))
            v.addEventListener("contextmenu",((dom)=>{return (e)=>{_runreR(e,dom)}})(v))

     })

})();


//deletedom
;(()=>{

    document.getElementById("coreop").addEventListener("mouseover",(e)=>{
        if(registeredEvents.value.bodyonclick=="deletedom"){
            e.target.classList.add("shadow")
        }
    })
    document.getElementById("coreop").addEventListener("mouseout",(e)=>{
        if(registeredEvents.value.bodyonclick=="deletedom"){
            e.target.classList.remove("shadow")
        }
    })
    document.getElementById("coreop").addEventListener("click",(e)=>{
        if(registeredEvents.value.bodyonclick=="deletedom"){
            e.target.parentNode.removeChild(e.target)
        }
    })

})();

//DeleteNum
;(()=>{
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _rundel=(e)=>{
        if(registeredEvents.value.imageonclick=="deleteNum"){
            console.log(e);
        e.target.parentElement.querySelector("p").style.display="none"
    }
    }
    const _rundelR=(e)=>{
        if(registeredEvents.value.imageonclick=="deleteNum"){
            e.preventDefault()
            e.target.querySelector("p").style.display="block"
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll(".__ccccimage").forEach(v=>{
            v.addEventListener("click",_rundel)
            v.addEventListener("contextmenu",_rundelR)

     })
})();


//Picreset
;(()=>{
    let curPS=[]
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _run=(e)=>{
        if(registeredEvents.value.imageonclick=="picreset"){
        // console.log(e.target)
        if(curPS.includes(e.target)){
            let imgod=curPS.map((v)=>v.parentElement)
            const ctnMax=document.querySelector(".___core_block").clientWidth
    let currentAp=imgod[0],currentWidremain=ctnMax-currentAp.clientWidth
    for (let i = 1; i < imgod.length; i++) {
        console.log(imgod[i],currentWidremain,imgod[i].clientWidth);
        if(imgod[i].nextElementSibling?.tagName=="SPAN"&&imgod[i].nextElementSibling?.hasAttribute("qml-space-size")){
            imgod[i].nextElementSibling.parentNode.removeChild(imgod[i].nextElementSibling)
        }
        if(imgod[i].clientWidth>=currentWidremain){
            currentAp=imgod[i]
            currentWidremain=ctnMax-currentAp.clientWidth
           continue
        }
        currentAp.insertAdjacentElement("afterend",imgod[i])
        currentAp=imgod[i]
        currentWidremain=currentWidremain-imgod[i].clientWidth
        
    }
    curPS.forEach(v=>{
        v.classList.remove("shadow")
    })
    curPS=[]
        }else{
            curPS.push(e.target)
            e.target.classList.add("shadow")
        }
    }
    }
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _runR=(e)=>{
        if(registeredEvents.value.imageonclick=="picreset"){
        // console.log(e.target)
        e.preventDefault()
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)+8
        e.target.style.width=e.target.dataset.width+"px"
        e.target.width=e.target.dataset.width
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/dksih/")){
            v.addEventListener("click",_run)
            v.addEventListener("contextmenu",_runR)
        }
     })
})();


//blockextent
;(()=>{
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _rundel=(e,dom)=>{
        if(registeredEvents.value.blockonclick=="blockextent"){
            console.log(e,dom);
            if(!dom.querySelector(".extblank").dataset.height)dom.querySelector(".extblank").dataset.height=0
        dom.querySelector(".extblank").dataset.height=parseInt(dom.querySelector(".extblank").dataset.height)+50
        dom.querySelector(".extblank").style.height=dom.querySelector(".extblank").dataset.height+"px"
    }
    }
    const _rundelR=(e,dom)=>{
        if(registeredEvents.value.blockonclick=="blockextent"){
            e.preventDefault()
            if(!dom.querySelector(".extblank").dataset.height)dom.querySelector(".extblank").dataset.height=0
        dom.querySelector(".extblank").dataset.height=parseInt(dom.querySelector(".extblank").dataset.height)-10
        dom.querySelector(".extblank").style.height=dom.querySelector(".extblank").dataset.height+"px"
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll(".___core_block").forEach(v=>{
            v.addEventListener("click",((dom)=>{return (e)=>{_rundel(e,dom)}})(v))
            v.addEventListener("contextmenu",((dom)=>{return (e)=>{_rundelR(e,dom)}})(v))

     })
})();


//CN-add-line
;(()=>{

document.getElementById("coreop").addEventListener("mouseover",(e)=>{
    if(registeredEvents.value.bodyonclick=="cnaddline"){
        e.target.classList.add("shadow")
    }
})
document.getElementById("coreop").addEventListener("mouseout",(e)=>{
    if(registeredEvents.value.bodyonclick=="cnaddline"){
        e.target.classList.remove("shadow")
    }
})
document.getElementById("coreop").addEventListener("click",(e)=>{
    if(registeredEvents.value.bodyonclick=="cnaddline"){
        if(e.target.nextElementSibling?.tagName=="BR"){
            e.target.nextElementSibling.style.display="none"
        }
        e.target.insertAdjacentHTML("afterend",`
        <span style="display: block;
  height: 15pt;
  text-decoration: underline dashed 0.5px; 
  overflow: clip;
  font-size: 14.5pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        `)

    }
})

})();


//table-rewidth
;(()=>{
    /**
     * 
     * @param {MouseEvent} e 
     */
    const _runTRW=(e,dom)=>{
        if(registeredEvents.value.tableonclick=="tablerewidth"){
            console.log(e,dom);
            dom.style.width="unset"
    }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("table").forEach(v=>{
            v.addEventListener("click",((dom)=>{return (e)=>{_runTRW(e,dom)}})(v))

     })
})();

//imageMaxSizeLimit

;(()=>{
    //detect width
    const maxWidth=document.getElementById("corehtml").firstElementChild.clientWidth
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/dksih/")){
            if(parseInt(v.style.width)>=maxWidth){
            if(!v.dataset.width)v.dataset.width=maxWidth
        v.style.width=maxWidth+"px"}
        }
     })
})();

})

const blankretheme1=()=>{
    document.getElementById("coreop").querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily.includes("仿宋"))
        v.style.fontFamily="Times New Roman , 宋体"
    })
    document.getElementById("coreop").querySelectorAll("bk u").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.______________")
        v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
    })
}
const blankretheme2=()=>{
    document.getElementById("coreop").querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily.includes("仿宋"))
        v.style.fontFamily="Times New Roman , 宋体"
    })
    document.getElementById("coreop").querySelectorAll("span").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    })
    document.getElementById("coreop").querySelectorAll("bk").forEach(v=>{
        v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
        
    })
}
const blankretheme3=()=>{

    document.getElementById("coreop").querySelectorAll("span").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    })
}
const betterfoENMain=()=>{
    document.querySelectorAll(".___core_block").forEach(dom=>{
        if(dom.attributes.data_type.nodeValue=="阅读选择"){

            console.log("hdn yd",dom);
        dom.innerHTML=dom.innerHTML.replaceAll(/【小题(\d*)】/g,"$1.")
    


        }

        if(dom.attributes.data_type.nodeValue=="七选五"){
                dom.querySelectorAll("bk u").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.______________")
        v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
    })

    dom.querySelectorAll("table[name=optionsTable]").forEach(v=>{
        v.outerHTML=v.innerText.split("\n").join("<br/>")+"<br/>"
    })

        }

         if(dom.attributes.data_type.nodeValue=="完形填空"){
    dom.querySelectorAll("span").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    })
    dom.querySelectorAll("bk").forEach(v=>{
        v.style="text-decoration: underline black;"
        v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
        
    })
    dom.querySelectorAll("table[name=optionsTable]").forEach(v=>{
        // console.log(v.previousElementSibling.offsetwidth);
        v.style.width="calc(100% - "+v.previousElementSibling.offsetWidth+"px)"
        v.previousElementSibling.style.display="inline-block"
        v.parentElement.style.display="block"
        // v.parentElement.style.height="15.2px"
        v.style.display="inline-table"
        v.style.verticalAlign="middle"
        // v.style.borderCollapse="collapse"
    })
         }


                 if(dom.attributes.data_type.nodeValue="用单词的适当形式完成短文"){
                dom.querySelectorAll("bk u").forEach(v=>{
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,` <span>$1.</span><span style="color: lightgray;
  font-size: 13.5pt;">__________________</span> `)
        v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
    })

        }

            document.getElementById("coreop").querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily.includes("仿宋"))
        v.style.fontFamily="Times New Roman , 宋体"
    })
    })
}

const removeUnnecessaryTPicNums=()=>{
    document.querySelectorAll(".___core_block").forEach(os=>{
        let flag=true
        os.querySelectorAll(".__ccccimage").forEach(pic=>{
            if(pic.getAttribute("data-belongsto")&&parseInt(pic.getAttribute("data-belongsto"))!=parseInt(os.getAttribute("data_id"))){
                flag=false
            }
        })
        if(flag){
            os.querySelectorAll(".__ccccimage").forEach(pic=>{
            pic.querySelector("p").style.display="none"
            })
        }
    })
}


    const op2change = () => {
        localStorage.setItem("___thost___html_export", document.getElementById("corehtml").outerHTML)
        API.post("/api/group/exported/"+route.params.id,{
            htmlcode:document.getElementById("corehtml").outerHTML
        })
        router.push("/paper/"+route.params.id)
    }
    const op2PDFPage = () => {
        localStorage.setItem("___thost___html_export", document.getElementById("corehtml").outerHTML)
        API.post("/api/group/exported/"+route.params.id,{
            htmlcode:document.getElementById("corehtml").outerHTML
        })
        router.push("/paper/"+route.params.id+"/pdf")
    }



const detable=()=>{
    document.getElementById("coreop").querySelectorAll("table[name=optionsTable]").forEach(v=>{
        // console.log(v.previousElementSibling.offsetwidth);
        v.style.width="calc(100% - "+v.previousElementSibling.offsetWidth+"px)"
        v.previousElementSibling.style.display="inline-block"
        v.parentElement.style.display="block"
        // v.parentElement.style.height="15.2px"
        v.style.display="inline-table"
        v.style.verticalAlign="middle"
        // v.style.borderCollapse="collapse"
    })
}

const Extendblank=()=>{
    document.querySelectorAll("bk").forEach(v=>{
        if(v.innerText.includes("_")&&v.innerText.length<15){
            v.innerText=(new Array(16)).join("_")
        }
    })
}


const picreset=()=>{
    /**
     * @type NodeListOf<HTMLDivElement>
     */
    const imgod=[]
    document.querySelectorAll(".__ccccimage").forEach(vv=>{
            imgod.push(vv)
    })
    if(imgod.length==0){
        return
    }
    const ctnMax=document.querySelector(".___core_block").clientWidth
    let currentAp=imgod[0],currentWidremain=ctnMax-currentAp.clientWidth
    for (let i = 1; i < imgod.length; i++) {
        console.log(imgod[i],currentWidremain,imgod[i].clientWidth);
        if(imgod[i].clientWidth>=currentWidremain){
            currentAp=imgod[i]
            currentWidremain=ctnMax-currentAp.clientWidth
           continue
        }
        currentAp.insertAdjacentElement("afterend",imgod[i])
        currentAp=imgod[i]
        currentWidremain=currentWidremain-imgod[i].clientWidth
// imgod[i].removeChild(imgod[i])
    }
    document.querySelectorAll("span[qml-space-size='2']").forEach(v=>{
        if(v.previousElementSibling?.tagName=="BR"||v.nextElementSibling?.tagName=="BR"){
            v.style.display="none"
            if(v.previousElementSibling?.tagName=="BR"){
                v.previousElementSibling.style.display="none"
            }
            if(v.nextElementSibling?.tagName=="BR"){
                v.nextElementSibling.style.display="none"
            }
        }
    })
}


const optablereset=()=>{
    function toTable(opts,lns){
    if(lns==1){
        return "<tbody><tr>"+opts.join("")+"</tr></tbody>"
    }
    if(lns==2){
        return `<tbody><tr>${opts[0]}${opts[1]}</tr><tr>${opts[2]}${opts[3]}</tr></tbody>`
    }
    if(lns==4){
        return "<tbody><tr>"+opts.join("</tr><tr>")+"</tr></tbody>"
    }
}


    document.getElementById("coreop").querySelectorAll("table[name=optionsTable]").forEach(v=>{
        let ops=[],maxw=0
        v.querySelectorAll("td").forEach(oo=>{
                maxw=Math.max(maxw,oo.querySelector("span").clientWidth)
                ops.push(oo.outerHTML)
            })


            console.log(maxw);
            if(ops.length==4){
        if(maxw>=v.clientWidth/2){

        }else if(maxw>=v.clientWidth/4){
            v.innerHTML=toTable(ops,2)
            console.log(2);
        }else{
            v.innerHTML=toTable(ops,1)
            console.log(4);
        }
    }else{
        if(maxw<v.clientWidth/ops.length){
            v.innerHTML="<tbody><tr>"+ops.join("")+"</tr></tbody>"
        }else{
            v.innerHTML="<tbody><tr>"+ops.join("</tr><tr>")+"</tr></tbody>"
        }
    }
        // console.log(v.innerHTML);
        
    })
}

const deleteUnnecessaryBRs=()=>{
    document.querySelectorAll("p").forEach(ee=>{
        console.log(ee.parentElement.tagName);
        if(ee.parentElement.tagName!="TD"){
        if(ee.innerText=="\n\n"){
            ee.parentNode.removeChild(ee)
        }
        if(ee.innerText==""){
            ee.parentNode.removeChild(ee)
        }
    }
    })
    document.querySelectorAll("span").forEach(ee=>{
        console.log(ee.parentElement.tagName);
        if(ee.parentElement.tagName!="TD"){
        if(ee.innerText=="\n\n"){
            ee.parentNode.removeChild(ee)
        }
        if(ee.innerText==""){
            ee.parentNode.removeChild(ee)
        }
    }
    })
    document.querySelectorAll("p").forEach(ee=>{
        if(ee.lastElementChild?.tagName=="BR"&&
        ee.lastElementChild?.previousElementSibling?.tagName=="BR"){
            ee.removeChild(ee.lastElementChild.previousElementSibling)
            ee.removeChild(ee.lastElementChild)
        }
    })
    document.getElementById("coreop").querySelectorAll("br").forEach(vv=>{
        if(vv.nextSibling?.tagName=="BR"){
            vv.nextSibling.style.display="none"
        }
    })
    document.getElementById("coreop").querySelectorAll("br").forEach(vv=>{
            if(vv.style.display=="none"){
                vv.parentNode.removeChild(vv)
            }
    })
}

const deleteInlinePicNum=()=>{
    document.querySelectorAll("td .__ccccimage").forEach(v=>{
        v.querySelector("p").style.display="none"
    })

    document.querySelectorAll(".__ccccimage").forEach(v=>{
        if(v.previousElementSibling?.tagName!="BR"
        &&v.nextElementSibling?.tagName!="BR"
        &&!v.previousElementSibling?.classList.contains("__ccccimage")
        &&!v.nextElementSibling?.classList.contains("__ccccimage")){
            v.querySelector("p").style.display="none"
        }
    })
}


const reformatEnglish=()=>{
    betterfoENMain();deleteUnnecessaryBRs();optablereset()
}
</script>

<style>
@media print{
    .noprint{
        display: none;
    }

}

table{
    border-collapse: collapse;
}

.labi-container{
    display: block;
    height: fit-content;
    width: 100%;
    position: absolute;
    z-index: -1;
}
.labi-block{
    display: block;
    width: 100%;
    border-bottom-color: black;
    border-bottom-width: 2px;
    position:relative;
    border-bottom-style: dotted;
    text-align:right;right: 30px;
}

/* img{ */
    /* max-width: 350px; */
/* } */

td{
    padding:0
}
.shadow{
    box-shadow: 0 0 5px 5px black;;
}

/* *{
    word-break: break-all;
} */
/* *{
    page-break-after:avoid;
} */

.hanged{
    position: fixed;
    right: 0;
    display: block;
    width: calc(100% - 730px);
    height: 100%;
    overflow-y: scroll;
}

</style>

<!-- <style src="../../shared/zujuan-stupid-style-inject.css" /> -->
<style scoped>
wave {
    text-decoration-style: wavy;
    text-decoration-line: underline;
    text-underline-position: auto;
    /* white-space: pre-wrap; */
}

dot{
    position: relative;
    text-emphasis-style: dot;
    text-emphasis-position: under left;
    text-emphasis-color: inherit;
    box-sizing: border-box;
    padding-top: .25rem
}

u {
    text-decoration: underline;
    text-underline-position: under;
    white-space: break-spaces
}

span>em {
    font-style: normal;
    font-weight: bold;
}
</style>