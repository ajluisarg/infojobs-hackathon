'use client'

import { HamburgerIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { IconSwipe, IconBookmark } from '@tabler/icons-react'

export const AppMenu = () => {
  const router = useRouter()

  const handleOnGoToSavedOffers = () => router.push('/savedOffers')
  const handleOnGoToSwipe = () => router.push('/')

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<IconSwipe size={18} />} onClick={handleOnGoToSwipe}>
          Swipe!
        </MenuItem>
        <MenuItem
          icon={<IconBookmark size={18} />}
          onClick={handleOnGoToSavedOffers}
        >
          Guardadas
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
