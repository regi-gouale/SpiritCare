import { getUserChurchId } from "@/actions/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Component() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (!session.user.id) {
    return <div>Loading</div>;
  }

  const churchId = await getUserChurchId(session.user.id);

  if (!churchId) {
    redirect("/churches/join");
  } else {
    redirect(`/dashboard/${churchId}`);
  }
}
