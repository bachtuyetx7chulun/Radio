import publicIp from 'public-ip'

const getPublicIp = async (): Promise<string> => {
  return await publicIp.v4()
}

export { getPublicIp }
