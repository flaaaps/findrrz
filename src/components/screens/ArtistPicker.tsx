import classNames from "classnames"
import { motion } from "framer-motion"
import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { getTopArtists, searchArtists } from "../../api/spotify"
import { Artist } from "../../types/spotify"
import { UserContext } from "../App"
import ArtistCard from "../artist/Card"
import ArtistSearch from "../artist/Search"
import ArtistSelection from "../artist/Selection"
import { ScreenContext } from "../pages/Home"

export type ArtistList = [Artist | null, Artist | null, Artist | null]

type Props = {
    setSubmittedArtists: (artists: Artist[]) => void
    submittedArtists?: Artist[]
}

const ArtistPicker: React.FC<Props> = ({ submittedArtists, setSubmittedArtists }) => {
    const [artistValue, setArtistValue] = useState("")
    const [artists, setArtists] = useState<Artist[]>([])
    const [selectedArtists, setSelectedArtists] = useState<ArtistList>(
        submittedArtists ? (submittedArtists as ArtistList) : [null, null, null]
    )

    const { setCurrentScreen } = useContext(ScreenContext)
    const { accessToken } = useContext(UserContext)
    const isFull = selectedArtists.indexOf(null) === -1

    useEffect(() => {
        searchArtists(artistValue).then(newArtists => {
            const artistsToPush: Artist[] = []
            if (newArtists.length > 0) {
                newArtists.forEach(art => {
                    if (art.popularity > 20 && artistsToPush.length < 20) artistsToPush.push(art)
                })
                setArtists(artistsToPush)
            }
        })
    }, [artistValue])

    useEffect(() => {
        setTopArtists()
        // eslint-disable-next-line
    }, [accessToken])

    const setTopArtists = () => {
        getTopArtists().then(topArtists => {
            setArtists(topArtists)
        })
    }

    const submitSelectedArtists = () => {
        setSubmittedArtists(selectedArtists as Artist[])
        setCurrentScreen!("song-voter")
    }

    const setSelectedArtist = (artist: Artist) => {
        setSelectedArtists(prevSelected => {
            const newSelected: ArtistList = [prevSelected[0], prevSelected[1], prevSelected[2]]
            newSelected[prevSelected.indexOf(null)] = artist
            return newSelected
        })
    }

    const removeSelectedArtist = (artistId: string) => {
        setSelectedArtists(prevSelected => {
            const newSelected: ArtistList = [...prevSelected]
            const found = prevSelected.find(prev => prev?.id === artistId)
            if (found) newSelected[prevSelected.indexOf(found)] = null
            return newSelected
        })
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setTopArtists()
        }
        setArtistValue(e.target.value)
    }
    return (
        <div className="mt-24">
            <motion.h1
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl mt-16 text-center font-extrabold font-open-sans text-background-600"
            >
                Select Your Top 3 Artists
            </motion.h1>

            <ArtistSearch handleSearch={handleSearch} artistValue={artistValue} />

            <ArtistSelection removeSelectedArtist={removeSelectedArtist} selectedArtists={selectedArtists} />
            <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={classNames(
                    "flex justify-center w-full sm:w-96 mx-auto my-9 bg-primary p-2 px-4 border-0 outline-none text-lg text-white text-center focus:outline-none",
                    isFull ? "bg-opacity-100 cursor-pointer" : "bg-opacity-25 cursor-default"
                )}
                disabled={!isFull}
                onClick={submitSelectedArtists}
            >
                Continue
            </motion.button>
            <div>
                <motion.div
                    // animate={selectedArtists.length === 3 ? { opacity: 0.5, pointerEvents: "none" } : { opacity: 1 }}
                    id="artist-suggestions"
                    className={classNames("grid my-10")}
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 400px))", justifyContent: "center" }}
                >
                    {artists.map((artist, index) => (
                        <ArtistCard
                            selected={!!selectedArtists.find(art => art?.id === artist.id)}
                            artist={artist}
                            index={index}
                            setSelectedArtist={setSelectedArtist}
                            removeSelectedArtist={removeSelectedArtist}
                            visible={true}
                            key={artist.id}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default ArtistPicker
