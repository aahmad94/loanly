import { GetServerSideProps } from 'next';
import { PrismaClient, Loan } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define a new type that represents the serializable loan data
type SerializableLoan = Omit<Loan, 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'> & {
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
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
    createdAt: loan.createdAt.toISOString(),
    updatedAt: loan.updatedAt.toISOString(),
  }));

  return {
    props: { loans: serializableLoans },
  };
};

const LoanList = ({ loans }: LoanListProps) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Loan List</h1>
      <Table>
        <TableCaption>A list of all loans</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Borrower Name</TableHead>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Interest Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.borrowerName}</TableCell>
              <TableCell>${loan.loanAmount.toFixed(2)}</TableCell>
              <TableCell>{loan.interestRate}%</TableCell>
              <TableCell>{loan.status}</TableCell>
              <TableCell>{new Date(loan.startDate).toLocaleDateString()}</TableCell>
              <TableCell>
                {loan.endDate ? new Date(loan.endDate).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>{new Date(loan.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoanList;
