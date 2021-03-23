import React from "react"
import Login from "./pages/Login"
import { getAccessToken } from "../api/authorization"

const WithAuthorization: React.FC = ({ children }) => {
    return getAccessToken() ? <>{children}</> : <Login />
}

export default WithAuthorization
