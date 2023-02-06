"use client"
export default function api(url, options) {
    const token = localStorage.getItem("token")

    return fetch("https://api.github.com" + url, {
        ...options,
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        }
    }).then(res => res.json())
}