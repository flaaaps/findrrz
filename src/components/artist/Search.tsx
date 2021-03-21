import { motion } from "framer-motion";
import React, { ChangeEvent } from "react";

type Props = {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    artistValue: string;
};

const ArtistSearch: React.FC<Props> = ({ handleSearch, artistValue }) => {
    return (
        <motion.form
            animate={{ scaleY: 1 }}
            initial={{ scaleY: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 w-full md:w-3/4 lg:w-5/12 mx-auto flex"
        >
            <input
                placeholder="Search"
                onChange={handleSearch}
                value={artistValue}
                autoComplete="off"
                id="artist-input"
                type="text"
                className="inline-block w-full p-2 px-4 border-0 outline-none text-xl text-left"
            />
        </motion.form>
    );
};

export default ArtistSearch;
