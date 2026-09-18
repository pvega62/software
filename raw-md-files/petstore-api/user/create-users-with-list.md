---
id: create-users-with-list
title: Create a list of users
sidebar_label: 'Create a list of users'
sidebar_position: 2
description: 'Documentation for creating a list of users with an input array.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Create a list of users with the given input list.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/user/createWithList`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/user/createWithList" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d \
  [
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
  ]
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/user/createWithList" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d \
  [
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
  ]
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

##### Request body

| Name | Type | Description |
|------|------|-------------|
| `body` | Array of User objects | **Required.** The list of `User` objects to create. |
