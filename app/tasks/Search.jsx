"use client"
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import SearchTaskStatus from "@/app/tasks/SearchTaskStatus";
import SearchTaskSort from "@/app/tasks/SearchTaskSort";

export default function Search({content, setContent, state, setState, sortType, setSortType}) {
    return (
        <>
            <div className={"flex flex-row justify-end gap-1"}>
                <SearchTaskSort sortType={sortType} setSortType={setSortType}/>
                <SearchTaskStatus state={state} setState={setState}/>
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                    搜尋字串
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </div>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="查詢todo"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}
