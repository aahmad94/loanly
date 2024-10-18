import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      await prisma.loan.create({
        data: {
          borrowerName: data.borrowerName,
          loanAmount: data.loanAmount,
          interestRate: data.interestRate,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          status: data.status,
        },
      });
      res.status(200).json({ message: 'Loan created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating loan' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}