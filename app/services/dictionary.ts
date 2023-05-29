import { Dictionary } from './types'

const INFOJOBS_CLIENT_ID = process.env.INFOJOBS_CLIENT_ID
const INFOJOBS_CLIENT_SECRET = process.env.INFOJOBS_CLIENT_SECRET

export const getCategories = async () => {
  const res = await fetch('https://api.infojobs.net/api/1/dictionary/category', {
    headers: {
      Authorization: `Basic ${Buffer.from(INFOJOBS_CLIENT_ID + ':' + INFOJOBS_CLIENT_SECRET).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()) as ReadonlyArray<Dictionary>
}
export const getProvinces = async () => {
  const res = await fetch('https://api.infojobs.net/api/1/dictionary/province?parent=17', {
    headers: {
      Authorization: `Basic ${Buffer.from(INFOJOBS_CLIENT_ID + ':' + INFOJOBS_CLIENT_SECRET).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()) as ReadonlyArray<Dictionary>
}
