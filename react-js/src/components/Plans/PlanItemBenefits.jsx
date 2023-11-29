import { Image } from "../Custom/Loading/Image"

const PlanItemBenefits = ({ urlImage, title }) => {

    return (
        <figure className="w-full flex items-center justify-center gap-x-3 sm:gap-x-5 md:justify-start xl:justify-center">
            <Image className="w-6 h-6" src={urlImage} alt="icon" />
            <figcaption className="text-blue-500 font-semibold">{title}</figcaption>
        </figure>
    )
}

export { PlanItemBenefits }