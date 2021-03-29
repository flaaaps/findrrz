/* eslint-disable react-hooks/exhaustive-deps */
import { useMotionValue } from "framer-motion"
import React, { useEffect, useState } from "react"
import { getRelatedArtistsTopTracks } from "../../api/spotify"
import { Artist, Track } from "../../types/spotify"
import TrackAudioControls from "../track/AudioControls"
import TrackAudioPreview from "../track/AudioPreview"
import TrackBackground from "../track/Background"
import TrackDetails from "../track/Details"
import TrackDragOverlay from "../track/DragOverlay"

type Props = {
    artists: Artist[]
}

interface RatedTrack extends Track {
    liked: boolean
}

const SongVoter: React.FC<Props> = ({ artists }) => {
    const [index, setIndex] = useState(0)
    const [tracks, setTracks] = useState<Track[]>([])
    const [ratedSongs, setRatedSongs] = useState<RatedTrack[]>([])
    const [targetVolume, setTargetVolume] = useState(readFromLocalStorage() ?? 0.15)

    const x = useMotionValue(0)
    let currentSong = tracks[index]

    useEffect(() => {
        const fetchArtistsTopTrack = async () => {
            const fullTracks: Track[] = []
            for (let artist of artists) {
                for (let i = 0; i <= 19; i++) {
                    const fetchedTracks = await getRelatedArtistsTopTracks(artist.id, i)
                    fullTracks.push(fetchedTracks[0])
                }
            }
            setTracks(fullTracks)
        }
        fetchArtistsTopTrack()
    }, [artists])

    useEffect(() => {
        console.log("Tracks updated:", tracks)
        console.log(`We got ${tracks.length} songs`)
        tracks.forEach(track => {
            console.log(`${track.name} by ${track.artists[0].name}`)
        })
    }, [tracks])

    useEffect(() => {
        if (ratedSongs.length > 0) {
            console.log("Rated songs have changed:", ratedSongs)
        }
    }, [ratedSongs])

    const setVolume = (value: number) => {
        writeToLocalStorage(value)
        setTargetVolume(value)
    }

    function next() {
        setIndex(index + 1)
    }

    function take() {
        setRatedSongs(prev => {
            const newState = [...prev]
            newState.push({ ...currentSong, liked: true })
            return newState
        })
        next()
    }

    function handleDragEnd() {
        if (x.get() > 30) take()
        else if (x.get() < -30) next()
    }
    if (!tracks || tracks.length === 0) {
        return <div>Loading...</div>
    }

    if (!currentSong) return <></>

    return (
        <>
            <TrackAudioPreview currentSong={currentSong} key={currentSong.id} targetVolume={targetVolume} />
            <TrackDragOverlay x={x} onDragEnd={handleDragEnd} />
            <TrackAudioControls volume={targetVolume} setVolume={setVolume} />
            <TrackDetails x={x} currentSong={currentSong} left={tracks.length - index} />
            <TrackBackground currentSong={currentSong} />
        </>
    )
}
function writeToLocalStorage(volume: number) {
    localStorage.setItem("volume", String(volume))
}

function readFromLocalStorage(): number | null {
    const item = localStorage.getItem("volume")
    if (item) {
        const number = parseInt(item)
        return isNaN(number) ? null : number
    } else return null
}

export default SongVoter
