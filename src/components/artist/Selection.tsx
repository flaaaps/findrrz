import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ArtistList } from "../ArtistPicker";
import ArtistIcon from "./Icon";

interface Props {
    selectedArtists: ArtistList;
    removeSelectedArtist: (artistId: string) => void;
}

const ArtistSelection: React.FC<Props> = ({ selectedArtists, removeSelectedArtist }) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="selected-artists"
            className="flex items-center w-3/5 lg:2/5 xl:w-4/12 mx-auto mt-7"
        >
            {selectedArtists.map((artist, i) => (
                <div key={i} className="inline-block mx-auto w-16 h-16 md:w-32 md:h-32">
                    <AnimatePresence>
                        {artist && (
                            <motion.img
                                onClick={() => removeSelectedArtist(artist.id)}
                                animate={{ y: 0, opacity: 1 }}
                                initial={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                src={artist.images[0].url}
                                key={artist.id}
                                className="absolute w-16 h-16 md:w-32 md:h-32"
                                exit={{ y: -50, opacity: 0 }}
                            />
                        )}
                        <ArtistIcon />
                    </AnimatePresence>
                </div>
            ))}
        </motion.div>
    );
};

export default ArtistSelection;
