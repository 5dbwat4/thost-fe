export default [
    {path:"/grouping/preexport-1/:id",component: ()=>import("./preexport-1.vue")},
    {path:"/grouping/preexport/:id",component: ()=>import("./preexport.vue")},
    {path:"/grouping/preexport-2/:id",component: ()=>import("./preexport-2.vue")},
    {path:"/grouping/preexport-1/:id/word_tailored_version",component: ()=>import("./word_version/preexport-1.vue")},
    {path:"/grouping/preexport-2/:id/word_tailored_version",component: ()=>import("./word_version/preexport-2.vue")},
    {path:"/export/:i",redirect:"/paper/:i"},
    {path:"/paper/:i",component: ()=>import("./export.vue")},
    {path:"/paper/:i/pdf",component: ()=>import("./export-pdf.vue")},
    {path:"/export/:id/a",component: ()=>import("./export.a.vue")},

]