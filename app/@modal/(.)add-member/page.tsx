"use client";

import { Modal } from "@/components/modal";
import { AddPersonForm } from "@/components/persons/add-person-form";
import { SessionProvider } from "next-auth/react";

export const AddMemberPage = () => {
  return (
    <Modal
      title="Ajouter un membre"
      description="Remplir toutes les informations pour ajouter un membre"
    >
      <SessionProvider>
        <AddPersonForm />
      </SessionProvider>
    </Modal>
  );
};

export default AddMemberPage;
