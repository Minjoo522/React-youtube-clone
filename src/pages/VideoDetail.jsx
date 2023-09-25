import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';
import Populars from '../components/Populars';
import YouTube from 'react-youtube';

export default function VideoDetail() {
  const { videoId } = useParams();
  // 영상 정보 가져오기
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(['video'], async () => {
    return fetch(`/data/video_desc.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <main className='flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
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
      <div className='w-1/4'>
        <Populars />
      </div>
    </main>
  );
}
