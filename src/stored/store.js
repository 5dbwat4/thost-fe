import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useSettings = defineStore('counter', () => {
  const count = ref(0)
  const settings = useStorage('__thost_store__settings', {},{ mergeDefaults: true })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { settings }
})
