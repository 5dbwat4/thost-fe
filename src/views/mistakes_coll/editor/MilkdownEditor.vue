<script setup>
import { Milkdown, useEditor } from '@milkdown/vue';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/preset-commonmark'
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { math } from '@milkdown/plugin-math';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import {defineModel}from "vue"
import '@milkdown/theme-nord/style.css';
import 'katex/dist/katex.min.css';

const markdown =
``

const content=defineModel("content")

useEditor((root) => {
  return Editor.make()
    .config(nord)
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, markdown)
      ctx.get(listenerCtx).markdownUpdated((c_t_x, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
            content.value=markdown
        }
      })
    })
    .use(commonmark)
    .use(math)
    .use(clipboard).use(history)
    .use(listener)
})
</script>

<template>
  <Milkdown />
</template>
