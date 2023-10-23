<template>
<n-button class="noprint" @click="click2imgresize">image resize</n-button>
<n-button class="noprint" @click="blankretheme1">Blank retheme X._______</n-button>
<n-button class="noprint" @click="blankretheme2">Blank retheme 完型</n-button>
<n-button class="noprint" @click="blankretheme3">调节'【小题x】'类展出</n-button>
<n-button class="noprint" @click="betterfoENMain">OtherFormatter EN</n-button>
<n-button class="noprint" @click="Extendblank">Extendblank</n-button>
<n-button class="noprint" @click="Extendblankwhenclick">Extendblankwhenclick</n-button>
<n-button class="noprint" @click="detable">Destroy table</n-button>
<n-button class="noprint" @click="op2change()">导出页</n-button>
<n-button class="noprint" @click="picreset()">Picture Reset</n-button>
<n-button class="noprint" @click="optablereset()">Optable Reset</n-button>
<n-button class="noprint" @click="showPagePagenation=!showPagePagenation">Toggle sPP</n-button>
<div v-for="ev in registeredEvents">
<span>{{ev.name}}</span><n-button text @click="ev.destory">Destroy</n-button>
</div>
<div class="noprint" v-if="showPagePagenation">
            <div class="labi-container">
                <div class="labi-block" v-for="rr in [1,2,3,4,5,6,7]" :key="rr" :style="{height:1045+'px'}">Page #
                    {{rr}}</div>
            </div>
        </div>
<div id="coreop"></div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import {NButton} from "naive-ui"

onMounted(()=>{
    document.getElementById("coreop").innerHTML=localStorage.getItem("___thost___html_export")
})


import {useRoute,useRouter} from "vue-router"
const route=useRoute(),router=useRouter()

const showPagePagenation=ref(true)


const registeredEvents=ref({
    imageonclick:"none",
    imageonrightclick:"none",
    bkonclick:"none",
    bkonrightclick:"none",
})

const click2imgresize=()=>{
    const _runresize=(e)=>{
        if(registeredEvents.value.imageonclick="image resize"){
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
        if(registeredEvents.value.imageonrightclick="image resize"){
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


}

const Extendblankwhenclick=()=>{
    const _runre=(e)=>{
        if(registeredEvents.value.bkonclick=="extentblank")
        if(e.target.innerText.includes("_")){
            e.target.innerText=(new Array(e.target.innerText.length+15)).join("_")
        }
    }
    const _runreR=(e)=>{
        if(e.target.innerText.includes("_")){
            e.target.innerText=(new Array(e.target.innerText.length-5)).join("_")
        }
    }
    let ool=document.getElementById("coreop")
     ool.querySelectorAll("bk").forEach(v=>{
            v.addEventListener("click",_runre)
            v.addEventListener("click",_runre)

     })
     
}



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
        if(dom.attributes.data_type.nodeValue=="阅读理解"){

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
        v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.__________________")
        v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
    })

        }

            document.getElementById("coreop").querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily.includes("仿宋"))
        v.style.fontFamily="Times New Roman , 宋体"
    })
    })
}

    const op2change = () => {
        localStorage.setItem("___thost___html_export", document.getElementById("corehtml").outerHTML)
        router.push("/export/"+route.params.id)
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
        if(maxw>=v.clientWidth/2){

        }else if(maxw>=v.clientWidth/4){
            v.innerHTML=toTable(ops,2)
            console.log(2);
        }else{
            v.innerHTML=toTable(ops,1)
            console.log(4);
        }
        // console.log(v.innerHTML);
        
    })
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
    text-align:right;
}

img{
    max-width: 350px;
}

td{
    padding:0
}

*{
    word-break: break-all;
}
/* *{
    page-break-after:avoid;
} */
</style>