# Next.js starter kit with Appwrite

Kickstart your Next.js development with this ready-to-use starter project integrated with [Appwrite](https://www.appwrite.io)

## 🚀Getting started

###

Clone the Project
Clone this repository to your local machine using Git:

`git clone https://github.com/appwrite/starter-for-nextjs`

## 🛠️ Development guid

1. **Configure Appwrite**<br/>
   Navigate to `.env` and update the values to match your Appwrite project credentials.
2. **Customize as needed**<br/>
   Modify the starter kit to suit your app's requirements. Adjust UI, features, or backend
   integrations as per your needs.
3. **Install dependencies**<br/>
   Run `npm install` to install all dependencies.
4. **Run the app**<br/>
   Start the project by running `npm run dev`.

## 💡 Additional notes

- This starter project is designed to streamline your Next.js development with Appwrite.
- Refer to the [Appwrite documentation](https://appwrite.io/docs) for detailed integration guidance.

Corrections and edits that I had to make to the starter package:
git clone https://github.com/appwrite/starter-for-nextjs
cd starter-for-nextjs"
npm install
npm audit fix --force
npm run dev

appwrite sites create-deployment ^
--site-id \*\*^
--code "." ^
--activate ^
--build-command "npm run build" ^
--install-command "npm install" ^
--output-directory "./.next"
changes in \src\lib\appwrite.js:
if (typeof window !== "undefined") {
client.setEndpoint("https://nyc.cloud.appwrite.io/v1");
}
if (process.env.NODE_ENV !== "production") {
client.setEndpoint("https://nyc.cloud.appwrite.io/v1");
}
.gitignore:
.git/
in the appwrite setting:
Build runtime: Node-18.0

This project is built with Next.js 15.5.2 and styled using Tailwind CSS, targeting deployment on Appwrite Sites. Below are key setup and troubleshooting notes to ensure smooth deployment and onboarding.

✅ Build & Prerendering

- All static routes are successfully prerendered (○), including /explore, /player, and /user.
- The /player/login route is client-only and must avoid SDK instantiation during build. See Client-Side SDK Handling.

⚠️ Known Build Issue: Appwrite SDK in Server Context
During next build, the Appwrite SDK throws an error:
AppwriteException: Invalid endpoint URL: "https://nyc.cloud.appwrite.io/v1"

This occurs because the SDK is being bundled into the server build. To fix:

- Do not instantiate Appwrite SDK at module scope.
- Move SDK logic into a client-only wrapper or useEffect.

🧩 Client-Side SDK Handling
To safely use Appwrite in client components:
"use client";
import { useEffect } from "react";

useEffect(() => {
const { Client, Account } = require("appwrite");
const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
const account = new Account(client);
// Use account methods here
}, []);

Alternatively, isolate SDK logic in src/lib/appwrite-client.ts and import only inside event handlers or effects.

🧪 Local Testing Before Upload
Before deploying to Appwrite:

- Run npm run build and confirm no prerender errors.
- Validate .env.local includes:
- NEXT_PUBLIC_APPWRITE_ENDPOINT
- NEXT_PUBLIC_APPWRITE_PROJECT_ID
- Simulate file uploads locally using Appwrite SDK.
- Confirm dynamic routes use force-dynamic and fetchCache = "force-no-store" if needed.

🧹 Debugging Tips

- If you see repeated false logs during build, check for stray console.log(false) or conditionals in generateStaticParams.
- Use console.log(typeof window !== "undefined") to verify client-only execution.

import { account, ID } from "./appwrite";
to
import { account, ID } from "@/lib/appwrite";

## 🚀 Appwrite Setup

This project uses [Appwrite Cloud](https://appwrite.io/cloud) for authentication and database services.

### Environment Variables

Create a `.env.local` file in the project root with the following:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=your-project-name
```

⚠️ **Important notes:**

- Always use `https://cloud.appwrite.io/v1` as the endpoint for Appwrite Cloud.
  Regional subdomains (like `https://nyc.cloud.appwrite.io/v1`) are **only for the dashboard UI** and will break your client.
- Variable names are **case-sensitive**. Make sure `NEXT_PUBLIC_APPWRITE_ENDPOINT` ends with `ENDPOINT` (all caps).

### Next.js Build Considerations

- Pages that rely on the Appwrite client (like `/player/login`) must run only on the client, not during server-side rendering (SSR).
- To prevent build-time crashes, we mark those pages as **dynamic only**:

```ts
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
```

This ensures Next.js doesn’t attempt to prerender Appwrite-dependent pages.

---

Absolutely—here’s a clean, professional version of the explanation tailored for your `README.md`, with onboarding clarity and maintainability in mind:

---

## ⚠️ Appwrite SDK: `deleteDocument` Usage Note

### SDK Version Discrepancy

Appwrite’s official documentation shows `deleteDocument` being called with an object-style payload:

```ts
databases.deleteDocument({
  databaseId: "...",
  collectionId: "...",
  documentId: "...",
});
```

However, depending on the version of the Appwrite SDK installed, this may result in a TypeScript error:

```
Expected 3 arguments, but got 1.
```

This error occurs because earlier versions of the SDK expect **three positional arguments**, not a single object.

---

### ✅ Resolution

If you encounter this error, use the positional format instead:

```ts
databases.deleteDocument(databaseId, collectionId, documentId);
```

To use the object-style format shown in the docs, update your Appwrite SDK to the latest version:

```bash
npm install appwrite@latest
```

---

### 🧠 Best Practices

- Lock your Appwrite SDK version in `package.json` to avoid unexpected API changes.
- Wrap Appwrite calls in utility functions to standardize usage and simplify onboarding.
- Document SDK expectations clearly for contributors working across different environments.

---

### 🧠 React State & JSX Patterns (Session Summary)

This session covered foundational and advanced patterns for managing state and rendering dynamic JSX in React with TypeScript:

#### ✅ `useState` Fundamentals

- Scalar: `const [flag, setFlag] = useState(false)` — infers `boolean`
- Array: `useState<boolean[]>(Array(length).fill(false))` — explicit typing for dynamic lists
- Tuple typing: `const [state, setState]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)` — verbose but precise

#### ✅ JSX + Dynamic State

- Each rendered element can be tied to a unique state via index or ID
- Example: `setActiveStates(prev => prev.map((t, i) => i === id ? !t : t))` — toggles state at a specific index

#### ✅ JSX Nesting & `<br />` Usage

- `<br />` is valid inside `<p>`, but avoid placing it as a sibling to block elements inside fragments
- Prefer semantic spacing via Tailwind (`mb-2`) or multiple `<p>` tags for clarity

#### ✅ TypeScript Syntax Clarifications

- Use `:` for variable or parameter types (`const x: boolean`)
- Use `<T>` for generic functions (`useState<boolean>(false)`)

#### ✅ Import Hygiene

- Prefer combined imports: `import React, { useState } from 'react';`

---

Storyline Rendering & Content Formatting

We’ve standardized how lore entries (e.g. Eldarlands logs) are stored, fetched, and rendered in our Next.js + Appwrite project.

✅ Data Storage

Entries are uploaded as plain text strings.

Line breaks are preserved with \n from <textarea> input.

Database schema:

{
"heading": "Chapter 1",
"body": "Welcome to Eldarlands\nPrepare for battle"
}

✅ Rendering Strategy

We avoid dangerouslySetInnerHTML to prevent XSS risks.

Instead, we split text on newlines and render safely in React.

Example via LoreText helper:

const LoreText = ({ text }: { text: string }) => (
<>
{text.split(/\r?\n/).map((line, i) => (

<p key={i} className="indent-1">
{line}
</p>
))}
</>
);

✅ Server vs Client Components

Server Components (e.g. page.tsx) handle async data fetching with getTable(...).

Client Components (e.g. StorylineClient.tsx) handle interactivity (onClick, expand/collapse).

Data is passed as props from the Server Component into the Client Component.

✅ Expand / Collapse UX

Each log entry starts truncated to the first 30 characters.

Clicking toggles expansion, showing the full body with preserved line breaks.

Expansion state is managed per-entry with useState<boolean[]>.

This section documents our content flow best practices:

Store plain text

Preserve formatting safely

Keep fetch logic server-side

Keep interactivity client-side

- Appwrite version 20 changes to the table database.
  Instead of using a row[] you wanna use a rowList

-Updated the server action create story entry to revalidate the path on being called
import { revalidatePath } from 'next/cache';

revalidatePath('/explore/storyline');
needed to be added.

Absolutely, James. Here's a clean, maintainable `README.md` scaffold that documents your Appwrite + Next.js auth flow with full onboarding clarity. It reflects everything you've debugged, refactored, and locked in—no fluff, just precision.

---

## 📘 Eldarlands Auth Flow — README

### 🔧 Stack Overview

- **Framework**: Next.js 15 (App Router)
- **Auth Provider**: Appwrite (Email/Password Sessions)
- **State Management**: React Context via `AuthProvider`
- **Routing**: Client-side redirects using `useRouter` from `next/navigation`

---

### 🧱 Folder Structure

```txt
src/
├── app/
│   ├── providers/
│   │   └── AuthProvider.tsx       ← global login state
│   ├── auth/
│   │   └── hydrate/
│   │       └── page.tsx           ← client-side session hydration
│   ├── actions/
│   │   └── authActions.ts         ← server-side login/register/logout
│   ├── login/
│   │   └── page.tsx               ← client login form
│   ├── members/
│   │   └── page.tsx               ← gated route for logged-in users
│   └── layout.tsx                 ← wraps app with AuthProvider
```

---

### 🔐 AuthProvider.tsx

- Wraps the entire app in a React context
- Tracks `user`, exposes `setUser()` and `logout()`
- Hydrates session on mount via `account.get()`

```tsx
"use client";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);
  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### 🔁 Hydration Page (`/auth/hydrate`)

- Used after server-side login
- Runs `account.get()` in the browser
- Updates `AuthProvider` and redirects to `/members`

```tsx
"use client";
export default function HydratePage() {
  const { setUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    account
      .get()
      .then((user) => {
        setUser(user);
        router.push("/members");
      })
      .catch(() => router.push("/login"));
  }, []);
  return <p>Hydrating session...</p>;
}
```

---

### 🧠 Server Action: Login

- Creates session via Appwrite SDK
- Redirects to hydration page

```ts
"use server";
export async function login(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  await account.createEmailPasswordSession(email, password);
  redirect("/auth/hydrate");
}
```

---

### 🧪 Client Login Page

- Calls `account.createEmailPasswordSession()` directly
- Updates `AuthProvider` via `setUser()`
- Redirects to `/members`

```tsx
"use client";
const LoginPage = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/members");
  }, [user]);
  const handleLogin = async () => {
    await account.createEmailPasswordSession(email, password);
    const userDetails = await account.get();
    setUser(userDetails);
  };
  return <button onClick={handleLogin}>Login</button>;
};
```

---

### 🧭 NavBar Conditional Rendering

```tsx
{
  !user && (
    <Link href="/login">
      <h3 onClick={() => setOpenMenu(!openMenu)}>{heading[3]}</h3>
    </Link>
  );
}
```

---

### 🧼 Known Limitations

- Appwrite session cookies are only set in browser context
- Server Actions cannot propagate cookies to the browser
- Hydration page is required to bridge server-side login with client-side state

---

Absolutely—this is the perfect moment to lock in everything you've debugged and clarified. Here's a scaffold for your updated `README.md`, focused on onboarding clarity, Appwrite session handling, and Next.js App Router best practices:

---

## 🛠 Eldarlands Onboarding & Auth Flow

### ✅ Registration Flow

- Uses client-side `<form onSubmit={handleRegistration}>` to avoid server-side session issues.
- Creates user via `account.create()`, then immediately logs in with `account.createEmailPasswordSession()`.
- Fetches full user object with `account.get()` to access `emailVerification`.
- Sends verification email via `account.createVerification({ url })`.

### ✅ Login Flow

- Authenticates with `account.createEmailPasswordSession(email, password)`.
- Immediately fetches full user via `account.get()` and stores in context.
- Redirects based on `emailVerification` status:
  - Verified → `/members`
  - Unverified → `/register`

### ✅ Email Verification

- Appwrite sends user to `/register/verify/?userId=...&secret=...`.
- Client-side component parses query params and calls `account.updateVerification({ userId, secret })`.
- Redirects to `/members` on success, `/register` on failure.

### ⚠️ Common Pitfalls

| Issue                                 | Fix                                                |
| ------------------------------------- | -------------------------------------------------- |
| `window is not defined` in API routes | Never use browser APIs in server-only files        |
| `user.emailVerification` throws       | Always guard with `if (!user) return null`         |
| `await setUser(...)` doesn’t work     | Use local `currentUser` object for logic           |
| `dotenv` fails in client              | Use `NEXT_PUBLIC_` prefix for client-safe env vars |
| `redirect()` in client component      | Use `router.push()` instead                        |

---

---

### ✅ What You've Already Solved

- **Client-side session creation**: Avoided server-side cookie issues by using `<form onSubmit={...}>` and calling `account.createEmailPasswordSession()` in the browser.
- **Fetching full user object**: Used `account.get()` after login to access `emailVerification`.
- **Guarding against null state**: Prevented runtime errors by checking `if (!user)` before accessing `user.emailVerification`.
- **Redirecting based on verification**: Used `router.push()` in client components and `redirect()` in server contexts.
- **Verification link handling**: Parsed `userId` and `secret` from query params and called `account.updateVerification()` correctly.
- **Environment variable exposure**: Switched to `NEXT_PUBLIC_ROOT_URL` for client-safe access.
- **Avoided `await setUser()` trap**: Used local `currentUser` for logic instead of relying on async state propagation.
- **Fixed `useRouter()` placement**: Moved it to the top level of `AuthProvider` to avoid hook violations.

---

### 🧩 Final Touches You Might Still Want

- **Expired verification link fallback**: Appwrite links include an `expire` timestamp. You could parse it and show a custom message if it's past due.
- **Global redirect guard**: In your layout or `AuthProvider`, redirect unverified users away from protected routes like `/members`.
- **Verification status polling**: If you want to auto-refresh after the user clicks the link, you could poll `account.get()` until `emailVerification === true`.
- **Custom error messaging**: Instead of generic redirects, show onboarding-friendly messages for failed verification, expired links, or missing params.

---

Was having trouble selecting horizontal scroll bar of Pantheon Gods So I added these to make it easier

- touch-pan-x: Tells mobile browsers to treat horizontal dragging as scroll, not selection.
- select-none: Prevents accidental text selection while dragging.
