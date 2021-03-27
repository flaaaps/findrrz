export interface SpotifyData {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
    error?: string
}

export interface Track {
    album: {
        artists: Artist[]
        external_urls: {
            spotify: string
        }
        id: string
        images: TrackImage[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: string
        uri: string
    }
    artists: Artist[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    is_local: boolean
    is_playable: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

type TrackImage = {
    height?: string
    width?: string
    url: string
}

export type SpotifyUser = {
    country: string
    display_name: string
    email: string
    explicit_content: {
        filter_enabled: boolean
        filter_locked: false
    }
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total: number
    }
    href: string
    id: string
    images: TrackImage[]
    product: "premium" | "free" | "open"
    type: string
    uri: string
}

export type SpotifyAuthError = {
    error: string
    error_description: string
}

export type Artist = {
    id: string
    name: string
    images: [
        {
            height: number
            width: number
            url: string
        }
    ]
    followers: {
        href: string | null
        total: number
    }
    genres: string[]
    href: string
    popularity: number
    uri: string
}
