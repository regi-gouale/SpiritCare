import { loginUser } from "@/actions/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <Card className="mx-auto my-10 size-full max-w-xl rounded-2xl bg-background p-4 shadow-inner md:p-8">
      <CardHeader>
        <CardTitle className="text-center font-lato text-xl font-medium md:text-2xl xl:text-3xl">
          Bienvenue sur <span className="font-semibold">Spirit</span>
          <span className="font-black text-primary">Care</span>
        </CardTitle>
        <CardDescription className="mt-8 font-epilogue">
          Remplissez toutes les informations réquises s'il vous plait.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={loginUser}>
          <div className="space-y-2 font-lato">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              type="email"
              name="email"
              className="rounded-full"
            />
          </div>
          <div className="space-y-2 font-lato">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              name="password"
              className="rounded-full"
            />
          </div>
          <Button
            type="submit"
            className="mt-8 w-full rounded-full font-lato text-lg font-semibold"
          >
            Se connecter
            <ArrowRightIcon className="ml-2" />
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-center font-epilogue">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Inscrivez-vous
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
