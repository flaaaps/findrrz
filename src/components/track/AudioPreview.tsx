/* eslint-disable react-hooks/exhaustive-deps */
// ^ these checks are disabled because the changing of refs before an effect is cleared is intended
import React, { useEffect, useRef, useState } from "react"
import { Track } from "../../types/spotify"
import interpolate, { Interpolation } from "../../utils/interpolate"
import { motion } from "framer-motion"
import { isMobile } from "react-device-detect"

type Props = {
    currentSong: Track
    targetVolume: number
}

const TrackAudioPreview: React.FC<Props> = ({ currentSong, targetVolume }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [progress, setProgress] = useState(0)

    const fadeInRef = useRef<Interpolation>(
        interpolate({
            from: 0,
            to: targetVolume,
            steps: 10,
            duration: 100,
            action: volume => (audioRef.current!.volume = coerceVolume(volume)),
        })
    )

    const fadeOutRef = useRef<Interpolation>(
        interpolate({
            from: targetVolume,
            to: 0,
            steps: 10,
            duration: 100,
            action: volume => (audioRef.current!.volume = coerceVolume(volume)),
        })
    )

    useEffect(() => {
        setProgress(0)
        const previewUrl = currentSong.preview_url
        if (!previewUrl) return

        const audio: HTMLAudioElement = new Audio(previewUrl)
        audioRef.current = audio
        audio.load()

        if (isMobile) {
            audio.volume = 0.1
        }

        let looping = false
        const listener = async () => {
            setProgress((audio.currentTime / audio.duration) * 100)
            if (audio.currentTime > audio.duration - 1.3 && !looping) {
                looping = true
                await fadeOutRef.current.start()
                audio.pause()
                audio.currentTime = 0
                setProgress(0)
                await audio.play()
                await fadeInRef.current.start()
                looping = false
            }
        }
        audio.addEventListener("timeupdate", listener)

        let interruped = false

        // start playback after 500ms
        setTimeout(async () => {
            if (interruped) return
            try {
                audio.volume = 0.0
                await audio.play()
            } catch (e) {
                audioRef.current = null
                setProgress(-1)
                interruped = true
                return
            }

            await fadeInRef.current!.start()
        }, 500)

        // kill progress listener and stop playback
        return () => {
            audio.removeEventListener("timeupdate", listener)

            if (interruped) return
            interruped = true
            fadeInRef.current.interrupt()
            fadeOutRef.current.start().then(() => audio.pause())
        }
    }, [currentSong])

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            audio.volume = coerceVolume(targetVolume)
            fadeInRef.current.to = targetVolume
            fadeOutRef.current.from = targetVolume
        }
    }, [targetVolume, currentSong])

    return (
        <>
            progress && (
            <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className="absolute bottom-0 left-0 w-full z-30 h-1.5 bg-primary-500"
            />
            <motion.div
                className="absolute bottom-0 left-0 z-30 h-1.5 bg-primary-700"
                animate={{ width: isNaN(progress) ? `0%` : `${progress}%` }}
                initial={{ width: "0%" }}
                transition={{ ease: "linear", duration: progress === 0 ? 0 : 1 }}
            />
            )
        </>
    )
}

function coerceVolume(volume: number) {
    return Math.max(0, Math.min(1, volume))
}

export default TrackAudioPreview
