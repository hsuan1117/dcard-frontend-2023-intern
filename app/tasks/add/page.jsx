"use client"
import {useRouter} from "next/navigation";
import api from "@/app/common/api";
import {useEffect} from "react";
import Form from "@/app/tasks/Form";

export default function () {
    const router = useRouter();
    useEffect(() => {
        // check repo exists
        const username = typeof localStorage!=="undefined"?localStorage.getItem('username'):""

        async function run() {
            if(localStorage.getItem('created') === 'true') {
                return
            }
            await fetch(`https://api.github.com/repos/${username}/__task_db`).then(res => {
                if (res.status === 404) {
                    localStorage.setItem('created', 'true')
                    return api(`/user/repos`, {
                        method: 'POST',
                        body: JSON.stringify({
                            name: '__task_db',
                            private: true,
                        })
                    })
                }
            })
        }
        run()
    })

    const submit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const name = data.get('name')
        const body = data.get('body')
        const username = localStorage.getItem('username')
        const issue = await api(`/repos/${username}/__task_db/issues`, {
            method: 'POST',
            body: JSON.stringify({
                title: name,
                body: JSON.stringify({
                    body,
                    color: data.get('color'),
                }),
            })
        }).catch(err => {
            alert("something went wrong")
        })

        if (issue) {
            router.push(`/tasks/${issue.number}`)
        }
    }

    return (
        <div className={"bg-gray-100"}>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <Form onSubmit={submit} onCancel={() => {
                    router.replace('/tasks')
                }}/>
            </div>
        </div>
    )
}
