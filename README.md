This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL database set up locally or remotely
- A `.env` file configured with the database credentials

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aahmad94/loanly
   cd loanly
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```bash
     DATABASE_URL="your_database_url"
     ```

4. **Run Prisma Migrate**
   ```bash
   npx prisma migrate dev --name dev
   ```
5. **Seed the Database**
   ```bash
   NODE_OPTIONS="--loader ts-node/esm" npx prisma db seed
   ```

6. **Start the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
