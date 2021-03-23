export interface SpotifyData {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
    error?: string
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
    images: [
        {
            height?: string
            width?: string
            url: string
        }
    ]
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
