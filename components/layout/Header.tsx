import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  // Navigation items
  const navigationItems = [
    { name: 'Products', path: '/products' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="bg-dark text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/gozupees-logo.png"
                alt="Gozupees Logo"
                className="h-8 md:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium hover:text-blue-400 transition-colors ${
                  isActive(item.path)
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-4 py-2 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2"
              onClick={() => router.push('/contact')}
            >
              Work With Us
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-200 hover:text-white"
              onClick={toggleMenu}
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark border-t border-gray-800 py-4">
          <div className="container mx-auto px-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block text-sm font-medium ${
                  isActive(item.path)
                    ? 'text-white bg-blue-600/20 px-2 py-1 rounded'
                    : 'text-gray-200'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-800">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium flex items-center justify-center gap-2"
                onClick={() => {
                  router.push('/contact');
                  setIsOpen(false);
                }}
              >
                Work With Us
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
