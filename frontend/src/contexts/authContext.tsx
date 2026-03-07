import React, { createContext , useState} from "react";

export interface AuthContextProtocol{
    accessToken : string,
    refreshToken : string,
    username : string,
    setAccessToken(value : string) : void,
    setRefreshToken(value : string) : void,
    setUsername(value : string) : void,
}

export const AuthContext = createContext<AuthContextProtocol | null>(null)

export function AuthProvider({children} : {children : React.ReactElement}) : React.ReactElement{
    const [accessToken , setAccessTokenState] = useState<string>(localStorage.getItem("access") || "")
    const [refreshToken , setRefreshTokenState] = useState<string>((localStorage.getItem("refresh") || ""))
    const [username , setUsernameState] = useState<string>((localStorage.getItem("username") || ""))
    const setAuthInfo = (key : "access" | "refresh" | "username" , value : string ) => localStorage.setItem(key,value)

    const setAccessToken = (value : string) => {
        setAuthInfo("access" , value)
        setAccessTokenState(value)
    }
    const setRefreshToken = (value : string) => {
        setAuthInfo("refresh" , value)
        setRefreshTokenState(value)
    }
    const setUsername = (value : string) => {
        setAuthInfo("username" , value)
        setUsernameState(value)
    }

    return (
        <AuthContext.Provider value={{accessToken , setAccessToken , refreshToken , setRefreshToken , username , setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}