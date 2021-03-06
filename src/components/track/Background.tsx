import React from "react"
import { Track } from "../../types/spotify"

type Props = { currentSong: Track }

const TrackBackground: React.FC<Props> = ({ currentSong }) => {
    return (
        <div
            className="flex-grow transform scale-105 bg-cover bg-center"
            style={{
                backgroundColor: "#000000",
                backgroundImage: `url('${currentSong.album.images[0]?.url}')`,
                filter: "blur(10px)",
            }}
        />
    )
}

export default TrackBackground
