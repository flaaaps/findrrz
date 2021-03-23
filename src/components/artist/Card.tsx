import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { Artist } from "../../types/spotify"

import ArtistIcon from "./Icon"

type Props = {
    artist: Artist
    visible: boolean
    setSelectedArtist: (artist: Artist) => void
    removeSelectedArtist: (artistId: string) => void
    index: number
    selected: boolean
}

export const ArtistIconDimension = {
    width: 50,
    height: 50,
}

const ArtistCard: React.FC<Props> = ({ artist, visible, setSelectedArtist, removeSelectedArtist, index, selected }) => {
    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        transition={{ delay: index / 30 }}
                        key={artist.id}
                        onClick={() => (!selected ? setSelectedArtist(artist) : removeSelectedArtist(artist.id))}
                    >
                        <motion.div
                            className={classNames("cursor-pointer bg-gray-200 flex items-center my-3")}
                            animate={
                                selected
                                    ? { boxShadow: "-30px 10px 15px 0px rgba(0, 0, 0, 0.096)" }
                                    : { boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" }
                            }
                            initial={{ boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" }}
                            exit={{ boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" }}
                        >
                            {/* <img src={artist.images[0].url} alt={artist.name} /> */}
                            {artist.images[0] ? (
                                <img src={artist.images[0].url} className="w-12 h-12" alt={artist.name} />
                            ) : (
                                <div className="w-12 h-12">
                                    <ArtistIcon />
                                </div>
                            )}
                            <div className="ml-3">
                                <h1 className="text-xl select-none">{artist.name}</h1>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ArtistCard
