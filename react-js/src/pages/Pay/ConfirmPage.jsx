import { useStorage } from "../../hooks/useStorage.js";
import { Image } from "../../components/Custom/Loading/Image.jsx"
import { WrappedWidth } from "../../components/Custom/WrappedWidth.jsx"
import { Button } from "../../components/Custom/Button.jsx"
import {Link, Navigate, useNavigate, useParams} from "react-router-dom"
import { PlanCard } from "../../components/Plans/PlanCard.jsx"
import {listPlans, planBasic} from "../../utils/data.js"
import cartIcon from "../../assets/icons/actions.svg"
import mastercard from "../../assets/icons/group.svg"
import axios from "axios";


const ConfirmPage = () => {
    const { id } = useParams()
    const [storage] = useStorage("payInformation")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const pay = JSON.parse(localStorage.getItem("plan"))
    const plan = listPlans.find(item => item.id === id)
    const navigate = useNavigate()
    console.log(id, plan)

    const handlePay = async (e) => {
        e.preventDefault();
        const { name, price, number, cvc } = storage
        const newData = {
            ...storage,
            id_usuario: userInfo[0].id_usuario,
            id_paquete: pay
        };
        try
        {
            const { data } = await axios.post("http://localhost:4000/api/pay", {
                newData
            });
            navigate("/account");
        } catch (error) {
            console.log("Error", error)
        }

    }


    if(!storage)
        return <Navigate to="/pay" />

    return (
        <WrappedWidth size={10}>
            <h2 className="text-blue-400 text-xl font-bold font-inika sm:text-2xl lg:text-3xl">Finalizar compra</h2>
            <section className="w-full mt-10 py-6 px-4 relative border-2 border-blue-400 rounded-xl">
                <div className="w-full flex p-3 items-centerr justify-between rounded-xl absolute top-0 left-0 -translate-y-1/2 bg-yellow-300">
                    <figure className="flex items-center gap-x-2">
                        <Image src={cartIcon} alt="icon" />
                        <figcaption>Total compra</figcaption>
                    </figure>
                    <p>{storage?.price}</p>
                </div>
                <h2 className="mt-4 mb-6 text-blue-500 text-2xl font-inika text-center">Detalle de tu compra</h2>
                <PlanCard plan={plan} isAvailable={false} />
            </section>
            <div className="w-full max-w-xs mx-auto mt-10 grid gap-y-3">
                <Button className="w-full" size="md" color="yellow-400" onClick={handlePay}>
                    <Link className="w-full h-full grid place-content-center">Pagar</Link>
                </Button>
                <Button className="w-full" size="md" color="transparent">
                    <Link className="w-full h-full grid place-content-center" to="/pay">Volver</Link>
                </Button>
            </div>
        </WrappedWidth>
    )
}

export { ConfirmPage }