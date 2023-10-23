import { API } from "../../shared/APIHelper"

/**
 * 
 * @param {String} url URL of the resource. e.g. /app-server/v1/ques/detail/
 * @param {"GET"|"POST"} method method of the request
 * @param {null | Object} body body of the request. Only required when method is POST
 */
async function ZujuanAPI(url,method="GET",body){
     return await API.post("/api/xkw-helper/____sensitive/get_zujuan_app_content",{
        url,
        method,
        body
    })
}

export {ZujuanAPI}