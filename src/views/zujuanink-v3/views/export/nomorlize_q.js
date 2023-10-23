
import { API } from "../../../../shared/APIHelper"


function normalizeq(q,Nopt){
    const ool=document.createElement("div")
    q=q.replaceAll("【题文】","")
    ool.innerHTML=q

    ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/formula/")){
            v.src=v.src.replace(".png",".svg")
            v.style.width=(v.width*.8)+"px"
            v.src=v.src.replace("https://staticzujuan.xkw.com/quesimg/Upload/formula/",API.host+"/api/xkw-helper/route-formula-svg/").replace(".svg","")
        }
        if(v.src.includes("/dksih/")){
            let tmp=/\?resizew=(\d*)/.exec(v.src)
            if(tmp&&tmp.length!=0){
                v.style.width=tmp[1]+"px"
                v.src=v.src.replace(/\?resizew=(\d*)/,"")
                v.setAttribute("width",tmp[1])
                v.setAttribute("height","")
            }
        }
    })


    ool.querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily){
            v.style.fontFamily="'Times New Romans' , 宋体"
        }
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
    })


    ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
        if(v.querySelectorAll("td").length==4){
            // console.log("oo",v);
            let opts=[],lns=1
            v.querySelectorAll("td").forEach(oo=>{
                opts.push(oo.outerHTML)
            })
            v.addEventListener("click",()=>{
                console.log("click");
                const {ctn,next_lns}=toTable(opts,lns)
                v.innerHTML=ctn
                lns=next_lns
            })
        }

    })

    ool.querySelectorAll("table[name=optionsTable] td").forEach(v=>{
        if(!v.style.fontFamily){
            v.style.fontFamily="Cambria , 宋体"
        }
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
    })


    //18.76/4

    ool.style.fontFamily="Cambria , 宋体"


    // if(Nopt.ret2){
    //     ool.querySelectorAll("span").forEach(v=>{
    //         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    //     })
    //     ool.querySelectorAll("bk").forEach(v=>{
    //         v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
            
    //     })
    // }

    // console.log(ool.innerHTML);


    return ool.outerHTML
}


function toTable(opts,lns){
    if(lns==1){
        return {ctn:"<tbody><tr>"+opts.join("")+"</tr></tbody>",next_lns:2}
    }
    if(lns==2){
        return {ctn:`<tbody><tr>${opts[0]}${opts[1]}</tr><tr>${opts[2]}${opts[3]}</tr></tbody>`,next_lns:4}
    }
    if(lns==4){
        return {ctn:"<tbody><tr>"+opts.join("</tr><tr>")+"</tr></tbody>",next_lns:1}
    }
}


function normalizeqA(q,Nopt){
    const ool=document.createElement("div")
    q=q.replaceAll("【题文】","")
    ool.innerHTML=q

    ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/formula/")){
            v.src=v.src.replace(".png",".svg")
            v.src=v.src.replace("https://staticzujuan.xkw.com/quesimg/Upload/formula/",API.host+"/api/xkw-helper/route-formula-svg/").replace(".svg","")
                v.style.width=(v.width*.8)+"px"
        }
        if(v.src.includes("/dksih/")){
            let tmp=/\?resizew=(\d*)/.exec(v.src)
            if(tmp&&tmp.length!=0){
                v.style.width=tmp[1]+"px"
                v.src=v.src.replace(/\?resizew=(\d*)/,"")
                v.setAttribute("width",tmp[1])
                v.setAttribute("height","")
            }
        }
    })


    ool.querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily){
            v.style.fontFamily="'Times New Roman' , 宋体"
        }
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
    })
    ool.querySelectorAll("sup").forEach(v=>{
        if(!v.style.fontSize){
            v.style.fontSize="6.5pt"
        }

    })
    ool.querySelectorAll("sub").forEach(v=>{
        if(!v.style.fontSize){
            v.style.fontSize="6.5pt"
        }

    })


    ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
        if(v.querySelectorAll("td").length==4){
            // console.log("oo",v);
            let opts=[],lns=1
            v.querySelectorAll("td").forEach(oo=>{
                opts.push(oo.outerHTML)
            })
            // v.addEventListener("click",()=>{
            //     console.log("click");
                const {ctn,next_lns}=toTable(opts,4)
                v.innerHTML=ctn
                // lns=next_lns
            // })
        }

    })

    ool.querySelectorAll("table[name=optionsTable] td").forEach(v=>{
        v.innerHTML="<span style='width:fit-content;display:block;'>"+v.innerHTML+"</span>"
        if(!v.style.fontFamily){
            v.style.fontFamily="Times New Roman , 宋体"
        }
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }
        // console.log(v.querySelector("span").clientWidth);

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
    })


    //18.76/4

    ool.style.fontFamily="Times New Roman , 宋体"
    ool.style.fontSize="9.5pt"


    // if(Nopt.ret2){
    //     ool.querySelectorAll("span").forEach(v=>{
    //         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    //     })
    //     ool.querySelectorAll("bk").forEach(v=>{
    //         v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
            
    //     })
    // }

    // console.log(ool.innerHTML);
    ool.insertAdjacentHTML("afterbegin",`
    ${Nopt.GContentFormat.value==1?(Nopt.index)+".":""}
    (${Nopt.qcontent.type.name},${Nopt.qcontent.diff.name }(${ Nopt.qcontent.diff.value }))`)
    // (${Nopt.qcontent.type.name},${Nopt.qcontent.diff.name }(${ Nopt.qcontent.diff.value }))<span style="font-family:楷体">（${Nopt.qcontent.title}）</span>`)


    if(Nopt.qcontent.type.id==2808){
        ool.querySelectorAll("p").forEach(v=>{
            if(!v.style.fontFamily.includes("仿宋"))
            v.style.fontFamily="Times New Roman , 宋体"
        })
        ool.querySelectorAll("span").forEach(v=>{
            v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
        })
        ool.querySelectorAll("bk").forEach(v=>{
            v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
            
        })
    }
    if(Nopt.qcontent.type.id==2813||Nopt.qcontent.type.id==281301||Nopt.qcontent.type.id==281302||Nopt.qcontent.type.id==280902){
        ool.querySelectorAll("p").forEach(v=>{
            if(!v.style.fontFamily.includes("仿宋"))
            v.style.fontFamily="Times New Roman , 宋体"
        })
        ool.querySelectorAll("bk u").forEach(v=>{
            v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.______________")
            v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
        })
    }
    if(Nopt.qcontent.type.id==280901){
        ool.innerHTML=ool.innerHTML.replaceAll(/【小题(\d*)】/g,"$1.")
    }


    return ool.outerHTML
}
export{normalizeq,normalizeqA}
