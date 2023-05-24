'use client'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Link } from '@chakra-ui/react'
import { IconTrash } from '@tabler/icons-react'
import { OfferExtended } from '../services/types'
import { Offer } from './Offer'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import { SAVED_OFFERS_KEY } from '../services/store'

type Props = {
  offer: OfferExtended
}

export const SavedOffer = ({ offer }: Props) => {
  const [savedOffers] = useLocalStorage<ReadonlyArray<OfferExtended>>(SAVED_OFFERS_KEY)

  const handleOnDeleteOffer = () => {
    writeStorage(
      SAVED_OFFERS_KEY,
      savedOffers?.filter(({ id }) => id !== offer.id)
    )
  }
  return (
    <Offer
      offer={offer}
      actions={
        <div className="flex justify-between items-center mt-2">
          <Link className="text-center" href={offer.link} isExternal>
            Ir a la oferta <ExternalLinkIcon mx="2px" />
          </Link>
          <Button colorScheme="blue" variant="outline" rightIcon={<IconTrash />} onClick={handleOnDeleteOffer}>
            Eliminar
          </Button>
        </div>
      }
    />
  )
}
