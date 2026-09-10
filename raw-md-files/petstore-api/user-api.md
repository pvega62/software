---
title: User API Functions
slug: user-api
sidebar_position: 4
id: user-api
description: Detailed documentation of the User API functions available in the Pet Store app, including endpoints for managing user accounts and authentication.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes operations related to users.

### Creating a user
Creates a new user account.

Endpoint: `https://petstore3.swagger.io/api/v3/user`

Operation: `POST`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
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

```bash
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
| default | successful operation |
##### Response example
`200: successful operation`
```json
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
| body | User object | **(Required)** The `User` object to create. |

### Creating a list of users with list
Creates list of users with given input list.

Endpoint: `https://petstore3.swagger.io/api/v3/user/createWithList`

Operation: `POST`

#### Examples
#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
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

```bash
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
| default | successful operation |
##### Response example
`200: Successful operation`
```json
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
| body | Array of User objects | **(Required)** The list of `User` objects to create. |

### Logging in
Logs user into the system.

Endpoint: `https://petstore3.swagger.io/api/v3/user/login`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/user/login?username=string&password=string" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/user/login?username=string&password=string" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>
#### Responses
| Code | Description |
|------|-------------|
| 200  | successful operation |
| 400  | Invalid username/password supplied |
| default | Unexpected error |
#### Response example
`200: successful operation`
```json
{
  "message": "logged in user session:abcdef12345"
}
```
**Headers:**
| Name| Description |Type|
|------|-------------|----|
| `X-Rate-Limit`| Calls per hour allowed by the user. | integer |
| `X-Expires-After`| Date in UTC when token expires. | string |

#### Parameters
##### Query parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| username   | string  | The username for login. |
| password   | string  | The password for login in clear text. |

### Logging out
Logs out current logged in user session.

Endpoint: `https://petstore3.swagger.io/api/v3/user/logout`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/user/logout" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/user/logout" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>
#### Responses
| Code | Description |
|------|-------------|
| 200  | successful operation |
| default | successful operation |
##### Response example
`200: successful operation`
```json
{
  "message": "Successfully logged out"
}
```
#### Parameters
None

### Getting user by username
Gets a user by their username.

Endpoint: `https://petstore3.swagger.io/api/v3/user/{username}`

Operation: `GET`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
GET "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
GET "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "Authorization: Bearer <YOUR_OAUTH_TOKEN>"
```

  </TabItem>
</Tabs>
#### Responses
| Code | Description |
|------|-------------|
| 200  | successful operation |
| 400  | Invalid username supplied |
| 404  | User not found |
| default | Unexpected error |

`200: successful operation`
```json
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
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| username   | string  | The username of the user to fetch. Use "user" for testing. |

### Updating a user
Updates a user.

Endpoint: `https://petstore3.swagger.io/api/v3/user/{username}`

Operation: `PUT`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
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

```bash
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

(A successful update returns a `200` code with no response body.)

#### Parameters
##### Path parameters
| Name   | Type   | Description                               | 
|--------|--------|-------------------------------------------|
| username | string | The username of the user to update |

##### Request body
| Name | Type | Description |
|------|------|-------------|
| body | User object | **(Required)** The `User` object with updated information. |

### Deleting a user
Deletes a user.

Endpoint: `https://petstore3.swagger.io/api/v3/user/{username}`

Operation: `DELETE`

#### Examples
<Tabs>
  <TabItem value="apikey" label="API Key" default>

```bash
DELETE "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
-H "api_key: <YOUR_API_KEY>"
```

  </TabItem>
  <TabItem value="oauth" label="OAuth 2.0">

```bash
DELETE "https://petstore3.swagger.io/api/v3/user/user1" \
-H "accept: application/json" \
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

(A successful deletion returns a `200` code with no response body.)

#### Parameters
##### Path parameters
| Name   | Type   | Description                                                                                             |
|--------|--------|---------------------------------------------------------------------------------------------------------|
| username   | string  | The username of the user to delete |

