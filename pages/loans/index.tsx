import { GetServerSideProps } from 'next';
import { PrismaClient, Loan } from '@prisma/client';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import '../../app/globals.css'
import Navbar from '@/components/Navbar'

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
    <div>
      <Navbar />
      <div className="m-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Loan List</h1>
          <Link href="/loans/create" className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors">
            <span className="text-xl">+</span>
          </Link>
        </div>
        <Table>
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
              <TableRow
                key={loan.id}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => window.location.href = `/loans/${loan.id}`}
              >
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
    </div>
  );
};

export default LoanList;
