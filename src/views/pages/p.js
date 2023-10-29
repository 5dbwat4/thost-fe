// ==UserScript==
// @name         zujuan.xkw.com parser
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://zujuan.xkw.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xkw.com
// @grant        none
// ==/UserScript==


var APILoc = "http://localhost:2023"
var BMap = {}

var syncbatchInfo = {
    started: false,
    currentids: [],
    title: ""
}
var regenattInfo = {
    started: false,
    list: [],
    index: ""
}
async function SaveTn(vid, opt) {
    return new Promise(async (resolve, reject) => {
        let v = BMap[vid]
        let op = { extra: {} }
        op.qid = parseInt(v.attributes.questionid.nodeValue)
        op.bankid = parseInt(v.attributes.bankid.nodeValue)
        await fetch(APILoc + "/api/xkw-helper/get_pure_question/" + op.bankid + "/" + op.qid).then(r => r.json()).then(async (o1) => {
            const o = o1.data
            op = {
                qid: op.qid,
                bankid: op.bankid,
                q: o.body,
                a: "<answerparser>unsaved|u</answerparser>",
                extra: JSON.stringify({
                    from: o.paperSources[0] ? o.paperSources[o.paperSources.length - 1].name : "",
                    knowledgepoint: o.knowledgeInfo.split("，"),
                    info: [o.type.name, o.diff.name + "(" + o.diff.value + ")"]

                }),
                timestamp: (new Date()).getTime()
            }
            document.getElementById(`saveinfo_${vid}`).innerHTML = "Please Wait for <code>check_ques_parse</code> requests"



            document.getElementById(`saveinfo_${vid}`).innerHTML = "Please Wait for <code>save_img</code> requests"
            if (opt.aonly) {
                op.a = `<answerparser>unsaved|unsaved</answerparser>`
            } else {
                let imginfo = await getap(op.qid, op.bankid)
                op.a = `<answerparser>${(await DownloadImg(imginfo.a))}|${(await DownloadImg(imginfo.q))}</answerparser>`
            }
            document.getElementById(`saveinfo_${vid}`).innerHTML = "Please wait for <code>save</code> request"
            fetch(APILoc + "/api/add", {
                method: "POST", body: JSON.stringify(op), headers: {
                    "Content-Type": "application/json"
                }
            }).then(v => v.json()).then(v => {
                document.getElementById(`saveinfo_${vid}`).innerHTML = "<span style='color:green'>Saved</span>"
                resolve(v.id)
            })
        })
    })
}
async function DownloadImg(src) {
    return await fetch(APILoc + "/api/xkw-helper/download-pic", {
        method: "POST", body: JSON.stringify({ src }), headers: {
            "Content-Type": "application/json"
        }
    }).then(r => r.json()).then((r) => {
        console.log(r.e)
        return r.e
    })
}
async function getap(qid, bid) {
    return new Promise((res, rej) => {
        $.ajax({
            url: "/zujuan-api/check_ques_parse",
            type: "post",
            data: {
                quesId: qid,
                bankId: bid
            },
            dataType: "json",
            success: (e) => {
                res({
                    a: `https://imzujuan.xkw.com/Answer@3x/${qid}/${bid}/350/14/28/${e.key}?enVqdWFu=${Cookie.Get("user_token")}`,
                    q: `https://imzujuan.xkw.com/Parse@3x/${qid}/${bid}/700/14/28/${e.key}?enVqdWFu=${Cookie.Get("user_token")}`
                })


            }
        })

    })
}

async function delete_q(bid, qid) {
    return new Promise((res, rej) => {
        $.ajax({
            url: "/zujuan-api/usertk/del-question?bankId=" + bid + "&questionId=" + qid,
            type: "get",
            success: (e) => {
                res(e)


            }
        })

    })
}


function SubmitSyncBatch(id, infodom) {
    fetch(APILoc + "/api/syncbatch/push-to-session/" + id).then(v => v.json()).then(v => { infodom.innerHTML = "Pushed" })
}

