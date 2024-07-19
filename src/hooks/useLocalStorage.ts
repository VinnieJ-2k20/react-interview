export const useLocalStorage = <T>() => {
  const storeItem = (key: string, item: T) => {
    localStorage.setItem(key, JSON.stringify(item));
  }

  const getItem = (key: string): T => {
    return JSON.parse(localStorage.getItem(key));
  }

  return {
    storeItem,
    getItem,
  }
}