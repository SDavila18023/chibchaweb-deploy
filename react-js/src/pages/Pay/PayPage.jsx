import { useCallback } from "react"
import Cards from "react-credit-cards";
import { WrappedWidth } from "../../components/Custom/WrappedWidth.jsx"
import { PaymentForm } from "../../components/Pay/PaymentForm.jsx"
import { useFormInput } from "../../hooks/useFormInput.js"
import { PaymentPlan } from "../../components/Pay/PaymentPlan.jsx"
import { useStorage } from "../../hooks/useStorage.js";
import {useNavigate, useParams} from "react-router-dom";

const initialState = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    type: '',
    price: ''
}


const PayPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [storage, setStorage] = useStorage("payInformation", null)
    const [formData, handleChange] = useFormInput(initialState)


    const onChange = useCallback((event) => {
        handleChange(event)
    }, [handleChange])


    const handleSendPay = () => {
        setStorage(formData)
        navigate(`/confirm/${id}`)
    }


    return (
        <WrappedWidth className="mt-10 mb-14" size={10}>
            <div>
                <Cards
                    cvc={formData.cvc}
                    expiry={formData.expiry}
                    focused={formData.focus}
                    name={formData.name}
                    number={formData.number}
                    acceptedCards={['visa', 'mastercard', 'dinersclub']}
                />
            </div>
            <h2 className="text-blue-400 text-xl font-bold font-inika text-center sm:text-2xl lg:text-3xl">Tu Chibcha plan</h2>
            <PaymentPlan formData={formData} onChange={onChange} />
            <PaymentForm formData={formData} onChange={onChange} sendPay={handleSendPay} />
        </WrappedWidth>
    )
}

export { PayPage }