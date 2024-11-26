import { auth } from "@/auth";
import { JoinChurchForm } from "@/components/churches/join-church-form";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function JoinChurchPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <SessionProvider>
        <JoinChurchForm />
      </SessionProvider>
    </div>
  );
}
