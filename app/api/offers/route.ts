import { getOffer } from '@/app/services/offers'
import { NextResponse } from 'next/server'
import { getImageByQuery, getOffers } from '../../services'
import { normalizeString } from '@/app/utils'

const getCityImage = async (city: string): Promise<string> => {
  const frequentCityToImages: Record<string, string | undefined> = {
    zaragoza: 'https://tse3.mm.bing.net/th?id=OIP.00Y3yxa-FG-98XOR_bcY_wHaFM&pid=Api',
    barcelona: 'https://tse1.mm.bing.net/th?id=OIP.8BnJJdDWHsmLH9fEjgRRMwHaE2&pid=Api',
    madrid: 'https://tse3.mm.bing.net/th?id=OIP.xh2nK3gWxr40rJp_GhTy4QHaE8&pid=Api',
    alava: 'https://tse4.mm.bing.net/th?id=OIP.yli2WAaz5ndh89nTbQPLqgHaE7&pid=Api',
    valencia: 'https://tse3.mm.bing.net/th?id=OIP.iVLXBkfz3yqMwSmm28ID0gHaE8&pid=Api',
    sabadel: 'https://tse4.mm.bing.net/th?id=OIP.Qxl5KSaNn98z0OHY6y6RRwEsC0&pid=Api',
    cadiz: 'https://tse4.mm.bing.net/th?id=OIP.o28f8aWRF8wkbuaomIwMhwHaE8&pid=Api',
    santander: 'https://tse1.mm.bing.net/th?id=OIP.EFDlzaxFwgI6imPqNYgcvwHaEN&pid=Api',
    bilbao: 'https://tse1.mm.bing.net/th?id=OIP.qoXQPm_DFROplBv19YVwUQHaEz&pid=Api',
    caceres: 'https://tse2.mm.bing.net/th?id=OIP.H7vDleoFUiZrVmM6aftapgHaE7&pid=Api',
    'palma de mallorca': 'https://tse2.mm.bing.net/th?id=OIP.jZBedwIpy5T1-FVX43fSRAHaE7&pid=Api',
    sada: 'https://tse1.mm.bing.net/th?id=OIP.DwK6yJXb3SVy45WmLj9ZUgHaFS&pid=Api',
  }

  return (
    frequentCityToImages[normalizeString(city)] ??
    (await getImageByQuery(city))?.value?.contentUrl ??
    frequentCityToImages[Object.keys(frequentCityToImages)[(Math.random() * Object.keys(frequentCityToImages).length) | 0]]
  )
}

export async function GET(req: Request) {
  const { search } = new URL(req.url)

  const baseOffers = (await getOffers(search)) ?? []

  const offers = await Promise.all(
    baseOffers.map(async (offer) => {
      const offerDetail = await getOffer(offer.id)
      const cityImage = await getCityImage(offer.city)
      return {
        ...offer,
        detail: offerDetail,
        cityImage,
      }
    })
  )

  return NextResponse.json(offers)
}
