import { Bell, LogOut, SettingsIcon, UserIcon } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
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
import Link from "next/link";
import React from "react";

// const SearchBar: React.FC = () => (
//   <div className="flex items-center">
//     {/* <Search className="mr-2 size-4 text-muted-foreground" />
//     <Input type="search" placeholder="Search..." className="w-64" /> */}
//   </div>
// );

const NotificationsButton: React.FC = () => (
  <Button variant="ghost" size="icon">
    <Bell className="size-5" />
  </Button>
);

const UserMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative size-8 rounded-full">
        <Avatar className="size-8">
          <AvatarFallback>{}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">John Doe</p>
          <p className="text-xs leading-none text-muted-foreground">
            john.doe@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <UserIcon className="mr-2 size-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <SettingsIcon className="mr-2 size-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 size-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Header: React.FC = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }
  const user = session.user as User;

  return (
    <header className="sticky top-0 mx-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-2 text-xl mr-10"
        >
          <div className="text-primary font-semibold">
            Spirit<span className="font-black">Care</span>
          </div>
        </Link>
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
          <Link href={"/persons"} className="">
            Liste des membres
          </Link>
          {/* <Link href={"/products"} className="text-muted-foreground">
            Produits
          </Link>
          <Link href={"/analytics"} className="text-muted-foreground">
            Analytics
          </Link> */}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationsButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/90 text-primary-foreground font-bold">
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
              <Link href={"/logout"} className="flex items-center">
                <LogOut className="mr-2 size-4" />
                <span>Se déconnecter</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