function InitSyncbatch() {
    console.log("Aaa")
    Object.entries(BMap).forEach(v => {
        let vid = v[0]
        v[1].insertAdjacentHTML("beforeend", `<button id="save_sync_${vid}">SAVE and into Sync</button>
        <button id="save_nopa_sync_${vid}">Push no P/A into Sync</button>
        <button id="push_sync_${vid}">Push into Sync</button>
        <p id="syncinfo_${vid}"></p>`)
        document.getElementById(`save_sync_${vid}`).addEventListener("click", ((_vid) => { return async () => { SubmitSyncBatch(await SaveTn(_vid, {}), document.getElementById(`syncinfo_${vid}`)) } })(vid))
        document.getElementById(`save_nopa_sync_${vid}`).addEventListener("click", ((_vid) => { return async () => { SubmitSyncBatch(await SaveTn(_vid, { aonly: true }), document.getElementById(`syncinfo_${vid}`)) } })(vid))
        document.getElementById(`push_sync_${vid}`).addEventListener("click", async () => {
            fetch(APILoc + "/api/qapi/is_collected/" + v[1].attributes.bankid.nodeValue + "/" + v[1].attributes.questionid.nodeValue).then(o => o.json()).then(o => {
                SubmitSyncBatch(o.info.id, document.getElementById(`syncinfo_${vid}`))
            })
        })

    })
}


function InitRegenatt() {
    document.body.insertAdjacentHTML("afterbegin", `
    <div style="position:fixed;top:15px;right:15px;z-index:9999"><button id="next_regenatt">Next Regenatt</button></div>
    `)
    document.getElementsByTagName("body")[0].addEventListener("keyup", (e) => {
        switch (e.key) {
            case "j": {
                location.href = APILoc + "/api/regen-attach/router/next"
                break
            }
        }
    })
    document.getElementById("next_regenatt").addEventListener("click", () => {
        location.href = APILoc + "/api/regen-attach/router/next"
    })
}

async function ShowAP_(vid) {
    let v = BMap[vid]
    let op = {}
    op.qid = parseInt(v.attributes.questionid.nodeValue)
    op.bankid = parseInt(v.attributes.bankid.nodeValue)
    let imginfo = await getap(op.qid, op.bankid)
    document.getElementById("qa_place_" + vid).innerHTML = `<img src="${imginfo.a}" width="350"/><br/><img src="${imginfo.q}" width="700"/>"`
}


async function initSaveAllAndPush() {
    console.log("aa")
    document.querySelector(".exam-cnt").insertAdjacentHTML("afterbegin", `
    <div><button id="SaveAllAndPushP">Save All and Push</button></div>
    `)
    document.getElementById("SaveAllAndPushP").addEventListener("click", async () => {
        const ee = Object.entries(BMap)
        for (let i = 0; i < ee.length; i++) {
            await fetch(APILoc + "/api/qapi/is_collected/" + ee[i][1].attributes.bankid.nodeValue + "/" + ee[i][1].attributes.questionid.nodeValue).then(o => o.json()).then(async (o) => {
                if (o.found) {
                    SubmitSyncBatch(o.info.id, document.getElementById(`syncinfo_${ee[i][0]}`))
                } else {
                    SubmitSyncBatch(await SaveTn(ee[i][0], { aonly: true }), document.getElementById(`syncinfo_${ee[i][0]}`))
                }

            })
        }
    })
}

function AddQuesNumToQBlock() {
    document.querySelectorAll(".tk-quest-item").forEach(v => {
        v.querySelector(".left-msg").insertAdjacentHTML("beforeend", `             <b class="gap">|</b>
                        <span class="addi-info">
                            <span class="info-cnt">QID:${v.getAttribute("questionid")}</span>
                        </span>`)
    })

}


