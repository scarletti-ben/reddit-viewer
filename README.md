# Reddit Post Viewer
This `README` is a work in progress. Currently there is no external functionality, so as to avoid making excessive `fetch` calls to `Reddit` while in development. The file `data/test.json` is used for local testing, but has not been added to the repository as it contains post data that is owned by the original `Reddit` posters involved.

# Miscellaneous
- Currently "Disable cache" in `Google Chrome DevTools`, or "Empty cache and hard reload", are the only effective ways to avoid intermittent `CORS` errors
- The end goal is likely to host the site somewhere with serverless functions, such as `Vercel` to avoid `CORS` errors

# Vercel
- Sign up, give a name, then authenticate via `GitHub`
- From the main page you can "Intall GitHub", which allows you to select the repositories that `Vercel` has access to
  - For now it has only been given access to the `vercel-cors-proxy` repository

# Project Metadata
```yaml
---
title: "Reddit Post Viewer"
date: "2025-07-20"
# last_modified_at: ""
# description: ""
categories: [
  miscellaneous
]
tags: [
  coding, dev, webdev, html, javascript, css, json, api, reddit, custom element, web components, type hints, type checking, typescript jsconfig.json
]
---
```