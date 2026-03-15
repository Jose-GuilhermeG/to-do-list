import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./style/index.css"
import Urls from "./routes"
import { AuthProvider } from "./contexts/authContext"
import { TaskProvider } from "./contexts/taskContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <Urls />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
)
