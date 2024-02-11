let filenames=[

]

for (let i = 1; i < 19; i++) {
    filenames.push("k_"+i+".json")
    
}

import { readFileSync, writeFileSync } from "fs";



function exec0(fn){
    const f0d=JSON.parse(readFileSync(fn))




    function walkthrough(node){
        let outd={id:node.id,title:node.title}
        if(node.children){
            outd.children=[]
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                outd.children.push(walkthrough(child))
            }
        }
        return outd
    }
    
    const d0=walkthrough(f0d)

    writeFileSync(fn,JSON.stringify(d0))
}


// console.log(d0);



filenames.forEach(v=>exec0(v))
