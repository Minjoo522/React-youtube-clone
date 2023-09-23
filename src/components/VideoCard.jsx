import React from 'react';

export default function VideoCard({ id, video }) {
  return (
    <li>
      <a href={`/videos/watch/${id}`}>
        <img src={video.thumbnails.medium.url} alt='video thumbnail' />
      </a>
      <a href={`/videos/watch/${id}`}>
        <span>{video.title}</span>
      </a>
    </li>
  );
}
