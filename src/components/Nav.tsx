import { motion } from "framer-motion"
import React from "react"
import { SpotifyUser } from "../types/spotify"

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
            className="py-8 px-6 mb-4 bg-gray-800 flex justify-between items-center shadow-2xl z-50"
        >
            <h1 className="text-gray-200 text-3xl logo">MusicFinder</h1>
            {user && (
                <>
                    <img className="rounded-full" width="40" src={user.images[0].url} alt={user.id} />
                </>
            )}
        </motion.nav>
    )
}

export default Nav