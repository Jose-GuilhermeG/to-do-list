import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Modal, ModalContent, ModalHeader, ModalMedia, ModalTitle } from "@/components/ui/modal";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const {isLoading , erros , setErros , success , logout : logoutEffect } = useLogout()
    const {refreshToken , setAccessToken} = useContext(AuthContext) as AuthContextProtocol

    useEffect(()=>{
        if(success) navigate("/account/login/")
    },[success])

    const cancel = ()=>{
        const origin = location.state?.origin || "/"
        navigate(origin)
    }

    const logout = async ()=>{
        setAccessToken("")
        await logoutEffect(refreshToken)
    }

    return (
        <main className="w-full h-full bg-neutral-200 flex items-center">
            <Modal className="shadow-neutral-400 shadow-2xl">
                <ModalHeader>
                    <ModalMedia>
                        <LogOut/>
                    </ModalMedia>
                    <ModalTitle>
                        Deseja mesmo sair?
                    </ModalTitle>
                </ModalHeader>
                {
                    isLoading ?
                    <Loading/> :
                    <ModalContent className="flex justify-around">
                        <Button className="w-1/3 px-2 mx-2 cursor-pointer" onClick={cancel}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" className="w-1/3 px-2 mx-2 cursor-pointer" onClick={logout}>
                            Sair
                        </Button>   
                    </ModalContent>
                }
            </Modal>
        </main>
    )
}