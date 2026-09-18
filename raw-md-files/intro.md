---
id: intro
title: 'Technical Writing Portfolio'
sidebar_label: 'Introduction'
sidebar_position: 1
slug: intro
description: A showcase of software documentation samples authored in Markdown and published with Docusaurus, featuring API references, developer guides, and docs-as-code workflows.
---

# Technical writing portfolio

This is a portfolio dedicated solely to the software-related samples of my **Technical Writing portfolio**. It provides a comprehensive look at software documentation samples, all authored and published entirely in Markdown using Docusaurus. Here you'll find examples of developer guides, API references, and insights into the workflows used to create them.

## Portfolio navigation

Explore the documentation samples organized by deliverable type and domain:

### Developer and system guides
- [Installing and Applying a Theme to Google Chrome](/docs/google-chrome-theme-installation). A step-by-step browser customization walkthrough featuring interactive UI tabs and responsive layout.
- [Microsoft Word to GitHub Wiki Workflow with Writage](/docs/word-github-wiki-writage). A guide on writing Markdown in Word, cloning wikis with GitHub Desktop, and publishing revisions.
- [Using Postman to Connect to the Stripe API](/docs/stripe-api/using-postman). A guide for authenticating and making API requests in Postman.
- [Create a Postman Mock Server](/docs/data-pipelines/creating-postman-mock-server). A practical tutorial for configuring mock servers to test webhook integrations and API schemas.
- [Route cloud app logs into a pipeline](/docs/data-pipelines/route-cloud-app-logs-guide). An operational procedure for ingesting and filtering cloud app telemetry.
- [How to Fetch Object Data](/docs/typescript-tutorial/sui-data-fetcher). A tutorial explaining RPC read queries with the Sui TypeScript SDK.
- [Using Write Operation to Send a Transaction](/docs/typescript-tutorial/write-transaction-tutorial). A developer guide for signing and broadcasting programmable transactions.

### API references
- [Stripe API Documentation](/docs/category/stripe-api-documentation). API reference docs for fintech and payment infrastructure.
  - [Balance APIs](/docs/category/balance-apis)
  - [Payment Intent APIs](/docs/category/payment-intent-apis)
  - [Refund APIs](/docs/category/refund-apis)
- [Pet Store API Documentation](/docs/category/pet-store-api-documentation). Modular REST API reference modeled after the OpenAPI 3.0 specification.
  - [Pets APIs](/docs/category/pets-apis)
  - [Store APIs](/docs/category/store-apis)
  - [User APIs](/docs/category/user-apis)
- [Datadog Log Ingestion API](/docs/data-pipelines/api-ingest-stream). Streaming API reference for submitting batch telemetry data.
- Sui TypeScript SDK reference:
  - [`SuiClient.getObject`](/docs/typescript-tutorial/api-get-object)
  - [`SuiClient.multiGetObjects`](/docs/typescript-tutorial/api-get-multi-objects)
  - [`SuiClient.getOwnedObjects`](/docs/typescript-tutorial/api-get-owned-objects)

### Architecture and conceptual documentation
- [Introduction to the Stripe API](/docs/stripe-api/intro). Conceptual overview of financial infrastructure, core entities, and authentication.
- [Introduction to the Pet Store API](/docs/petstore-api/pet-store-api). Overview of the Swagger/OpenAPI Petstore REST service and authentication schemes.
- [Event Streams and Observability Pipelines](/docs/data-pipelines/concept-observability-pipelines). Architectural overview of stream processing, edge routing, and data transformation.
- [Before You Begin with Observability Pipelines](/docs/data-pipelines/before-you-begin). Architectural guide comparing log routing paradigms for enterprise systems.
- [The SuiClient Architecture](/docs/typescript-tutorial/sui-client-concept). Mental model explaining how distributed RPC clients orchestrate state queries.

### Commit messages and pull requests
- [NumPy F-ordered array fix](/docs/cm-pr/numpy-f-ordered-arrays). Open source pull request description and commit message resolving array memory layout issues.
- [Differentiating through an ak.mean in JAX](/docs/cm-pr/ak-mean-jax). Documentation and commit message explaining automatic differentiation support in Awkward Array.

### Case studies
- [Ask Artie AI Assistant Case Study](/docs/artie-case-study). An engineering case study analyzing prompt engineering, OWASP LLM security, and RAG retrieval architecture.

To inspect the raw Markdown sources for these documents, visit the **[GitHub repository](https://github.com/pvega62/software/tree/01ff338290542a442ffaf6b5daa4d8790a7a880d/docs/raw-md-files)**.

## Docs-as-code workflow
- Authoring in Markdown and MDX using VS Code and Antigravity
- Prose and style guide linting with Vale
- Internationalization and translation with DeepL and Lara
- System architecture diagramming with Mermaid
- Version control and collaborative code review with Git and GitHub
- API exploration and validation with Postman and Swagger/OpenAPI
- Continuous deployment with Docusaurus

## Technical stack
- **Docusaurus**. Generates static sites, navigation sidebars, and localized versions.
- **VS Code**. Serves as the primary editor for Markdown and MDX authoring.
- **Postman**. Validates API endpoints and generates request/response examples.
- **Vale**. Lints technical prose to enforce Google Developer Documentation guidelines.
- **Git and GitHub**. Manages branch version control and site deployment.
- **Mermaid**. Renders flowchart and data pipeline architecture diagrams.
- **DeepL and Lara**. Automate documentation translation across multiple languages.

This environment mirrors production developer portals at modern engineering companies.

> Each sample reflects end-to-end documentation creation: research, drafting, testing, review, and publishing.
