function writeVolume(volume: number) {
    localStorage.setItem("volume", String(volume))
}

function readVolume(): number | null {
    const item = localStorage.getItem("volume")
    if (item) {
        const number = parseInt(item)
        return isNaN(number) ? null : number
    } else return null
}

export {writeVolume, readVolume}