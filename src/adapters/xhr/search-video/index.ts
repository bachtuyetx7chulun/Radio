import axios from '@adapters/xhr/axios'

const searchVideo = async (query: string): Promise<any> => {
  const { data } = await axios.get(`/action/search-videos?q=${query}`)
  return data
}

export { searchVideo }
