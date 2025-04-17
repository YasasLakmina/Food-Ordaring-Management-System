import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AuthModal from '../auth/AuthModal';
import { ShoppingBagIcon, MenuIcon, UserIcon, MapPinIcon, SearchIcon, XIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    cartItems
  } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">
                FoodFast
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-2 text-gray-700 cursor-pointer">
              <MapPinIcon size={20} />
              <span className="text-sm">Deliver to: 123 Main St</span>
            </div>
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input type="text" placeholder="Search for food, restaurants..." className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/checkout" className="relative">
                <ShoppingBagIcon size={24} className="text-gray-700" />
                {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>}
              </Link>
              <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center space-x-1 text-gray-700 cursor-pointer hover:text-green-600 transition-colors">
                <UserIcon size={24} />
                <span className="text-sm font-medium">Sign in</span>
              </button>
            </nav>
            <div className="flex md:hidden items-center space-x-4">
              <Link to="/checkout" className="relative">
                <ShoppingBagIcon size={24} className="text-gray-700" />
                {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
          {isMenuOpen && <div className="md:hidden mt-4 py-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700 mb-4">
                <MapPinIcon size={20} />
                <span className="text-sm">Deliver to: 123 Main St</span>
              </div>
              <div className="relative w-full mb-4">
                <input type="text" placeholder="Search for food, restaurants..." className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button onClick={() => {
            setIsAuthModalOpen(true);
            setIsMenuOpen(false);
          }} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <UserIcon size={20} />
                <span className="text-sm font-medium">Sign in</span>
              </button>
            </div>}
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>;
};
export default Header;