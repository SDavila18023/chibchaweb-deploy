import { useLocation, useNavigate } from "react-router-dom"

const useNavigator = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const navigateTo = (to) => {
        navigate(to, {
            state: { from: location }
        })
    }
    return navigateTo
}

export { useNavigator }