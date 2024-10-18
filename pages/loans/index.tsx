import { GetServerSideProps } from 'next';
import { PrismaClient, Loan } from '@prisma/client';

type LoanListProps = {
  loans: Loan[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const loans = await prisma.loan.findMany();
  return {
    props: { loans },
  };
};

const LoanList = ({ loans }: LoanListProps) => {
  return (
    <div>
      <h1>Loan List</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            {loan.borrowerName} - ${loan.loanAmount} @ {loan.interestRate}% - Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;