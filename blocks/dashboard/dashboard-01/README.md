# SaaS Dashboard — dashboard-01

A subscription-business overview with four KPIs, goal progress, and recent invoices. All figures are illustrative static example data.

<picture><source media="(prefers-color-scheme: dark)" srcset="./preview-dark.png"><img src="./preview.png" alt="SaaS Dashboard preview"></picture>

## Basecoat components

Card, Badge, Progress, Table.

## Usage

Copy the full contents of [`block.html`](./block.html) into a page with Tailwind CSS 4 and Basecoat 1.2.1. No JavaScript is required. Replace snapshot figures, progress values, invoice rows, and month labels from your own data. Update both each progress indicator's visual width and its `aria-valuenow` when values change.

## Design rationale

A quiet four-card summary makes the most important business numbers scannable first. Target bars add visual momentum without a chart library, while the invoice table grounds the metrics in recognizable transactions. The table scrolls horizontally on narrow screens rather than hiding columns or clipping data.
