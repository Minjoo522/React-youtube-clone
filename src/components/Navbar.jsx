import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDarkMode } from '../context/DarkModeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className='top-0 sticky py-2 bg-white dark:bg-gray-700 dark:text-white flex justify-start items-center'>
      <Link to='/' className='flex items-center'>
        <BsYoutube className='text-4xl text-red-500 mr-1' />
        <h1 className='text-2xl font-bold tracking-tighter'>YouTube</h1>
      </Link>
      <SearchBar />
      <button className='text-2xl' onClick={toggleDarkMode}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
    </nav>
  );
}
