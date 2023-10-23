import { API } from "../../../../shared/APIHelper"
import { Diffsmap_flattened } from "../../questionBlock/Diffsmap_flattened"
import { Typesmap_flattened } from "../../questionBlock/Typesmap_flattened"
import { normalizeq } from "./nomorlize_q"

async function generateExpHTMLCode(ics,opts){
    let htmlelem=document.createElement("div")
    let ctncode="<div>"
    for (let i = 0; i < ics.length; i++) {
        await API.get("/zujuan-ink-be-core/data/getq/"+ics[i].quid).then(w=>{
            ctncode+=`
            <div class="qqmain" id="qmain-${i}">
            <p class="note" id="q-note-${i}">${ics[i].note!=""?"注："+ics[i].note:""}</p>
            <div class="qblock" id="qblock-${i}">${opts.numberEachT?(i+1)+".":""}(${Diffsmap_flattened[w.diffv]},${Typesmap_flattened[w.typeid]})（${w.title}）${normalizeq(w.body)}</div>
            
            </div>
            `
        }) 
    }
    ctncode+="</div>"
    return ctncode
}


export{generateExpHTMLCode}