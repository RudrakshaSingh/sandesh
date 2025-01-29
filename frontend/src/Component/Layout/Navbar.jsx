import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Mail className="h-8 w-8 text-orange-600" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
                Sandesh
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-orange-600 transition">Home</Link>
            <Link to="/create-invitation" className="text-gray-700 hover:text-orange-600 transition">Create</Link>
            <Link to="/design" className="text-gray-700 hover:text-orange-600 transition">Designs</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
            <Link to="/users/login" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Home</Link>
            <Link to="/create-invitation" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Create</Link>
            <Link to="/design" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Designs</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-orange-600">About</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Contact</Link>
            <Link to="/order" className="block px-3 py-2 bg-orange-600 text-white rounded-md">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;