import { FooterLinks } from "./FooterLinks"
import { footerHelp, footerServices } from "../../utils/data"
import { Image } from "../Custom/Loading/Image"
import logo from "../../assets/images/logo.png"
import { WrappedWidth } from "../Custom/WrappedWidth"

const Footer = () => {

    return (
        <footer className="w-full bg-yellow-300">
            <WrappedWidth className="py-10 grid gap-x-5 sm:py-11 sm:grid-cols-2 sm:gap-x-8" size={11}>
                <div className="mb-4 text-blue-500 font-inika">
                    <figure className="w-full flex items-center justify-center gap-x-3 sm:justify-start">
                        <Image className="w-16 h-16" src={logo} alt="logo" />
                        <figcaption className="text-xl font-bold">ChibchaWeb</figcaption>
                    </figure>
                    <p className="mt-2">
                        Descubre una plataforma moderna para gestionar tus dominios y hosting. 
                        Inicia tu presencia en lilne ahora
                    </p>
                </div>
                <section className="grid grid-cols-2 gap-x-5">
                    <FooterLinks links={footerServices} />
                    <FooterLinks links={footerHelp} />
                </section>
            </WrappedWidth>
        </footer>
    )
}

export { Footer }