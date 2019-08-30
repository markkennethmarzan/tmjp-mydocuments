import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { unregister } from "./serviceWorker"
import "./fontawesome"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(<App />, document.getElementById("root"))
unregister()
