import { getOffer } from '@/app/services/offers'
import { NextResponse } from 'next/server'
import { getImageByQuery, getOffers } from '../../services'

export async function GET(req: Request) {
  const { search } = new URL(req.url)

  const baseOffers = await getOffers(search)

  const offers = await Promise.all(
    baseOffers.map(async (offer) => {
      const cityImage = await getImageByQuery(offer.city)
      const offerDetail = await getOffer(offer.id)
      return {
        ...offer,
        detail: offerDetail,
        cityImage: cityImage?.value?.[0]?.thumbnailUrl,
      }
    })
  )

  return NextResponse.json(offers)
}
