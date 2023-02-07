import './globals.css'
import Header from "@/app/Header";

export default function RootLayout({children}) {
    return (
        <html lang="zh-Hant">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
        <body className="min-h-screen bg-gray-100">
        <Header/>
        <main className="mt-2 pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="sr-only">Page title</h1>
                {/* Main 3 column grid */}
                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                    {/* Left column */}
                    <div className="mt-12 grid grid-cols-1 gap-4 lg:col-span-3">
                        <section aria-labelledby="section-1-title">
                            <h2 className="sr-only" id="section-1-title">
                                Section title
                            </h2>
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="p-6">{children}</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                    <span className="block sm:inline">&copy; 2021 Your Company, Inc.</span>{' '}
                    <span className="block sm:inline">All rights reserved.</span>
                </div>
            </div>
        </footer>
        </body>
        </html>
    )
}
