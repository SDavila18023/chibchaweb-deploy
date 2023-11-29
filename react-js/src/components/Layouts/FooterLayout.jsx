import { Outlet } from "react-router-dom"
import { Footer } from "../Footer/Footer"

const FooterLayout = ({ hasFooter = true }) => {
    return (
        <>
            <main className="flex flex-grow">
                <Outlet />
            </main>
            { hasFooter && <Footer /> }
        </>
    )
}

export { FooterLayout }