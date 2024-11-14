"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "./ui/drawer";

export type ModalProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const Modal = ({ children, title, description }: ModalProps) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };
  if (isMobile) {
    return (
      <Drawer defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
        <DrawerOverlay className="bg-black/5">
          <DrawerContent className="overflow-y-hidden">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </DrawerHeader>
            {children}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-black/5">
        <DialogContent className="overflow-y-hidden">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
