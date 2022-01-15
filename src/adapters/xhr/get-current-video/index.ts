import axios from '@adapters/xhr/axios'

const getCurrentVideo = async (): Promise<any> => {
  const { data } = await axios.get(`/action/current-video`)
  return data
}

const postCurrentVideo = async (videoId: string): Promise<any> => {
  const { data } = await axios.post(`/action/current-video`, { video_id: videoId })
  return data
}

export { getCurrentVideo, postCurrentVideo }
