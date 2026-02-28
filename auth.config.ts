import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible config used by middleware.
 * Must not import Node-only modules (e.g. bcrypt, db drivers).
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/index");
      if (isProtected) return isLoggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
