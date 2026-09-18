---
id: delete-user
title: Delete a user
sidebar_label: 'Delete a user'
sidebar_position: 7
description: 'Documentation for deleting a user account.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Delete a user account.

<span className="badge badge--danger">DELETE</span> `https://petstore3.swagger.io/api/v3/user/{username}`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/user/user1" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
DELETE "https://petstore3.swagger.io/api/v3/user/user1" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses

| Code | Description |
|------|-------------|
| 200  | User deleted |
| 400  | Invalid username supplied |
| 404  | User not found |

A successful deletion returns a `200` code with no response body.

#### Parameters

##### Path parameters

| Name     | Type   | Description |
|----------|--------|-------------|
| `username` | string | The username of the user to delete |
