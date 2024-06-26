function normalizeq(q,Nopt){
    const ool=document.createElement("div")
    q=q.replaceAll("【题文】","")
    ool.innerHTML=q

    ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/formula/")){
            v.src=v.src.replace(".png",".svg")
            // v.style.width=(v.width*.8)+"px"
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

    // ool.querySelectorAll("bk").forEach(v=>{
    //     v.outerHTML=v.outerHTML.replaceAll("bk","input")
    // })

    if(Nopt.source){
        ool.innerHTML=`<span style="font-family:kaiti">(${Nopt.source})</span>`+ool.innerHTML
    }


    // ool.querySelectorAll("p").forEach(v=>{
    //     if(!v.style.fontFamily){
    //         v.style.fontFamily="Cambria , 宋体"
    //     }
    //     if(!v.style.fontSize){
    //         v.style.fontSize="9.5pt"
    //     }

    //     // v.style.lineHeight="12pt"
    //     v.style.margin="0px"
    // })


    // ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
    //     if(v.querySelectorAll("td").length==4){
    //         // console.log("oo",v);
    //         let opts=[],lns=1
    //         v.querySelectorAll("td").forEach(oo=>{
    //             opts.push(oo.outerHTML)
    //         })
    //         v.addEventListener("click",()=>{
    //             console.log("click");
    //             const {ctn,next_lns}=toTable(opts,lns)
    //             v.innerHTML=ctn
    //             lns=next_lns
    //         })
    //     }

    // })

    // ool.querySelectorAll("table[name=optionsTable] td").forEach(v=>{
    //     if(!v.style.fontFamily){
    //         v.style.fontFamily="Cambria , 宋体"
    //     }
    //     if(!v.style.fontSize){
    //         v.style.fontSize="9.5pt"
    //     }

    //     // v.style.lineHeight="12pt"
    //     v.style.margin="0px"
    // })


    //18.76/4

    // ool.style.fontFamily="Cambria , 宋体"


    // if(Nopt.ret2){
    //     ool.querySelectorAll("span").forEach(v=>{
    //         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    //     })
    //     ool.querySelectorAll("bk").forEach(v=>{
    //         v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
            
    //     })
    // }

    // console.log(ool.innerHTML);


    return ool.innerHTML
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

export{normalizeq}
