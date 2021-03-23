import React, { useEffect, useState } from "react"
import Nav from "./Nav"

import { SpotifyUser } from "../types/spotify"
import { getMe } from "../api/spotify"
// import Loading from "./Loading";

import classNames from "classnames"
import Home from "./pages/Home"
import WithAuthorization from "./WithAuth"
import { getAccessToken } from "../api/authorization"

type ContextProps = {
    user: SpotifyUser | null
    setUser: (user: SpotifyUser | null) => void
    accessToken: string | null
    setAccessToken: (accessToken: string | null) => void
}

export const UserContext = React.createContext<Partial<ContextProps>>({})

const App: React.FC = () => {
    const [user, setUser] = useState<SpotifyUser | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken())
    // const [authError, setAuthError] = useState<SpotifyAuthError | null>(null);

    useEffect(() => {
        const token = accessToken
        if (token && token !== "null") {
            getMe().then(newUser => {
                if (newUser) setUser(newUser)
            })
        } else {
            setUser(null)
        }
    }, [accessToken])

    return (
        <>
            {/* <Loading loading={loading} /> */}
            <UserContext.Provider
                value={{
                    user,
                    setUser,
                    accessToken,
                    setAccessToken,
                }}
            >
                <div className={classNames("main", "bg-gray-200")}>
                    <WithAuthorization>
                        <Nav user={user} />
                        <Home />
                    </WithAuthorization>
                </div>
            </UserContext.Provider>
        </>
    )
}

export default App
