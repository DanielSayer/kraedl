import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type UseSessionStorageProps<T> = {
  key: string
  defaultValue: T
}

export const useSessionStorage = <T>({
  key,
  defaultValue,
}: UseSessionStorageProps<T>): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = window.sessionStorage.getItem(key)
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : defaultValue
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
