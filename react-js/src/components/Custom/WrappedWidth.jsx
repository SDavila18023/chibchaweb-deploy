import { merge } from "../../utils/merge"

const variants = {
    10: "w-10/12 max-w-md mx-auto mt-10 mb-14 flex items-center justify-center flex-col",
    11: "w-11/12 mx-auto mt-10 mb-14 base:w-10/12 lg:max-w-screen-2xl"
}

const WrappedWidth = ({ className = "", children, size }) => {

    return (
        <section className={merge(variants[size], className)}>
            {children}
        </section>
    )
}

export { WrappedWidth }