import axios from 'axios';

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelDetail(id) {
    return this.httpClient
      .get('channels', {
        params: {
          part: 'snippet,statistics',
          id,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get('search', {
        params: {
          part: 'snippet,statistics',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => res.data.items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.httpClient
      .get('videos', {
        params: {
          part: 'snippet,statistics',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      })
      .then((res) => res.data.items);
  }
}
