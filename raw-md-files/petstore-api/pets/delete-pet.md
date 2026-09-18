---
id: delete-pet
title: Delete a pet
sidebar_label: 'Delete a pet'
sidebar_position: 7
description: 'Documentation for deleting a pet from the database.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Delete a pet from the database.

<span className="badge badge--danger">DELETE</span> `https://petstore3.swagger.io/api/v3/pet/{petId}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/pet/210" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/pet/210" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | Pet deleted |
| 400  | Invalid ID supplied |
| 404  | Pet not found |

A successful deletion returns a `200` code with no response body.

#### Parameters

##### Path parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| `petId`  | integer | ID of pet to delete |
