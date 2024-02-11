function normalizeq(q){
    const ool=document.createElement("div")
    q=q.replaceAll("【题文】","")
    ool.innerHTML=q

    ool.querySelectorAll("img").forEach(async(v)=>{
        if(v.src.includes("/formula/")){
            // v.src=v.src.replace(".png",".svg")
            fetch(v.src.replace("https://staticzujuan.xkw.com/quesimg/Upload/formula/",API.host+"/api/xkw-helper/route-formula-svg/").replace(".svg",""))
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
            v.style.fontFamily="Times New Roman , 宋体"
        }
        // if(!v.style.fontSize){
        //     v.style.fontSize="9.5pt"
        // }

        // v.style.lineHeight="12pt"
        // v.style.margin="0px"
    })


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
    
    // ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
    //     if(v.querySelectorAll("td").length==4){
    //         // console.log("oo",v);
    //         let opts=[],lns=1
    //         v.querySelectorAll("td").forEach(oo=>{
    //             opts.push(oo.outerHTML)
    //         })
    //         // v.addEventListener("click",()=>{
    //         //     console.log("click");
    //             const {ctn,next_lns}=toTable(opts,4)
    //             v.innerHTML=ctn
    //             // lns=next_lns
    //         // })
    //     }

    // })
    // ool.querySelectorAll("table[name=optionsTable] td").forEach(v=>{
    //     if(!v.style.fontFamily){
    //         v.style.fontFamily="Times New Roman , 宋体"
    //     }
    //     if(!v.style.fontSize){
    //         v.style.fontSize="9.5pt"
    //     }

    //     // v.style.lineHeight="12pt"
    //     v.style.margin="0px"
    // })
    ool.querySelectorAll("table[name=optionsTable] td").forEach(v=>{
        v.innerHTML="<span style='width:fit-content;display:block;'>"+v.innerHTML+"</span>"
        if(!v.style.fontFamily){
            v.style.fontFamily="Times New Roman , 宋体"
        }
        // if(!v.style.fontSize){
        //     v.style.fontSize="9.5pt"
        // }
        // console.log(v.querySelector("span").clientWidth);

        // v.style.lineHeight="12pt"
        // v.style.margin="0px"
    })

    //18.76/4

    ool.style.fontFamily="Times New Roman , 宋体"


    // if(Nopt.ret2){
    //     ool.querySelectorAll("span").forEach(v=>{
    //         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
    //     })
    //     ool.querySelectorAll("bk").forEach(v=>{
    //         v.innerHTML="<u>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</u>"
            
    //     })
    // }

    // console.log(ool.innerHTML);

// console.log(ool.outerHTML);
// if(Nopt.includeti){
//     console.log("rrr");
//     ool.insertAdjacentHTML("afterbegin",`<strong>${Nopt.tindex}. </strong>`)
// }
// if(Nopt.gtittype==3){
//     ool.insertAdjacentHTML("afterbegin",`<strong>${Nopt.tindex}.</strong> (${Nopt.ootInfo[0]},${Nopt.ootInfo[1]}) `)
// }
// ool.insertAdjacentHTML("afterbegin",`<strong>${Nopt.tindex}. </strong>`)
    return ool.outerHTML
}


export{normalizeq}
