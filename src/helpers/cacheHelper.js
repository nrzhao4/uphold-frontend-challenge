export const shouldClearCache = (cacheInitTimestamp, cacheTimeLimitInMs) => {
  if (!cacheInitTimestamp) return false;
  const now = Date.now();
  if (now - cacheInitTimestamp >= cacheTimeLimitInMs) return true;
  return false;
};
