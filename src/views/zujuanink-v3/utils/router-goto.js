import { useRouter } from "vue-router";
import { ProjRoutePrefix } from "../CONFIG";


const router=useRouter()
function router_push(router,path){

    router.push(ProjRoutePrefix+path)
    return 
}
function router_push2(path){

    router.push(ProjRoutePrefix+path)
    return 
}


export{router_push,router_push2}