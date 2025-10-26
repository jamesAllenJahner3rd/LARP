# Eldarlands — Next.js + Appwrite Starter

A Next.js (App Router) starter integrated with Appwrite for authentication and data. This repository demonstrates client-side Appwrite usage, session handling, and a Tailwind-based UI.

---

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Running the app](#running-the-app)
- [Project structure](#project-structure)
- [Authentication flow](#authentication-flow)
- [Common pitfalls & troubleshooting](#common-pitfalls--troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Next.js (App Router) application
- Appwrite Cloud authentication (email/password, verification)
- React Context `AuthProvider` for global auth state
- Client-only Appwrite SDK usage where required (prevents build-time failures)
- Tailwind CSS utilities (DaisyUI optional)
- Toast notifications via `react-toastify`

---

## Prerequisites

- Node.js 18+ (match Appwrite Sites runtime if deploying)
- npm
- Appwrite Cloud project (project id and endpoint)

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/jamesAllenJahner3rd/eldarlands.git
cd eldarlands
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` (see below) and configure Appwrite values.

4. Run the dev server

```bash
npm run dev
```

---

## Environment variables

Create `.env.local` in the project root and add:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID = 68bb084a0032b02608c4
NEXT_PUBLIC_APPWRITE_BUCKET = 68c11c240013701075bb
NEXT_PUBLIC_APPWRITE_PROJECT_NAME = "EldarLandsLARP"
NEXT_PUBLIC_APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_DATABASE_ID = 68c1160a001638ade3a0
NEXT_PUBLIC_ROOT_URL ="http://localhost:3000"
```

Notes:

- Use `NEXT_PUBLIC_` prefix for variables that must be available in the browser.
- For Appwrite Cloud use `https://cloud.appwrite.io/v1`. Region-specific UI endpoints (e.g. `nyc.cloud.appwrite.io`) are for the dashboard and may not work as client endpoints.

---

## Running the app

- Development: `npm run dev`
- Build: `npm run build`
- Start (production): `npm start`

When deploying to Appwrite Sites, set the Build runtime to Node 18 and use `npm run build` as your build command and `.next` as the output directory.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: imports globals, mounts AuthProvider, ToastContainer
│   ├── page.tsx                # Public home page
│   ├── login/page.tsx          # Client login page
│   ├── register/page.tsx       # Client registration + verification flow
│   ├── explore/page.tsx        # Lore exploration UI
│   ├── resources/page.tsx      # Resource hub (docs, links, etc.)
│   └── providers/
│       └── AuthProvider.tsx    # Global auth context
├── components/                 # Reusable UI components (not expanded here)
├── lib/
│   └── appwrite.ts             # Appwrite client helper (client-only where needed)
├── pages/                      # Legacy Next.js routing (may be phased out)
│   ├── index.tsx               # Entry point fallback
│   ├── page.tsx                # Redundant with `app/page.tsx`?
│   ├── api/                    # API route handlers
│   ├── favicon.ico             # App icon
│   ├── app.css                 # Legacy styles
│   ├── globals.css             # Global styles
├── ts/                         # TypeScript build artifacts
│   └── tsconfig.buildinfo
public/                         # Static assets
.env.example                    # Safe-to-share env scaffold
README.md                       # Project overview and onboarding
```

---

## Authentication flow

-ALL Upright API calls need to be in the client side.!!!!!!

- Client login/registration: create sessions from the browser using the Appwrite SDK (e.g. `account.createEmailPasswordSession`) so Appwrite returns a Set-Cookie that the browser stores.
- After session creation, call `account.get()` from the client to hydrate full user data and update `AuthProvider`.
- Avoid creating sessions in server actions unless you proxy Appwrite's Set-Cookie header to the browser via a custom API route.

Recommended pattern for login (client-side):

1. `await account.createEmailPasswordSession(email, password)`
2. `const me = await account.get()`
3. `setLoggedInUser(me)` in `AuthProvider` and redirect

Verification: send verification via `account.createVerification({ url: "${NEXT_PUBLIC_ROOT_URL}/register/verify" })`.

---

## Common pitfalls & troubleshooting

- "window is not defined" / build-time Appwrite errors
  - Do not instantiate Appwrite SDK at module scope for server-rendered code. Import/instantiate inside `useEffect` or in client-only modules.

- Sessions created on server but not in browser
  - Server-side session creation sets cookies for the server process, not the browser. Create sessions in browser or proxy Set-Cookie to client.

- Tailwind utilities appear as raw class names in DOM (e.g. `bg-blue-500` with no styles)
  - Ensure PostCSS is configured with `tailwindcss` and `autoprefixer`, `globals.css` includes Tailwind directives (or your build pipeline generates Tailwind properly), and `tailwind.config` content paths include `src/app/**/*` and `src/components/**/*`.

- `react-toastify` toasts not visible
  - Import `react-toastify/dist/ReactToastify.css` once (recommended in `layout.tsx`) and mount a single `<ToastContainer />` at the app root to persist across route changes.

- Null `user` in components
  - `AuthProvider` initial state is `null` until `account.get()` resolves. Always guard access to `user` (`user?.name`) and consider a small loading state while auth hydrates.

---

## Contributing

- Open an issue or submit a PR. Please document breaking changes and keep API expectations (Appwrite SDK versions) noted in `package.json`.

---

## License

© 2025 James Jahner
