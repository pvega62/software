---
id: api-ingest-stream
slug: api-ingest-stream
title: Ingest events with the Datadog Log Ingestion API
sidebar_position: 3
sidebar_label: Log Ingestion API
description: API reference for sending log and event data into Datadog for processing, pipeline routing, and downstream delivery.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

Use the Datadog **Log Ingestion application programming interface (API)** to send JSON log events from cloud apps, microservices, or any system emitting telemetry directly into Datadog Log Management. Once you ingest logs, they're available in **Log Explorer** within seconds. You can process, route, and archive them using **Log Pipelines**.

This endpoint supports high-throughput, real-time ingestion of structured and
semi-structured JSON payloads.

## Actions supported by this API

- Ship logs directly from cloud apps without installing the Datadog Agent.
- Apply pipeline processors, such as Grok Parser, Remapper, and Lookup Processor, to incoming data.
- Route logs to indexes, archives, or alert destinations based on content.
- Reduce indexing cost by combining this endpoint with sampling and filtering rules.

:::note
Learn more about Datadog's API and API keys **[here](https://docs.datadoghq.com/account_management/api-app-keys/)**.
:::

## Before you start

Make sure you have:

- A **Datadog API key** with log ingestion permissions. Find this in **Organization Settings** → **API Keys**.
- Your **Datadog site address**. This address varies by region:

  | Region | Site address |
  |---|---|
  | US (east) | `datadoghq.com` |
  | US3 (west) | `us3.datadoghq.com` |
  | US5 (central) | `us5.datadoghq.com` |
  | EU (Europe) | `datadoghq.eu` |
  | AP1 (Japan) | `ap1.datadoghq.com` |
  | AP2 (Australia) | `ap2.datadoghq.com` |

- `curl` or Postman installed.
- JSON-formatted log payloads.

## Pipeline overview

<Tabs>
<TabItem value="image" label="Mermaid (image)" default>

![Datadog log ingestion pipeline](api-ingest-pipeline.svg)

</TabItem>
<TabItem value="diagram" label="Mermaid (code)">

```mermaid
flowchart LR
    A[Cloud App<br/>or Microservice] -->|POST /api/v2/logs| B[Datadog<br/>Log Ingestion API]
    B --> C[Log Pipeline<br/>• Grok Parser<br/>• Remapper<br/>• Lookup Processor]
    C --> D[Routing Engine<br/>• Filters<br/>• Indexes<br/>• Sampling Rules]
    D --> E{{Destinations<br/>Log Explorer · S3 · SIEM · Alerts}}
```

</TabItem>
<TabItem value="ascii" label="ASCII">

```text
 [Cloud App]      POST /api/v2/logs     [Datadog Log]
 [or Microservice] -------------------> [Ingestion API]
                                               |
                                               v
                                        [Log Pipeline]
                                        (Parse, Enrich, Mask)
                                               |
                                               v
                                        [Routing Engine]
                                        (Filters, Indexes)
                                               |
                                               v
                                        { Destinations }
                                        (Explorer, S3, SIEM)
```

</TabItem>
</Tabs>

## Ingest endpoint

```
POST https://http-intake.logs.{dd_site}/api/v2/logs
```

Replace `{dd_site}` with your region's site address, for example, `datadoghq.com` or `ap2.datadoghq.com`.

### Request headers

| Header | Value | Required | Description |
|---|---|---|---|
| `DD-API-KEY` | `<your_api_key>` | Yes | Your Datadog API key |
| `Content-Type` | `application/json` | Yes | Payload format |

### Request body

The request body is a JSON array of one or more log objects. Each log object supports the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | string | Yes | The log message body |
| `ddsource` | string | Recommended | The technology the log originates from, for example, `python` or `nginx`. |
| `ddtags` | string | Optional | Comma-separated tags, for example, `env:prod,team:payments`. |
| `hostname` | string | Optional | The name of the host that generated the log |
| `service` | string | Recommended | The name of the app or service |
:::note
You must include the `message` field. All other fields are optional butvDatadog recommends them. Datadog uses `service`, `ddsource`, and `ddtags` for filtering,vfaceting, and pipeline matching.
:::
#### Example payload

