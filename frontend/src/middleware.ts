export { default } from "next-auth/middleware"; // This is the default export that next-auth needs to work
// This is needed if you want to protect specific routes with middleware
// For example if you want to protect /dashboard route so that only authenticated users can access it
// You can do this by checking if the session exists and if not redirecting to the sign-in page
// This is the same as the below two lines
/*import middleware from "next-auth/middleware";
export default middleware;*/

// *: zero or more parameters
// +: one or more parameters
// ?: zero or one parameter
export const config = { matcher: ["/users/:path*", "/products/:path*"] }; // This is needed to tell next-auth which routes to protect
