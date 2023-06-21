import jwt from 'jsonwebtoken'

type Keys = { [x: string]: any }

const apiSecret: string = process.env.API_SECRET as string

export default class Tokenize {
  public static encode = (data: Keys, duration: string): string => {
    let payload = JSON.stringify(data)
    payload = JSON.parse(payload)
    return jwt.sign(payload, apiSecret, { expiresIn: duration })
  }

  public static decode = (token: string): Keys => {
    return jwt.verify(token, apiSecret) as Keys
  }
}
