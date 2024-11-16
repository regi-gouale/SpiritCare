"use client";

import { useEffect, useState } from "react";

type PersonIdPageProps = Promise<{
  personId: string;
}>;

export default function PersonIdPage(props: { params: PersonIdPageProps }) {
  const [person, setPerson] = useState<string | null | undefined>(null);

  useEffect(() => {
    const getPersonId = async () => {
      const { personId } = await props.params;
      setPerson(personId);
    };

    getPersonId();
  }, [props.params]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
          <h1 className="text-center font-lato text-4xl font-black">
            Ajouter un rapport d'entretien
          </h1>
          <h2>{person}</h2>
        </div>
      </main>
    </div>
  );
}
