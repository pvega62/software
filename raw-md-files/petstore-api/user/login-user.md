---
id: login-user
title: Log user into the system
sidebar_label: 'Log in user'
sidebar_position: 3
description: 'Documentation for logging a user into the system.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Log a user into the system.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/user/login`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/login?username=string&password=string" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/login?username=string&password=string" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid username/password supplied |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "message": "logged in user session:abcdef12345"
}
```

##### Headers

| Name | Description | Type |
|------|-------------|------|
| `X-Rate-Limit` | Calls per hour allowed by the user. | integer |
| `X-Expires-After` | Date in UTC when token expires. | string |

#### Parameters

##### Query parameters

| Name     | Type   | Description |
|----------|--------|-------------|
| `username` | string | The username for login. |
| `password` | string | The password for login in clear text. |
