import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';
import { youtubeKey } from '../api_key';
import axios from 'axios';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', keyword],
    async () => {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=`;
      const popularUrl =
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=KR&key=';
      return axios.get(`${keyword ? searchUrl : popularUrl}${youtubeKey}`).then((res) => res.data.items);
    },
    { staleTime: 1000 * 60 * 3 }
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul className='dark:bg-gray-700 dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
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
