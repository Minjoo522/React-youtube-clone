import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function VideoCard({ video }) {
  const { id, snippet } = video;
  // 썸네일 가져오는 코드
  const {
    isLoading,
    error,
    data: channels,
  } = useQuery(['channel'], async () => {
    console.log('fetching...');
    let fetchUrl = 'channel_desc.json';
    return fetch(`data/${fetchUrl}`).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <li>
      <a href={`/videos/watch/${id}`}>
        <img src={snippet.thumbnails.maxres.url} alt='video thumbnail' />
      </a>
      <a href={`/videos/watch/${id}`}>
        {channels.items.map((item) => (
          <img key={item.id} src={item.snippet.thumbnails.default.url} alt='channel thumbnail' />
        ))}
      </a>
      <a href={`/videos/watch/${id}`}>{snippet.title}</a>
    </li>
  );
}
