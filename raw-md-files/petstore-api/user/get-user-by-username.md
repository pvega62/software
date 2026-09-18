---
id: get-user-by-username
title: Get user by username
sidebar_label: 'Get user by username'
sidebar_position: 5
description: 'Documentation for getting a user by username.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Get a user by their username.

<span className="badge badge--success">GET</span> `https://petstore3.swagger.io/api/v3/user/{username}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
GET "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid username supplied |
| 404  | User not found |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
```

#### Parameters

##### Path parameters

| Name     | Type   | Description |
|----------|--------|-------------|
| `username` | string | The username of the user to fetch. Use "user" for testing. |
