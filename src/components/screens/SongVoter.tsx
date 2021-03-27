/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { getRelatedArtistsTopTracks } from "../../api/spotify"
import { Artist, Track } from "../../types/spotify"
import { getRandomInt } from "../../utils/random"
import { ScreenContext } from "../pages/Home"

type Props = {
    artists: Artist[]
}

interface RatedTrack {
    track: Track
    liked: boolean
}

const SongVoter: React.FC<Props> = ({ artists }) => {
    const [artistOffset, setArtistOffset] = useState(getRandomInt(5, 15))
    const [topTracks, setTopTracks] = useState<Track[]>([])
    const [ratedTracks, setRatedTracks] = useState<RatedTrack[]>([])
    const [likedArtists, setLikedArtists] = useState<Artist[]>([])
    const [likedArtistOffset, setLikedArtistOffset] = useState(0)

    const [shownTracks, setShownTracks] = useState<string[]>([])

    const { setCurrentScreen } = useContext(ScreenContext)

    useEffect(() => {
        console.log("Artists:", artists)
        const ftch = async () => {
            for (let artist of artists) {
                let fetchedTopTrack = await retrieveTopTrack(artist)
                console.log(
                    `Fetched ${fetchedTopTrack?.name} by ${fetchedTopTrack?.artists[0].name}. It ${
                        shownTracks.includes(fetchedTopTrack!.id) ? "has" : "has not"
                    } been shown yet.`
                )
                let customOffset = 0
                while (shownTracks.includes(fetchedTopTrack!.id)) {
                    console.log("Trying new one...")
                    fetchedTopTrack = await retrieveTopTrack(artist, customOffset)
                    console.log("New one:", fetchedTopTrack)
                    customOffset++
                }
                setTopTracks(prev => {
                    const newTopTracks = [...prev]
                    if (fetchedTopTrack && !shownTracks.includes(fetchedTopTrack.id)) {
                        newTopTracks.push(fetchedTopTrack!!)
                        setShownTracks(prev => {
                            const prevState = [...prev]
                            prevState.push(fetchedTopTrack!.id)
                            return prevState
                        })
                    }
                    return newTopTracks
                })
            }
        }
        console.log(topTracks)
        if (topTracks.length <= 1) ftch()
    }, [artists, artistOffset])

    useEffect(() => {
        console.log("Rated tracks update")
        console.log(ratedTracks)
        const liked = ratedTracks.filter(track => track.liked)
        console.log(`${liked.length} liked songs.`)
        liked.forEach(track => {
            setLikedArtists(prev => {
                const newState = [...prev]
                if (!likedArtists.includes(track.track.artists[0])) newState.push(track.track.artists[0])
                return newState
            })
        })
    }, [ratedTracks])

    useEffect(() => {
        console.log("Changed liked artist offset.")
        console.log("Liked artist offset:", likedArtistOffset)
        const customArtists = likedArtists.slice(likedArtistOffset - 3, likedArtistOffset)
        console.log("Custom artists:", customArtists)
        const ftch = async () => {
            for (let artist of customArtists) {
                let fetchedTopTrack = await retrieveTopTrack(artist)
                console.log(`Fetched ${fetchedTopTrack?.name} by ${fetchedTopTrack?.artists[0].name}`)
                let customOffset = 0
                while (shownTracks.includes(fetchedTopTrack!.id)) {
                    console.log("Trying new one...")
                    fetchedTopTrack = await retrieveTopTrack(artist, customOffset)
                    console.log("New one:", fetchedTopTrack)
                    customOffset++
                }
                setTopTracks(prev => {
                    const newTopTracks = [...prev]
                    if (fetchedTopTrack && !shownTracks.includes(fetchedTopTrack.id)) {
                        newTopTracks.push(fetchedTopTrack!!)
                        setShownTracks(prev => {
                            const prevState = [...prev]
                            prevState.push(fetchedTopTrack!.id)
                            return prevState
                        })
                    }
                    return newTopTracks
                })
            }
        }
        console.log(topTracks.length <= 1)
        if (topTracks.length <= 1) ftch()
    }, [likedArtistOffset])

    useEffect(() => {
        console.log("Liked artists:", likedArtists)
    }, [likedArtists])

    const retrieveTopTrack = (artist: Artist, customArtistOffset?: number) => {
        return new Promise<Track | null>((resolve, reject) => {
            getRelatedArtistsTopTracks(artist?.id, customArtistOffset ? customArtistOffset : artistOffset)
                .then(fetched => {
                    resolve(fetched[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const rateTrack = async (liked: boolean, track: Track) => {
        const foundTrack = topTracks.find(topTrack => topTrack === track)
        if (foundTrack) topTracks.splice(topTracks.indexOf(foundTrack), 1)
        if (topTracks.length === 1) {
            console.log("Changing artist offset to:", artistOffset + 1)
            if (artistOffset >= 18) {
                // setDone(true)
                console.log("Liked artists:", likedArtists)
                setLikedArtistOffset(prev => prev + 3)
            } else setArtistOffset(prev => prev + 1)
        }
        setRatedTracks(prev => {
            const newVotedTracks = [...prev]
            newVotedTracks.push({ liked, track })
            return newVotedTracks
        })
        if (liked) {
            let fetchedTopTrack = await retrieveTopTrack(track.artists[0])
            console.log(
                `Fetched ${fetchedTopTrack?.name} by ${fetchedTopTrack?.artists[0].name}. It ${
                    shownTracks.includes(fetchedTopTrack!.id) ? "has" : "has not"
                } been shown yet.`
            )
            let customOffset = 0
            while (shownTracks.includes(fetchedTopTrack!.id)) {
                if (customOffset === 5) {
                    console.log("You won. No songs left.")
                    return
                }
                console.log("Trying new one...")
                fetchedTopTrack = await retrieveTopTrack(track.artists[0], customOffset)
                console.log("New one:", fetchedTopTrack)
                customOffset++
            }

            setTopTracks(prev => {
                const newState = [...prev]
                if (fetchedTopTrack && !shownTracks.includes(fetchedTopTrack.id)) {
                    newState.push(fetchedTopTrack)
                    setShownTracks(prev => {
                        const prevState = [...prev]
                        prevState.push(fetchedTopTrack!.id)
                        return prevState
                    })
                }
                return newState
            })
        }
    }

    return (
        <div>
            <button onClick={() => setCurrentScreen!("artist-picker")}>Back</button>
            <ul>
                {topTracks.length > 0 &&
                    topTracks.map(track => (
                        <li key={track.id} className="my-10">
                            <img src={track.album.images[0].url} width="50" alt={track.name} />
                            {track.name} by {track.artists[0].name}
                            <div className="block">
                                <button onClick={() => rateTrack(true, track)} className="mr-5">
                                    Like
                                </button>
                                <button onClick={() => rateTrack(false, track)}>Dislike</button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default SongVoter
