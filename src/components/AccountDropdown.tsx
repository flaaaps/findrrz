import { AnimatePresence, motion } from "framer-motion"
import React, { useContext, useState } from "react"
import { BiLogOut } from "react-icons/bi"
import * as auth from "../api/authorization"
import { UserContext } from "./App"

type Props = {
    userImageURL: string
}

const AccountDropdown: React.FC<Props> = ({ userImageURL }) => {
    const [expanded, setExpanded] = useState(false)
    const { setAccessToken } = useContext(UserContext)

    const handleLogout = () => {
        setAccessToken!(null)
        auth.logout()
    }

    return (
        <div className="sticky z-20 flex justify-end">
            <div className="relative w-20 block text-left">
                <div>
                    <button
                        onClick={() => setExpanded(prev => !prev)}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
                        id="options-menu"
                        aria-expanded="true"
                        aria-haspopup="true"
                    >
                        <img src={userImageURL} className="rounded-full" width="40" alt="User" />
                    </button>
                </div>
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <div className="py-1" role="none">
                                <p
                                    onClick={() => handleLogout()}
                                    className="flex items-center px-4 py-2 text-md cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <BiLogOut className="inline-block mr-2" />
                                    <span>Logout</span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AccountDropdown
