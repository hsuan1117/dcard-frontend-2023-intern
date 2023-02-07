"use client"
import {useEffect, useState} from "react";
import api from "@/app/common/api";
import {TrashIcon} from "@heroicons/react/24/outline";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import TaskStatus from "@/app/tasks/[task_num]/TaskStatus";

export default function Page({params}) {
    const [task, setTask] = useState(null)
    const username = localStorage.getItem('username')
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

    return (
        <>
            <div className="md:flex md:items-center md:justify-between border-b pb-3">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {task?.title}
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <TaskStatus task={params.task_num} status={task?.labels}/>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <PencilSquareIcon className={"h-4 w-4 mr-1"}/> 編輯
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <TrashIcon className={"h-4 w-4 mr-1"}/> 刪除
                    </button>
                </div>
            </div>
            <div className={"min-h-screen"}>
                {task?.body}
            </div>
        </>
    )
}