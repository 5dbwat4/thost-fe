import quesTypeList from "../base-zj-data/questypeList.flattened.json"
import diffMap from "../base-zj-data/diff.map.json"

function normalizeq(q,Nopt){
    const ool=document.createElement("div")
    q=q.replaceAll("【题文】","")


    if(Nopt.q0b.bankid==10){
        q=q.replaceAll(/【小题(\d)】/g,"$1. ")
    }
    ool.innerHTML=q



    ool.querySelectorAll("img").forEach(v=>{
        if(v.src.includes("/formula/")){
            v.src=v.src.replace(".png",".svg")
            v.style.width=(v.width*.8)+"px"
            v.setAttribute("width",(v.width*.8))
            v.setAttribute("height","")
        }
        if(v.src.includes("/dksih/")){
            let tmp=/\?resizew=(\d*)/.exec(v.src)
            if(tmp&&tmp.length!=0){
                if(tmp[1]>500)tmp[1]=500
                v.style.width=tmp[1]+"px"
                v.src=v.src.replace(/\?resizew=(\d*)/,"")
                v.setAttribute("width",tmp[1])
                v.setAttribute("height","")
            }
            v.outerHTML=`
        
            <div style="width: fit-content;display: inline-block;text-align: center;" class="__ccccimage">${v.outerHTML}
    <p style="margin: 0 0;font-family: kaiti;">（第${Nopt.tindex}题图）</p></div>`
            v.setAttribute("data-pictid",Nopt.tindex)
        }
    })


    ool.querySelectorAll("p").forEach(v=>{
        if(!v.style.fontFamily){
            v.style.fontFamily="Times New Roman , 宋体"
        }
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
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
        if(!v.style.fontSize){
            v.style.fontSize="9.5pt"
        }
        // console.log(v.querySelector("span").clientWidth);

        // v.style.lineHeight="12pt"
        v.style.margin="0px"
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


ool.childNodes.forEach(e=>{
    if(e.nodeName=="#text"){
        const chi=document.createElement("p")
        chi.style.display="inline"
        chi.style.margin="0"
    
        chi.innerText=e.textContent
        if(e.textContent.includes("______________________________________________________")){
            chi.style.wordBreak="break-all"
        }
        e.parentNode.replaceChild(chi,e)
    }
})
ool.querySelectorAll("sub").forEach(
    (ee)=>{
    ee.style.display="inline"
})
ool.querySelectorAll("sup").forEach(
    (ee)=>{
    ee.style.display="inline"
})

ool.querySelectorAll("bk[type=underline]").forEach(
    (ee)=>{
    if(ee.innerText.includes("_")){
        ee.style.color="lightgray"
  ee.style.fontSize= "13pt";
//   ee.style.textDecorationLine= "underline";
//   ee.style.textDecorationStyle= "dashed";
//   ee.style.textDecorationColor="black";
//   ee.style.textDecorationThickness=" 0.5px";
    }
})

// if(Nopt.nqtype==0||Nopt.nqtype==3){
    ool.insertAdjacentHTML("afterbegin",` (${quesTypeList[""+Nopt.q0b.bankid][""+Nopt.q0b.type]},${diffMap[""+Nopt.q0b.diff]}(${Nopt.q0b.diff})) `)
// }


// if(Nopt.nqtype==0||Nopt.nqtype==3||Nopt.nqtype==5){
    // console.log("rrr");
    ool.insertAdjacentHTML("afterbegin",`<strong>${Nopt.tindex}. </strong>`)
// }



// if(Nopt.q0b.type==2809){
//     console.log("oooo0");
//     ool.querySelectorAll("bk u").forEach(v=>{
//         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.______________")
//         v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
//     })
//     ool.innerHTML=ool.innerHTML.replaceAll(/【小题(\d*)】/g,"$1.")
// }
// if(Nopt.q0b.type==280901){
//     ool.innerHTML=ool.innerHTML.replaceAll(/【小题(\d*)】/g,"$1.")
// }
// if(Nopt.q0b.type==280902){
//     ool.querySelectorAll("bk u").forEach(v=>{
//         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.______________")
//         v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
//     })
// }

// if(Nopt.q0b.type==2808){
//     ool.querySelectorAll("span").forEach(v=>{
//         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,"$1.")
//     })
//     ool.querySelectorAll("bk").forEach(v=>{
//         v.style="text-decoration: underline black;"
//         v.outerHTML="<span style='text-decoration: underline black;'>&nbsp;&nbsp;&nbsp;"+v.attributes.index.nodeValue+"&nbsp;&nbsp;&nbsp;</span>"
        
//     })
//     // ool.querySelectorAll("table[name=optionsTable]").forEach(v=>{
//     //     // console.log(v.previousElementSibling.offsetwidth);
//     //     v.style.width="calc(100% - "+16+"px)"
//     //     v.previousElementSibling.style.display="inline-block"
//     //     v.parentElement.style.display="block"
//     //     // v.parentElement.style.height="15.2px"
//     //     v.style.display="inline-table"
//     //     v.style.verticalAlign="middle"
//     //     // v.style.borderCollapse="collapse"
//     // })
// }

// if(Nopt.q0b.type==281302){
//     ool.querySelectorAll("bk u").forEach(v=>{
//         v.innerHTML=v.innerHTML.replace(/【小题(\d*)】/,` <span>$1.</span><span style="color: lightgray;
//   font-size: 13.5pt;">__________________</span> `)
//         v.outerHTML=v.outerHTML.replace("<u>","<span>").replace("</u>","</span>")
//     })
// }

// if(Nopt.gtittype==4){
//     ool.insertAdjacentHTML("afterbegin",`<strong>${Nopt.tindex}. </strong> `)
// }


ool.querySelectorAll("p").forEach(ee=>{
    if(ee.innerText=="\n\n"){
        ee.parentNode.removeChild(ee)
    }
})
ool.querySelectorAll("br").forEach(vv=>{
    if(vv.nextSibling?.tagName=="BR"){
        vv.nextSibling.style.display="none"
    }
})
ool.querySelectorAll("br").forEach(vv=>{
        if(vv.style.display=="none"){
            vv.parentNode.removeChild(vv)
        }
})


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

export{normalizeq}
