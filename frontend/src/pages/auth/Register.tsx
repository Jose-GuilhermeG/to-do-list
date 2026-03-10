import BaseAuthPage from "@/features/auth/BasePage";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import Loading from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Mail , Eye, User } from "lucide-react"
import { useNavigate } from "react-router-dom";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import useRegister from "@/hooks/useRegister";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";

export default function RegisterPage(){
    const [username , setUsername] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const navigate = useNavigate()
    const {isLoading , errors , isRegistered , realizeRegister , setErrors , accessToken , refreshToken} = useRegister()
    const {setAccessToken , setRefreshToken} = useContext(AuthContext) as AuthContextProtocol


    useEffect(()=>{
        if(isRegistered){ 
            navigate("/")
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
        }
    },[isRegistered])

    const goToLogin = (e : React.MouseEvent) : void => {
        e.preventDefault()
        navigate("/account/login/")
    }

    const handlerSubmit = async (e : React.SubmitEvent)=>{
        e.preventDefault()
        await realizeRegister({username , email , password})
    }


    return (
        <BaseAuthPage errors={errors} setErrors={setErrors}>
            <form className="p-2 h-full w-full relative max-lg:w-4/5 m-auto" onSubmit={handlerSubmit}>
                    <FieldSet>
                        <h1 className="my-5 text-2xl font-bold text-center">
                            Cadatrar
                        </h1>
                        <FieldGroup>
                            <Field className="my-2">
                                <FieldLabel>
                                    Nome
                                </FieldLabel>
                               <div className="relative">
                                    <User className="absolute right-4 bottom-1 text-neutral-300"/>
                                    <Input placeholder="Seu nome de usuario" required id='username' name='username' onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                            </Field>
                            <Field className="my-2">
                                <FieldLabel>
                                    Email
                                </FieldLabel>
                               <div className="relative">
                                    <Mail className="absolute right-4 bottom-1 text-neutral-300"/>
                                    <Input type="email" placeholder="Email@example.com" required id='email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                            </Field>
                            <Field className="my-2">
                                <FieldLabel>
                                    Senha
                                </FieldLabel>
                                <div className="relative">
                                    <Eye className="absolute right-4 bottom-1 text-neutral-300"/>
                                    <Input type="password" placeholder="Sua senha" required id='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                            </Field>
                            <Button className="my-2">
                                Entrar
                            </Button>
                            {isLoading && <Loading/>}
                            <Button variant="outline" className="my-2" onClick={goToLogin}>
                                Já tem conta ? Entrar
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                </form>
        </BaseAuthPage>
    )
}