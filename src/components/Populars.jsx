import { useQuery } from '@tanstack/react-query';
import React from 'react';
import VideoCard from './VideoCard';

export default function Populars() {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos'], async () => {
    console.log('fetching...');
    return fetch(`/data/popular.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul>
      {videos.map((video) => (
        <VideoCard key={video.id} id={video.id} video={video.snippet} />
      ))}
    </ul>
  );
}
