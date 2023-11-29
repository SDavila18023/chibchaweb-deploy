import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"


const AppLayout = () => {
    return (
        <div className="h-full min-h-screen flex flex-col">
            <Header />
            <Outlet />
        </div>
    )
}

export { AppLayout }