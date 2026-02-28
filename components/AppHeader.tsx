import { signOut } from "@/auth";
import Button from "./Button";

interface AppHeaderProps {
  title?: string;
  userName?: string | null;
}

/**
 * Top navigation bar for authenticated pages.
 * Server Component — sign-out uses a Server Action.
 */
export default function AppHeader({
  title = "My App",
  userName,
}: AppHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-semibold text-gray-900">{title}</span>

      <div className="flex items-center gap-4">
        {userName && (
          <span className="text-sm text-gray-500">
            Signed in as{" "}
            <span className="font-medium text-gray-700">{userName}</span>
          </span>
        )}

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
