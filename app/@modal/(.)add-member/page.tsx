"use client";

import { Modal } from "@/components/modal";
import { AddPersonForm } from "@/components/persons/add-person-form";
// import { useRouter } from "next/navigation";

export const AddMemberPage = () => {
  // const isMobile = useIsMobile();
  // const router = useRouter();

  return (
    <Modal
      title="Ajouter un membre"
      description="Remplir toutes les informations pour ajouter un membre"
    >
      <AddPersonForm />
    </Modal>
  );
};

export default AddMemberPage;
