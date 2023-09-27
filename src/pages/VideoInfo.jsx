import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';
import Populars from '../components/Populars';
import YouTube from 'react-youtube';

export default function VideoInfo() {
  const {
    state: { video },
  } = useLocation();
  return (
    <main className='dark:bg-gray-700 dark:text-white flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
      <div className='flex flex-col w-full'>
        <div className='relative pt-[56.25%]'>
          <YouTube iframeClassName={'absolute w-full h-full top-0 left-0 rounded-md'} videoId={video.id} />
        </div>
        <section key={video.id}>
          <VideoBelow id={video.id} />
        </section>
      </div>
      <aside className='w-full sm:w-full md:w-full lg:w-1/4'>
        <Populars />
      </aside>
    </main>
  );
}
