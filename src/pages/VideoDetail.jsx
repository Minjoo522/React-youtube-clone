import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoBelow from '../components/VideoBelow';
import Channel from '../components/Channel';
import Populars from '../components/Populars';
import YouTube from 'react-youtube';

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
      <YouTube videoId={videoId} />
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
