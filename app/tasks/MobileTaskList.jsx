import useSWR from "swr";
import Link from "next/link";
import api from "@/app/common/api";
import {useEffect, useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname}) {
    const [username, setUsername] = useState(null)
    const {
        data: tasks,
        isLoading
    } = useSWR(`/repos/${username}/__task_db/issues?per_page=10&page=1`, url => api(url))

    useEffect(() => {
        localStorage.getItem("username") && setUsername(localStorage.getItem("username"))
    })
    if (isLoading) return (<span>載入中</span>)
    if (error) return (<span>出錯了</span>)

    return (
        <>
            {isLoading ?? '<span>載入中</span>'}
            {tasks && tasks.map((task) => (
                <Link
                    key={task.title}
                    href={`/tasks/${task.number}`}
                    className={classNames(
                        pathname.startsWith(`/tasks/${task.number}`)
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                    )}
                >
                    <div className={`mr-4 h-6 w-6 block ${JSON.parse(task.body ?? "{}")?.color} rounded-full`} ></div>

                    {task.title}
                </Link>
            ))}
        </>
    )
}