import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }// It is known that with a rout file you have to export Gets and posts and puts and deletes So we need this line
// What we're doing is exposing a bunch of endpoints that start with /auth