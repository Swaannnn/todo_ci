import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type ProviderProps = {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => (
    <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

export default Provider
