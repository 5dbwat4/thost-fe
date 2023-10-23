export default {
    "zjappserver queslist - Core":{
        description:"Get content from `/app-server/v1/ques/list/`.",
        prepare:async(prepareInjComponent)=>{
            
        },
        configureInfo:{
            roomComponent:"zjc"
        }
    },
    "FailedColl API":{
        description:"错题集API,推荐从错题本界面进入.",
        prepare:async()=>{

        },
        configureInfo:{
            roomComponent:"ild"
        }
    }
}