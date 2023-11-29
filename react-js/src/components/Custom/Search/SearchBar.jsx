import { Form } from "../Form/Form"
import { Input } from "../Form/Input"
import { merge } from "../../../utils/merge"
import axios from "axios";
import {useState} from "react";


const SearchBar = ({ className ="", placeholder, query, onChange, onSubmit }) => {

    const [domain, setDomain] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()
        try
        {
            const { data } = await axios.post("http://localhost:4000/api/domain/checkDomain", {
                domain
            });
            alert(data.message)
        } catch (error) {
            console.log("Error", error)
        }

    }


    return (
        <Form className={merge("w-full mt-4 grid grid-cols-[1fr_0.5fr] gap-x-3", className)} onSubmit={handleSubmit}>
            <Input value={domain} size="sm" color="gray-300" placeholder={placeholder} onChange={(e)=>{setDomain(e.target.value)}}/>
            <Input className="" type="submit" value="Buscar" size="sm" color="white" />
        </Form>
    )
}

export { SearchBar }