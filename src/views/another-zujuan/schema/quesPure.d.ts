export type Ques0Type = {
    "audio": string,
    "body": string,
    "childCount": number,
    "collect": boolean,
    "diff": {
      "id": number,
      "name": string,
      "value": number
    },
    "id": number,
    "indexCount": number,
    "isInsert": boolean,
    "knowledgeInfo": string,
    "knowledges": [
      {
        "id": number,
        "name": string,
        "pid": number
      }
    ],
    "paperSources": [
      {
        "areaId": number,
        "id": number,
        "name": string,
        "valid": boolean
      }
    ],
    "time": string,
    "title": string,
    "type": {
      "choice": boolean,
      "id": number,
      "name": string
    },
    "useCount": number,
    "video": string
  }