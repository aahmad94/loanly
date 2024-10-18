import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 rounded-b">
      <div className="container mt-2">
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition-colors">
          Loanly
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
