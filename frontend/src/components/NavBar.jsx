import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <h4 className=' bg-red-400'>Paigaa</h4>
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Mail className="h-8 w-8 text-orange-600" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
                Paigaam
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/Home" className="text-gray-700 hover:text-orange-600 transition">Home</Link>
            <Link to="/Customize" className="text-gray-700 hover:text-orange-600 transition">Create</Link>
            <Link to="/Designs" className="text-gray-700 hover:text-orange-600 transition">Designs</Link>
            <Link to="/About" className="text-gray-700 hover:text-orange-600 transition">About</Link>
            <Link to="/Contact" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
            <Link to="/Order" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
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
            <Link to="/customize" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Create</Link>
            <Link to="/designs" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Designs</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-orange-600">About</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-orange-600">Contact</Link>
            <Link to="/order" className="block px-3 py-2 bg-orange-600 text-white rounded-md">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;