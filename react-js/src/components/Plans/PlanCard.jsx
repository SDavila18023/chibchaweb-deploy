import {Link, useNavigate} from "react-router-dom"
import { merge } from "../../utils/merge"
import { Button } from "../Custom/Button"
import { PlanItemBenefits } from "./PlanItemBenefits"
import {Form} from "../Custom/Form/Form.jsx";
import {Input} from "../Custom/Form/Input.jsx";


const PlanCard = ({ className, plan, isAvailable = true }) => {
    const { title, subtitle, price, benefits, id } = plan
    const navigate=useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        localStorage.setItem("plan",id);
        navigate(`/pay/${id}`);
    }

    return (
        <article className={merge("group w-full py-6 pb-8 px-4 relative border rounded-md shadow-md shadow-yellow-100 sm:w-11/12 sm:mx-auto even:shadow-blue-100 hover:cursor-pointer sm:last:w-1/2 sm:last:col-span-2 base:last:w-11/12 base:last:col-span-1", className)}>
            <div className="font-inika text-center">
                <h3 className="text-blue-500 text-2xl font-bold">{title}</h3>
                <p className="text-gray-400 text-lg font-bold">{subtitle}</p>
                <p className="text-blue-500 text-xl font-bold">{price}</p>
            </div>
            <div className="mt-4 pt-6 flex items-center flex-col gap-y-4 border-t">
                {benefits.map(({ urlImage, title }, key) => (
                    <PlanItemBenefits key={key} urlImage={urlImage} title={title} />
                ))}
            </div>
            {isAvailable && (
                <Form onSubmit={submitHandler}>
                    <Input className="mt-8 hover:cursor-pointer" type="submit" value="Comprar" size="md" color="white"/>
                </Form>
            )}
        </article>
    )
}

export { PlanCard }