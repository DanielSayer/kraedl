import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type UseSessionStorageProps<T> = {
  key: string
  defaultValue: T
}

export const useSessionStorage = <T>({
  key,
  defaultValue,
}: UseSessionStorageProps<T>): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue)
  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === 'undefined') {
        return defaultValue
      }
      try {
        const item = window.sessionStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : defaultValue
      } catch (error) {
        console.error(error)
        return defaultValue
      }
    }

    setStoredValue(fromLocal)
    setFirstLoadDone(true)
  }, [defaultValue, key])

  useEffect(() => {
    if (!firstLoadDone) {
      return
    }

    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      console.log(error)
    }
  }, [storedValue, firstLoadDone, key])

  return [storedValue, setStoredValue]
}
