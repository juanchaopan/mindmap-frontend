import { auth } from "@/auth";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/components/PageLayout";

export default async function HomePage() {
  const session = await auth();

  return (
    <PageLayout>
      <AppHeader userName={session?.user?.name} />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back
            {session?.user?.name ? `, ${session.user.name}` : ""}!
          </h2>
          {session?.user?.email && (
            <p className="text-sm text-gray-500">{session.user.email}</p>
          )}
          <p className="text-gray-400 text-sm mt-2">You are signed in.</p>
        </div>
      </main>
    </PageLayout>
  );
}
