"use client"
import {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/20/solid'
import {ArrowPathRoundedSquareIcon, CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchTaskStatus({task, state, setState}) {
    const publishingOptions = [
        {title: '未開始',description: '這項任務還沒開始', current: state?.includes('未開始'), icon: XCircleIcon},
        {
            title: '進行中',
            description: '這項任務已經著手進行了',
            current: state?.includes('進行中'),
            icon: ArrowPathRoundedSquareIcon
        },
        {
            title: '已完成',
            description: '這項任務已經完成了',
            current: state?.includes('已完成'),
            icon: CheckCircleIcon
        },
    ]

    const [selected, setSelected] = useState(publishingOptions.filter((option) => option.current)[0] ?? publishingOptions[0])
    const statusChange = async (new_status) => {
        setState(new_status.title)
        setSelected(new_status)
    }

    return (
        <Listbox value={selected} onChange={statusChange}>
            {({open}) => (
                <>
                    <Listbox.Label className="sr-only"> Change published status </Listbox.Label>
                    <div className="relative">
                        <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                            <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                                <div
                                    className="inline-flex items-center rounded-l-md border border-transparent bg-indigo-500 py-2 pl-3 pr-4 text-white shadow-sm">
                                    <selected.icon className="h-5 w-5" aria-hidden="true"/>
                                    <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                                </div>
                                <Listbox.Button
                                    className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-500 p-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                    <span className="sr-only">Change published status</span>
                                    <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true"/>
                                </Listbox.Button>
                            </div>
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {publishingOptions.map((option) => (
                                    <Listbox.Option
                                        key={option.title}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-500' : 'text-gray-900',
                                                'cursor-default select-none p-4 text-sm'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({selected, active}) => (
                                            <div className="flex flex-col">
                                                <div className="flex gap-1">
                                                    <option.icon className="h-5 w-5"/>
                                                    <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                                                    {selected ? (
                                                        <span className={active ? 'text-white' : 'text-indigo-500'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                            </span>
                                                    ) : null}
                                                </div>
                                                <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                                                    {option.description}
                                                </p>
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
