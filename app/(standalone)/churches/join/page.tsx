import { auth } from "@/auth";
import { JoinChurchForm } from "@/components/churches/join-church-form";
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
      <JoinChurchForm userId={session.user.id} />
    </div>
  );
}
