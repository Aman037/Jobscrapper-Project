import React from 'react';
import { Search, LayoutDashboard, Rocket } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-xl p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 rounded-b-3xl">
    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 animate-pulse">
      <Rocket className="text-yellow-300 w-8 h-8"/>
      <span className="hidden sm:inline">JobScraper</span>
    </h1>
    <div className="flex space-x-2 sm:space-x-4">
      <button
        onClick={() => setCurrentPage('home')}
        className={`p-3 rounded-full cursor-pointer transition-all duration-500 transform hover:scale-110 shadow-lg ${currentPage === 'home' ? 'bg-white text-purple-600' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => setCurrentPage('dashboard')}
        className={`p-3 rounded-full cursor-pointer transition-all duration-500 transform hover:scale-110 shadow-lg ${currentPage === 'dashboard' ? 'bg-white text-purple-600' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
      >
        <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  </nav>
);

export default Navbar;