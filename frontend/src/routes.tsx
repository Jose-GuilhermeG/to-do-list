import {Route , Routes , BrowserRouter} from "react-router-dom"

import Home from "./pages/Home"

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
            </Routes>
        </BrowserRouter>
    )
}