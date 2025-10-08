import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4 bg-white shadow-lg rounded-lg p-6">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
            Return to Homepage
        </Link>
      </div>
    </div>
  );
}