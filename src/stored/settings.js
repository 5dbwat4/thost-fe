import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useSettings = defineStore('settings', () => {
  const count = ref(0)
  const settingsDefault={
    ImgQuality:"x3"
  }
  const settings = useStorage('__thost_store__settings', settingsDefault,localStorage,{ mergeDefaults: true })
  const doubleCount = computed(() => count.value * 2)
  function set(key,data) {
    settings.value[key]=data
  }

  return { settings ,set}
})
