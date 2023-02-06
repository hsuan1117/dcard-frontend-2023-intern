import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Header from "@/app/Header";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={"bg-gray-100 min-h-screen"}>
        <Header/>
    </main>
  )
}
