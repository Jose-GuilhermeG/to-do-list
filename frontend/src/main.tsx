import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./style/index.css"
import Urls from "./routes"
import { AuthProvider } from "./contexts/authContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Urls />
    </AuthProvider>
  </StrictMode>
)
