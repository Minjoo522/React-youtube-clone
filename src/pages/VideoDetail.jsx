import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';

export default function VideoDetail() {
  const { videoId } = useParams();
  // 영상 정보 가져오기
  const {
    isLoading,
    error,
    data: video,
  } = useQuery(['video'], async () => {
    return fetch(`/data/video_desc.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  // 채널 정보 가져오기
  const { data: channel } = useQuery(['channel'], async () => {
    return fetch(`/data/channel_desc.json`)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <>
      <iframe
        title={videoId}
        id='player'
        type='text/html'
        width='640'
        height='390'
        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://meek-pothos-722a56.netlify.app/`}></iframe>
      {channel &&
        channel.map((c) => (
          <div key={c.id}>
            <img src={c.snippet.thumbnails.medium.url} alt='channel thumbnail' />
            <span>{c.snippet.title}</span>
            <span>{formatSubscriber(c.statistics.subscriberCount)}</span>
          </div>
        ))}
      {video && video.map((v) => <VideoBelow key={v.id} video={v} />)}
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
