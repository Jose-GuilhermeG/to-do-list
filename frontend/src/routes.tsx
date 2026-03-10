import {Route , Routes , BrowserRouter} from "react-router-dom"

import Home from "./pages/Home"
import LoginPage from "./pages/auth/LoginPage"
import LogoutPage from "./pages/auth/LogoutPage"

import LoginRequire from "./components/Auth/LoginRequire"

export default function Urls(){
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="" element={
                        <LoginRequire>
                            <Home/>
                        </LoginRequire>
                    } />
                    <Route path="account/logout" element={
                        <LoginRequire>
                            <LogoutPage/>
                        </LoginRequire>
                    } />
                    <Route path="account/login/" element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    )
}