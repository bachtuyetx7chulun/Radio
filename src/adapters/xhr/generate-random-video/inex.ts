import axios from '@adapters/xhr/axios'

const getRandomVideos = async (): Promise<any> => {
  const { data } = await axios.get(`/action/generate-videos`)
  return data
}

export { getRandomVideos }
