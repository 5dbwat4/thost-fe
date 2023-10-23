<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="答题记录"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >

      <n-image-group show-toolbar-tooltip>
    <n-space>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-image
        width="100"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </n-space>
  </n-image-group>
    </n-card>
  </n-modal>
</template>
<script setup>
import { ref } from 'vue';
import { API } from '../../shared/APIHelper';




const imgs=ref([])


API.get("/zujuan-ink-be-core/donerec/filter/quuid/all/"+1)
</script>