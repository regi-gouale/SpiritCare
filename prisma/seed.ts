// import { prisma } from "@/lib/prisma";
import { fakerFR as faker } from "@faker-js/faker";
import { PrismaClient, Role, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function createChurch(numberOfChurches: number = 5) {
  const churches = [];
  for (let i = 0; i < numberOfChurches; i++) {
    const name = faker.company.name();
    const address = faker.location.street();
    const city = faker.location.city();
    const country = faker.location.country();
    const joinCode = Math.random().toString(36).substring(2, 15);

    churches.push(
      await prisma.church.create({
        data: {
          name,
          address,
          city,
          country,
          joinCode,
        },
      })
    );
  }

  return churches;
}

async function createUsers(numberOfUsers: number = 5) {
  const churches = await prisma.church.findMany();
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email().toLocaleLowerCase();

    const church = churches[Math.floor(Math.random() * churches.length)];
    const churchId = church.id;

    const roles = [Role.ADMIN, Role.SUPERUSER, Role.USER];
    const role = roles[Math.floor(Math.random() * roles.length)];

    users.push(
      await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          churchId,
          password:
            "$2a$16$kxJdPB0n1aqR/0fz1Jvat.vSUNEEXykcPJmvwf11pmeLxSwMMRqXy",
          role,
        },
      })
    );
  }

  return users;
}

async function createPersons(numberOfPersons: number = 5) {
  const churches = await prisma.church.findMany();
  const statuses = [
    Status.ADMIN,
    Status.AIDE,
    Status.ASSISTANT_PASTEUR,
    Status.MEMBER,
    Status.MINISTRE,
    Status.PASTEUR,
    Status.RESPONSABLE,
    Status.STAR,
  ];

  const persons = [];
  for (let i = 0; i < numberOfPersons; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const fullname = `${firstname} ${lastname.toLocaleUpperCase()}`;
    const email = faker.internet.email().toLocaleLowerCase();
    const phone = faker.phone.number({
      style: "international",
    });
    const dateOfBirth = faker.date.birthdate();

    const church = churches[Math.floor(Math.random() * churches.length)];
    const churchId = church.id;

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    persons.push(
      await prisma.person.create({
        data: {
          firstname,
          lastname,
          fullname,
          email,
          phone,
          dateOfBirth,
          status,
          churchId,
        },
      })
    );
  }

  return persons;
}

async function createReports(numberOfReports: number = 5) {
  const users = await prisma.user.findMany();
  const reports = [];
  for (let i = 0; i < numberOfReports; i++) {
    const user = users[Math.floor(Math.random() * users.length)];

    const userId = user.id;
    const churchId = user.churchId;

    if (!churchId) {
      continue;
    }

    const persons = await prisma.person.findMany({
      where: {
        churchId,
      },
    });

    const personId = persons[Math.floor(Math.random() * persons.length)].id;
    const content = faker.lorem.paragraph();
    const createdAt = faker.date.recent();

    reports.push(
      await prisma.report.create({
        data: {
          userId,
          personId,
          content,
          date: createdAt,
          reason: faker.lorem.sentence(),
          churchId: users.find((user) => user.id === userId)?.churchId || "",
        },
      })
    );
  }

  return reports;
}

async function main() {
  await createChurch();
  await createUsers(20);
  await createPersons(1000);
  await createReports(5000);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
