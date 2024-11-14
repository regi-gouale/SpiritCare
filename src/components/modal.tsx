"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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
            <div className="mx-auto w-full max-w-xl p-4">
              <DrawerHeader>
                <DrawerTitle className="text-center font-lato font-semibold">
                  {title}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-muted-foreground">
                  {description}
                </DrawerDescription>
              </DrawerHeader>
              {children}
            </div>
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
            <DialogTitle className="text-center font-lato font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
