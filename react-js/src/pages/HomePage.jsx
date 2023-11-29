import { Link } from "react-router-dom"
import { Button } from "../components/Custom/Button"
import { WrappedWidth } from "../components/Custom/WrappedWidth"
import { VerifyDomain } from "../components/Domain/VerifyDomain"
import { companies } from "../utils/images"
import hero from "../assets/images/hero.png"
import waves from "../assets/images/waves.png"


const HomePage = () => {
    return (
        <WrappedWidth className="mt-10 mb-14" size={11}>
            <article className="base:grid base:items-center base:grid-cols-2">
                <img className="w-full max-h-[500px] base:order-1" src={hero} alt="hero images" loading="lazy" draggable="false" />
                <section className="text-center base:text-start">
                    <h2 className="text-blue-500 text-2xl font-bold font-inika sm:text-3xl base:text-4xl lg:text-5xl xl:text-6xl">Tu presencia en línea comienza en este preciso momento.</h2>
                    <p className="mt-4 text-gray-400 sm:text-lg lg:text-xl">
                        Descubre una plataforma moderna para gestionar tus dominios y hosting.
                        Inicia tu presencia en línea ahora.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-x-5 base:justify-start">
                        <Button className="sm:px-6" size="md" color="white">
                            <Link className="w-full h-full grid place-content-center" to="register">Empezar</Link>
                        </Button>
                        <Button className="sm:px-6" size="md" color="red-400">
                            <Link className="w-full h-full grid place-content-center" to="plans">Planes</Link>
                        </Button>
                    </div>
                </section>
            </article>        
            <div className="mt-10 mb-16 border-y-2 border-red-500 sm:mt-14 sm:mb-20 sm:border-y-[3px] md:mt-16 md:mb-24">
                <section className="w-full my-6 flex items-center justify-center relative sm:max-w-xl sm:mx-auto sm:my-8 md:my-10">
                    <div className="w-3/4 text-center absolute z-10">
                        <h2 className="text-yellow-300 text-2xl font-bold font-inika sm:text-3xl">¿Qué te ofrecemos?</h2>
                        <p className="mt-4 text-yellow-200">
                            Te ofrecemos hosting de alto rendimiento, registro de dominios sencillo y soporte confiable 
                            para llevar tu presencia en línea al siguiente nivel.
                        </p>
                    </div>
                    <img className="w-2/3 max-h-[320px] ml-auto" src={waves} alt="waves picture" />
                    <img className="w-2/3 h-full ml-auto absolute top-0 left-0 rotate-180" src={waves} alt="waves picture" />
                </section>
            </div>
            <section className="max-w-lg mx-auto">
                <VerifyDomain />
                <figure className="w-full mt-14 flex items-center justify-between">
                    {companies.map((item, key) => (
                        <img key={key} src={item} alt="icon company" loading="lazy" draggable="false" />
                    ))}
                </figure>
            </section>
        </WrappedWidth>
    )
}

export { HomePage }