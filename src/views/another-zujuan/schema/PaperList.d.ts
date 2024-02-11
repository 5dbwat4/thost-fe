export type paperlist = {
    "code": number,
    "data": {
      "count": number,
      "finished": boolean,
      "list": [
        {
          "area": {
            "id": number,
            "name": string
          },
          "collect": boolean,
          "fresh": boolean,
          "grade": {
            "id": number,
            "name": string
          },
          "id": number,
          "level": {
            "id": number,
            "name": string
          },
          "quesCount": number,
          "readSum": number,
          "subjectId": number,
          "time": string,
          "title": string,
          "type": {
            "id": number,
            "name": string
          },
          "year": string
        }
      ],
      "total": number
    },
    "msg": string
  }