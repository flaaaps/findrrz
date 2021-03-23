import React, { useContext } from "react"
import { Artist } from "../../types/spotify"
import { ScreenContext } from "../pages/Home"

type Props = {
    artists: Artist[]
}

const SongVoter: React.FC<Props> = ({ artists }) => {
    const { setCurrentScreen } = useContext(ScreenContext)

    return (
        <div>
            <button onClick={() => setCurrentScreen!("artist-picker")}>Back</button>
        </div>
    )
}

export default SongVoter
