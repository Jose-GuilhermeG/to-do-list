import axios, { type AxiosPromise,  } from "axios";

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



export const verifyTokenService = async(data : VerifyTokenData) : Promise<AxiosPromise> => {
    const url = BASEURL + "token/verify/"
    return await axios.post(
            url,
            data
        )
}

export const refreshAccessToken = async(data : refreshAccessTokenData) : Promise<AxiosPromise<refreshAccessTokenResponse>> =>{
    const url = BASEURL + "token/refresh/"
    return await axios.post(
            url,
            data
        )
} 