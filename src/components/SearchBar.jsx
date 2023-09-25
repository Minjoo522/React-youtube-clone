import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const { keyword } = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // 검색어가 공백인 경우 submit되지 않도록함
    if (text.trim().length === 0) {
      return;
    }
    navigate(`/videos/${text}`);
  };
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  return (
    <form className='m-auto flex items-center' onSubmit={handleSubmit}>
      <input
        className='md:w-96 lg:w-96 h-8 text-m px-3 py-0.5 border border-slate-300 rounded-l-full shadow-sm focus:outline-none'
        type='text'
        placeholder='검색'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className='h-8 px-3 py-0.5 border border-slate-300 rounded-r-full shadow-sm' type='submit'>
        <FaSearch className='text-xl' />
      </button>
    </form>
  );
}
