import React, { useContext, useEffect } from "react"
import { UserContext } from "../App"

const CLIENT_ID = "ecf2247db8174da0aba4e3e62fdd2f6b"
const REDIRECT_URI = "http://192.168.1.7:3000"

const Login: React.FC = () => {
    const { setUser, setAccessToken } = useContext(UserContext)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substr(1, window.location.hash.length - 1))
        const accessToken = urlParams.get("access_token")
        const hash = window.location.hash
        if (accessToken) {
            const parsed = hash.substr(1, hash.length - 1)
            const params = new URLSearchParams(parsed)
            const expiresIn = params.get("expires_in")
            if (accessToken && expiresIn) {
                localStorage.setItem("user_access_token", accessToken)
                const currentSeconds = Date.now() / 1000
                const expiresAt = currentSeconds + parseInt(expiresIn)
                setAccessToken!(accessToken)
                localStorage.setItem("expires_at", String(expiresAt))
                // clear url
                window.history.pushState({}, document.title, "./")
            }
        }
    }, [setUser, setAccessToken])

    const authorizeWithSpotify = (showDialog: boolean = false) => {
        var scopes = "user-read-private user-read-email user-top-read"
        window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
            scopes
        )}&redirect_uri=${REDIRECT_URI}&show_dialog=${showDialog}`
    }
    return (
        <>
            <div className="px-6">
                <button onClick={() => authorizeWithSpotify()}>Login</button>
            </div>
        </>
    )
}

export default Login
