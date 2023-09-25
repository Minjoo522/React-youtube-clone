import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Channel({ id }) {
  // 채널 정보 가져오기
  const { data: channel } = useQuery(['channel'], async () => {
    return fetch(`/data/channel_desc.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  return (
    <>
      {channel &&
        channel.map((c) => (
          <div className='flex items-center' key={c.id}>
            <img className='avatar-size rounded-full' src={c.snippet.thumbnails.medium.url} alt='channel thumbnail' />
            <div className='flex flex-col ml-2 text-sm'>
              <span>{c.snippet.title}</span>
              <span>{formatSubscriber(c.statistics.subscriberCount)}</span>
            </div>
          </div>
        ))}
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
