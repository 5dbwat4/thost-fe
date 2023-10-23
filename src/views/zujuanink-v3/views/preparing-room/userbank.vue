<template>

</template>
<script setup>
import { ZujuanAPI } from '../../utils/zujuan-api';

ZujuanAPI("/app-server/v1/userBank/ques/list?pageIndex=1&pageSize=10&subjectId=14").then(v=>{
    v.data.list
})
</script>