import { PlanCard } from "./PlanCard"
import { listPlans } from "../../utils/data"

const PricingSection = () => {

    return (
        <section className="w-11/12 mx-auto mt-10 grid gap-y-10 sm:grid-cols-2 base:grid-cols-3">
            {listPlans.map((plan, key) => (
                <PlanCard key={key} plan={plan} />
            ))}
        </section>
    )
}

export { PricingSection }