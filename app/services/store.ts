export const OFFERS_KEY = 'offers'

export const storeData = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data))

export const getData = (key: string) =>
  localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) ?? '')
