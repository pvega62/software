---
title: Introduction to the Pet Store API
slug: pet-store-api
sidebar_position: 1
id: pet-store-api
---
 
 This document provides an API reference for a sample Pet Store server. The requests found here can help developers make calls to the Pet Store server to send or request data about any pets and orders entered into the system.

With the Pet Store API, a developer can: 
 
 **Pets**
 - Create, read, update, and delete pets in the database.
 - Upload an image for a pet.
 - Find pets by their status (available, pending, sold), tags, or unique identifiers.

**Store**
 - Get inventory of pets, categorized by status.
 - Place an order for a pet.
 - Find purchase orders by their ID.
 - Cancel an order.

**User**
 - Create a new user account (individually or from a list).
 - Log users in and out of the system.
 - Find a user by their ID.
 - Retrieve, update, and delete a user's information by their username. 

This example uses a dog (Krypto) and the ID number 210.

## Connection prerequisites

 The base URL of all API requests is `https://petstore3.swagger.io/api/v3`.

## Authentication
 To authenticate your connection to the Petstore's API, use OAuth 2.0 or an assigned API key. To request a key, email budbaker@bhavenpets.com.
:::note
  For security purposes, don't share API keys with other users. If you suspect a breach in your API key's security, please contact an administrator immediately to revoke the old key and issue a new one.
:::