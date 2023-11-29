import { useState } from "react"
import { SearchBar } from "../Custom/Search/SearchBar"


const DomainSearch = () => {
    const [query, setQuery] = useState("")

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <section className="w-full">
            <h2 className="text-blue-400 text-xl font-bold font-inika text-center">Bienvenidos al buscador de dominios</h2>
            <SearchBar query={query} onChange={handleChange} onSubmit={handleSubmit} placeholder="Busca tu dominio" />
        </section>
    )
}

export { DomainSearch }