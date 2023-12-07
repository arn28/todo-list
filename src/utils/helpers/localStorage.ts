export const getLocalStorageItem = (key: string) =>
  localStorage.getItem(key) || ''
export const setLocalStorageItem = (key: string, value: string) =>
  localStorage.setItem(key, value)
