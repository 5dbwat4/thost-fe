export default [
    {path:"/list",component: ()=>import("./list.vue")},
    {path:"/list/detailed",component: ()=>import("./list-detailed.vue")},
    {path:"/list/uuids_all",component: ()=>import("./uuidlistall.vue")},
    {path:"/view/:id/printparse",component: ()=>import("./printParse.vue")},
]