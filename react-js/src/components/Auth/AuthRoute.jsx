import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const AuthRoute = ({ to = "/", role }) => {
    const { auth } = useAuth()
    const location = useLocation()
    const path = location.state?.from?.pathname ?? to
    const isFind = auth && Array.isArray(role) && role.some(value => value === auth.id_role)

    if (auth && auth.id_role === role || auth && isFind)
        return <Outlet />
    return <Navigate to={path} replace />
}

export { AuthRoute }