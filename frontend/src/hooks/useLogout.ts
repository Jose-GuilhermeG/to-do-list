import { LogoutService } from "@/services/authServices";
import { useState } from "react";

export default function useLogout(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [erros , setErros] = useState<string>();
    const [success , setSuccess] = useState<boolean>(false)
    
    const logout = async (refreshToken : string) => {
        setIsLoading(true)
        try{
            await LogoutService(refreshToken)
            setSuccess(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading , erros , setErros , success , logout}
}