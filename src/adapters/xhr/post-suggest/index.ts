import axios from '@adapters/xhr/axios'
import { getPublicIp } from '@utils/helpers/ip.helpers'

const postVideo = async (payload: string[]): Promise<any> => {
  const ip = await getPublicIp()
  const { data } = await axios.post(
    `/action/send-suggest`,
    {
      video_ids: payload,
    },
    {
      headers: {
        ip,
      },
    }
  )

  return data
}

export { postVideo }
