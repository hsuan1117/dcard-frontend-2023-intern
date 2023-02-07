"use client"
import {useRouter} from "next/navigation";
import api from "@/app/common/api";
import {useEffect} from "react";

export default function () {
    const router = useRouter();
    useEffect(() => {
        // check repo exists
        const username = localStorage.getItem('username')

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
                <form className="space-y-6" onSubmit={submit} method="POST">
                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">任務設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    任務的顯示資訊
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="name"
                                               className="block text-sm font-medium text-gray-700">
                                            名稱
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="名稱"
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="body"
                                               className="block text-sm font-medium text-gray-700">
                                            內容
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <textarea
                                                name="body"
                                                id="body"
                                                rows={5}
                                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="內容"
                                                minLength={30}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                        顏色
                                    </label>
                                    <div className="mt-1 flex flex-wrap gap-4 grid grid-cols-7">
                                        {
                                            [["bg-blue-300", "text-blue-300"], ["bg-blue-800", "text-blue-800"], ["bg-green-300", "text-green-300"], ["bg-green-800", "text-green-800"], ["bg-yellow-300", "text-yellow-300"], ["bg-yellow-800", "text-yellow-800"], ["bg-red-300", "text-red-300"], ["bg-red-800", "text-red-800"], ["bg-purple-300", "text-purple-300"], ["bg-purple-800", "text-purple-800"], ["bg-pink-300", "text-pink-300"], ["bg-pink-800", "text-pink-800"], ["bg-gray-300", "text-gray-300"], ["bg-gray-800", "text-gray-800"]]
                                                .map(([color, text]) => (
                                                <input type={"radio"} key={color} name={"color"} value={color} className={`${color} ${text} border-0 checked:border-0 block h-8 w-8 cursor-pointer`}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">題庫設定</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    這些設定會影響到題庫的使用
                                </p>
                            </div>
                            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                <fieldset>
                                    <legend className="contents text-base font-medium text-gray-900">
                                        是否公開
                                    </legend>
                                    <p className="text-sm text-gray-500">
                                        公開的題庫可以被其他出題者使用
                                    </p>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="public"
                                                name="public"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="public"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                公開
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                router.replace('/tasks')
                            }}
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
