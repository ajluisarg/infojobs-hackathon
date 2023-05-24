import { Offer, OfferDetail } from './types'

const apiClientId = process.env.INFOJOBS_CLIENT_ID
const apiClientSecret = process.env.INFOJOBS_CLIENT_SECRET

export const getOffers = async (search?: string) => {
  const res = await fetch(`https://api.infojobs.net/api/9/offer${search ? search : ''}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(apiClientId + ':' + apiClientSecret).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()).offers as ReadonlyArray<Offer>
}

export const getOffer = async (id: string) => {
  const res = await fetch(`https://api.infojobs.net/api/9/offer/${id}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(apiClientId + ':' + apiClientSecret).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()) as OfferDetail
}

export const createOfferApplication = async (id: string) => {
  const res = await fetch(`/offer/${id}/application`, {
    headers: {
      Authorization: `Basic ${Buffer.from(apiClientId + ':' + apiClientSecret).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()) as OfferDetail
}
