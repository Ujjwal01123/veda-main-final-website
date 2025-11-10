"use client"
import React, { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import useRudraksha from "@/hooks/useRudraksha"
import useBracelet from "@/hooks/useBracelet"
import Image from "next/image"
import Link from "next/link"

export default function SearchBarWithSuggestions() {
    const { rudraksha } = useRudraksha()
    const { bracelet } = useBracelet()
    const [query, setQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    // Combine and tag each product with its type
    const products = useMemo(() => {
        const taggedRudraksha = rudraksha.map((p) => ({ ...p, type: "rudraksha" }))
        const taggedBracelet = bracelet.map((p) => ({ ...p, type: "bracelet" }))
        return [...taggedRudraksha, ...taggedBracelet]
    }, [rudraksha, bracelet])

    const filtered = useMemo(() => {
        const q = query?.trim().toLowerCase()
        if (!q) return []
        return products.filter((p) => p.productName?.toLowerCase().includes(q))
    }, [query, products])

    return (
        <div className="relative w-full">
            <div className="relative w-full">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    type="search"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setShowSuggestions(true)
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full rounded-full pl-10 focus:border-yellow-500"
                />
            </div>

            {showSuggestions && filtered.length > 0 && (
                <Card className="bg-popover absolute top-full z-10 mt-2 max-h-[400px] w-full overflow-y-auto rounded-xl border shadow-lg sm:left-0 sm:max-w-full md:max-h-[500px]">
                    {filtered.map((item) => {
                        const href = item.type === "rudraksha" ? `/rudraksha/${item._id}` : `/bracelet/${item._id}`

                        return (
                            <Link
                                href={href}
                                key={item._id}
                                className="hover:bg-accent flex cursor-pointer items-center gap-3 p-3 transition-colors sm:gap-2 sm:p-2"
                                onClick={() => {
                                    setQuery(item.productName)
                                    setShowSuggestions(false)
                                }}
                            >
                                <div className="flex-shrink-0">
                                    <Image width={1000} height={1000} src={item?.productImage?.[0]} alt={item.productName || "Product"} className="h-10 w-10 rounded-md object-cover sm:h-8 sm:w-8" />
                                </div>
                                <span className="text-foreground truncate text-sm font-medium sm:text-xs">{item.productName}</span>
                            </Link>
                        )
                    })}
                </Card>
            )}

            {showSuggestions && query && filtered.length === 0 && (
                <Card className="bg-popover text-muted-foreground absolute top-full z-10 mt-2 grid w-full place-items-center overflow-hidden rounded-xl border p-4 text-sm shadow-lg sm:text-xs">
                    No results found.
                </Card>
            )}
        </div>
    )
}

// "use client"
// import React, { useState, useMemo } from "react"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { Search } from "lucide-react"
// import useRudraksha from "@/hooks/useRudraksha"
// import useBracelet from "@/hooks/useBracelet"
// import Image from "next/image"
// import Link from "next/link"

// export default function SearchBarWithSuggestions() {
//     const { rudraksha } = useRudraksha()
//     const { bracelet } = useBracelet()
//     const products = [...rudraksha, ...bracelet]
//     const [query, setQuery] = useState("")
//     const [showSuggestions, setShowSuggestions] = useState(false)

//     const filtered = useMemo(() => {
//         const q = query?.trim().toLowerCase()
//         if (!q) return []
//         return products.filter((p) => p.productName.toLowerCase().includes(q))
//     }, [query, products])

//     return (
//         <div className="relative w-full">
//             <div className="relative w-full">
//                 <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                     type="search"
//                     placeholder="Search products..."
//                     value={query}
//                     onChange={(e) => {
//                         setQuery(e.target.value)
//                         setShowSuggestions(true)
//                     }}
//                     onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//                     className="w-full rounded-full pl-10 focus:border-yellow-500"
//                 />
//             </div>

//             {showSuggestions && filtered.length > 0 && (
//                 <Card className="bg-popover absolute top-full z-10 mt-2 max-h-[400px] w-full overflow-y-auto rounded-xl border shadow-lg sm:left-0 sm:max-w-full md:max-h-[500px]">
//                     {filtered.map((item) => (
//                         <Link
//                             href={`/${item?.productType}/${item?._id}`}
//                             key={item._id}
//                             className="hover:bg-accent flex cursor-pointer items-center gap-3 p-3 transition-colors sm:gap-2 sm:p-2"
//                             onClick={() => {
//                                 setQuery(item.productName)
//                                 setShowSuggestions(false)
//                             }}
//                         >
//                             <div className="flex-shrink-0">
//                                 <Image width={1000} height={1000} src={item?.productImage?.[0]} alt={item.productName} className="h-10 w-10 rounded-md object-cover sm:h-8 sm:w-8" />
//                             </div>
//                             <span className="text-foreground truncate text-sm font-medium sm:text-xs">{item.productName}</span>
//                         </Link>
//                     ))}
//                 </Card>
//             )}

//             {showSuggestions && query && filtered.length === 0 && (
//                 <Card className="text-muted-foreground bg-popover absolute top-full z-10 mt-2 grid w-full place-items-center overflow-hidden rounded-xl border p-4 text-sm shadow-lg sm:text-xs">
//                     No results found.
//                 </Card>
//             )}
//         </div>
//     )
// }
