## https://zjappserver.xkw.com/app-server/v1/paper/list/15?types=0&pageIndex=3&typeGroups=101&terms=0&pageSize=3&orderBy=0&areas=0&grades=0&years=0&levels=0


根据提供的数据，可以推断出以下的数据模式（schema）：

```json
{
  "code": integer,
  "data": {
    "count": integer,
    "finished": boolean,
    "list": [
      {
        "area": {
          "id": integer,
          "name": string
        },
        "collect": boolean,
        "fresh": boolean,
        "grade": {
          "id": integer,
          "name": string
        },
        "id": integer,
        "level": {
          "id": integer,
          "name": string
        },
        "quesCount": integer,
        "readSum": integer,
        "subjectId": integer,
        "time": string,
        "title": string,
        "type": {
          "id": integer,
          "name": string
        },
        "year": string
      }
    ],
    "total": integer
  },
  "msg": string
}
```

其中，数据模式的描述如下：

- `"code"`: 表示返回的状态码，为一个整数 (integer)。
- `"data"`: 表示返回的数据对象，包含以下字段：
  - `"count"`: 表示数据列表中的项目数量，为一个整数 (integer)。
  - `"finished"`: 表示是否已完成，为一个布尔值 (boolean)。
  - `"list"`: 表示数据项目的列表，为一个数组 (array)。每个项目包含以下字段：
    - `"area"`: 表示地区信息的对象，包含以下字段：
      - `"id"`: 表示地区的 ID，为一个整数 (integer)。
      - `"name"`: 表示地区的名称，为一个字符串 (string)。
    - `"collect"`: 表示是否已收藏，为一个布尔值 (boolean)。
    - `"fresh"`: 表示是否为新鲜内容，为一个布尔值 (boolean)。
    - `"grade"`: 表示年级信息的对象，包含以下字段：
      - `"id"`: 表示年级的 ID，为一个整数 (integer)。
      - `"name"`: 表示年级的名称，为一个字符串 (string)。
    - `"id"`: 表示项目的 ID，为一个整数 (integer)。
    - `"level"`: 表示级别信息的对象，包含以下字段：
      - `"id"`: 表示级别的 ID，为一个整数 (integer)。
      - `"name"`: 表示级别的名称，为一个字符串 (string)。
    - `"quesCount"`: 表示问题数量，为一个整数 (integer)。
    - `"readSum"`: 表示阅读次数，为一个整数 (integer)。
    - `"subjectId"`: 表示学科的 ID，为一个整数 (integer)。
    - `"time"`: 表示时间的字符串，格式为 "YYYY-MM-DD HH:MM:SS"。
    - `"title"`: 表示标题，为一个字符串 (string)。
    - `"type"`: 表示类型信息的对象，包含以下字段：
      - `"id"`: 表示类型的 ID，为一个整数 (integer)。
      - `"name"`: 表示类型的名称，为一个字符串 (string)。
    - `"year"`: 表示年份的字符串，为一个字符串 (string)。
  - `"total"`: 表示总数量，为一个整数 (integer)。
- `"msg"`: 表示返回的信息，为一个字符串 (string)。

请注意，数据模式中的数据类型（整数、布尔值、字符串）与数据示例中的实际数据类型相匹配。