```json
[
  {
    "message": "Transaction failed: Gateway timeout",
    "ddsource": "payment-gateway",
    "ddtags": "env:prod,region:us-east-1",
    "hostname": "payments-host-01",
    "service": "payment-gateway",
    "timestamp": "2025-11-15T08:30:00Z",
    "transaction_id": "txn_998877",
    "customer_id": "cus_554433",
    "level": "ERROR"
  }
]
```
:::note
 The `timestamp` must use International Organization for Standardization (ISO) 8601 Coordinated Universal Time (UTC) format. Datadog uses this format for timeline alignment in Log Explorer. Datadog indexes logs submitted without a timestamp using the ingest time.
:::
## Response codes

### 202 accepted

A `202 Accepted` response means Datadog received the payload. This response has no body. The log appears in Log Explorer within a few seconds.

```
HTTP/1.1 202 Accepted
```

### 400 bad request

Datadog returns this code when a payload has formatting errors. Common causes:

- Incorrect JSON syntax.
- The `message` field is missing.
- The payload exceeds the 5 MB limit.

```json
{
  "errors": ["Invalid JSON"]
}
```

### 401 unauthorized

The API key is missing, incorrect, or lacks log ingestion permissions.

```json
{
  "errors": ["Forbidden"]
}
```

### 429 too many requests

The system exceeded the request rate limit. Reduce request frequency or batch log objects into a single array payload.

## Curl example

```bash
export DD_API_KEY="your_datadog_api_key_here"
export DD_SITE="datadoghq.com"

curl -X POST "https://http-intake.logs.$DD_SITE/api/v2/logs" \
  -H "DD-API-KEY: $DD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "message": "Transaction failed: Gateway timeout",
      "ddsource": "payment-gateway",
      "ddtags": "env:prod,region:us-east-1",
      "hostname": "payments-host-01",
      "service": "payment-gateway",
      "level": "ERROR",
      "transaction_id": "txn_998877"
    }
  ]'
```

## Batching multiple log events

You can send up to **1,000 log entries** in a single request by passing an array.
Datadog recommends this approach for high-throughput services.

```json
[
  {
    "message": "User login succeeded",
    "service": "auth-service",
    "ddsource": "python",
    "ddtags": "env:prod",
    "level": "INFO"
  },
  {
    "message": "Transaction failed: Gateway timeout",
    "service": "payment-gateway",
    "ddsource": "python",
    "ddtags": "env:prod",
    "level": "ERROR",
    "transaction_id": "txn_998877"
  }
]
```

**Limits:**
- Max payload size: **5 MB** per request
- Max individual log size: **1 MB**
- Max array entries: **1,000 log objects**

## Common use cases

- Ingesting logs from microservices without deploying the Datadog Agent.
- Sending structured JSON events from serverless functions such as Amazon Web Services (AWS) Lambda or Google Cloud Platform (GCP) Cloud Run.
- Streaming telemetry from IoT devices or edge services.
- Routing enriched events to security information and event management (SIEM), S3, or alerting destinations via Log Pipelines.
- Submitting logs from continuous integration and continuous delivery (CI/CD) pipelines or deployment scripts.

## Troubleshooting

| Issue | Probable cause | Solution |
|---|---|---|
| `401 Unauthorized` | Incorrect or missing API key | Verify `DD_API_KEY` in **Org Settings** → **API Keys** |
| `400 Bad Request` | Malformed JSON | Validate with `jq . payload.json` before sending |
| Log not in Explorer | Pipeline filter excluding log | Clear filters; check index routing rules |
| Timestamp out of order | Non-UTC or non-ISO 8601 format | Use `"2025-11-15T08:30:00Z"` format |
| `429 Too Many Requests` | Rate limit exceeded | Batch log objects into a single array payload |

## Next steps

- [Datadog Log Ingestion API Reference](https://docs.datadoghq.com/api/latest/logs/)
- [Log Pipeline Processors](https://docs.datadoghq.com/logs/log_configuration/processors/)
- [Routing Cloud App Logs with Datadog and Galileo](./route-cloud-app-logs-guide)
- [Creating a Postman Mock Server](./creating-postman-mock-server)
