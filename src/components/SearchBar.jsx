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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='검색'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type='submit'>
        <FaSearch />
      </button>
    </form>
  );
}
