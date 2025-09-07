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
