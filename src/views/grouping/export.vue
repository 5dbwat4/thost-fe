<template>
 <!-- <n-watermark
    content="github.com/5dbwat4/thost-fe"
    :selectable="false"
    :font-size="16"
    :line-height="16"
    :width="284"
    :height="284"
    :x-offset="12"
    :y-offset="80"
    :rotate="-15"
  > -->
<div id="coreop"></div>

<!-- </n-watermark> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import {NButton,NWatermark} from "naive-ui"

onMounted(()=>{
    document.getElementById("coreop").innerHTML=localStorage.getItem("___thost___html_export")
})

// const watermarked=ref(falsr)
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

/* img{
    max-width: 350px;
} */

td{
    padding:0
}
/* *{
    page-break-after:avoid;
} */
</style>



<!-- <style src="../../shared/zujuan-stupid-style-inject.css" scoped/> -->