import { useState } from "react"

const useFormInput = (initial = {}) => {
    const [formData, setFormData] = useState(initial)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return [formData, handleChange, setFormData]
}

export { useFormInput }