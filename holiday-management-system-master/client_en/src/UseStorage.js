import React from "react"

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || defaultValue
  )

  React.useEffect(() => {
    localStorage.setItem(key, value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return [value, setValue]
}

const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(
    sessionStorage.getItem(key) || defaultValue
  )

  React.useEffect(() => {
    sessionStorage.setItem(key, value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return [value, setValue]
}

export { useLocalStorage, useSessionStorage }
