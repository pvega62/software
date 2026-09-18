---
id: create-user
title: Create a user
sidebar_label: 'Create a user'
sidebar_position: 1
description: 'Documentation for creating a new user account.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Create a new user account.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/user`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/user" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
  "id": 0,
  "username": "string",
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
POST "https://petstore3.swagger.io/api/v3/user" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "id": 0,
  "username": "string",
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
| default | Successful operation |

##### Response example

`200: Successful operation`
```json title="Response"
{
  "id": 10,
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345",
  "userStatus": 1
}
```

#### Parameters

##### Request body

| Name | Type | Description |
|------|------|-------------|
| `body` | User object | **Required.** The `User` object to create. |
