export default [
    {path:"/mistakes_coll",component: ()=>import("./index.vue")},
    {path:"/mistakes_coll/coll_by_ques/:id",component: ()=>import("./coll_by_ques.vue"),props:{page:"new"}},
    {path:"/mistakes_coll/edit/:id",component: ()=>import("./coll_by_ques.vue"),props:{page:"edit"}},
    {path:"/mistakes_coll/view/:id",component: ()=>import("./view.vue")},
    {path:"/mistakes_coll/list",component: ()=>import("./list.vue"),props:{page:"basic"}},
    {path:"/mistakes_coll/edit-tags",component: ()=>import("./edit-tags.vue")},
    {path:"/mistakes_coll/preexport-1/:id",component: ()=>import("./preexport-1.vue"),props:{page:"basic"}},
    {path:"/mistakes_coll/list/filter/tag/:id",component: ()=>import("./list.vue"),props:{page:"tag"}},
]