import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import create from '../api/loans/create'
import '../../app/globals.css'

const loanSchema = z.object({
  borrowerName: z.string().min(1, "Borrower name is required"),
  loanAmount: z.number().positive("Loan amount must be positive"),
  interestRate: z.number().min(0, "Interest rate must be non-negative").max(100, "Interest rate cannot exceed 100%"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
  status: z.enum(["APPROVED", "PENDING", "REJECTED"]),
});

type LoanFormData = z.infer<typeof loanSchema>;

const CreateLoanForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
  });

  const onSubmit = async (data: LoanFormData) => {
    try {
      const response = await fetch('/api/loans/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Error creating loan');
      }
  
      // Handle success (e.g., show a success message, redirect, etc.)
      console.log("Loan created successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error creating loan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <input
          {...register("borrowerName")}
          placeholder="Borrower Name"
          className="w-full p-2 border rounded"
        />
        {errors.borrowerName && <p className="text-red-500">{errors.borrowerName.message}</p>}
      </div>

      <div>
        <input
          {...register("loanAmount", { valueAsNumber: true })}
          type="number"
          placeholder="Loan Amount"
          className="w-full p-2 border rounded"
        />
        {errors.loanAmount && <p className="text-red-500">{errors.loanAmount.message}</p>}
      </div>

      <div>
        <input
          {...register("interestRate", { valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Interest Rate"
          className="w-full p-2 border rounded"
        />
        {errors.interestRate && <p className="text-red-500">{errors.interestRate.message}</p>}
      </div>

      <div>
        <input
          {...register("startDate")}
          type="date"
          className="w-full p-2 border rounded"
        />
        {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
      </div>

      <div>
        <input
          {...register("endDate")}
          type="date"
          className="w-full p-2 border rounded"
        />
        {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
      </div>

      <div>
        <select {...register("status")} className="w-full p-2 border rounded">
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Create Loan
      </button>
    </form>
  );
};

export default CreateLoanForm;
