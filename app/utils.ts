export const normalizeString = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const getArrayRandomItem = <T>(sourceArray: ReadonlyArray<T>): T =>
  sourceArray[Math.floor(Math.random() * sourceArray.length)]

export const summarize = (text: string, max = 70) =>
  `${text.substring(0, max)}${text.length > max ? '...' : ''}`

export const removeEmptyProps = <T extends object>(item: T): Partial<T> =>
  Object.entries(item)
    .filter(([, v]) => v !== null && v !== undefined)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
