export default [
    {path:"/local/ranword",component: ()=>import("./ranword.vue")},
    {path:"/local/ranword/new",component: ()=>import("./ranword.new.vue")},
    {path:"/local/ranword/view",component: ()=>import("./ranword.view.vue")},
    {path:"/local/ranword/upload",component: ()=>import("./ranword.upload.vue")},
    // {path:"/local/ranword/new/connect",component: ()=>import("./ranword.create-connect.vue")},
]