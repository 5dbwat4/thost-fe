<template>

</template>
<script setup>
import { provide,ref } from "vue";

import * as ProvidedSymbols from "./roomProviderSymbols"

const bankid=ref(12)
,Tlist=ref([]),HandwritePath=ref([])


provide(ProvidedSymbols.bankidSymbol,bankid)
provide(ProvidedSymbols.TListSymbol,Tlist)
provide(ProvidedSymbols.HandwritePathSymbol,HandwritePath)
</script>