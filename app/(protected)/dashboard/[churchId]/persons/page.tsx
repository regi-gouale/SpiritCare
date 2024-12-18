import { auth } from "@/auth";
import { PersonsTable } from "@/components/persons/table";
import { prisma } from "@/lib/prisma";
import { Person } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const persons: Person[] = await prisma.person.findMany({
    where: {
      churchId: session.user.churchId,
    },
    orderBy: {
      lastname: "asc",
    },
  });

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex max-w-4xl items-center justify-between p-4">
          <h1 className="text-center font-lato text-xl font-black md:text-2xl lg:text-3xl xl:text-4xl">
            Membres
          </h1>
          <Link
            href={"/add-member"}
            className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-xl border bg-primary px-4 py-2 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <PlusIcon className="size-4 text-primary-foreground" />
            <span className="font-lato font-semibold">Membre</span>
          </Link>
        </div>
        <PersonsTable persons={JSON.parse(JSON.stringify(persons))} />
      </main>
    </div>
  );
}
