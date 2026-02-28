import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) return null;

        const params = new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID!,
          grant_type: "password",
          scope: "openid profile email",
          username,
          password,
        });

        if (process.env.KEYCLOAK_CLIENT_SECRET) {
          params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET);
        }

        const tokenRes = await fetch(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
          }
        );

        if (!tokenRes.ok) {
          const body = await tokenRes.text();
          console.error("[auth] Keycloak token error", tokenRes.status, body);
          return null;
        }

        const tokens = await tokenRes.json();

        const userRes = await fetch(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );

        if (!userRes.ok) {
          const body = await userRes.text();
          console.error("[auth] Keycloak userinfo error", userRes.status, body);
          return null;
        }

        const user = await userRes.json();

        return {
          id: user.sub,
          name: user.name ?? user.preferred_username ?? username,
          email: user.email ?? null,
        };
      },
    }),
  ],
});
