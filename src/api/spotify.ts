import { Artist, SpotifyUser } from "../types/spotify"
import { getAccessToken } from "./authorization"

export function getMe() {
    return new Promise<SpotifyUser | null>(async (resolve, reject) => {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
        })

        // invalid token
        if (!response.ok) {
            localStorage.setItem("user_access_token", "null")
            resolve(null)
        }
        const data: SpotifyUser = await response.json()
        resolve(data)
    })
}

export async function getArtist(id: string) {
    const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    return await res.json()
}

export function getArtists(ids: string[]) {}

export async function searchArtists(q: string): Promise<Artist[]> {
    if (q.length === 0) return []
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
    if (!res.ok) return []
    const data = await res.json()

    // console.log(data);
    return data.artists.items
}

export async function getTopArtists(): Promise<Artist[]> {
    return fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
        .then(async res => {
            if (!res.ok) return []
            const data = await res.json()
            return data.items
        })
        .catch(() => null)
    // if (!res.ok) return [];
    // const data = await res.json();
    // return data.items;
}
