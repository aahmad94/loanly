import { GetServerSideProps } from 'next';
import { PrismaClient, Loan } from '@prisma/client';
import Link from 'next/link';
import '../../app/globals.css'
import { useRouter } from 'next/router';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar";

type LoanPageProps = {
    loan: Loan | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const prisma = new PrismaClient();

    const loan = await prisma.loan.findUnique({
        where: { id: parseInt(id) },
    });

    return {
        props: { 
            loan: loan ? JSON.parse(JSON.stringify(loan)) : null 
        },
    };
};

const LoanPage = ({ loan }: LoanPageProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!loan) {
        return <div>Loan not found</div>;
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this loan?')) {
            try {
                const response = await fetch(`/api/loans/delete?id=${loan.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete loan');
                }

                router.push('/loans');
            } catch (error) {
                console.error('Error deleting loan:', error);
                alert('Failed to delete loan. Please try again.');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Loan Details</CardTitle>
                        <CardDescription>Information about loan #{loan.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Borrower Name</h3>
                            <p>{loan.borrowerName}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Loan Amount</h3>
                            <p>${loan.loanAmount.toFixed(2)}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Interest Rate</h3>
                            <p>{loan.interestRate}%</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Status</h3>
                            <p>{loan.status}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Start Date</h3>
                            <p>{new Date(loan.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">End Date</h3>
                            <p>{loan.endDate ? new Date(loan.endDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Created At</h3>
                            <p>{new Date(loan.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Updated At</h3>
                            <p>{new Date(loan.updatedAt).toLocaleString()}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Link href="/loans">
                            <Button variant="outline">Back</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoanPage;
