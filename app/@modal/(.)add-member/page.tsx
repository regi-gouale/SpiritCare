"use client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

export const AddMemberPage = () => {
  // const isMobile = useIsMobile();
  // const router = useRouter();

  return (
    <Modal
      title="Ajouter un membre"
      description="Remplir toutes les informations pour ajouter un membre"
    >
      <form className="flex flex-col space-y-4 p-2">
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Role</span>
          <select>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </label>
        <Button type="submit" className="rounded-full">
          Ajouter
        </Button>
      </form>
    </Modal>
  );
};

export default AddMemberPage;
