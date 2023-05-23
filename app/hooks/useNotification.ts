import { useToast } from "@chakra-ui/react"

export const useNotification = () => {
    const toast = useToast()
    const showToast = ({text, type}: {text: string, type: 'success' | 'info'}) => toast({
        title: text,
        status: type,
        duration: 1000,
        isClosable: false,
      })

      return {showToast}
}