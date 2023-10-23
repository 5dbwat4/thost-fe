function getLastAPIOption(){
    const _default={
        APIType:"zujuan-main-list",
        APIargments:{
            searchp: {
              types: 0,
              sources: 0,
              pageIndex: 1,
              pageSize: 10,
              orderBy: 2,
              areas: 0,
              grades: 0,
              diffs: 0,
              knowledges: 0,
              years: 0,
            },
            bid: 13,
          }
    }

    return localStorage.getItem("__zujuan-ink__lastAPIOption")?JSON.parse(localStorage.getItem("__zujuan-ink__lastAPIOption")):_default
}
function setAPIOption(apm){
    return localStorage.setItem("__zujuan-ink__lastAPIOption",JSON.stringify(apm))
}

export{getLastAPIOption,setAPIOption}