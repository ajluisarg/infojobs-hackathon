'use client'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, Link } from '@chakra-ui/react'
import { IconTrash } from '@tabler/icons-react'
import { OfferExtended } from '../services/types'
import { Offer } from './Offer'

type Props = {
  offer: OfferExtended
}

export const SavedOffer = ({ offer }: Props) => {
  return (
    <Offer
      offer={offer}
      actions={
        <div className="flex justify-between items-center mt-2">
          <Link className="text-center" href={offer.link} isExternal>
            Ir a la oferta <ExternalLinkIcon mx="2px" />
          </Link>
          <Button colorScheme="blue" rightIcon={<IconTrash />}>
            Eliminar
          </Button>
        </div>
      }
    />
  )
}
