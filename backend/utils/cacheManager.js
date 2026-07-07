const memoryCache = {}

const ONE_HOUR = 60 * 60 * 1000

/**
 * Reusable cache helper
 * @param {string} key - Unique identifier for the data
 * @param {Function} fetchFunction - The async function that actually gets the data from TMDB
 */

export const getOrSetCache = async (key, fetchFunction) => {
  const now = Date.now()
  const cachedItem = memoryCache[key]

  //if cache exists and is not expired, return immideately
  if (cachedItem && now - cachedItem.lastFetched < ONE_HOUR) {
    return cachedItem.data
  }

  const freshData = await fetchFunction()

  // Save the fresh data to cache
  memoryCache[key] = {
    data: freshData,
    lastFetched: now,
  }

  return freshData
}
