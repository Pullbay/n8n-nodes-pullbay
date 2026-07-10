# n8n-nodes-pullbay

This is an n8n community node. It lets you use [Pullbay](https://pullbay.com) in your n8n workflows.

Pullbay is a data API that gives you structured access to public data from the Apple App Store, Google Play, Google Search, Google News, DuckDuckGo, and YouTube — no scraping infrastructure required.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

To install from the n8n GUI:

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-pullbay` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes.
5. Select **Install**.

Alternatively, install it manually:

```bash
npm install n8n-nodes-pullbay
```

## Operations

The Pullbay node is organized into resources, each exposing a set of operations.

### App Store

- **Fetch App** — Get app details by App ID or Bundle ID.
- **Fetch Developer** — Get all apps published by a developer.
- **Fetch Reviews** — Get reviews for an app (sortable by recent or helpful).
- **Fetch Similar Apps** — Get apps similar to a given app.
- **Search Apps** — Search the App Store for apps.

### Google Play

- **Fetch App** — Get app details by package name.
- **Fetch Data Safety** — Get the data safety information for an app.
- **Fetch Permissions** — Get the permissions requested by an app.
- **Fetch Reviews** — Get reviews for an app (sortable by newest, rating, or helpfulness).
- **Fetch Similar Apps** — Get apps similar to a given app.
- **Search Apps** — Search Google Play for apps (filter by free/paid).

### Google Search

- **Search** — Search the web via Google with country, language, and safe search options.

### Google News

- **News By Category** — Get news articles by category (business, technology, sport, and more).
- **Search News** — Search for news articles, with optional URL resolution.

### DuckDuckGo

- **Search** — Search the web.
- **Search Images** — Search for images.
- **Search News** — Search for news.
- **Search Videos** — Search for videos.

All DuckDuckGo operations support region selection, pagination offset, safe search, and time range filtering.

### YouTube

- **Fetch Channel** — Get channel details by ID, handle, or channel URL.
- **Fetch Comments** — Get comments for a video (sortable by top or latest).
- **Fetch Trending** — Get trending videos by country.
- **Fetch Video** — Get video details (video or shorts).
- **Fetch Videos by Hashtag** — Get videos for a given hashtag.
- **Search** — Search YouTube for videos, channels, or playlists, with rich filters (duration, features, upload date, sort by, and more).

## Credentials

You need a Pullbay account and an API key to use this node.

1. Sign up at [Pullbay](https://pullbay.com) and obtain your API key from your dashboard.
2. In n8n, create a new **Pullbay API** credential.
3. Enter your **API Key**. The key is sent with each request via the `x-api-key` header.
4. Optionally adjust the **Base URL** (defaults to `https://dashboard.pullbay.com`).

See the [Pullbay documentation](https://docs.pullbay.com/) for more details.

## Compatibility

Requires n8n with `n8nNodesApiVersion` 1. Tested against recent n8n releases. This node can also be used as an [AI tool](https://docs.n8n.io/advanced-ai/) within agent workflows.

## Usage

1. Add the **Pullbay** node to your workflow.
2. Select a **Resource** (for example, App Store).
3. Select an **Operation** (for example, Search Apps).
4. Fill in the required parameters and any optional **Additional Fields** (such as country or language).
5. Execute the workflow to retrieve structured data.

If you're new to n8n, check out [Try it out](https://docs.n8n.io/try-it-out/) in the n8n documentation.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Pullbay Website](https://pullbay.com)
- [Pullbay API Documentation](https://docs.pullbay.com/)