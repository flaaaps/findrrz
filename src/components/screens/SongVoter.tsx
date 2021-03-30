/* eslint-disable react-hooks/exhaustive-deps */
import { useMotionValue } from "framer-motion"
import React, { useEffect, useState } from "react"
import { getRelatedArtistsTopTracks } from "../../api/spotify"
import { Artist, Track } from "../../types/spotify"
import { readVolume, writeVolume } from "../../utils/localStorage"
import TrackAudioControls from "../track/AudioControls"
import TrackAudioPreview from "../track/AudioPreview"
import TrackBackground from "../track/Background"
import TrackDetails from "../track/Details"
import TrackDragOverlay from "../track/DragOverlay"

type Props = {
    artists: Artist[]
}

const SongVoter: React.FC<Props> = ({ artists }) => {
    const [index, setIndex] = useState(0)
    const [tracks, setTracks] = useState<Track[]>([])
    const [likedSongs, setLikedSongs] = useState<Track[]>([])
    const [targetVolume, setTargetVolume] = useState(readVolume() ?? 0.15)
    const [artistOffset, setArtistOffset] = useState(1)
    const [blacklist, setBlacklist] = useState<string[]>([])

    const x = useMotionValue(0)
    let currentSong = tracks[index]

    useEffect(() => {
        const fetchData = async () => await fetchArtistsTopTracks(artists)
        fetchData()
    }, [artists])

    useEffect(() => {
        console.log(`We got ${tracks.length} songs`)
        tracks.forEach(track => {
            setBlacklist(prev => {
                const newState = [...prev]
                newState.push(track.id)
                return newState
            })
        })
    }, [tracks])

    useEffect(() => {
        console.log(`We now have ${likedSongs.length} liked tracks and an song index of ${index}`)
        if (tracks.length === index && tracks.length !== 0) {
            console.log("Okay, we're done!!")
            fetchArtistsTopTracks(likedSongs.map(song => song.artists[0]).slice(0, artistOffset * 3))
            setArtistOffset(prev => prev + 1)
        }
    }, [index])

    const fetchArtistsTopTracks = async (artistsToFetch: Artist[]) => {
        console.log("Fetching new artists...")
        const fullTracks: Track[] = []
        for (let artist of artistsToFetch) {
            for (let i = 0; i <= 19; i++) {
                const fetchedTracks = await getRelatedArtistsTopTracks(artist.id, i)
                fullTracks.push(fetchedTracks[0])
            }
        }
        setTracks(
            [...new Map(fullTracks.map(item => [item["id"], item])).values()].filter(
                item => !blacklist.includes(item.id)
            )
        )
        setIndex(0)
    }

    const setVolume = (value: number) => {
        writeVolume(value)
        setTargetVolume(value)
    }

    function next() {
        setIndex(index + 1)
    }

    function take() {
        setLikedSongs(prev => {
            const newState = [...prev]
            newState.push(currentSong)
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

export default SongVoter
