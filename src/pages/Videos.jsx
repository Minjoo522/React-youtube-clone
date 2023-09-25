import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';
import Youtube from '../api/youtube';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', keyword],
    () => {
      const youtube = new Youtube();
      return youtube.search(keyword);
    },
    { staleTime: 1000 * 60 * 3 }
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul className='dark:bg-gray-700 dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {videos.map((video) => (
        <VideoCard key={video.id} id={video.id} video={video.snippet} />
      ))}
    </ul>
  );
}
