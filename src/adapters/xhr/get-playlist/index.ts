import axios from '@adapters/xhr/axios'

const getPlayList = async (): Promise<any> => {
  const { data } = await axios.get(`/video/get-playlist`)
  return data
}

export { getPlayList }
