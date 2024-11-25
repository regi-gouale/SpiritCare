import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { Bell, LogOut, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotificationsButton: React.FC = () => (
  <Button variant="ghost" size="icon">
    <Bell className="size-5" />
  </Button>
);

export const Header: React.FC = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }
  const user = session.user as User;

  // console.log(user);
  if (!user.churchId) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-20 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4">
        <Link
          href={"/dashboard"}
          className="mr-10 flex items-center gap-2 text-xl"
        >
          <div className="font-semibold text-primary">
            Shepherd<span className="font-black">Tools</span>
          </div>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
          <Link
            href={"/dashboard"}
            className="align-bottom font-lato hover:font-semibold hover:text-primary"
          >
            Accueil
          </Link>
          <Link
            href={`/dashboard/${user.churchId}/persons`}
            className="align-bottom font-lato hover:font-semibold hover:text-primary"
          >
            Membres
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationsButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary font-lato text-base font-black text-primary-foreground">
                  {user.firstname?.charAt(0).toLocaleUpperCase()}
                  {user.lastname?.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.firstname} {user.lastname?.toLocaleUpperCase()}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"} className="flex items-center">
                <UserIcon className="mr-2 size-4" />
                <span>Mon profil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/settings"} className="flex items-center">
                <SettingsIcon className="mr-2 size-4" />
                <span>Paramètres</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="flex items-center"
              >
                <Button type="submit" variant="ghost" className="p-1">
                  <LogOut className="mr-0 size-4" />
                  <span>Se déconnecter</span>
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
