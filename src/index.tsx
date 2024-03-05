import App from "./App"
import { createRoot } from "react-dom/client"

function AppContainer() {
  return <App />
}

const container = document.getElementById("root")

if (!container) {
  throw new Error("no container to render to!!!")
}
const root = createRoot(container as HTMLElement)
root.render(<AppContainer />)
