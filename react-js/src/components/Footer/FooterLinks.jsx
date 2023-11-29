import { Link } from "react-router-dom"

const FooterLinks = ({ links }) => {

    return (
        <ul className="flex items-start flex-col gap-y-2">
            {links.map(({ name, to }, key) => (
                <li className="w-full first:mb-2 first:text-xl first:font-bold" key={key}>
                    <Link className="w-full h-full grid place-content-start" to={to}>{name}</Link>
                </li>
            ))}
        </ul>
    )
}


export { FooterLinks }