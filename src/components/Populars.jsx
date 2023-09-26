import { useQuery } from '@tanstack/react-query';
import React from 'react';
import VideoCard from './VideoCard';
import Youtube from '../api/youtube';

export default function Populars() {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos'],
    () => {
      const youtube = new Youtube();
      return youtube.search();
    },
    { staleTime: 1000 * 60 * 3 }
  );
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ul>
  );
}
