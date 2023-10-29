// ==UserScript==
// @name         zujuan: is it original?
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://zujuan.xkw.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xkw.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(window.location.pathname);
if(window.location.pathname.includes("/shijuan/")){
    console.log("beg");
    let MessageResCallback=(e)=>{}
    window.addEventListener('message', (event)=>{
        let origin = event.origin || event.originalEvent.origin; 
        MessageResCallback(event)
        }
      )

    document.body.insertAdjacentHTML("afterbegin",`<iframe id="pppppppsifr" src="https://zjappserver.xkw.com/app-server?@apps-get-json"></iframe>`)
    let oop=[]
    document.querySelectorAll(".item-td").forEach(o=>{

        const ops=/(\d*)p(\d*)\.html/g.exec(o.querySelector(".exam-name").attributes.href.nodeValue)
        
        console.log(ops[1],ops[2])
        oop.push({dom:o,fetchurl:"/app-server/v1/paper/detail/"+ops[1]+"/"+ops[2],pid:ops[2]})
    
        
      })

     async function doit(index){
        console.log("handle",index);
        if(index==oop.length){
            return
        }
        MessageResCallback=(e)=>{
            if(e.data.mark!="@callback@apps-get-json"){
                return
            }
            const oopp=JSON.parse(e.data).data.quesList
            console.log(oopp);
            let origCount=0
            for (let icon = 0; icon < oopp.length; icon++) {
                const element = oopp[icon];
                if(element.paperSources[element.paperSources.length-1].id==oop[index].pid){
                    origCount++
                }
            }
            console.log(origCount)
            
            oop[index].dom.querySelector(".info-item").querySelector(".infos").insertAdjacentHTML("beforeend",`<span class="item test-sum">原创数<em>${origCount}</em></span>`)

            doit(index+1)
        }
        document.getElementById("pppppppsifr").contentWindow.postMessage(oop[index].fetchurl,"https://zujuan.xkw.com")

      }
    doit(0)
    
}
    // Your code here...
})();