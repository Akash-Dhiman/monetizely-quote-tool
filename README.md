# Monetizely Quote Builder

## Overview

A SaaS quote generation platform built using Next.js, Prisma, Neon PostgreSQL, and Tailwind CSS.

The application allows administrators to:

* Manage Products
* Manage Pricing Tiers
* Manage Features
* Configure Tier Feature Availability
* Create Quotes
* Share Quotes via Public URLs

---

## Tech Stack

* Next.js 16
* React 19
* Prisma ORM
* Neon PostgreSQL
* Tailwind CSS
* TypeScript

---

## Assumptions

* Pricing is seat-based.
* Quotes belong to a single product and tier.
* Discounts are applied after all calculations.
* Shared quote URLs are public and identified by unique tokens.

---

## Key Decisions

### Prisma + Neon

Neon was selected because it provides a serverless PostgreSQL database suitable for deployment on Vercel.

### App Router

The application uses the Next.js App Router to simplify API route and page organization.

### Share Tokens

Quotes are shared using UUID-based tokens instead of exposing internal database IDs.

---

## Future Improvements

Given more time, I would implement:

* Authentication & Authorization
* Quote Versioning
* PDF Export
* Email Delivery
* Approval Workflow
* Audit Logs
* Advanced Analytics Dashboard
* Feature Matrix Visualization
* Role Based Access Control

---

## Running Locally

npm install

npx prisma generate

npx prisma db push

npm run dev

---

## Deployment

Frontend: Vercel

Database: Neon PostgreSQL
