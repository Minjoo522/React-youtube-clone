import React from 'react';
import Channel from './Channel';
import formatDate from './formatDate';

export default function VideoCard({ id, video }) {
  return (
    <li>
      <a href={`/videos/watch/${id}`}>
        <img src={video.thumbnails.medium.url} alt='video thumbnail' />
      </a>
      <a href={`/videos/watch/${id}`}>
        <h3 dangerouslySetInnerHTML={{ __html: video.title }} />
      </a>
      <Channel id={video.channelId} />
      <span>{formatDate(video.publishedAt)}</span>
    </li>
  );
}
