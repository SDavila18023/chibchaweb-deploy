import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "../../components/Custom/Form/Form"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { Input } from "../../components/Custom/Form/Input"
import { Button } from "../../components/Custom/Button"
import { useAuth } from "../../hooks/useAuth"
import logo from "../../assets/images/logo.png"


const LoginPage = () => {
    const { setAuth } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/api/users/login", {
                email,
                password,
            });
            localStorage.setItem("userInfo", JSON.stringify(data.data))
            alert("Bienvenido!")
            setAuth(data.data[0])
            navigate("/account")
        }
        catch (error) {
            alert("Email o contraseña inválidos")
        }
    };

    return (
        <WrappedWidth size={10}>
            <img className="mb-6" src={logo} alt="logo image" />
            <Form onSubmit={handleSubmit}>
                <Input name="user" size="md" color="gray-300" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <Input type="password" name="password" size="md" color="gray-300" placeholder="Contraseña" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <Input className="mt-8 hover:cursor-pointer" type="submit" value="Iniciar sesion" size="md" color="white" />
            </Form>
            <Button className="w-full mt-3" size="md" color="red-400">
                <Link className="w-full h-full grid place-content-center" to="/register">Crear cuenta</Link>
            </Button>
        </WrappedWidth>
    )
}

export { LoginPage }