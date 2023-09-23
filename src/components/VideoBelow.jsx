import React, { useState } from 'react';

export default function VideoBelow({ video }) {
  const [isExpanded, setIsExpended] = useState(false);
  const handleExpand = () => {
    setIsExpended((prev) => !prev);
  };
  return (
    <div>
      <h2>{video.snippet.title}</h2>
      <div>
        <span>조회수 {formatNumber(video.statistics.viewCount)}회</span>
        <span>{formatDate(video.snippet.publishedAt)}</span>
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
