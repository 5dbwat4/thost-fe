// ???5dbwat4

/**
 * 
 * @param {String} ename Event name
 * @param {Function} callback Callback Function
 */
 var createEvent=(ename,callback)=>{
    window.EventList=window.EventList||{}
    window.EventList[ename]=callback
}

/**
 * 
 * @param {String} ename Event Name
 * @param {Array} params Params for the function
 */
var emitEvent=(ename,params=[])=>{
    window.EventList=window.EventList||{}
    return window.EventList[ename](...params)
}


export{emitEvent,createEvent}