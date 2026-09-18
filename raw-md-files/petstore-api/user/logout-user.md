---
id: logout-user
title: Log out current user session
sidebar_label: 'Log out user'
sidebar_position: 4
description: 'Documentation for logging out the current user session.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Log out the current user session.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/user/logout`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/logout" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/logout" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| default | Successful operation |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "message": "Successfully logged out"
}
```

#### Parameters

None
