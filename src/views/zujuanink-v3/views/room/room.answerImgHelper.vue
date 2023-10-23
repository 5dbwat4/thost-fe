<template>
    <div v-if="loadingAnswer">
    <n-spin/>
    </div>
<div v-else>
      <n-image-group>
        <n-space>
          <n-image :width="width" :src="AnswerImageSrc" />
          <n-image :width="width" :src="ParseImageSrc" />
        </n-space>
      </n-image-group>
</div>
</template>
<script setup>
import { NImage,NImageGroup,NSpace,NSpin } from "naive-ui";
import { API } from "../../../../shared/APIHelper";
import { ZujuanAPI } from "../../utils/zujuan-api";
import { useAttrs,ref } from "vue";


const loadingAnswer=ref(true)
const AnswerImageSrc=ref(""),ParseImageSrc=ref("")

loadingAnswer.value = true;
  const {id,width} = useAttrs();
  // console.log(useAttrs());
  ZujuanAPI(
    `/app-server/v1/ques/detail/${window.bankid}/${id}?browserWidth=${width}`
  ).then((v) => {
    AnswerImageSrc.value =
      API.host +
      "/api/xkw-helper/route-pic?purl=" +
      btoa(v.data.answerImg.replace("@2", "@3"));
    ParseImageSrc.value =
      API.host +
      "/api/xkw-helper/route-pic?purl=" +
      btoa(v.data.parseImg.replace("@2", "@3"));
    loadingAnswer.value = false;
  });
</script>