"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { PlusIcon } from "lucide-react";

export const AddPersonButton = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="rounded-full" onClick={() => {}}>
            Ajouter <PlusIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          {/* <div></div> */}
          <DrawerHeader>
            <DrawerTitle className="font-lato">
              Ajouter une personne
            </DrawerTitle>
            <DrawerDescription className="font-epilogue">
              Remplissez les champs ci-dessous pour ajouter une personne.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" onClick={() => {}}>
          Ajouter <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <div></div> */}
        <DialogHeader>
          <DialogTitle className="text-center font-lato text-xl">
            Ajouter une personne
          </DialogTitle>
          <DialogDescription className="font-epilogue">
            Remplissez les champs ci-dessous pour ajouter une personne.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
