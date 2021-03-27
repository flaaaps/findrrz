import { Artist, SpotifyUser, Track } from "../types/spotify"
import { authorizationHeaders, getAccessToken } from "./authorization"

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

export async function getTopArtists(timeRange?: "short_term" | "medium_term" | "long_term"): Promise<Artist[]> {
    return fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange || "short_term"}`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
        .then(async res => {
            if (!res.ok) return []
            const data = await res.json()
            return data.items
        })
        .catch(() => [])
    // if (!res.ok) return [];
    // const data = await res.json();
    // return data.items;
}

// interface RelatedArtist extends Artist {
//     to: Artist
// }
export async function getRelatedArtistsTopTracks(artistId: string, artistOffset: number = 0): Promise<Track[]> {
    const relatedArtistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    })
    const { artists: relatedArtists } = await relatedArtistRes.json()
    const relatedArtist: Artist = relatedArtists[artistOffset]

    return fetch(`https://api.spotify.com/v1/artists/${relatedArtist.id}/top-tracks?country=US`, {
        headers: authorizationHeaders(),
    }).then(async res => {
        const { tracks }: { tracks: Track[] } = await res.json()
        return tracks
    })
}
