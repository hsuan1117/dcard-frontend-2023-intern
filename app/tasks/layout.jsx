"use client"
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    Bars3BottomLeftIcon,
    XMarkIcon, ListBulletIcon, PlusCircleIcon
} from '@heroicons/react/24/outline'
import {usePathname} from "next/navigation";
import Link from "next/link";
import MobileTaskList from "@/app/tasks/MobileTaskList";
import TaskList from "@/app/tasks/TaskList";

const navigation = [
    {name: '任務列表', href: '/tasks', same: true, icon: ListBulletIcon},
    {name: '新增任務', href: '/tasks/add', same: true, icon: PlusCircleIcon},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <div className={"flex"}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel
                                    className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                        <nav className="space-y-1 px-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        (item.same ? item.href === pathname : item.href.startsWith(pathname))
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                        'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            (item.same ? item.href === pathname : item.href.startsWith(pathname))
                                                                ? 'text-gray-500'
                                                                : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <div className={'h-4 border-b'}/>
                                            <MobileTaskList pathname={pathname}/>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:relative md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
                        <div className="flex flex-grow flex-col">
                            <nav className="flex-1 space-y-1 px-2 pb-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            (item.same ? item.href === pathname : item.href.startsWith(pathname))
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                (item.same ? item.href === pathname : item.href.startsWith(pathname))
                                                    ? 'text-gray-500'
                                                    : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                                <div className={'h-4 border-b'}/>
                                <TaskList pathname={pathname}/>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
                        <div
                            className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white md:hidden">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>

                        <main className="flex-1">
                            <div className="py-6">
                                <div className="px-4 sm:px-6 md:px-0">
                                    <h1 className="text-2xl font-semibold text-gray-900">{navigation.filter(n => n.href === pathname)[0]?.name}</h1>
                                </div>
                                <div className="px-4 sm:px-6 md:px-0">
                                    {/* Replace with your content */}
                                    <div className="py-4">
                                        {children}
                                    </div>
                                    {/* /End replace */}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}