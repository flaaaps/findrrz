import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import ArtistPicker, { ArtistList } from "../ArtistPicker";

type Screen = "artist-picker" | "song-voter";

type ContextProps = {
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
};
export const ScreenContext = React.createContext<Partial<ContextProps>>({});
const Home: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>("artist-picker");
    const [submittedArtists, setSubmittedArtists] = useState<ArtistList>();
    const transition = 0.25;

    const variants: Variants = {
        show: {
            opacity: 1,
            transition: { delay: transition },
        },
        hidden: {
            opacity: 0,
        },
    };
    return (
        <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
            <button
                className="fixed"
                onClick={() => setCurrentScreen((cs) => (cs === "artist-picker" ? "song-voter" : "artist-picker"))}
            >
                Change current screen
            </button>
            <div className="px-6" id="content">
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
                            <ArtistPicker setSubmittedArtists={setSubmittedArtists} />
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={variants}
                            animate="show"
                            initial="hidden"
                            exit="hidden"
                            transition={{ duration: transition }}
                            key={2}
                        >
                            <p className="m-52">
                                {submittedArtists!.map((artist) => (
                                    <h1>{artist?.name}</h1>
                                ))}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ScreenContext.Provider>
    );
};

export default Home;
