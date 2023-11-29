import { forwardRef, useEffect } from "react"
import { merge } from "../../../utils/merge"

const Modal = forwardRef(({ className = "", children, isOpen }, ref) => {
    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [ref, isOpen])

    return (
        <dialog className={merge("backdrop:bg-slate-300/80 focus:outline-none", className)} ref={ref}>
            {children}
        </dialog>
    )
})


export { Modal }