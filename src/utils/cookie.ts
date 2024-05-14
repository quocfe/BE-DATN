import { Response } from 'express'

export function setCookie(res: Response, key: string, value: string | object) {
  res.cookie(key, value, {
    httpOnly: true,
    secure: false,
    path: '/',
    sameSite: 'strict'
  })
}
