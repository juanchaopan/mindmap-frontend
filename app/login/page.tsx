"use client";

import { useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function AutoSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/index";

  useEffect(() => {
    signIn("keycloak", { callbackUrl });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function LoginPage() {
  return (
    <Suspense>
      <AutoSignIn />
    </Suspense>
  );
}
