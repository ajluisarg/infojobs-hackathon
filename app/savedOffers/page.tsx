'use client'
import useLocalStorage from '@rehooks/local-storage'
import { SavedOffer } from '../components/SavedOffer'
import { SAVED_OFFERS_KEY } from '../services/store'
import { OfferExtended } from '../services/types'

export default function SavedOffers() {
  const [savedOffers] = useLocalStorage<ReadonlyArray<OfferExtended>>(SAVED_OFFERS_KEY)

  return (
    <main className="bg-[#5ca4cd] pt-10 min-h-screen">
      <h2 className="text-white font-bold text-4xl text-center	">Ofertas guardadas</h2>
      <div className="flex flex-wrap justify-center gap-10 p-10">
        {savedOffers?.length ? (
          (savedOffers ?? []).map((offer) => <SavedOffer key={offer.id} offer={offer} />)
        ) : (
          <p className=" text-white text-3xl">Vaya no tienes ninguna oferta guardada :(</p>
        )}
      </div>
    </main>
  )
}
