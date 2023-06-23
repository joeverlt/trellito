import jwt, { Secret } from 'jsonwebtoken'

interface Keys {
  [x: string]: any
}

export default class Tokenize {
  private static apiSecret: Secret = process.env.API_SECRET as Secret

  public static encode = (data: Keys, duration: string): string => {
    const payload: string = JSON.stringify(data)
    return jwt.sign(payload, Tokenize.apiSecret, { expiresIn: duration })
  }

  public static decode = (token: string): Keys => {
    return jwt.verify(token, Tokenize.apiSecret) as Keys
  }
}
