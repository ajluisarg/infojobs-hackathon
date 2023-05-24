'use client'
import { SearchIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import { IconCategory, IconHome2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MotionContainer } from '../MotionContainer'
import { useNotification } from '../hooks'
import useFetch from '../hooks/useFetch'
import { DISCARTED_OFFERS_KEY, SAVED_OFFERS_KEY } from '../services/store'
import { Dictionary, OfferExtended } from '../services/types'
import { getArrayRandomItem, removeEmptyProps } from '../utils'
import { SwipeOffer } from './SwipeOffer'

type Side = 'left' | 'right'
type NotificationType = 'info' | 'success'

const sideToNotificationMap: Record<Side, { messages: ReadonlyArray<string>; type: NotificationType }> = {
  right: {
    messages: ['¡Bien hecho!', '¡Buena suerte!', '¡Así se hace!', '¡Genial!', '¡Esta es la tuya!'],
    type: 'success',
  },
  left: {
    messages: ['Otra vez será', 'Sigue jugando', '¡A por la siguiente'],
    type: 'info',
  },
}

const Filter = ({
  value,
  dictionary,
  placeholder,
  icon,
  onChange,
}: {
  value: string
  dictionary: 'categories' | 'provinces'
  placeholder: string
  icon: React.ReactElement
  onChange: React.ComponentProps<typeof Select>['onChange']
}) => {
  const { data, error } = useFetch<Dictionary>(`/api/${dictionary}`, {
    cache: 'force-cache',
  })

  return data && !error ? (
    <Select value={value} icon={icon} variant="outline" placeholder={placeholder} onChange={onChange}>
      {data?.length > 0 &&
        data.slice(1).map(({ value, id, key }) => (
          <option key={id} value={key}>
            {value}
          </option>
        ))}
    </Select>
  ) : null
}

type Filters = { category: string; province: string }

const OfferFilters = ({ onSubmit }: { onSubmit: (form: Filters) => void }) => {
  const { handleSubmit, control } = useForm<Filters>()

  const filters: ReadonlyArray<{ name: keyof Filters } & Pick<React.ComponentProps<typeof Filter>, 'dictionary' | 'placeholder' | 'icon'>> = [
    {
      name: 'category',
      dictionary: 'categories',
      placeholder: 'Categoría',
      icon: <IconCategory />,
    },
    {
      name: 'province',
      dictionary: 'provinces',
      placeholder: 'Provincia',
      icon: <IconHome2 />,
    },
  ]

  return (
    <Popover>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <IconButton size="md" icon={<SearchIcon />} aria-label={''} />
          </PopoverTrigger>
          {isOpen && (
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filtra las ofertas</PopoverHeader>
              <PopoverBody>
                <form onChange={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    {filters.map(({ name, dictionary, placeholder, icon }) => (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field }) => <Filter dictionary={dictionary} placeholder={placeholder} icon={icon} {...field} />}
                      />
                    ))}
                  </Stack>
                </form>
              </PopoverBody>
            </PopoverContent>
          )}
        </>
      )}
    </Popover>
  )
}

export const OfferList = () => {
  const [filters, setFilters] = useState<Filters>()
  const [index, setIndex] = useState(0)
  const [page, setPage] = useState(1)
  const [savedOffers] = useLocalStorage<ReadonlyArray<OfferExtended>>(SAVED_OFFERS_KEY)
  const [discartedOffers] = useLocalStorage<ReadonlyArray<OfferExtended>>(DISCARTED_OFFERS_KEY)
  const { data: offers, error } = useFetch<ReadonlyArray<OfferExtended>>(
    `/api/offers?${new URLSearchParams(removeEmptyProps({ ...filters, page: page.toString() })).toString()}`
  )

  useEffect(() => {
    setPage(1)
    setIndex(0)
  }, [filters])

  const isLastOffer = !offers?.[index + 1]

  const fetchPage = () => {
    setPage((prevPage) => prevPage + 1)
    setIndex(0)
  }

  const { showToast } = useNotification()

  const currentOffer = offers?.[index]
  const handleOnSwipe = (side: Side) => {
    setIndex((prevIndex) => prevIndex + 1)

    showToast({
      text: getArrayRandomItem(sideToNotificationMap[side].messages),
      type: sideToNotificationMap[side].type,
    })
    if (!currentOffer) return
    if (isLastOffer) fetchPage()

    if (side === 'right') {
      writeStorage(SAVED_OFFERS_KEY, [...(savedOffers ?? []), currentOffer])
    } else {
      writeStorage(DISCARTED_OFFERS_KEY, [...(discartedOffers ?? []), currentOffer])
    }
  }

  if (currentOffer?.id && discartedOffers?.map(({ id }) => id).includes(currentOffer.id)) {
    setIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <div className="relative">
      {!offers ||
        (error && (
          <div className="h-screen w-screen flex items-center justify-center bg-[#5ca4cd]">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </div>
        ))}
      <MotionContainer onSwipe={handleOnSwipe}>{offers?.[index] && <SwipeOffer offer={offers[index]} />}</MotionContainer>
      <div className="absolute top-1 right-5">
        <OfferFilters onSubmit={setFilters} />
      </div>
    </div>
  )
}
