---
id: update-user
title: Update user information
sidebar_label: 'Update user'
sidebar_position: 6
description: 'Documentation for updating user information.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Update user information.

<span className="badge badge--warning">PUT</span> `https://petstore3.swagger.io/api/v3/user/{username}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
PUT "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
  "id": 0,
  "username": "user1",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
PUT "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
  "id": 0,
  "username": "user1",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}'
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid user supplied |
| 404  | User not found |
| default | Unexpected error |

A successful update returns a `200` code with no response body.

#### Parameters

##### Path parameters

| Name     | Type   | Description |
|----------|--------|-------------|
| `username` | string | The username of the user to update |

##### Request body

| Name | Type | Description |
|------|------|-------------|
| `body` | User object | **Required.** The `User` object with updated information. |
