import { isAxiosError } from "axios";
import { useState } from "react";
import { RegisterService } from "@/services/authServices";

export default function useRegister(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [isRegistered , setIsRegistered] = useState<boolean>(false);
    const [errors , setErrors] = useState<string>("")
    const [accessToken , setAccessToken] = useState<string>("")
    const [refreshToken , setRefreshToken] = useState<string>("")
    
    const realizeRegister = async (data : {username : string , email : string , password : string})=>{
        setIsLoading(true)
        try {
            const response = await RegisterService(data.username , data.email , data.password)
            if(response.status === 201){
                setIsRegistered(true)
                setAccessToken(response.data.access)
                setRefreshToken(response.data.refresh)
            }
        }catch(e){
            if(isAxiosError(e)){
                if(e.response){
                    setErrors(e.response.data.detail)
                }else{
                    setErrors("Ocorreu um erro desconhecido")
                }
                console.log(e.response)
            }else{
                setErrors("Ocorreu um erro desconhecido")
            }
        }finally{
            setIsLoading(false)
        }

    }

    return {isLoading , isRegistered , errors , setErrors , realizeRegister , accessToken , refreshToken}
}