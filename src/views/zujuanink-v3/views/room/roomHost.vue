<template>
<router-view></router-view>
</template>
<script setup>
import { provide,ref } from "vue";

// import * as ProvidedSymbols from "./roomProviderSymbols"
import { RouterView } from "vue-router";


import { useRouter,useRoute } from "vue-router";
const router=useRouter(),route=useRoute()
// const bankid=ref(12)
// ,Tlist=ref([]),HandwritePath=ref([]),qcomponent=ref("xkw")

// if(route.query.mode){
//     qcomponent.value=route.query.mode
//     // route.push()
// }

// provide(ProvidedSymbols.bankidSymbol,bankid)
// provide(ProvidedSymbols.TListSymbol,Tlist)
// provide(ProvidedSymbols.HandwritePathSymbol,HandwritePath)
</script>