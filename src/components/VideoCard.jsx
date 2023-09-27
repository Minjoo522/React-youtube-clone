import React from 'react';
import ChannelInfo from './ChannelInfo';
import formatDate from '../util/formatDate';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video }) {
  const { title, thumbnails, channelId, publishedAt } = video.snippet;
  const navigate = useNavigate();
  return (
    <li
      className='hover:cursor-pointer'
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video } });
      }}>
      <img src={thumbnails.medium.url} alt='video thumbnail' className='w-full rounded-md' />
      <div>
        <h3 className='font-bold line-clamp-2' dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <ChannelInfo id={channelId} />
      <span className='text-xs opacity-80'>{formatDate(publishedAt)}</span>
    </li>
  );
}
