export function getAccessToken(): string | null {
    const accessToken = localStorage.getItem("user_access_token")
    const expiresAtString = localStorage.getItem("expires_at")

    if (!accessToken || !expiresAtString) return null

    const currentSeconds = Date.now() / 1000
    const expiresAt = parseInt(expiresAtString)

    if (isNaN(expiresAt) || currentSeconds > expiresAt) {
        console.log("Access token is expired")
        return null
    }

    return accessToken
}

export function logout() {
    localStorage.removeItem("user_access_token")
    localStorage.removeItem("expires_at")
}

export function authorizationHeaders() {
    return { Authorization: "Bearer " + getAccessToken() }
}
