/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { env } from '@/env'
import cryptoJs from 'crypto-js'

export function encrypt(data: string): string {
  return cryptoJs.AES.encrypt(data, env.ENCRYPTION_KEY).toString()
}

export function decrypt(encryptedData: string): string {
  const decrypted = cryptoJs.AES.decrypt(encryptedData, env.ENCRYPTION_KEY)
  return decrypted.toString(cryptoJs.enc.Utf8)
}
