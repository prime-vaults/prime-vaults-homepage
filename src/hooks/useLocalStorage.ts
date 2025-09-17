import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error('Error reading localStorage key:', key, error)
      return initialValue
    }
  })

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue ? JSON.parse(event.newValue) : initialValue)
      }
    }

    const handleCustomStorageEvent = () => {
      const storedValue = localStorage.getItem(key)
      setValue(storedValue ? JSON.parse(storedValue) : initialValue)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageUpdate', handleCustomStorageEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageUpdate', handleCustomStorageEvent)
    }
  }, [key, initialValue])

  const updateValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
    window.dispatchEvent(new Event('localStorageUpdate')) // Trigger event manually
  }

  return [value, updateValue] as const
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = sessionStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error('Error reading sessionStorage key:', key, error)
      return initialValue
    }
  })

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue ? JSON.parse(event.newValue) : initialValue)
      }
    }

    const handleCustomStorageEvent = () => {
      const storedValue = sessionStorage.getItem(key)
      setValue(storedValue ? JSON.parse(storedValue) : initialValue)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('sessionStorageUpdate', handleCustomStorageEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        'sessionStorageUpdate',
        handleCustomStorageEvent,
      )
    }
  }, [key, initialValue])

  const updateValue = (newValue: T) => {
    setValue(newValue)
    sessionStorage.setItem(key, JSON.stringify(newValue))
    window.dispatchEvent(new Event('sessionStorageUpdate')) // Trigger event manually
  }

  return [value, updateValue] as const
}
