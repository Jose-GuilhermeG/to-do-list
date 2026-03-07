import { useContext , useState  } from "react";

import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import { refreshAccessToken, verifyTokenService } from "@/services/authServices";

export default function LoginRequireVerify() : {isLoged : boolean , isLoading : boolean} {
    const {accessToken , refreshToken , setAccessToken} = useContext(AuthContext) as AuthContextProtocol
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const [isLoged , setIsLoged] = useState<boolean>(false)

    async function verifyAccessToken(token: string): Promise<boolean> {
    try {
        await verifyTokenService({ token });
        return true;
    } catch {
        return false;
    }
    }

    async function refreshUserAccessToken(refresh: string): Promise<string | null> {
    try {
        const response = await refreshAccessToken({ refresh });
        return response.data.access;
    } catch {
        return null;
    }
    }

    async function checkAccess() {
    const isValid = await verifyAccessToken(accessToken);

    if (isValid) {
        setIsLoged(true);
        setIsLoading(false)
        return;
    }

    const newToken = await refreshUserAccessToken(refreshToken);
    if (newToken) {
        setAccessToken(newToken);
        setIsLoged(true);
    } else {
        setIsLoged(false);
    }
    setIsLoading(false)

    }

    checkAccess()

    return {isLoged , isLoading}
   

}