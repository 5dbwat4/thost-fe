<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, useAttrs, watch, defineOptions
,defineModel } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
defineOptions({
  inheritAttrs: false
})
const attrs=useAttrs()
console.log(attrs);
const editorRef = shallowRef()
// const valueHtml=attrs.content
// const valueHtml=ref("")
const content=defineModel("content")
onMounted(() => {
        setTimeout(() => {
            // valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    
    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }
    const mode="default"
</script>