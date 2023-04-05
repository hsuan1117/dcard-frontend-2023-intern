"use client"
import {useRouter} from "next/navigation";
import api from "@/app/common/api";
import {useEffect, useState} from "react";
import Form from "@/app/tasks/Form";
import TaskStatus from "@/app/tasks/[task_num]/TaskStatus";
import Link from "next/link";
import {PencilSquareIcon, TrashIcon as TrashSolidIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";

export default function ({params}) {
    const router = useRouter();
    const [task, setTask] = useState(null)
    const username = typeof localStorage !== "undefined" ? localStorage.getItem('username') : ''
    useEffect(() => {
        // check repo exists

        async function run() {
            await api(`/repos/${username}/__task_db/issues/${params?.task_num}`).then(res => {
                // res is a json
                console.log(res)
                res.style = JSON.parse(res.body ?? "{}")
                res.body = res.style?.body ?? ''
                setTask(res)
            })
        }

        run()
    }, [params])

    const submit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const name = data.get('name')
        const body = data.get('body')
        const issue = await api(`/repos/${username}/__task_db/issues/${params?.task_num}`, {
            method: 'PATCH',
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

        console.log(issue)
        if (issue) {
            router.push(`/tasks/${issue.number}`)
        }
    }

    return (
        <>
            <div className="md:flex md:items-center md:justify-between border-b pb-3">
                <div className="min-w-0 flex-1">
                    <h2 className="flex items-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        編輯
                        <div className={`mx-3 h-6 w-6 block ${task?.style?.color} rounded-full`}></div>
                        {task?.title}
                    </h2>
                </div>
            </div>
            <div className={"min-h-screen"}>
                <Form onSubmit={submit} onCancel={() => {
                    router.replace('/tasks')
                }} name={task?.title} body={task?.body} colorValue={task?.style?.color}/>
            </div>
        </>
    )
}
