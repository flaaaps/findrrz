import { Artist, SpotifyUser } from "../types/spotify";

export function getMe(accessToken: string) {
    return new Promise<SpotifyUser | null>(async (resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // invalid token
            if (!response.ok) {
                localStorage.setItem("user_access_token", "null");
                resolve(null);
            }
            const data: SpotifyUser = await response.json();
            resolve(data);
        }, 0);
    });
}

export async function getArtist(id: string, accessToken: string) {
    const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await res.json();
}

export function getArtists(ids: string[], accessToken: string) {}

export async function searchArtists(q: string, accessToken: string): Promise<Artist[]> {
    if (q.length === 0) return [];
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return [];
    const data = await res.json();

    // console.log(data);
    return data.artists.items;
}

export async function getTopArtists(accessToken: string): Promise<Artist[]> {
    const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items;
}
