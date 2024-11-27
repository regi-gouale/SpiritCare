import { auth } from "@/auth";
import { CreateChurchForm } from "@/components/churches/create-church-form";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ChurchesCreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    return <div>Loading</div>;
  }

  if (session.user.role !== Role.ADMIN) {
    console.error("User is not an admin: ", session.user.role);
    redirect("/churches/join");
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <CreateChurchForm userId={session.user.id} />
    </div>
  );
}
