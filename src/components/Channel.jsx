import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { youtubeKey } from '../api_key';

export default function Channel({ id }) {
  // 채널 정보 가져오기
  const { data: channel } = useQuery(
    ['channel', id],
    async () => {
      return fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${youtubeKey}`
      )
        .then((res) => res.json())
        .then((data) => data.items);
    },
    { staleTime: 1000 * 60 * 3 }
  );
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
