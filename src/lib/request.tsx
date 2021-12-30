type RequestOptions = {
  headers: any
  method: string // TODO: How to specify "GET" | "POST" | etc?
  query?: Record<string, unknown>
  url: string
}

export const request = async (req: RequestOptions) => {
  const { headers = {}, method, query = {}, url } = req

  const queryString = Object.keys(query)
    .map((key) => {
      return `${key}=${query[key]}`
    })
    .join('&')

  let finalUrl = url
  if (queryString) {
    finalUrl = `${url}?${queryString}`
  }

  const options = {
    headers: {
      ...headers,
      'User-Agent': 'V4V-Wallet-Browser-Extension'
    },
    method
  }

  const response = await fetch(finalUrl, options)
  const data = await response.json()
  return data
}
