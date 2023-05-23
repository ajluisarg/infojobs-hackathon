import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { OfferExtended } from '../services/types'
import { Offer } from './Offer'

type Props = {
  offer: OfferExtended
}
export const SwipeOffer = ({ offer }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Offer
        offer={offer}
        actions={
          <Button
            rightIcon={<InfoOutlineIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
          >
            <Text fontSize={12} fontWeight="bold">
              Más información
            </Text>
          </Button>
        }
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent className="w-[340px]">
          <ModalHeader>{offer.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="pb-5">
            <Stack spacing={3}>
              <Text>{offer.detail.description}</Text>
              <div>
                <Text fontWeight="bold">Sobre nosotros:</Text>
                <Text>{offer.detail.profile.description}</Text>
              </div>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
