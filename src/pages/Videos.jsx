import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  // const [keyword, setKeyword] = useState('');
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos'], async () => {
    console.log('fetching...');
    // let fetchUrl = !keyword ? 'popular_videos.json' : 'list_by_keyword.json'
    let fetchUrl = 'popular_videos.json';
    return fetch(`data/${fetchUrl}`).then((res) => res.json());
  });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;
  return (
    <ul>
      {videos.items.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ul>
  );
}
