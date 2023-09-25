import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], async () => {
    console.log('fetching...');
    return fetch(`/data/${keyword ? 'search' : 'popular'}.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul>
      {videos.map((video) => (
        <VideoCard
          key={keyword ? video.id.videoId : video.id}
          id={keyword ? video.id.videoId : video.id}
          video={video.snippet}
        />
      ))}
    </ul>
  );
}
