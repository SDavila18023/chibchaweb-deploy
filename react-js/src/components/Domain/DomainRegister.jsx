import { useState } from "react"
import {RegisterBar} from "../Custom/Search/RegisterBar.jsx";


const DomainRegister = () => {
    const [query, setQuery] = useState("")

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <section className="w-full">
            <h2 className="text-blue-400 text-xl font-bold font-inika text-center">Registra tu dominio</h2>
            <RegisterBar query={query} onChange={handleChange} onSubmit={handleSubmit} placeholder="Ingresa tu dominio" />
        </section>
    )
}

export { DomainRegister }