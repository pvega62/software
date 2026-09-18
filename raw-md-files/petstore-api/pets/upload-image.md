---
id: upload-image
title: Upload an image
sidebar_label: 'Upload an image'
sidebar_position: 8
description: 'Documentation for uploading an image for a pet.'
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Upload an image for a pet.

<span className="badge badge--info">POST</span> `https://petstore3.swagger.io/api/v3/pet/{petId}/uploadImage`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet/210/uploadImage" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-H "api_key: <YOUR_API_KEY>" \
--form "file=@/path/to/your/file"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash title="cURL"
POST "https://petstore3.swagger.io/api/v3/pet/210/uploadImage" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
--form "file=@/path/to/your/file"
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
  "code": 200,
  "type": "unknown",
  "message": "additional data"
}
```

#### Parameters

##### Path parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| `petId`  | integer | ID of pet to update |

##### Form data parameters

| Name   | Type   | Description |
|--------|--------|-------------|
| `additionalMetadata` | string | Extra data to pass to server. |
| `file`   | file   | File to upload. |
