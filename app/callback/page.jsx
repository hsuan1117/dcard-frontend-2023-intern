"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function callback() {
    const router = useRouter()
    const params = useSearchParams()
    useEffect(() => {
        const code = params.get('code')
        const state = params.get('state')
        if (!code || !state) {
            alert("error")
            return
        }
        if (state !== process.env.NEXT_PUBLIC_GITHUB_STATE) {
            alert('state 不一致')
            return
        }

        async function run() {
            const data = await fetch('/api/github', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                })
            }).then(res => res.json()).catch(err=>{
                alert('error')
            })

            if(window.localStorage)window.localStorage.setItem('token', data.access_token)
        }

        run().then(() => {
            router.replace('/')
        })
    })
    return (
        <div>We'll redirect you in 5 second.</div>
    )
}