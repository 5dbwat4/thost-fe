export default {
    "regen-attach-finished":{
        "message":"已完成",
        "component":async()=>{return (await import("../regener/finish_message.vue")).default}
    }
}