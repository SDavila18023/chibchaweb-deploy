import { useState } from "react"
import { SearchBar } from "../Custom/Search/SearchBar"

const TicketsSearch = () => {
    const [query, setQuery] = useState("")

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <section className="w-full">
            <h2 className="text-blue-400 text-xl font-bold font-inika text-center">Bienvenidos al soporte de ChibchaWeb</h2>
            <SearchBar query={query} onChange={handleChange} placeholder="Buscar tu problema" />
        </section>
    )
}   

export { TicketsSearch }