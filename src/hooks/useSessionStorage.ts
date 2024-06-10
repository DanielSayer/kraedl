import { useEffect, useState } from 'react'

type UseSessionStorageProps<T> = {
  key: string
  defaultValue: T
}

export const useSessionStorage = <T>({
  key,
  defaultValue,
}: UseSessionStorageProps<T>) => {
  const state = useState<T>(() => {
    const stored = sessionStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : defaultValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state[0]))
  }, [state, key])

  return state
}
