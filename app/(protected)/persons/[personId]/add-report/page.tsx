// import { AddReportForm } from "@/components/reports/add-report-form";
// import { prisma } from "@/lib/prisma";

// type PersonIdAddReportPageProps = Promise<{
//   personId: string;
// }>;

// export default async function PersonIdAddReportPage(props: {
//   params: PersonIdAddReportPageProps;
// }) {
//   const { personId } = await props.params;

//   if (!personId) {
//     return <div>Loading...</div>;
//   }

//   const person = await prisma.person.findUnique({
//     where: {
//       id: personId,
//     },
//   });

//   if (!person) {
//     return <div>Person not found</div>;
//   }

//   return (
//     <div className="h-full">
//       <main>
//         <div className="mx-auto my-10 flex w-full flex-col items-center justify-between space-y-8 p-10">
//           <h1 className="mb-10 text-center font-lato text-4xl font-black">
//             Entretien de{" "}
//             {`${person.firstname} ${person.lastname.toLocaleUpperCase()}`}
//           </h1>
//           <AddReportForm personId={personId} />
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { Modal } from "@/components/modal";
import { AddReportForm } from "@/components/reports/add-report-form";
import { use } from "react";

type AddReportPageProps = Promise<{ personId: string }>;

export default function AddReportPage(props: { params: AddReportPageProps }) {
  const params = use(props.params);
  const personId = params.personId;

  return (
    <Modal
      title="Ajouter un rapport"
      description="Remplir toutes les informations pour ajouter un rapport"
    >
      <AddReportForm personId={personId} />
    </Modal>
  );
}
