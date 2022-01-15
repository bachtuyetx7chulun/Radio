import axios from '@adapters/xhr/axios'

const getTrendingVideos = async (): Promise<any> => {
  const { data } = await axios.get(`/action/trending-videos`)
  return data
}

export { getTrendingVideos }
