<template>
    <!-- <n-button @click="currentTClicker=TClickers.addextb"></n-button> -->
  <div id="_GQP_content_core"  :style="{width:'18.76cm',columns:1,'line-height':'normal'}"></div>
</template>
<script setup>

import { onMounted ,ref} from "vue";
import { NButton } from "naive-ui";

const currentTClicker=ref((i)=>{console.log(i);})
const TClickers={
    "addextb":(i)=>{
        if(!document.getElementById("extb-"+i).height)document.getElementById("extb-"+i).height=document.getElementById("extb-"+i).height
        document.getElementById("extb-"+i).height=parseInt(document.getElementById("extb-"+i).height)-30
        document.getElementById("extb-"+i).style.height=document.getElementById("extb-"+i).height+"px"
    }
}
onMounted(()=>{

    document.getElementById("_GQP_content_core").innerHTML=window.HTMLExportString
   ;(()=>{
        const _runresize=(e)=>{
        console.log(e.target)
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)-30
        e.target.style.width=e.target.dataset.width+"px"
    }
    const _runresizeU=(e)=>{
        console.log(e.target)
        e.preventDefault()
        if(!e.target.dataset.width)e.target.dataset.width=e.target.width
        e.target.dataset.width=parseInt(e.target.dataset.width)+30
        e.target.style.width=e.target.dataset.width+"px"
    }
    let ool=document.getElementById("_GQP_content_core")
     ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/dksih/")){
            v.addEventListener("click",_runresize)
            v.addEventListener('contextmenu',_runresizeU)
        }
     })})();

document.getElementById("_GQP_content_core").querySelectorAll(".qblock").forEach(v=>{
    v.addEventListener("click",()=>{currentTClicker.value(parseInt((/\d+/.exec(v.getAttribute("id")))[0]))})
})

})
</script>
<style >
table{
    border-collapse: collapse;
}
</style>