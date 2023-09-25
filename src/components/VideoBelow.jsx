import React, { useState } from 'react';
import Channel from './Channel';

export default function VideoBelow({ video }) {
  const [isExpanded, setIsExpended] = useState(false);
  const handleExpand = () => {
    setIsExpended((prev) => !prev);
  };
  return (
    <div>
      <h2 className='font-bold text-2xl my-3'>{video.snippet.title}</h2>
      <Channel id={video.snippet.channelId} />
      <div className='text-sm p-3 mt-3 rounded-lg bg-gray-200 dark:text-black'>
        <span className='font-bold mr-2'>조회수 {formatNumber(video.statistics.viewCount)}회</span>
        <span className='font-bold'>{formatDate(video.snippet.publishedAt)}</span>
        {isExpanded ? (
          <>
            <div>{video.snippet.description}</div>
            <button onClick={handleExpand}>간략히</button>
          </>
        ) : (
          <>
            <div>{video.snippet.description.substring(0, 50)}</div>
            <button onClick={handleExpand}>...더보기</button>
          </>
        )}
      </div>
    </div>
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
