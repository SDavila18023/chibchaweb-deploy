import { useState } from "react"

const useToggle = (initial = false) => {
    const [isActive, setIsActive] = useState(initial)

    const handleToggle = () => {
        setIsActive(!isActive)
    }
    
    return [isActive, handleToggle]
}

export { useToggle }