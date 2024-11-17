// import { prisma } from "@/lib/prisma";
import { fakerFR as faker } from "@faker-js/faker";
import { Gender, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genders = [Gender.FEMALE, Gender.MALE];
  const roles = [
    // Status.ADMIN,
    Status.AIDE,
    Status.ASSISTANT_PASTEUR,
    Status.MEMBER,
    Status.MINISTRE,
    Status.PASTEUR,
    Status.RESPONSABLE,
    Status.STAR,
  ];
  const people = Array.from({ length: 1000 }).map(() => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
    dateOfBirth: faker.date.birthdate(),
    gender: genders[Math.floor(Math.random() * genders.length)],
    status: roles[Math.floor(Math.random() * roles.length)],
  }));

  let peoplesCreated = [];
  for (const person of people) {
    peoplesCreated.push(
      await prisma.person.create({
        data: person,
      })
    );
  }

  for (const person of peoplesCreated) {
    // Create a random number of reports for each user
    const reports = Array.from({ length: Math.floor(Math.random() * 10) }).map(
      () => ({
        date: faker.date.recent({ days: 30 }),
        content: faker.lorem.paragraph(),
        personId: person.id,
      })
    );
    for (const report of reports) {
      await prisma.report.create({
        data: report,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
