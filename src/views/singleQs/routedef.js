export default [
    {path:"/list",component: ()=>import("./list.vue")},
    {path:"/list/detailed",component: ()=>import("./list-detailed.vue")},
    {path:"/list/uuids_all",component: ()=>import("./uuidlistall.vue")},
    {path:"/view/:id",component: ()=>import("./index.vue")},
    {path:"/view/:id/editOrigin",component: ()=>import("./editPaperSource.vue")},
]