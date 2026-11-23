# OPTIVUS | Hospital Inventory Intelligence

This archive contains the published OPTIVUS source snapshot, including the web application, Cloudflare Worker backend, database migrations, tests, and all tracked image and style assets.

## Project layout

- public/ contains the website, browser application code, styles, and images.
- worker/index.mjs contains server-side request handling, including Gmail API submission.
- drizzle/ contains database migrations.
- scripts/build.mjs bundles the static assets and Worker into dist/.
- tests/smoke.cjs contains the existing smoke checks.
- .openai/hosting.json records the Sites project and database binding configuration.

## Runtime configuration

The published Site stores these server-side secrets in its hosting environment:

- GMAIL_SENDER_EMAIL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GMAIL_REFRESH_TOKEN

The archive includes .env.example with the variable names only. It does not contain the secret values. Set the values through the hosting provider's secret or environment-variable settings. Never place real values in frontend files or commit them to source control.

The deployed Site also requires its configured database binding named DB. The provider-specific database and runtime bindings are not portable as local files.

## Build

With Node.js installed, run:

    node scripts/build.mjs

This writes the deployable Worker and bundled website assets to dist/. Running the full application locally also requires a compatible Worker runtime and a database configured with the included migrations.
