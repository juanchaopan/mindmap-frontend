import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect /index and any sub-paths
  matcher: ["/index", "/index/:path*"],
};
