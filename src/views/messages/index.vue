<template>
    <n-modal :show="true">
        <div>
            <n-card style="width: 600px" :title="messageMeta[$route.query.m].message || '信息'" :bordered="false" size="huge" role="dialog"
                aria-modal="true">
                
                <component :is="MESSAGE_COMPONENT"/>
                
            </n-card>
        </div>
    </n-modal>
</template>

<script setup>
    import {
        NCard,
        NModal,
        NText,
        NDivider,
        NInputGroup,
        NInput,
        NButton,
        NLog,
        NSpin,
        NAlert,NSwitch,
        NP
    } from "naive-ui";
    import {
        ref,h,shallowRef,onMounted
    } from "vue";
    import messageMeta from "./message_define"
    import {
        useRoute,
        useRouter
    } from "vue-router"
    const route = useRoute(),
        router = useRouter()
console.log("hellooooo");
const MESSAGE_COMPONENT=shallowRef(h("p",{},"loading"))
onMounted(async()=>{
MESSAGE_COMPONENT.value=h(
    await messageMeta[route.query.m].component(),
    route.query,()=>{}
)
})


</script>

<style>

</style>