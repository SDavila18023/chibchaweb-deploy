import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../Custom/Button"
import { homeAuthUser, homeLinks, homeAuthAdministrator, homeAuthCoordinator, homeAuthStaff } from "../../utils/data"
import { useAuth } from "../../hooks/useAuth"
import menuIcon from "../../assets/icons/menu.svg"
import closeMenu from "../../assets/icons/close.svg"


const Header = () => {
    const menuRef = useRef(null)
    const location = useLocation()
    const { auth, setAuth } = useAuth()
    const links = auth && auth.id_role === 5? homeAuthUser : auth && auth.id_role === 1 ? homeAuthAdministrator
        : auth && auth.id_role === 2 ? homeAuthCoordinator : auth && auth.id_role === 3? homeAuthStaff : auth && auth.id_role === 4 ? homeAuthUser :  homeLinks

    const handleToggleMenu = () => {
        menuRef.current.classList.toggle("translate-x-[calc(100%+8px)]")
    }

    const handleLogout = () => {
        setAuth(null)
    }

    useEffect(() => {
        menuRef.current.classList.add("translate-x-[calc(100%+8px)]")
    }, [location])


    return (
        <header className="shadow-header">
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between base:w-10/12 lg:max-w-screen-2xl">
                <h2 className="text-xl font-bold font-inika">
                    <Link to="/">ChibchaWeb</Link>
                </h2>
                <img className="w-6 h-6 hover:cursor-pointer" src={menuIcon} alt="menu icon" loading="lazy" draggable="false" onClick={handleToggleMenu} />
            </nav>
            <menu className="w-2/3 max-w-sm p-7 pr-[4.2%] absolute inset-y-0 right-0 z-50 transition-all duration-300 translate-x-[calc(100%+8px)] bg-red-400 base:pr-[8.3%]" ref={menuRef}>
                <img className="w-6 h-6 ml-auto hover:cursor-pointer" src={closeMenu} alt="close menu icon" loading="lazy" draggable="false" onClick={handleToggleMenu} />
                <div className="mt-10 grid gap-y-3">
                    {links.map(({ name, to }, key) => (
                        <Button size="md" color="white" key={key}>
                            <Link className="w-full h-full grid place-content-center" to={to}>{name}</Link>
                        </Button>
                    ))}
                    {auth && (
                        <Button size="md" color="white" onClick={handleLogout}>
                            <Link className="w-full h-full grid place-content-center" to="/">Cerrar Sesión</Link>
                        </Button>
                    )}
                </div>
            </menu>
        </header>
    )
}

export { Header }