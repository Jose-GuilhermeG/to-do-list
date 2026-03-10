import { useContext, useState } from "react";

import { LoginService } from "@/services/authServices";
import type { LoginRequestData } from "@/types/AuthTypes";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import { isAxiosError } from "axios";

export default function useLogin(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [errors , setErrors] = useState<string>()
    const [isLoged , setIsLoged] = useState<boolean>(false)
    const {setAccessToken , setRefreshToken } = useContext(AuthContext) as AuthContextProtocol

    const realizeLogin = async (data : LoginRequestData) =>{
        setIsLoading(true)
        try{
            const response = (await LoginService(data)).data
            setAccessToken(response.access)
            setRefreshToken(response.refresh)
            setIsLoged(true)
        }catch(e){
            if(isAxiosError(e)){
                const message : string = e.response?.data.detail
                setErrors(message)
            }
        }finally{
            setIsLoading(false)
        }

    }

    return {isLoading , errors , setErrors , isLoged , realizeLogin}
}