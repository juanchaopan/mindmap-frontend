export { auth as default } from "./auth";

export const config = {
  // Protect /index and any sub-paths
  matcher: ["/index", "/index/:path*"],
};
