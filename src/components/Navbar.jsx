import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className='flex justify-start items-center mb-2'>
      <Link to='/' className='flex items-center'>
        <BsYoutube className='text-4xl text-red-500 mr-1' />
        <h1 className='text-2xl font-bold tracking-tighter'>YouTube</h1>
      </Link>
      <SearchBar />
    </nav>
  );
}
