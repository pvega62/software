---
id: route-cloud-app-logs-guide
slug: route-cloud-app-logs-guide
title: Route cloud app logs into a pipeline
sidebar_label: Route Cloud App Logs
sidebar_position: 4
description: Step-by-step guide to sending a JSON log from a cloud app into the pipeline and verifying ingestion.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide shows you how to simulate, send, and verify a single JSON log event within an observability pipeline workflow.

**Goal:** Ingest a mock app log, verify it reached the pipeline, and prepare it for routing to a destination, such as Splunk, Elastic, or S3.

## Why this matters

Before you build complex parsing rules or route data to expensive security information and event management (SIEM) tools, you must verify your ingestion path.
This workflow confirms that:
1. Your API token works.
2. The pipeline accepts your JSON structure.
3. You can see the data in real time.

## Before you start

Make sure you have:
- **An API Token** (with `ingest` permissions).
- **Your unique Stream ID** (from the platform UI).
- **Terminal access** (to run `curl`) or **Postman**.

## Pipeline overview

<Tabs>
<TabItem value="image" label="Mermaid (image)" default>

![Screenshot of pipeline architecture](cloud_log_ingest.svg)

</TabItem>
<TabItem value="diagram" label="Mermaid (code)">

```mermaid
flowchart LR
    A[Cloud App] -->|JSON Log| B[Ingest API]
    B --> C{Routing Engine}
    C -->|Match Rule| D[Live Data Viewer]
    C -->|No Match| E[Drop / Default Bucket]
```

</TabItem>
<TabItem value="ascii diagram" label="ASCII">

```text
  [Cloud App]
       |
       | |JSON Log|
       v
  [Ingest API]
       |
       v
{ Routing Engine }
       |
       +-----------------------+
       |                       |
       v |Match Rule|          v |No Match|
+-----------------------+    +-----------------------+
|   Live Data Viewer    |    | Drop / Default Bucket |
+-----------------------+    +-----------------------+
```

</TabItem>
</Tabs>

## 1. Create or select a stream

In your observability platform:
1. Go to **Streams** > **Management**.
2. Click **New Stream** or select `default-logs`.
3. Copy the **Stream ID**, for example, `st_12345`.
4. (Optional) Set a retention policy. The default is usually 7 days.

## 2. Create a sample log event

Simulate a cloud app log by saving the following as `app-log.json`.

```json
{
  "timestamp": "2025-11-15T08:30:00Z",
  "service": "payment-gateway",
  "level": "ERROR",
  "message": "Transaction failed: Gateway timeout",
  "transaction_id": "txn_998877",
  "meta": {
    "region": "us-east-1",
    "customer_id": "cus_554433"
  }
}
```
:::note
Keep the `timestamp` in International Organization for Standardization (ISO) 8601 format to ensure proper indexing.
:::

## 3. Send the log event

Use `curl` to simulate the app sending the log.

```bash
export STREAM_ID="your_stream_id_here"
export API_TOKEN="your_api_token_here"

curl -X POST "https://api.observability-platform.com/v1/streams/ingest" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -H "X-Stream-Id: $STREAM_ID" \
     -d @app-log.json
```

### Expected response

```json
{
  "status": "accepted",
  "ingest_id": "evt_abc12345",
  "accepted_items": 1
}
```

If you see `status: accepted`, the pipeline received the data.

## 4. Verify your log in the live data viewer

1. Navigate to **Explore** or **Live Tail** in the platform UI.
2. Select your stream (`st_12345`).
3. Add a filter: `service == "payment-gateway"`.
4. Your event should appear instantly:

```text
[ERROR] 2025-11-15T08:30:00Z service=payment-gateway msg="Transaction failed..."
```

## 5. Route logs to a destination

Now that data is flowing, create a routing rule:

1. Go to **Pipelines** > **Routing Rules**.
2. Click **New Rule**.
3. **Filter:** `level == "ERROR"`
4. **Action:** Route to `S3-Archive` and `Slack-Alerts`.
5. **Save & Deploy**.

Send the `curl` request again.
- Check your S3 bucket.
- Check your Slack channel.

## 6. Optimize the pipeline

Now that you have a working flow, consider adding:
- **Parsing:** Extract `customer_id` into a top-level field.
- **Enrichment:** Add a `team_owner` tag based on the `service` name.
- **Masking:** Obfuscate `customer_id` if it's personally identifiable information (PII).

## Troubleshooting

| Error Code | Potential Cause / Resolution |
| :--- | :--- |
| `401 Unauthorized` | Check your API Token permissions. |
| `400 Bad Request` | Verify your JSON syntax. |
| `404 Not Found` | Verify the `X-Stream-Id` is correct. |
| `Timestamp issues` | Ensure you're using Coordinated Universal Time (UTC) ISO 8601 format. |
| `Data not showing` | Check if you have an active filter that excludes your new log. |

## Next steps

- [Ingest API Reference](./api-ingest-stream.md)
- [Observability Concepts](./concept-observability-pipelines)
- Try sending different log types, such as VM logs, container logs, and API events.
