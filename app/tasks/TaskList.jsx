import useSWR from "swr";
import Link from "next/link";
import {DocumentIcon, FolderIcon} from "@heroicons/react/24/outline";
import api from "@/app/common/api";
import {ArrowPathIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname}) {
    const [username, setUsername] = useState(null)
    const [page, setPage] = useState(1)
    const {
        data,
        isLoading,
        error,
        mutate
    } = useSWR(`/repos/${username}/__task_db/issues?per_page=10&page=${page}`, url => api(url), {refreshInterval: 1500})

    useEffect(() => {
        localStorage.getItem("username") && setUsername(localStorage.getItem("username"))
    })

    const handleScroll = (e) => {
        if (Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1 && data.length === 10)
            setPage(page + 1)
    }

    if (isLoading) return (<span>載入中</span>)
    if (error) return (<span>出錯了</span>)

    return (
        <>
            {Array.isArray(data) && data?.length === 0 && <span>沒有任何任務</span>}
            <div className={"flex flex-col gap-2 overflow-y-auto h-[34rem] shadow-inner"} onScroll={handleScroll}>
                {Array.isArray(data) && data?.map((task) => (
                    <Link
                        key={task.title}
                        href={`/tasks/${task.number}`}
                        className={classNames(
                            pathname.startsWith(`/tasks/${task.number}`) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group rounded-md py-2 px-2 flex items-center text-sm font-medium h-12'
                        )}
                    >
                        <div
                            className={`mr-3 h-6 w-6 block ${JSON.parse(task.body ?? "{}")?.color} rounded-full`}></div>
                        {task.title}
                    </Link>
                ))}
            </div>
            <button onClick={mutate}
                    className={"flex w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-2 items-center text-sm font-medium"}>
                <ArrowPathIcon
                    className={'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'}
                />更新
            </button>
        </>
    )
}