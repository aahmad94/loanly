import { GetServerSideProps } from 'next';
import { PrismaClient, Loan } from '@prisma/client';

// Define a new type that represents the serializable loan data
type SerializableLoan = Omit<Loan, 'startDate' | 'endDate'> & {
  startDate: string;
  endDate: string | null;
};

type LoanListProps = {
  loans: SerializableLoan[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const loans = await prisma.loan.findMany();

  // Convert Date objects to ISO strings
  const serializableLoans: SerializableLoan[] = loans.map(loan => ({
    ...loan,
    startDate: loan.startDate.toISOString(),
    endDate: loan.endDate ? loan.endDate.toISOString() : null,
  }));

  return {
    props: { loans: serializableLoans },
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
            <br />
            Start Date: {new Date(loan.startDate).toLocaleDateString()}
            {loan.endDate && ` - End Date: ${new Date(loan.endDate).toLocaleDateString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
