import React, { useState } from 'react';
import ChannelInfo from './ChannelInfo';
import { useQuery } from '@tanstack/react-query';
import Youtube from '../api/youtube';

export default function VideoBelow({ id }) {
  const [isExpanded, setIsExpended] = useState(false);
  const handleExpand = () => {
    setIsExpended((prev) => !prev);
  };
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(
    ['video', id],
    () => {
      const youtube = new Youtube();
      return youtube.videoDetail(id);
    },
    { staleTime: 1000 * 60 * 3 }
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  const { title, channelId, description, publishedAt } = video.snippet;
  return (
    <section className='flex flex-col'>
      <div>
        <h2 className='font-bold text-2xl my-3'>{title}</h2>
        <ChannelInfo id={channelId} />
      </div>
      <div className='text-sm p-3 mt-3 rounded-lg bg-gray-200 dark:text-black'>
        <span className='font-bold mr-2'>조회수 {formatNumber(video.statistics.viewCount)}회</span>
        <span className='font-bold'>{formatDate(publishedAt)}</span>
        {isExpanded ? (
          <>
            <pre className='whitespace-pre-line'>{description}</pre>
            <button onClick={handleExpand}>간략히</button>
          </>
        ) : (
          <>
            <pre className='whitespace-pre-line'>{description.substring(0, 50)}</pre>
            <button onClick={handleExpand}>...더보기</button>
          </>
        )}
      </div>
    </section>
  );
}

function formatNumber(number) {
  return parseInt(number, 10).toLocaleString();
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options);
}
