import { useQuery } from '@tanstack/react-query';
import React from 'react';
import VideoCard from './VideoCard';
import { youtubeKey } from '../api_key';
import axios from 'axios';

export default function Populars() {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos'],
    async () => {
      console.log('fetching...');
      return axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=KR&key=${youtubeKey}`
        )
        .then((res) => res.data.items);
    },
    { staleTime: 1000 * 60 * 3 }
  );
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
