import axios, { type AxiosPromise,  } from "axios";
import type { LoginRequestData } from "@/types/AuthTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASEURLPATH = "account/"
const BASEURL = API_BASE_URL + BASEURLPATH

interface VerifyTokenData{
    token : string
}

interface refreshAccessTokenResponse{
    access : string
}

interface refreshAccessTokenData{
    refresh : string
}

interface TokenPairProtocol extends refreshAccessTokenData , refreshAccessTokenResponse {}

const requests = axios.create({
    baseURL : BASEURL,
    timeout : 5000
})

export const verifyTokenService = async(data : VerifyTokenData) : Promise<AxiosPromise> => {
    const url = "token/verify/"
    return requests.post(
            url,
            data
        )
}

export const refreshAccessToken = async(data : refreshAccessTokenData) : Promise<AxiosPromise<refreshAccessTokenResponse>> =>{
    const url = "token/refresh/"
    return requests.post(
            url,
            data
        )
} 

export const LoginService = async(data : LoginRequestData ) : Promise<AxiosPromise<TokenPairProtocol>> =>{
    const url = "login/"
    return requests.post(
        url,
        data
    )
}

export const LogoutService = async(refreshToken : string) : Promise<AxiosPromise> =>{
    const url = "logout/"
    return requests.post(
        url,
        {
            refresh : refreshToken
        }
    )
}