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
    <Card className="my-10 max-w-xl size-full mx-auto rounded-2xl p-4 md:p-8 shadow-inner bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center font-lato md:text-2xl xl:text-3xl">
          Bienvenue sur <span className="font-semibold">Spirit</span>
          <span className="text-primary font-black">Care</span>
        </CardTitle>
        <CardDescription className="font-epilogue mt-8">
          Remplissez toutes les informations réquises s'il vous plait.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={loginUser}>
          <div className="font-lato space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              type="email"
              name="email"
              className="rounded-full"
            />
          </div>
          <div className="font-lato space-y-2">
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
            className="font-lato w-full mt-8 rounded-full text-lg font-semibold"
          >
            Se connecter
            <ArrowRightIcon className="ml-2" />
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription className="font-epilogue text-center">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="text-primary font-semibold">
            Inscrivez-vous
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
