import Modal from "@/app/components/Modal"
import { useGlobalContext } from "../context/GlobalContext"
import { useState } from "react"
import LoginPage from "./Login"
import RegisterPage from "./Register"


export const AuthModal = () => {
    const {openAuth, setOpenAuth} = useGlobalContext()
    const [toggleAuth, setToggleAuth] = useState(false)
    return (
        <>
          <Modal
           open={openAuth}
           onClose={() => setOpenAuth(false)}
          >
            <div className="w-[335px] px-3 py-5 md:px-4 md:py-6 md:w-[400px]">
              {toggleAuth ? (
                <RegisterPage onToggle={setToggleAuth} />
              ) : (
                <LoginPage onToggle={setToggleAuth} />
              )}
            </div>
          </Modal>
        </>
    )
}