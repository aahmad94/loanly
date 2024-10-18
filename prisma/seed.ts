import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.loan.createMany({
    data: [
      {
        borrowerName: "John Doe",
        loanAmount: 5000,
        interestRate: 5.5,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2026-01-01'),
        status: "APPROVED",
      },
      {
        borrowerName: "Jane Smith",
        loanAmount: 10000,
        interestRate: 4.2,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2029-03-01'),
        status: "PENDING",
      },
      {
        borrowerName: "Alice Johnson",
        loanAmount: 7500,
        interestRate: 6.0,
        startDate: new Date('2023-07-01'),
        endDate: new Date('2025-07-01'),
        status: "REJECTED",
      },
      {
        borrowerName: "Bob Brown",
        loanAmount: 20000,
        interestRate: 3.5,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2034-05-01'),
        status: "APPROVED",
      },
      {
        borrowerName: "Emily White",
        loanAmount: 12000,
        interestRate: 4.8,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2028-06-01'),
        status: "PENDING",
      },
      {
        borrowerName: "Michael Green",
        loanAmount: 3000,
        interestRate: 5.0,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2025-09-01'),
        status: "REJECTED",
      },
      {
        borrowerName: "Sophia Davis",
        loanAmount: 15000,
        interestRate: 4.0,
        startDate: new Date('2024-08-01'),
        endDate: new Date('2030-08-01'),
        status: "APPROVED",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });