"use client"
import {CheckIcon, LinkIcon} from '@heroicons/react/20/solid'
import useSWR from "swr";
import api from "@/app/common/api";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function TaskListLarge({content, state, sortType}) {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState(encodeURIComponent(content))
    const [username, setUsername] = useState("")
    const {
        data,
        isLoading,
        error,
        mutate
    } = useSWR(`/search/issues?q=${query}&per_page=10&page=${page}`, url => api(url))

    useEffect(() => {
        localStorage.getItem("username") && setUsername(localStorage.getItem("username"))
    })

    useEffect(() => {
        setQuery(encodeURIComponent(`repo:${username}/__task_db is:issue label:${state}`))
    }, [content, sortType, state])


    const handleScroll = (e) => {
        if (Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1 && data.length === 10) {
            setPage(page + 1)
        }
    }

    Object.defineProperty(Array.prototype, 'customSort', {
        value: function() {
            if(sortType)
                return [].concat(this).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            else
                return [].concat(this).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        },
        configurable: true
    });

    if (isLoading) return (<span>載入中</span>)
    if (error) return (<span>出錯了</span>)


    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 overflow-scroll  h-[54rem]"
                onScroll={handleScroll}>
                {Array.isArray(data?.items) && data?.items?.filter(r => r.title.includes(content) || r.body.includes(content))?.sort(r => new Date(r.created_at).getTime())?.customSort()?.map((todo) => (
                    <li key={'largelist;' + todo.number}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow h-[11rem]">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-4 w-4 block ${JSON.parse(todo.body ?? "{}")?.color} rounded-full`}></div>
                                    <h3 className="truncate text-sm font-medium text-gray-900">{todo.title}</h3>
                                    <span
                                        className="inline-block flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                  {todo.labels?.map((label) => (label.name))}
                                </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{JSON.parse(todo.body ?? "{}")?.body ?? '無內容'}</p>
                                <p className="mt-4 truncate text-sm text-gray-500">建立時間：{new Date(todo?.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <Link
                                        href={`/tasks/${todo.number}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        開啟
                                    </Link>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <button
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                                        完成
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                {!Array.isArray(data?.items) || data?.items?.length === 0 && (
                    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-2">
                                    <h3 className="truncate text-sm font-medium text-gray-900">沒有任何結果</h3>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}
