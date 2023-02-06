"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import api from "@/app/common/api";

export default function GithubStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const url = `https://github.com/login/oauth/authorize` +
        `?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}` +
        `&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}` +
        `&scope=user,repo` +
        `&state=${process.env.NEXT_PUBLIC_GITHUB_STATE}` +
        `&allow_signup=false` +
        `&response_type=code`
    useEffect(() => {
        async function run() {
            const data = await api('/user').catch(err => {
                if (err.status === 401) {
                    setLoggedIn(false)
                }
            })
            setLoggedIn(true)
            setUserName(data?.name)
        }

        run()
    })

    const clickGithub = () => {
        if(loggedIn) {
            return
        }
        location.href = url
    }

    return (
        <button
            className="inline-block flex gap-2 rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            onClick={clickGithub}
        >
            <Image src={"/github.svg"} width={24} height={24} alt={"github logo"}
                className={"fill-white"}/>
           {loggedIn ? userName : '登入'}
        </button>
    )
}