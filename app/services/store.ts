export const OFFERS_KEY = 'offers'

export const storeData = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
}

export const getData = <T>(key: string): T | undefined => {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) ?? '')
    )
  } else return {} as T
}
