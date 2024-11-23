import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type PersonIdEditPageProps = Promise<{
  personId: string;
}>;

export default async function PersonIdAddReportPage(props: {
  params: PersonIdEditPageProps;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { personId } = await props.params;

  if (!personId) {
    return <div>Loading</div>;
  }

  const person = await prisma.person.findUnique({
    where: {
      id: personId,
    },
  });

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
          <div className="flex w-full max-w-3xl items-center justify-between">
            <Link href={`/persons/${personId}`}>
              <ArrowLeftIcon className="size-8 cursor-pointer" />
            </Link>
            <h1 className="text-center font-lato text-4xl font-black">
              {`${person.firstname} ${person.lastname.toLocaleUpperCase()}`}
            </h1>
            <div></div>
          </div>
          <Card className="w-full max-w-3xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Modifier les informations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col items-start justify-center space-y-2 lg:flex-row lg:items-center">
                  <Label htmlFor="firstname" className="lg:w-48">
                    Prénom
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="w-full"
                    defaultValue={person.firstname}
                  />
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 lg:flex-row lg:items-center">
                  <Label htmlFor="lastname" className="lg:w-48">
                    Nom
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="w-full"
                    defaultValue={person.lastname}
                  />
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 lg:flex-row lg:items-center">
                  <Label htmlFor="email" className="lg:w-48">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full"
                    defaultValue={person.email}
                  />
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 lg:flex-row lg:items-center">
                  <Label htmlFor="phone" className="lg:w-48">
                    Téléphone
                  </Label>
                  {/* <Input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full"
                    defaultValue={person.phone}
                  /> */}
                  {/* <PhoneInput
                    placeholder="+33 6 12 34 57 89"
                    id="phone"
                    name="phone"
                    className="w-full"
                    defaultValue={person.phone}
                  /> */}
                </div>
                <div className="flex flex-col items-start justify-center space-y-2 lg:flex-row lg:items-center">
                  <Label htmlFor="dateOfBirth" className="lg:w-48">
                    Date de naissance
                  </Label>
                  {/* <Input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full"
                    defaultValue={person.dateOfBirth.toDateString()}
                  /> */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal font-epilogue rounded-xl col-span-3",
                          !person.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        {person.dateOfBirth ? (
                          format(person.dateOfBirth, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={person.dateOfBirth}
                        onSelect={(date) => {
                          if (date) {
                            person.dateOfBirth = date;
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1920-01-01")
                        }
                        captionLayout={"dropdown"}
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        defaultMonth={person.dateOfBirth || new Date()}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
