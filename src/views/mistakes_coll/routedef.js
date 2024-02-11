export default [
    {path:"/mistakes_coll",component: ()=>import("./index.vue")},
    {path:"/mistakes_coll/coll_by_ques/:id",component: ()=>import("./coll_by_ques.vue")},
]