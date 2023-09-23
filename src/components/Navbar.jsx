import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>
        <BsYoutube />
        <h1>YouTube</h1>
      </Link>
      <SearchBar />
    </nav>
  );
}
