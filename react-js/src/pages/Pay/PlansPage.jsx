import { HeadingSection } from "../../components/Custom/HeadingSection"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { PricingSection } from "../../components/Plans/PricingSection"

const text = "Impulse su proyecto web y alcance el máximo nivel de rendimiento, tecnología y velocidad. Cada uno de nuestros planes hosting, son especialmente diseñados para ofrecer soluciones y transformar los negocios y proyectos en el mundo digital. ¡Seleccione el plan ideal según sus necesidades y presupuesto!"

const PlansPage = () => {

    return (
        <WrappedWidth size={11}>
            <HeadingSection title="Planes ChibchaWeb" text={text} />
            <PricingSection />
        </WrappedWidth>
    )
}

export { PlansPage }