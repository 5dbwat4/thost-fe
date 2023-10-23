// import {first_load,loaded} from "./components/pre-loader"


// first_load()
;(async()=>{
    const createApp=(await import("vue")).createApp
    const VueRouter=(await import("vue-router"))
    // ;(await import('@varlet/ui/es/style.js'));
    // const Varlet=(await import('@varlet/ui'));
    // const naive=(await import('naive-ui'));
    const obj=(await import("./main.vue")).default
    const routes = [
        {path:"/",component: ()=>import("./views/index/index.vue")},
        {path:"/list",component: ()=>import("./views/list/index.vue")},
        {path:"/list/uuids_all",component: ()=>import("./views/list/uuidlistall.vue")},
        {path:"/view/:id",component: ()=>import("./views/singleq/index.vue")},
        {path:"/batch/:ids",component: ()=>import("./views/batch/index.vue")},
        {path:"/batching/syncbatch",component: ()=>import("./views/batch/syncbatch.vue")},
        {path:"/group/:id",component: ()=>import("./views/grouping/index.vue")},
        {path:"/grouping/new",component: ()=>import("./views/grouping/new.vue")},
        {path:"/grouping/list",component: ()=>import("./views/grouping/list.vue")},
        {path:"/grouping/preexport-1/:id",component: ()=>import("./views/grouping/preexport-1.vue")},
        {path:"/grouping/preexport/:id",component: ()=>import("./views/grouping/preexport.vue")},
        {path:"/grouping/preexport-2/:id",component: ()=>import("./views/grouping/preexport-2.vue")},
        {path:"/export/:i",component: ()=>import("./views/grouping/export.vue")},
        {path:"/export/:id/a",component: ()=>import("./views/grouping/export.a.vue")},
        {path:"/regener",component: ()=>import("./views/regener/index.vue")},
        {path:"/message",component: ()=>import("./views/messages/index.vue")},
        {path:"/bjgapi",component: ()=>import("./views/bijudge/index.vue"),meta:{
            title:"做点基础知识判断题可以有助于提高成绩 | thost"
        }},
        // {path:"/zujuanink.old",component: ()=>import("./views/zujuanink/index.vue"),meta:{
        //     title:"刷组卷网 | thost"
        // }}

    ]

    // routes.push(...(await import("./views/zujuanink-v2/routedef")).default)
    routes.push(...(await import("./views/zujuanink-v3/routedef")).default)
    const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory("/"),
        routes, 
      })


    
// ;await (await import("./blog-component/helper")).initComponentHelper();



createApp(obj).use(router).mount("#app")




// ;await (await import("./components/util/notifyAPIHostSet")).check();


// loaded()
})();