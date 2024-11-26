import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <header className="sticky top-0 flex h-14 items-center bg-background px-4 shadow-md sm:px-8">
        <Link href={"/"}>
          <span className="font-semibold text-primary">Shepherd</span>
          <span className="font-black text-primary">Tools</span>
        </Link>
        <div className="ml-auto">
          <div className="flex sm:hidden">
            <Button variant="ghost">
              <MenuIcon size={24} />
            </Button>
          </div>
          <nav className="ml-auto hidden gap-4 font-lato font-medium sm:flex sm:gap-6">
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#benefits"
            >
              Bénéfices
            </Link>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#process"
            >
              Travailler avec nous
            </Link>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#why-us"
            >
              Pourquoi nous
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto my-4 flex flex-1 flex-col items-center justify-center px-4 sm:px-8">
        <section
          id="hero"
          className="my-8 flex min-h-96 flex-1 flex-col items-center justify-center py-20 sm:my-16 sm:py-32 md:my-24 lg:my-32 xl:my-40"
        >
          <h1 className="m-8 text-6xl">
            <span className="font-semibold text-primary">Shepherd</span>
            <span className="font-black text-primary">Tools</span>
          </h1>
          <h2 className="text-center font-lato text-3xl font-black">
            Recentrez-vous sur votre mission,
            <br />
            nous nous occupons de l’organisation.
          </h2>
          <p className="mt-4 text-center font-lato text-lg font-medium">
            Gagnez du temps, améliorez la collaboration et suivez l’évolution
            spirituelle de vos membres en un seul endroit.
          </p>
          <Link href={"/dashboard"} className="font-lato">
            <Button className="mt-8" variant="default">
              Démarrer
            </Button>
          </Link>
        </section>
        <section
          id="benefits"
          className="my-8 flex min-h-96 flex-1 flex-col items-center justify-center py-20 sm:my-16 sm:py-32 md:my-24 lg:my-32 xl:my-40"
        >
          <h2 className="text-center font-lato text-3xl font-black">
            Pourquoi utiliser ShepherdTools ?
          </h2>
          <p className="mt-4 text-center font-lato text-lg font-medium">
            Découvrez les avantages de l’utilisation de ShepherdTools.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Des outils intuitifs, adaptés à vos besoins.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Que vous soyez un pasteur, un responsable d’équipe ou un
                  leader, ShepherdTools met à votre disposition une interface
                  simple et accessible pour gérer efficacement vos membres,
                  leurs parcours et leurs contributions. Simplifiez votre
                  quotidien tout en gardant une vue d’ensemble.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Une vision claire de l’évolution individuelle et collective.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Suivez facilement les participations aux réunions, les étapes
                  clés du cheminement spirituel et les engagements de chacun.
                  Vous saurez toujours comment mieux accompagner vos membres.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Votre confiance est notre priorité.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Toutes les données de votre église et de vos membres sont
                  stockées de manière sécurisée, avec un accès strictement
                  contrôlé. ShepherdTools garantit le respect de votre vie
                  privée et celle de votre communauté.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <Link href={"/dashboard"} className="font-lato">
            <Button className="mt-8" variant="default">
              Découvrir
            </Button>
          </Link>
        </section>
        <section
          id="process"
          className="my-8 flex min-h-96 flex-1 flex-col items-center justify-center py-20 sm:my-16 sm:py-32 md:my-24 lg:my-32 xl:my-40"
        >
          <h2 className="text-center font-lato text-3xl font-black">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-center font-lato text-lg font-medium">
            Découvrez comment ShepherdTools peut vous aider à mieux organiser
            votre église.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Découverte et démonstration gratuite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Prenez rendez-vous avec notre équipe pour découvrir
                  ShepherdTools en action. Lors de cette rencontre, nous
                  analysons vos besoins spécifiques et vous montrons comment
                  notre solution peut transformer la gestion de votre église.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Installation et configuration personnalisée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Nous mettons en place ShepherdTools en fonction des besoins
                  uniques de votre communauté. De la configuration initiale à la
                  migration de vos données existantes, nous nous occupons de
                  tout pour un démarrage sans stress.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Formation et accompagnement continu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Nous formons vos équipes pour garantir une adoption rapide et
                  fluide de l’outil. Par la suite, notre support reste
                  disponible pour répondre à vos questions et vous accompagner
                  dans l’optimisation de votre utilisation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <Link href={"/dashboard"} className="font-lato">
            <Button className="mt-8" variant="default">
              Commencer
            </Button>
          </Link>
        </section>
        <section
          id="why-us"
          className="my-8 flex min-h-96 flex-1 flex-col items-center justify-center py-20 sm:my-16 sm:py-32 md:my-24 lg:my-32 xl:my-40"
        >
          <h2 className="text-center font-lato text-3xl font-black">
            Pourquoi choisir ShepherdTools ?
          </h2>
          <p className="mt-4 text-center font-lato text-lg font-medium">
            Découvrez pourquoi ShepherdTools est la solution idéale pour votre
            église.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Un gain de temps précieux pour vous concentrer sur l’essentiel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  En optimisant vos processus organisationnels, ShepherdTools
                  vous libère du temps pour vous concentrer sur votre vocation
                  et votre communauté.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Une interface intuitive, accessible à tous
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Pas besoin d’être un expert en technologie pour utiliser
                  ShepherdTools. Notre solution a été conçue pour être simple,
                  pratique et agréable à utiliser, quelle que soit votre
                  expérience.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle className="my-4 text-center font-lato text-xl">
                  Une approche centrée sur votre mission spirituelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-justify font-epilogue">
                  Nous croyons en l’importance de votre travail. ShepherdTools
                  n’est pas juste un logiciel ; c’est un partenaire qui vous
                  aide à aligner votre vision spirituelle avec une gestion
                  efficace et moderne.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <Link href={"/dashboard"} className="font-lato">
            <Button className="mt-8" variant="default">
              En savoir plus
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
