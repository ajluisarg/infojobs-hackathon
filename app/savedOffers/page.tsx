'use client'
import { OfferExtended } from '../services/types'

type Props = {
  offer: OfferExtended
}

export default function SavedOffers() {
  // const offers: ReadonlyArray<Props['offer']> =
  //   getData<ReadonlyArray<OfferExtended>>(OFFERS_KEY) ?? []

  return (
    <main className="bg-[#5ca4cd] pt-10 min-h-screen">
      <h2 className="text-white font-bold text-4xl text-center	">
        Ofertas guardadas
      </h2>
      <div className="flex flex-wrap justify-center gap-10 p-10">
        {/* {offers.map((offer) => (
          <SavedOffer key={offer.id} offer={offer} />
        ))} */}
      </div>
    </main>
  )
}
