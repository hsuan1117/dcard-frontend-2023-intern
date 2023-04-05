"use client"
import Search from "@/app/tasks/Search";
import {useState} from "react";
import TaskListLarge from "@/app/tasks/TaskListLarge";

export default function Page() {
    const [content, setContent] = useState("")
    const [state, setState] = useState("進行中")
    const [sortType, setSortType] = useState(0)
    return (
        <>
            <h2 className={"text-2xl"}>歡迎使用 Task Management System</h2>
            <Search content={content} setContent={setContent} state={state} setState={setState} setSortType={setSortType} sortType={sortType}/>
            <TaskListLarge content={content} state={state} sortType={sortType}/>
        </>
    )
}