function isOriginal() {

    if (window.location.pathname.includes("/shijuan/")) {
        console.log("beg");
        let oop = []
        document.querySelectorAll(".item-td").forEach(o => {

            const ops = /(\d*)p(\d*)\.html/g.exec(o.querySelector(".exam-name").attributes.href.nodeValue)

            console.log(ops[1], ops[2])
            fetch(APILoc + "/api/xkw-helper/____sensitive/get_zujuan_app_content", {"headers": { "Content-Type": "application/json" }
        ,
                    method: "POST", body: JSON.stringify
                        ({ method: "GET", url: "/app-server/v1/paper/detail/" + ops[1] + "/" + ops[2] })
                }).then(e => e.json()).then(o2 => {
                    const oopp = o2.data.quesList
                    let origCount = 0
                    for (let icon = 0; icon < oopp.length; icon++) {
                        const element = oopp[icon];
                        let swlList = []
                        element.paperSources.forEach(v => {
                            if (v.valid) {
                                swlList.push(v.id)
                            }
                        })
                        console.log(swlList, ops[2], Math.min(...swlList));
                        if (Math.min(...swlList) == ops[2]) {
                            origCount++
                        }
                    }
                    console.log(origCount, o, oopp.length)

                    o.querySelector(".test-sum").insertAdjacentHTML("beforeend", ` 原创数<em>${origCount}</em> (${Math.floor(origCount * 100 / oopp.length)}%)`)

                })


        })

    }

}

(function () {
    'use strict';
    $.getScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js", () => {
        document.querySelectorAll(".tk-quest-item").forEach((v) => {
            // console.log(v)
            let vid = v.attributes["data-sys-id"].nodeValue
            BMap[vid] = v
            v.insertAdjacentHTML("beforeend", `<button id="save_${vid}">SAVE</button><button id="save_ans_${vid}">SAVE without a/q </button><span id="saveinfo_${vid}"></span><div id="is_collected_${vid}">Is it collected?</div>`)
            fetch(APILoc + "/api/qapi/is_collected/" + v.attributes.bankid.nodeValue + "/" + v.attributes.questionid.nodeValue).then(v => v.json()).then(v => {
                if (v.found) { document.getElementById(`is_collected_${vid}`).innerHTML = "<span style='color:red'>FOUND:" + JSON.stringify(v.info) + "</span>" }
                else { document.getElementById(`is_collected_${vid}`).innerHTML = "<span style='color:green'>NOT FOUND</span>" }
            })
            document.getElementById(`save_${vid}`).addEventListener("click", ((_vid) => { return () => { SaveTn(_vid, {}) } })(vid))
            document.getElementById(`save_ans_${vid}`).addEventListener("click", ((_vid) => { return () => { SaveTn(_vid, { aonly: true }) } })(vid))
            v.querySelector(".ctrl-box").insertAdjacentHTML("beforeend", `<a id="show_ap_${vid}" class="  ctrl-btn ">显示答案</a>`)
            v.querySelector(".exam-item__cnt").insertAdjacentHTML("afterend", `<div id="qa_place_${vid}"></div>`)
            document.getElementById(`show_ap_${vid}`).addEventListener("click", ((_vid) => { return () => { ShowAP_(_vid) } })(vid))

        })

        document.querySelectorAll(".ques-additional").forEach(v => v.style.display = "block")



        if (location.pathname.includes("usertk")) {

            document.querySelector(".right-box").insertAdjacentHTML("afterbegin", `
         <button id="clear_this_page">Clear</button><button id="save_without_aq">Save without ap</button>
         `)
            document.getElementById("clear_this_page").addEventListener("click", async () => {
                for (let i = 0; i < Object.entries(BMap).length; i++) {
                    const o = Object.entries(BMap)[i];
                    await delete_q(o[1].attributes.bankid.nodeValue, o[1].attributes.questionid.nodeValue)
                }
                swal("done", "delete done", "success").then(() => {
                    window.location.reload()
                })
            })
            document.getElementById("save_without_aq").addEventListener("click", () => {
                Object.entries(BMap).forEach(o => {
                    SaveTn(o[0], { aonly: true })
                })
            })
        }



        isOriginal()

        if (/\/\d*p\d*\.html/.test(location.pathname)) {
            console.log("aaa")
            initSaveAllAndPush()
            AddQuesNumToQBlock()
        }

        fetch(APILoc + "/api/syncbatch/sync-session").then(v => v.json()).then(v => {
            syncbatchInfo = v.data

            if (v.data.started) {
                InitSyncbatch()
            }
        })
        fetch(APILoc + "/api/regen-attach/get-info").then(v => v.json()).then(v => {
            regenattInfo = v

            if (v.started) {
                InitRegenatt()
            }
        })
    })
})();

