import { useState, useEffect } from 'react'

type ValueSetter<T> = (value: T | ((prevValue: T) => T)) => void

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isRemove: boolean = false
): [T, ValueSetter<T>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    if (!value) {
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value, isRemove])

  return [value, setValue]
}

export default useLocalStorage

// for using local storage outside of react components

export function getLocalStorageValue<T>(key: string, initialValue: T): T {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : initialValue
}

export function setLocalStorageValue<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorageValue(key: string): void {
  localStorage.removeItem(key)
}
