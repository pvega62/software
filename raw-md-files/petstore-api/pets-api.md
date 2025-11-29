---
title: Pets API Functions
slug: pets-api
sidebar_position: 2
id: pets-api
description: Detailed documentation of the Pets API functions available in the Petstore app, including endpoints for managing pet data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With these API functions, you can manage the pets in your store's database.

### Adding a new pet
Adds a new pet to the store's database.

Endpoint: `https://petstore3.swagger.io/api/v3/pet`

Operation: `POST`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
POST "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
  "id": 0,
  "name": "string",
  "category": {
    "id": 0,
    "name": "string"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
POST "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
  "id": 0,
  "name": "string",
  "category": {
    "id": 0,
    "name": "string"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}'
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation|
| 400  | Invalid input |
| 404  | Pet not found |
| 422 | Validation exception |
| default | Unexpected error |

##### Response example

`200: Successful operation`
```json
{
  "id": 210,
  "name": "Krypto",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

#### Parameters
##### Request body
| Name | Type | Description |
|------|------|-------------|
| body | Pet object | **(Required)** The `Pet` object to add to the store. |

### Updating an existing pet
Updates an existing pet by its ID.

Endpoint: `https://petstore3.swagger.io/api/v3/pet`

Operation: `PUT`
#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
PUT "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "api_key: <YOUR_API_KEY>" \
-d '{
    "id": 210,
    "name": "Krypto",
    "status": "available"
  }'
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
PUT "https://petstore3.swagger.io/api/v3/pet" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-d '{
    "id": 210,
    "name": "Krypto",
    "status": "available"
  }'
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid input |
| 404  | Pet not found |
| 422 | Validation exception |
| default | Unexpected error |

##### Response example
`200: Successful operation`
```json
{
  "id": 210,
  "name": "Krypto",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```
#### Parameters
##### Request body
| Name | Type | Description |
|------|------|-------------|
| body | Pet object | **(Required)** Pet object to update. |

### Finding a pet by status
Finds pets by their status.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/findByStatus`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid input |
| default | Unexpected error |
#### Response example
`200: Successful operation`
```json
[
  {
    "id": 210,
    "name": "Krypto",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```

#### Parameters
##### Query parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| status | string | Status of the pet to find. <br /> **Default:** `available`. <br /> **Allowed values:** `available`, `pending`, `sold`. |

### Finding pets by tags

Finds pets by their tags.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/findByTags`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/pet/findByTags?tags=string" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/pet/findByTags?tags=string" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid input |
| default | Unexpected error |

##### Response example
`200: Successful operation`
```json
[
  {
    "id": 210,
    "name": "Krypto",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```
#### Parameters
##### Query parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| tags | array | Tags to filter by. <br /> **Default:** `[]`. <br /> **Allowed values:** Any valid tag names. |

### Finding a pet by Id
Finds a pet by its unique ID.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/{petId}`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/pet/210" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/pet/210" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 400  | Invalid ID supplied |
| 404  | Pet not found |
| default | Unexpected error |
#### Response example
`200: Successful operation`
```json
{
  "id": 210,
  "name": "Krypto",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```
#### Parameters
##### Path p1arameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| petId   | integer  | ID of pet to return |

### Updating a pet with form data
Updates a pet in the store with form data.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/{petId}`

Operation: `POST`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
POST "https://petstore3.swagger.io/api/v3/pet/210" \
-H "api_key: <YOUR_API_KEY>" \
-H "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=Krypto" \
--data-urlencode "status=available"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
POST "https://petstore3.swagger.io/api/v3/pet/210" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
-H "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "name=Krypto" \
--data-urlencode "status=available"
```

  </TabItem>
</Tabs>

#### Responses
| Code | Description |
|------|-------------|
| 200  | Successful operation |
| 405  | Invalid input |
| default | Unexpected error |

##### Response example
`200: Successful operation`
```json
{
  "id": 210,
  "name": "Krypto",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

#### Parameters
##### Path parameters
| Name   | Type   | Description                               | 
|--------|--------|-------------------------------------------|
| petId  | integer  | ID of pet to update        |

##### Query parameters
| Name   | Type   | Description                 |
|--------|--------|-----------------------------|
| name   | string | Name of pet to update |
| status | string | Status of pet to update |

### Deleting a pet
Deletes a pet from the database.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/{petId}`

Operation: `DELETE`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
DELETE "https://petstore3.swagger.io/api/v3/pet/210" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
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

(A successful deletion returns a `200` code with no response body.)

#### Parameters
##### Path parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| petId   | integer  | ID of pet to delete |

### Uploading an image
Uploads an image for a pet.

Endpoint: `https://petstore3.swagger.io/api/v3/pet/{petId}/uploadImage`

Operation: `POST`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
POST "https://petstore3.swagger.io/api/v3/pet/210/uploadImage" \
-H "accept: application/json" \
-H "Content-Type: multipart/form-data" \
-H "api_key: <YOUR_API_KEY>" \
--form "file=@/path/to/your/file"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
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
##### Response examples
`200: Successful operation`
```json
{
  "code": 200,
  "type": "unknown",
  "message": "additional data"
}
```

#### Parameters
##### Path parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| petId   | integer  | ID of pet to update |
##### Form data parameters
| Name   | Type   | Description|
|--------|--------|------------|
| additionalMetadata | string | Extra data to pass to server. |
| file | file | File to upload. |
