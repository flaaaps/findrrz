import { motion } from "framer-motion"
import React from "react"
import { SpotifyUser } from "../types/spotify"
import AccountDropdown from "./AccountDropdown"

type Props = {
    user?: SpotifyUser | null
}

const Nav: React.FC<Props> = ({ user }) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ height: "60px" }}
            className="py-8 px-6 bg-primary fixed w-full top-0 flex justify-between items-center shadow-xl z-50"
        >
            <h1 className="text-gray-200 text-3xl logo">MusicFinder</h1>
            {user && (
                <>
                    <AccountDropdown userImageURL={user.images[0].url} />
                </>
            )}
        </motion.nav>
    )
}

export default Nav
