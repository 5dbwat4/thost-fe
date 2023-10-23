import typesmap from "../basicinfo/ft-type.json";

const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
export const Typesmap_flattened = ((ro) => {
let re = {};
ro.forEach(v => { if (v.value != 0) re[v.value] = v.label; });
return re;
})(typesmap);
