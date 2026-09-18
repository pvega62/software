---
title: Introduction to the Pet Store API
slug: pet-store-api
sidebar_position: 1
id: pet-store-api
---
This document provides an API reference for a sample Pet Store server. These requests help developers call the Pet Store server. Use them to send or request data about pets and orders in the system.

With the Pet Store API, a developer can: 
 
**[Pets](/docs/category/pets-apis)**
- [Add a new pet](./pets/add-pet.md), [find a pet by ID](./pets/find-pet-by-id.md), [update an existing pet](./pets/update-pet.md), or [delete a pet](./pets/delete-pet.md).
- [Update a pet with form data](./pets/update-pet-with-form.md).
- [Upload an image](./pets/upload-image.md) for a pet.
- Find pets by [status](./pets/find-pets-by-status.md) or [tags](./pets/find-pets-by-tags.md).

**[Store](/docs/category/store-apis)**
- [Get pet inventories](./store/get-inventory.md) categorized by status.
- [Place an order](./store/place-order.md) for a pet.
- [Find a purchase order by ID](./store/find-order.md).
- [Delete a purchase order](./store/delete-order.md).

**[User](/docs/category/user-apis)**
- [Create a user](./user/create-user.md) or [create a list of users](./user/create-users-with-list.md).
- [Log a user into](./user/login-user.md) and [out of](./user/logout-user.md) the system.
- [Get a user by username](./user/get-user-by-username.md), [update user information](./user/update-user.md), or [delete a user](./user/delete-user.md).

These examples use a sample pet named `Krypto` with ID `210`.

## Connection prerequisites

The base URL of all API requests is `https://petstore3.swagger.io/api/v3`.

## Authentication
To authenticate your connection to the Petstore API, use `OAuth 2.0` or an assigned API key. To request a key, email budbaker@bhavenpets.com.
:::danger
  For security purposes, don't share API keys with other users. If you suspect a security breach, contact an administrator immediately. An administrator can revoke the old key and issue a new one.
:::