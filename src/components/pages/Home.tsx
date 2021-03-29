import { AnimatePresence, motion, Variants } from "framer-motion"
import React, { useState } from "react"
import { Artist } from "../../types/spotify"
import ArtistPicker from "../screens/ArtistPicker"
import SongVoter from "../screens/SongVoter"

type Screen = "artist-picker" | "song-voter"

type ContextProps = {
    currentScreen: Screen
    setCurrentScreen: (screen: Screen) => void
}
export const ScreenContext = React.createContext<Partial<ContextProps>>({})
const Home: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>("artist-picker")
    const [submittedArtists, setSubmittedArtists] = useState<Artist[]>()
    const transition = 0.25

    const variants: Variants = {
        show: {
            opacity: 1,
            transition: { delay: transition },
        },
        hidden: {
            opacity: 0,
        },
    }
    return (
        <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
            <div className="flex flex-col min-h-screen h-full" id="content">
                <AnimatePresence>
                    {currentScreen === "artist-picker" ? (
                        <motion.div
                            variants={variants}
                            animate="show"
                            initial="hidden"
                            exit="hidden"
                            transition={{ duration: transition }}
                            key={1}
                        >
                            <ArtistPicker
                                submittedArtists={submittedArtists}
                                setSubmittedArtists={setSubmittedArtists}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={variants}
                            animate="show"
                            initial="hidden"
                            className="w-full flex-grow flex overflow-hidden relative"
                            exit="hidden"
                            transition={{ duration: transition }}
                            key={2}
                        >
                            <SongVoter artists={submittedArtists!!} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ScreenContext.Provider>
    )
}

export default Home
