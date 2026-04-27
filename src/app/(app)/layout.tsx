import { AppNav } from "@/components/shared/AppNav";
import { UserBootstrap } from "@/components/shared/UserBootstrap";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserBootstrap />
      <AppNav />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {children}
      </div>
    </div>
  );
}
