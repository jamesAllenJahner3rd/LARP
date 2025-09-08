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
