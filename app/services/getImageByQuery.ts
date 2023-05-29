const SECRET_KEY = process.env.RAPIDAPI_KEY ?? ''

const url = 'https://bing-image-search1.p.rapidapi.com/images/search?'
const options = {
  headers: {
    'X-RapidAPI-Key': SECRET_KEY,
    'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
}

export const getImageByQuery = async (query: string) => {
  try {
    const response = await fetch(
      url +
        new URLSearchParams({
          q: query,
        }),
      options
    )
    const result = await response.json()
    return result
  } catch {}
}
