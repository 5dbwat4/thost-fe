let op={}

import { readFileSync, writeFileSync } from "fs";

const f0d=JSON.parse(readFileSync("subjects.json"))


function walkthrough(node,parentString){

    op[node.value]=parentString==""?node.label:parentString + " / "+node.label
    if(node.children){
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            walkthrough(child,parentString==""?node.label:parentString + " / "+node.label)
        }
    }
    return 
}


f0d.forEach(v=>walkthrough(v,""))

writeFileSync("subjects-flattened.json",JSON.stringify(op))