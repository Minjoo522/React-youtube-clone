import React from 'react';
import Channel from './Channel';
import formatDate from './formatDate';

export default function VideoCard({ id, video }) {
  return (
    <li>
      <a href={`/videos/watch/${id}`}>
        <img src={video.thumbnails.medium.url} alt='video thumbnail' className='w-full rounded-md' />
      </a>
      <div>
        <a href={`/videos/watch/${id}`}>
          <h3 className='font-bold line-clamp-2' dangerouslySetInnerHTML={{ __html: video.title }} />
        </a>
      </div>
      <Channel id={video.channelId} />
      <span className='text-xs text-slate-500'>{formatDate(video.publishedAt)}</span>
    </li>
  );
}
