import React, { useEffect, useState } from "react"
import Nav from "./Nav"

import { SpotifyUser } from "../types/spotify"
import { getMe } from "../api/spotify"
// import Loading from "./Loading";

import classNames from "classnames"
import Home from "./pages/Home"
import WithAuthorization from "./WithAuth"
import { getAccessToken } from "../api/authorization"
import Loading from "./Loading"

type ContextProps = {
    user: SpotifyUser | null
    setUser: (user: SpotifyUser | null) => void
    accessToken: string | null
    setAccessToken: (accessToken: string | null) => void
}

export const UserContext = React.createContext<Partial<ContextProps>>({})

const App: React.FC = () => {
    const [user, setUser] = useState<SpotifyUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken())
    // const [authError, setAuthError] = useState<SpotifyAuthError | null>(null);

    useEffect(() => {
        const token = accessToken
        if (token && token !== "null") {
            getMe().then(newUser => {
                if (newUser) {
                    setUser(newUser)
                    setLoading(false)
                }
            })
        } else {
            setUser(null)
            setLoading(false)
        }
    }, [accessToken])

    return (
        <>
            <Loading loading={loading} />
            <UserContext.Provider
                value={{
                    user,
                    setUser,
                    accessToken,
                    setAccessToken,
                }}
            >
                <div className={classNames("main", "bg-foreground")}>
                    <Nav user={user} />
                    <WithAuthorization>
                        <Home />
                    </WithAuthorization>
                </div>
            </UserContext.Provider>
        </>
    )
}

export default App
