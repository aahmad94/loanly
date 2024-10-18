import LoanList from "@/pages/loans";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen my-20 p-10">
      <main className="flex flex-col items-center w-full px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Your one stop shop for loan management
        </h1>
        
        <div className="flex flex-col space-y-4">
          <Link 
            href="/loans" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Loans
          </Link>
          <Link 
            href="/loans/create" 
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Create a Loan Entry
          </Link>
        </div>
      </main>
    </div>
  );
}
