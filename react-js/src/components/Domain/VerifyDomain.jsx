import { useState } from "react"
import { SearchBar } from "../Custom/Search/SearchBar"

const VerifyDomain = () => {
    const [query, setQuery] = useState("")

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <section className="mt-10">
            <h2 className="text-blue-500 text-xl font-inika text-center sm:text-start">Comprueba la disponibilidad de tu dominio en tiempo real.</h2>
            <SearchBar query={query} onChange={handleChange} onSubmit={handleSubmit} placeholder="Ingresa tu dominio" />
        </section>
    )
}

export { VerifyDomain }