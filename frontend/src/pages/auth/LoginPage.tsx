import React , { useEffect, useState } from "react"

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Mail , Eye , AlertCircleIcon, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useLogin from "@/hooks/useLogin"

import GoogleIcon from "@/assets/icons/google-icon.svg"
import Loading from "@/components/ui/loading"
import { useNavigate } from "react-router-dom"
import { Alert, AlertAction, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
    const [emailData , setEmailData] = useState<string>("")
    const [passwordData , setPasswordData] = useState<string>("")
    const navigate = useNavigate()
    const {isLoading , isLoged , errors , setErrors , realizeLogin} = useLogin()

    const handleSubmit = async (e : React.SubmitEvent)=>{
        e.preventDefault()
        await realizeLogin({email : emailData , password : passwordData})
    }
    
    useEffect(()=>{
        if(isLoged) navigate("/")
    },[isLoged])

    return (
        <main className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
            {
                errors && 
                <Alert className="absolute! top-20 min-w-[20%] w-fit max-w-[30%]" variant="destructive">
                    <AlertCircleIcon/>
                    <AlertTitle>
                        {errors}
                    </AlertTitle>
                    <AlertAction>
                        <button className="cursor-pointer" onClick={()=>setErrors("")}>
                            <XCircle/>
                        </button>
                    </AlertAction>
                </Alert>
            }
            <section className="w-[75vw] h-[70vh] bg-white shadow-2xl shadow-neutral-300 rounded-xl grid grid-cols-2 relative max-lg:grid-cols-1">
                <div className="aspect-square w-full h-4/5 m-auto flex flex-col justify-around items-center max-lg:hidden">
                    <h1 className="text-4xl font-bold tracking-[2px] font-serif">
                        TaskList
                    </h1>
                    <img src="/anotated.png" alt="" className="aspect-square max-w-[400px]" />
                </div>
                <Separator orientation="vertical" className="absolute left-[47%] h-9/10 top-[5%] max-lg:hidden" />
                <form action="" className="p-2 h-full w-full relative max-lg:w-4/5 m-auto" onSubmit={handleSubmit}>
                    <FieldSet>
                        <h1 className="my-5 text-2xl font-bold text-center">
                            Entrar
                        </h1>
                        <FieldGroup>
                            <Field className="my-2">
                                <FieldLabel>
                                    Email
                                </FieldLabel>
                               <div className="relative">
                                    <Mail className="absolute right-4 bottom-1 text-neutral-300"/>
                                    <Input type="email" placeholder="Email@example.com" required id='email' name='email' onChange={(e)=>setEmailData(e.target.value)}/>
                                </div>
                            </Field>
                            <Field className="my-2">
                                <FieldLabel>
                                    Senha
                                </FieldLabel>
                                <div className="relative">
                                    <Eye className="absolute right-4 bottom-1 text-neutral-300"/>
                                    <Input type="password" placeholder="Sua senha" required id='email' name='email' onChange={(e)=>setPasswordData(e.target.value)}/>
                                </div>
                            </Field>
                            <FieldDescription>
                                Esqueceu a senha?
                            </FieldDescription>
                            <Button className="my-2">
                                Entrar
                            </Button>
                            {isLoading && <Loading/>}
                            <Button variant="outline" className="my-2">
                                Não tem conta? Criar
                            </Button>
                            <Field>
                                <h1 className="text-center my-2">
                                    Ou entre com
                                </h1>
                                <div className="w-full flex justify-around items-center">
                                    <a href="" className="w-12 h-12 p-2 bg-neutral-50 rounded-2xl">
                                        <img src={GoogleIcon} alt="" className="" />
                                    </a>
                                </div>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </section>
        </main>
    )
}