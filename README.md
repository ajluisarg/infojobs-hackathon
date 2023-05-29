## The Project

### Business login

With this application, the user can add an offer to favorites or discard it by sliding the card with his finger. This provides an easy way to save and filter offers by offering useful information in a fun way.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Third parties

#### REST APIs

- Infojobs

```bash
GET /offer (get offer list)
GET /offer/{id} (get offer detail)
GET /offer/{id} (get offer detail)
GET /dictionary/{dictionaryId} (get provinces and categories)
```

- Rapid API

```bash
GET /images/details (get image from bing search)

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Environment variables

Create `.env.local` file with your own environment variables

```bash
INFOJOBS_CLIENT_SECRET=XXX
INFOJOBS_CLIENT_ID=XXX
RAPIDAPI_KEY=XXX
```
