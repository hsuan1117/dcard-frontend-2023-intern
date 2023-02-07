import useSWR from "swr";
import Link from "next/link";
import {DocumentIcon, FolderIcon} from "@heroicons/react/24/outline";
import api from "@/app/common/api";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({pathname}) {
    const username = localStorage.getItem("username")
    const {
        data: tasks,
        isLoading
    } = useSWR(`/repos/${username}/__task_db/issues`, url => api(url))
    return (
        <>
            {isLoading ?? '<span>載入中</span>'}
            {tasks && tasks.map((task) => (
                <Link
                    key={task.title}
                    href={`/tasks/${task.number}`}
                    className={classNames(
                        pathname.startsWith(`/tasks/${task.number}`) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    )}
                >
                    <div className={`mr-3 h-6 w-6 block ${JSON.parse(task.body ?? "{}")?.color} rounded-full`} ></div>
                    {task.title}
                </Link>
            ))}
        </>
    )
}