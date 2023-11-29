import { Link } from "react-router-dom"
import { Button } from "../components/Custom/Button"

const NotFoundPage = () => {

    return (
        <section className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">Página no encontrada</h1>
                <Button className="max-w-sm mt-4" size="base" color="blue-400">
                    <Link className="w-full h-full grid place-content-center" to="/">Home</Link>
                </Button>
            </div>
        </section>
    )
}

export { NotFoundPage }