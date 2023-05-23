'use client'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { IconBusinessplan } from '@tabler/icons-react'
import { OfferExtended } from '../services/types'
import { summarize } from '../utils'

type Props = {
  offer: OfferExtended
  actions: React.ReactNode
}

export const Offer = ({ offer, actions }: Props) => {
  const { detail } = offer

  const moreInfo: ReadonlyArray<{ label: string; value?: string | number }> = [
    {
      label: 'Contrato',
      value: detail.contractType.value,
    },
    {
      label: 'Empleados',
      value: detail.profile.numberWorkers,
    },
    {
      label: 'Aplicaciones',
      value: detail.applications,
    },
    {
      label: 'Modalidad',
      value: offer.teleworking?.value,
    },
  ]

  return (
    <>
      <Card className="w-[340px]">
        <CardHeader>
          <div className="flex flex-col items-center">
            <Flex>
              {detail.profile.logoUrl && (
                <Avatar mr={3} src={detail.profile.logoUrl} />
              )}
              <Box>
                <Text fontWeight="bold">{summarize(offer.title, 50)}</Text>
                <Badge fontSize={10} colorScheme="green">
                  {detail.subcategory.value}
                </Badge>
              </Box>
            </Flex>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2 overflow-hidden">
              {offer.cityImage && (
                <Image
                  src={offer.cityImage}
                  alt="Offer city image"
                  borderRadius="lg"
                />
              )}
              <div className="flex flex-wrap justify-between">
                <Badge className="flex max-w-fit">{detail.profile.name}</Badge>
                <Badge className="flex max-w-fit">
                  {offer.city} ({offer.province.value}){' '}
                </Badge>
              </div>
              <Stack>
                <Text fontSize={12} fontWeight="bold">
                  Habilidades:
                </Text>
                <div className="flex flex-wrap gap-2">
                  {detail.skillsList.slice(0, 4).map(({ skill }) => (
                    <Tag fontSize={10} key={skill} colorScheme="orange">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Stack>
              <Stack>
                <Text fontSize={12} fontWeight="bold">
                  Otra información:
                </Text>
                <div className="flex gap-2 flex-wrap">
                  {moreInfo
                    .filter(({ value }) => Boolean(value))
                    .map(({ label, value }) => (
                      <Tag fontSize={10} key={label} colorScheme="blue">
                        {summarize(`${label}: ${value}`, 30)}
                      </Tag>
                    ))}
                </div>
              </Stack>
              {(offer.salaryMin.value || offer.salaryMax.value) && (
                <div className="flex gap-4">
                  <Text fontSize={14} fontWeight="bold">
                    <IconBusinessplan size={15} />
                  </Text>
                  {offer.salaryMin.value && (
                    <Badge
                      className="flex items-center"
                      fontSize={10}
                      variant="outline"
                      colorScheme="gray"
                    >
                      {'> '}
                      {offer.salaryMin.value}
                    </Badge>
                  )}
                  {offer.salaryMax.value && (
                    <Badge
                      className="flex items-center"
                      fontSize={10}
                      variant="outline"
                      colorScheme="green"
                    >
                      {'< '}
                      {offer.salaryMax.value}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            {actions}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
