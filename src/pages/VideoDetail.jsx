import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';
import Channel from '../components/Channel';
import Populars from '../components/Populars';

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
      {video &&
        video.map((v) => (
          <section key={v.id}>
            <Channel id={v.channelId} />
            <VideoBelow video={v} />
          </section>
        ))}
      <Populars />
    </>
  );
}
