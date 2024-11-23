import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getUserChurch(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user?.churchId;
}

export default async function Component() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    return <div>Loading</div>;
  }

  const churchId = await getUserChurch(session.user.id);

  if (!churchId) {
    redirect("/churches/join");
  } else {
    redirect(`/dashboard/${churchId}`);
  }
}
