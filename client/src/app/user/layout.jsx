import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default async function RootLayout({ children }) {
    const links = [
        { name: "Profile", href: "/user/profile" },
        { name: "Orders", href: "/user/orders" },
        { name: "My Blogs", href: "/user/my-blogs" },
        { name: "Setting", href: "/user/setting" },
    ]

    return (
        <>
            <Navbar />
            <div className="mx-auto flex max-w-6xl gap-8 px-4 py-10">
                {/* Sidebar */}
                <aside className="hidden w-60 border-r border-gray-200 pr-6 md:block">
                    <h2 className="mb-6 text-lg font-bold">My Account</h2>
                    <nav className="flex flex-col gap-2">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className={`rounded-md px-3 py-2 font-medium hover:bg-gray-100`}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Page Content */}
                <main className="flex-1">{children}</main>
            </div>
            <Footer />
        </>
    )
}
