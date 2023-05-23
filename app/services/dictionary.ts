import { Dictionary } from './types'

const apiClientId = process.env.INFOJOBS_CLIENT_ID
const apiClientSecret = process.env.INFOJOBS_CLIENT_SECRET

export const getCategories = async () => {
  const res = await fetch(
    'https://api.infojobs.net/api/1/dictionary/category',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          apiClientId + ':' + apiClientSecret
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return (await res.json()) as ReadonlyArray<Dictionary>
}
export const getProvinces = async () => {
  const res = await fetch(
    'https://api.infojobs.net/api/1/dictionary/province?parent=17',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          apiClientId + ':' + apiClientSecret
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return (await res.json()) as ReadonlyArray<Dictionary>
}
