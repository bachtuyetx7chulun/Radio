import { Request } from 'express'

const getIp = (req: Request) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

export { getIp }
