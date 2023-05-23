// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { AppMenu } from './components/Menu'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
        <nav className="absolute top-0 left-0">
          <AppMenu />
        </nav>
      </ChakraProvider>
    </CacheProvider>
  )
}
