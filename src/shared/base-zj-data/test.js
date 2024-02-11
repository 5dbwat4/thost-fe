fetch("https://zujuan.xkw.com/zujuan-api/question/batch", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    // "requestverification": "CfDJ8CN_P4_rq9xNrRs2IW_MYp41gVueGGxQffLgSgUDv8zz2lUb6wwinsZu8GNRRmmjs_l_YbHpqinuBCcOwDIHxKJJRlp-o4pwX7Zu6se_x0JtXzhh-1LXJux3UJsrno-NDizBX6kFxgfePSC8Hov2lytaziHFSiqO7weE07m127QDwL65XSY-e_pPHHdwq1jKbQ",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "xkw-device-id=9E6220F86F306BA5F700980B9B2DEC88; UT1=ut-35731-p86yEFxvepnYJg; Hm_lvt_68fb48a14b4fce9d823df8a437386f93=1703089955,1703173951; pc_home_bigpopup=1; xk.identity=%7b%7d; ip2ProvinceId=320000; chapterid11=153451; devicePixelRatio=2; aliyungf_tc=e459346f96de77e7ac64f1a875c5d729bf10ad964101dadc36edc8709be7c101; ls-info=60934329; zujuan-core=CfDJ8CN_P4_rq9xNrRs2IW_MYp5j87hcfQpxJ3SFEaKVD5bfRwM5DFfM4iIUUTNVzwdXw5hq26IX2svF2M5FefNIq4LuSaYxe7Cno3ca0Z0nPlGzUylcn149Y9uyTaoNyC2ndJgCYY178BVxEo8n2y9_w18UQus1emrJhrraCMtoog-96MppImCPzNv5A0lNalKgEkiHw9m-Jhbj3WJS76cyCIGIn9KijThDuGuuQuU_mt3fJoz7veE23lrjmWpJrhgRWjCf9LOh1bHm8mkbC45ayIUPkUPnCLejt1_3Ypxozwyz; __RequestVerificationToken=CfDJ8CN_P4_rq9xNrRs2IW_MYp5L6ESZL37qxh4LBKXzl3tBwl0oXjosFCRSEoOmqxxQDn0bNPyZ99pS4RCpCRELTMHOZn1cclZfEHiCfo_gWp9uu-Dq-CVksCxDpUmkAW2PkXT4vcmn3uAvs3E3bv3_YMc; sideBar=false; zujuan_latest_search_keyword=%E5%90%ABRu%E5%8C%96%E5%90%88%E7%89%A9%E5%82%AC%E5%8C%96CO2%E8%BD%AC%E5%8C%96%E4%B8%BA%E7%94%B2%E9%85%B8%20Ru%E7%9A%84%E5%8C%96%E5%90%88%E4%BB%B7%E4%BF%9D%E6%8C%81%E4%B8%8D%E5%8F%98; newMemberActivity_60934329=1; userId=60934329; usert=8f17638573255da1bab9f824fd940543; username=xkw_060934329; manager=0; userGuid=16a67880-85b1-4b5a-b7ff-9bec1f9b3940; user_token=eyJ1c2VySWQiOiI2MDkzNDMyOSIsInVzZXJfdG9rZW4iOiJ1cTRuam81NmwifQ%3d%3d; zjut=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjYwOTM0MzI5LCJwd2QiOiI4ZjE3NjM4NTczMjU1ZGExYmFiOWY4MjRmZDk0MDU0MyJ9.11L4iiy7Cv5mKH3UFPGS9aR9tYUWy2IRW2E0nfGVfGU; filter_pts=%2Fgzyw%2Fzsd23177%2Fpts1o2%2F; filter_ds=%2Fgzyw%2Fzsd23177%2Fds1o2%2F; acw_tc=ac11000117040833232461690e7ad172da1035605c88d614265326996bad0b; bankId=15; quesBasketVersion=1703693007731",
    "Referer": "https://zujuan.xkw.com/gzsw/shijuan/jdcs/",
    "Referrer-Policy": "unsafe-url"
  },
  "body": "bankid=15&quesids=21250999%2C21246776",
  "method": "POST"
}).then(v=>v.json()).then(o=>console.log(o));