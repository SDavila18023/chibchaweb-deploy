import { useState } from "react"

const useStorage = (key, value = null) => {
    const [storage, setStorage] = useState(() => {
        const getItem = localStorage.getItem(key)
        if(!getItem) {
            if(value) {
                localStorage.setItem(key, JSON.stringify(value))
            } else {
                localStorage.setItem(key, value)
            }
            return value
        }
        return JSON.parse(getItem)
    })

    const updateStorage = (value) => {
        setStorage(value)
        localStorage.setItem(key, JSON.stringify(value))
    }

    const removeStorage = (key) => {
        setStorage(null)
        localStorage.removeItem(key)
    }

    return [storage, updateStorage, removeStorage]
}

export { useStorage }