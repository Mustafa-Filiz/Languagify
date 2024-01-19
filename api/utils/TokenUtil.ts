import * as jwt from 'jsonwebtoken'
import { z } from 'zod'

const TokenSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

type TokenType = z.infer<typeof TokenSchema>

class TokenUtil {
  static create(
    payload: string | object | Buffer,
    options: jwt.SignOptions = { expiresIn: '7 days' }
  ) {
    const secret = process.env.JWT_SECRET!
    return jwt.sign(payload, secret, options)
  }

  static verify(token: string): TokenType {
    const secret = process.env.JWT_SECRET!
    return jwt.verify(token, secret) as TokenType
  }
}

export default TokenUtil
