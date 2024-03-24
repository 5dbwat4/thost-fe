import { API } from "../../shared/APIHelper";
import { DateTime } from "luxon";
import { marked } from 'marked';
import { normalizeq as normalizeq_toScreenDSingle } from "../../shared/normalize_q/toScreenDSingle";
import { normalizeq as normalizeq_toPrint_MistakesCollSpecialized} from "../../shared/normalize_q/toPrint_MistakesCollSpecialized";

function generateHTMLCodeQ(mistakesBlock,questionBlock,normalizeqFunc){
const op=document.createElement("div")
op.insertAdjacentHTML("afterbegin",`
<p>${mistakesBlock.id} | QID:${questionBlock.id}</p>
<p>收录于：${DateTime.fromMillis(mistakesBlock.collTime).toLocaleString(DateTime.DATE_MED)} | 分类： ${mistakesBlock.tags.map(v=>v.label).join(",")}</p>
`)
if(mistakesBlock.qType=="HTML"){
    op.insertAdjacentHTML("beforeend",mistakesBlock.q)   
}
if(mistakesBlock.qType=="MD"){
    op.insertAdjacentHTML("beforeend",marked.parse(mistakesBlock.q))   
}
if(mistakesBlock.qType=="Text"){
    op.insertAdjacentHTML("beforeend","<p>"+mistakesBlock.q+"</p>")   
}
if(mistakesBlock.qType=="AS-IS"){
    op.insertAdjacentHTML("beforeend",normalizeq_toScreenDSingle(questionBlock.q))   
}

return op.outerHTML
}
function generateHTMLCodeQwithStyling(mistakesBlock,questionBlock,index){
const op=document.createElement("div")
op.insertAdjacentHTML("afterbegin",`
<p style="font-size: 6.5pt; margin: 0px; font-family: Cambria, 仿宋">ID:<span style="font-family: 'courier new'">${mistakesBlock.id}</span> | ~QID:<span style="font-family: 'courier new'">${questionBlock.id}</span></p>
<p style="font-size: 6.5pt; margin: 0px; font-family: Cambria, 仿宋">收录于：${DateTime.fromMillis(mistakesBlock.collTime).toLocaleString(DateTime.DATE_MED)} | 分类： ${mistakesBlock.tags.map(v=>v.label).join(",")}</p>`)
if(mistakesBlock.qType=="HTML"){
    op.insertAdjacentHTML("beforeend",mistakesBlock.q)   
}
if(mistakesBlock.qType=="MD"){
    op.insertAdjacentHTML("beforeend",marked.parse(mistakesBlock.q))   
}
if(mistakesBlock.qType=="Text"){
    op.insertAdjacentHTML("beforeend","<p>"+mistakesBlock.q+"</p>")   
}
if(mistakesBlock.qType=="AS-IS"){
    op.insertAdjacentHTML("beforeend",normalizeq_toPrint_MistakesCollSpecialized(questionBlock.q,{q0b:questionBlock,tindex:index}))   
}

return op.outerHTML
}

function generateHTMLCodeQ4CardDisplay(mistakesBlock,questionBlock,normalizeqFunc){
    const op=document.createElement("div")
    // op.insertAdjacentHTML("afterbegin",`
    // <p>${mistakesBlock.id} | QID:${questionBlock.id}</p>
    // <p>收录于：${DateTime.fromMillis(mistakesBlock.collTime).toLocaleString(DateTime.DATE_MED)} | 分类： ${mistakesBlock.tags.map(v=>v.label).join(",")}</p>
    // `)
    if(mistakesBlock.qType=="HTML"){
        op.insertAdjacentHTML("beforeend",mistakesBlock.q)   
    }
    if(mistakesBlock.qType=="MD"){
        op.insertAdjacentHTML("beforeend",marked.parse(mistakesBlock.q))   
    }
    if(mistakesBlock.qType=="Text"){
        op.insertAdjacentHTML("beforeend","<p>"+mistakesBlock.q+"</p>")   
    }
    if(mistakesBlock.qType=="AS-IS"){
        op.insertAdjacentHTML("beforeend",normalizeq_toScreenDSingle(questionBlock.q))   
    }
    
    return op.outerHTML
    }
export{generateHTMLCodeQ,generateHTMLCodeQ4CardDisplay,generateHTMLCodeQwithStyling}