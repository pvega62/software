---
id: get-inventory
title: Get pet inventories
sidebar_label: 'Get pet inventories'
sidebar_position: 1
description: 'Documentation for getting pet inventories by status.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Return pet inventories categorized by status.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/store/inventory`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/store/inventory" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/store/inventory" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "sold": 0,
  "available": 0,
  "pending": 0
}
```

#### Parameters

None
