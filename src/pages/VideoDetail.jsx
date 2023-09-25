import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';
import Populars from '../components/Populars';
import YouTube from 'react-youtube';
import { youtubeKey } from '../api_key';
import axios from 'axios';

export default function VideoDetail() {
  const { videoId } = useParams();
  // 영상 정보 가져오기
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(
    ['video', videoId],
    async () => {
      return axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${youtubeKey}`
        )
        .then((res) => res.data.items);
    },
    { staleTime: 1000 * 60 * 3 }
  );
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <main className='dark:bg-gray-700 dark:text-white flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
      <div className='flex flex-col w-full'>
        <div className='relative pt-[56.25%]'>
          <YouTube iframeClassName={'absolute w-full h-full top-0 left-0 rounded-md'} videoId={videoId} />
        </div>
        {video &&
          video.map((v) => (
            <section key={v.id}>
              <VideoBelow video={v} />
            </section>
          ))}
      </div>
      <aside className='w-full sm:w-full md:w-full lg:w-1/4'>
        <Populars />
      </aside>
    </main>
  );
}
