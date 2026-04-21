// src/app/pages/NotFound.jsx
import { Link } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <Link 
        to="/" 
        className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        <Home className="size-4" />
        Go to Dashboard
      </Link>
    </div>
  );
}
