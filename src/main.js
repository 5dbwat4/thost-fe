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
        {path:"/home",component: ()=>import("./homepageWrapper.vue"),children:[
            {path:"/",component: ()=>import("./views/index/index.vue")},
            {path:"/home",component: ()=>import("./views/index/index.vue")},
            {path:"/about",component: ()=>import("./views/pages/about.vue")},
            ...(await import("./views/zujuanink-v3/routedef")).default,
            ...(await import("./views/grouping/routedef")).default,
            ...(await import("./views/mistakes_coll/routedef")).default,

            {path:"/batch/:ids",component: ()=>import("./views/batch/index.vue")},
            {path:"/batching/syncbatch",component: ()=>import("./views/batch/syncbatch.vue")},
            {path:"/batching/from-basket",component: ()=>import("./views/batch/from_zujuan_basket.vue")},
                  {path:"/regener",component: ()=>import("./views/regener/index.vue")},
                  ...(await import("./views/local/routedef")).default,
                  ...(await import("./views/singleQs/routedef")).default,
    
        ]},
        ...(await import("./views/grouping/routedef.standalone")).default,
        {path:"/login",component: ()=>import("./views/pages/login-to-zujuan.vue")},
        {path:"/server-status",component: ()=>import("./views/server-status/index.vue")},

      

    ]

    // routes.push(...(await import("./views/zujuanink-v2/routedef")).default)
    // routes.push(...(await import("./views/zujuanink-v3/routedef")).default)
    routes.push(...(await import("./views/debug/routedef")).default)
    routes.push(...(await import("./views/fcoll/routedef")).default)
    const router = VueRouter.createRouter({
        history: 
        
        (location.hostname=="localhost"||
        location.hostname=="thost.5dbwat4.studio")?
        VueRouter.createWebHistory():
        VueRouter.createWebHashHistory("/"),
        routes, 
      })




    
// ;await (await import("./blog-component/helper")).initComponentHelper();



createApp(obj).use(router).mount("#app")



// ;await (await import("./components/util/notifyAPIHostSet")).check();


// loaded()
})();