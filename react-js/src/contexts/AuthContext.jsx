import { createContext } from "react"
import { useStorage } from "../hooks/useStorage"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useStorage("authentication")

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }