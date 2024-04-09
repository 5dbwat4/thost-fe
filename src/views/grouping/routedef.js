export default [
    {path:"/group/:id",component: ()=>import("./index.vue")},
    {path:"/grouping/new",component: ()=>import("./new.vue")},
    {path:"/grouping/list",component: ()=>import("./list.vue")},
     {path:"/grouping/rename/:id",component: ()=>import("./rename.vue")},
     {path:"/grouping/edit-desc/:id",component: ()=>import("./edit-desc.vue")},

]