const url = 'https://bing-image-search1.p.rapidapi.com/images/search?'
const options = {
  headers: {
    'X-RapidAPI-Key': '19e2b2e38bmsh0be9fe1e73f4c46p132fc7jsneb01ccdea2d7',
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
