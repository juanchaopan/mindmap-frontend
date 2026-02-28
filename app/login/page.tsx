"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import Card from "@/components/Card";
import PageLayout from "@/components/PageLayout";
import Alert from "@/components/Alert";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/index";

  const {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    login,
  } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(callbackUrl);
    if (ok) router.push(callbackUrl);
  }

  return (
    <PageLayout center>
      <Card className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-500">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextInput
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="your-username"
              name="username"
              autoComplete="username"
              disabled={isLoading}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              name="password"
              disabled={isLoading}
            />

            {error && <Alert message={error} variant="error" />}

            <Button type="submit" loading={isLoading} fullWidth>
              Sign in
            </Button>
          </form>
        </div>
      </Card>
    </PageLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
