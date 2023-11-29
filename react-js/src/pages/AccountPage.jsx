import { AccountEdit } from "../components/Account/AccountEdit"
import { AccountProfile } from "../components/Account/AccountProfile"
import { WrappedWidth } from "../components/Custom/WrappedWidth"
import { useToggle } from "../hooks/useToggle"


const AccountPage = () => {
   const [isOpen, handleToggle] = useToggle()

    return (
        <WrappedWidth className="max-w-2xl flex items-center justify-center flex-col gap-y-3 lg:max-w-2xl" size={11}>
            <AccountProfile onToggle={handleToggle} />
            <AccountEdit isOpen={isOpen} onToggle={handleToggle} />
        </WrappedWidth>
    )
}

export { AccountPage }