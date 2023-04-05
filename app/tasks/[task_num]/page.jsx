"use client"
import {useEffect, useState} from "react";
import api from "@/app/common/api";
import {TrashIcon} from "@heroicons/react/24/outline";
import {TrashIcon as TrashSolidIcon} from "@heroicons/react/24/solid";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import TaskStatus from "@/app/tasks/[task_num]/TaskStatus";
import {useRouter} from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Page({params}) {
    const router = useRouter()
    const [task, setTask] = useState(null)
    const [trashIcon, setTrashIcon] = useState(1)
    const username = (typeof localStorage!=="undefined"?localStorage.getItem('username'):"")
    useEffect(() => {
        async function run() {
            const issue = await api(`/repos/${username}/__task_db/issues/${params.task_num}`).catch(err => {
                alert("something went wrong")
            })
            if (issue) {
                issue.style = JSON.parse(issue.body ?? "{}")
                issue.body = issue.style?.body ?? ''
                setTask(issue)
            }
        }

        run()
    }, [username, params.task_num])

    const del = () => {
        if (trashIcon === 1) {
            setTrashIcon(2)
            return
        }
        api(`/repos/${username}/__task_db/issues/${params.task_num}`, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'closed'
            })
        }).catch(err => {
            alert("something went wrong")
        }).then(() => {
            router.replace('/tasks')
        })
    }

    return (
        <>
            <div className="md:flex md:items-center md:justify-between border-b pb-3">
                <div className="min-w-0 flex-1">
                    <h2 className="flex items-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        <div className={`mr-3 h-6 w-6 block ${task?.style?.color} rounded-full`}></div>
                        {task?.title}
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <TaskStatus task={params.task_num} status={task?.labels}/>
                    <Link
                        href={`/tasks/${params.task_num}/edit`}
                        className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <PencilSquareIcon className={"h-4 w-4 mr-1"}/> 編輯
                    </Link>
                    <button
                        onClick={del}
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <div className={"h-4 w-4 mr-1"}>{trashIcon === 1 ? <TrashIcon/> : <TrashSolidIcon/>}</div>
                        刪除
                    </button>
                </div>
            </div>
            <div className={"min-h-screen"}>
                <ReactMarkdown children={task?.body ?? '無內容'}></ReactMarkdown>
            </div>
        </>
    )
}