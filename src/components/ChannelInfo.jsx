import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Youtube from '../api/youtube';

export default function ChannelInfo({ id }) {
  const { data: channel } = useQuery(
    ['channel', id],
    () => {
      const youtube = new Youtube();
      return youtube.channelInfo(id);
    },
    { staleTime: 1000 * 60 * 3 }
  );
  const { title, thumbnails } = channel.snippet;
  return (
    <>
      <div className='flex items-center' key={id}>
        <img className='avatar-size rounded-full' src={thumbnails.medium.url} alt='channel thumbnail' />
        <div className='flex flex-col ml-2 text-sm'>
          <span>{title}</span>
          <span>{formatSubscriber(channel.statistics.subscriberCount)}</span>
        </div>
      </div>
    </>
  );
}

function formatSubscriber(subscriberString) {
  const subscriber = parseInt(subscriberString, 10);
  if (subscriber < 1000) {
    return subscriber.toString();
  } else if (subscriber < 10000) {
    return (subscriber / 1000).toFixed(1).replace('.0', '') + '천';
  } else {
    return (subscriber / 10000).toFixed(1).replace('.0', '') + '만';
  }
}
