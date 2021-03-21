import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Login from "./pages/Login";

import { SpotifyUser } from "../types/spotify";
import { getMe } from "../api/spotify";
// import Loading from "./Loading";

import classNames from "classnames";
import Home from "./pages/Home";

type ContextProps = {
    user: SpotifyUser | null;
    setUser: (user: SpotifyUser | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
};

export const UserContext = React.createContext<Partial<ContextProps>>({});

const App: React.FC = () => {
    const [user, setUser] = useState<SpotifyUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("user_access_token"));
    // const [authError, setAuthError] = useState<SpotifyAuthError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = accessToken;
        console.log(token);
        if (token && token !== "null") {
            getMe(token).then((newUser) => {
                console.log("USER!", newUser);
                if (newUser) setUser(newUser);
                setLoading(false);
            });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [accessToken]);

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
                <div className={classNames("main", loading ? "bg-gray-800" : "bg-gray-200")}>
                    {user ? (
                        <>
                            <Nav user={user} />
                            <Home />
                        </>
                    ) : (
                        <>
                            <Nav />
                            <Login />
                        </>
                    )}
                </div>
            </UserContext.Provider>
        </>
    );
};

export default App;
