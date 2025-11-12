"use client"

import { getBraceletById } from "@/apis/controllers/braceletController.js"
import { useCart } from "@/context/cartContext"
import useBracelet from "@/hooks/useBracelet"
import { calculateDiscount } from "@/utils/utils"
import { Share, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const { addItem } = useCart()
    const { bracelet } = useBracelet()
    const [certificate, setCertificate] = useState(null)
    const [size, setSize] = useState(null)
    const router = useRouter()
    const [mainImageIdx, setMainImageIdx] = useState(0)
    const [showShare, setShowShare] = useState(false)
    const [selected, setSelected] = useState(false)
    const [formData, setFormData] = useState({
        wearerName: "",
        dob: "",
        birthPlace: "",
        time: "",
        gender: "male",
        gotra: "",
        purpose: "general",
    })

    useEffect(() => {
        // when product updates, set default selects
        if (product?.sizes?.length) setSize(product.sizes[0]._id)
        if (product?.certificates?.length) setCertificate(product.certificates[0]._id)
    }, [product])

    const validateForm = () => {
        const requiredFields = ["wearerName", "dob", "birthPlace", "time", "gender", "purpose"]
        return requiredFields.every((field) => formData[field]?.trim())
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const fetchBracelet = async () => {
        try {
            const res = await getBraceletById(id)
            // expected res.data.bracelet
            if (res?.data?.bracelet) setProduct(res.data.bracelet)
            else setProduct(res?.data || {})
        } catch (err) {
            // console.error("Error fetching bracelet:", err)
            toast.error("Failed to load product")
        }
    }

    useEffect(() => {
        fetchBracelet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const copyLink = () => {
        const currentUrl = typeof window !== "undefined" ? window.location.href : `https://vedastructure.com/bracelet/${id}`
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => toast.success("Link Copied! 📋"))
            .catch(() => toast.error("Failed to copy link"))
    }

    const handleChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex]
        const value = Number(selectedOption.value || 0)
        const isHaveForm = selectedOption.dataset.ishaveform === "true"
        setSelected({ value, isHaveForm })
    }

    const basePrice = product.productPrice || 0
    const energizationPrice = selected?.value || 0
    const finalPrice = basePrice + energizationPrice

    // Helper to clean HTML text (remove brackets, quotes, etc.)
    const cleanHTML = (value) => {
        if (!value) return ""
        let html = Array.isArray(value) ? value[0] : value
        if (typeof html !== "string") html = String(html)
        try {
            // If it's a JSON string like '["<p>text</p>"]', parse it
            const parsed = JSON.parse(html)
            if (Array.isArray(parsed)) html = parsed[0]
            else if (typeof parsed === "object" && parsed.content) html = parsed.content
        } catch {}
        return html.replace(/^(\[|")|(\]|")$/g, "")
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-600">
                <button className="font-semibold hover:text-yellow-600"> Home &gt; </button>
                <button className="font-semibold hover:text-yellow-600"> Store &gt; </button>
                <button className="font-semibold hover:text-yellow-600">Bracelet &gt;</button>
                <span className="font-bold text-red-600">{product?.productName || "Bracelet"}</span>
            </div>

            {/* Product Section */}
            <section className="mx-auto grid max-w-7xl gap-8 p-4 sm:p-6 md:grid-cols-2">
                {/* Images */}
                <div>
                    {product?.productImage?.[mainImageIdx] ? (
                        <Image
                            src={product.productImage[mainImageIdx]}
                            alt={product?.productName || "Product Image"}
                            width={800}
                            height={800}
                            className="mb-4 w-full rounded-lg object-cover shadow-md"
                        />
                    ) : (
                        <div className="mb-4 flex h-[500px] w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">No Image Available</div>
                    )}

                    <div className="hiderScrollbar flex space-x-3 overflow-auto">
                        {(product.productImage || []).map((img, idx) =>
                            img ? (
                                <Image
                                    key={img + idx}
                                    src={img}
                                    onClick={() => setMainImageIdx(idx)}
                                    className={`h-20 w-20 cursor-pointer rounded border hover:border-2 ${mainImageIdx === idx ? "border-yellow-700" : "border-gray-300"}`}
                                    width={100}
                                    height={100}
                                    alt={"thumb-" + idx}
                                />
                            ) : (
                                <div key={"placeholder-" + idx} className="flex h-20 w-20 items-center justify-center rounded border border-gray-300 bg-gray-100 text-xs text-gray-400">
                                    No Img
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-gray-500">Bracelet</h2>
                            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>

                            <div className="flex items-end gap-2">
                                <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(finalPrice, product.productDiscount)}</p>
                                <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{finalPrice}</p>
                                <p className="text-md mt-2 font-bold text-green-600">{product.productDiscount}% OFF</p>
                            </div>

                            {product.shopifyLink && (
                                <a
                                    href={product.shopifyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-yellow-500 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10m0 0a2 2 0 11-4 0m4 0a2 2 0 104 0" />
                                    </svg>
                                    Buy on Shopify
                                </a>
                            )}

                            <p className="text-lg font-semibold text-gray-500">100% Authentic Bracelet</p>
                        </div>

                        {/* Share button */}
                        <div className="flex space-x-3">
                            <button
                                className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-yellow-100 hover:text-yellow-600"
                                onClick={() => setShowShare(true)}
                                aria-label="Share product"
                            >
                                <Share />
                            </button>
                        </div>
                    </div>

                    <marquee behavior="alternate" direction="right" className="font-bold text-red-500">
                        Offer Available: 25/08/25 - 20/09/25
                    </marquee>

                    {/* Energization select */}
                    <div>
                        <label className="mt-4 block font-semibold">Pooja/Energization</label>
                        <select className="mt-1 w-full rounded-lg border p-2" onChange={handleChange} defaultValue="">
                            <option value="0">--choose--</option>
                            {(product.energization || []).map((item, idx) => (
                                <option className="capitalize" key={idx} value={item.price} data-ishaveform={item.isHaveForm}>
                                    {item.title} - ₹{item.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Energization form if required */}
                    {selected?.isHaveForm && (
                        <div className="mt-2 space-y-2 rounded-xl border bg-yellow-50 p-4">
                            {[
                                { label: "Name of wearer:", name: "wearerName", type: "text" },
                                { label: "Date of Birth:", name: "dob", type: "date" },
                                { label: "Place of Birth:", name: "birthPlace", type: "text" },
                                { label: "Time of Birth:", name: "time", type: "time" },
                            ].map(({ label, name, type }) => (
                                <div key={name} className="grid items-center gap-1 sm:grid-cols-2">
                                    <label htmlFor={name} className="font-medium">
                                        {label}
                                    </label>
                                    <input type={type} className="w-full rounded-lg border border-gray-400 p-2" name={name} value={formData[name]} onChange={handleFormChange} />
                                </div>
                            ))}

                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label className="font-medium">Gender:</label>
                                <select name="gender" className="w-full rounded-lg border border-gray-400 p-2" value={formData.gender} onChange={handleFormChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label htmlFor="gotra" className="font-medium">
                                    Clan/Gotra (If Available):
                                </label>
                                <input type="text" className="w-full rounded-lg border border-gray-400 p-2" name="gotra" id="gotra" value={formData.gotra} onChange={handleFormChange} />
                            </div>

                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label className="font-medium">Primary Purpose:</label>
                                <select name="purpose" className="w-full rounded-lg border border-gray-400 p-2" value={formData.purpose} onChange={handleFormChange}>
                                    <option value="general">General</option>
                                    <option value="health">Health</option>
                                    <option value="wealth-fortune">Wealth & Fortune</option>
                                    <option value="education">Education</option>
                                    <option value="personal-relations">Personal Relations</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Size radio buttons */}
                    <div className="my-2 flex flex-wrap gap-3">
                        {(product.sizes || []).map((item) => (
                            <label
                                key={item._id}
                                className={`cursor-pointer rounded-xl border px-2 transition ${size === item._id ? "border-gray-300 bg-orange-500 text-white shadow-md" : "border-gray-300 bg-white hover:bg-gray-100"}`}
                            >
                                <input type="radio" name="options" value={item.size} checked={size === item._id} onChange={() => setSize(item._id)} className="hidden" />
                                <span className="font-medium">{item.size}</span>
                            </label>
                        ))}
                    </div>

                    {/* Certificates */}
                    <div className="my-2 flex flex-wrap gap-3">
                        {(product.certificates || []).map((item) => (
                            <label
                                key={item._id}
                                className={`cursor-pointer rounded-xl border px-2 transition ${certificate === item._id ? "border-gray-300 bg-orange-500 text-white shadow-md" : "border-gray-300 bg-white hover:bg-gray-100"}`}
                            >
                                <input type="radio" name="cert" value={item.type} checked={certificate === item._id} onChange={() => setCertificate(item._id)} className="hidden" />
                                <span className="font-medium">{item.type}</span>
                            </label>
                        ))}
                    </div>

                    {/* Add to cart / Buy buttons */}
                    {product?.stock <= 0 && <p className="mt-2 text-sm text-red-500">Out of stock</p>}
                    {!product?.stock <= 0 && (
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => {
                                    if (selected?.isHaveForm) {
                                        if (validateForm()) {
                                            addItem({
                                                ...product,
                                                productPrice: finalPrice,
                                                selectedEnergization: selected,
                                                energizationForm: selected?.isHaveForm ? formData : null,
                                            })
                                            toast.success("Added to cart!")
                                        } else toast.error("Please fill all the fields")
                                    } else {
                                        addItem({
                                            ...product,
                                            productPrice: finalPrice,
                                            selectedEnergization: selected,
                                        })
                                        toast.success("Added to cart!")
                                    }
                                }}
                                className="mt-4 w-full rounded-lg border border-yellow-600 px-6 py-3 font-semibold text-yellow-600 transition duration-300 hover:bg-yellow-500 hover:shadow-md"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() => {
                                    if (selected?.isHaveForm) {
                                        if (validateForm()) {
                                            addItem({
                                                ...product,
                                                productPrice: finalPrice,
                                                selectedEnergization: selected,
                                                energizationForm: formData,
                                            })
                                            toast.success("Added to cart!")
                                            router.push("/checkout")
                                        } else toast.error("Please fill all the fields")
                                    } else {
                                        addItem({
                                            ...product,
                                            productPrice: finalPrice,
                                            selectedEnergization: selected,
                                        })
                                        toast.success("Added to cart!")
                                        router.push("/checkout")
                                    }
                                }}
                                className="mt-4 w-full rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-yellow-500 hover:shadow-md"
                            >
                                Buy now
                            </button>
                        </div>
                    )}

                    {/* Product features */}
                    <div
                        className="prose prose-gray mt-4 max-w-none [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                        dangerouslySetInnerHTML={{ __html: cleanHTML(product.productFeatures) }}
                    ></div>
                </div>
            </section>

            {/* Tabs Section */}
            <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
                <div className="mt-8">
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="flex flex-wrap justify-start gap-2 rounded-2xl p-1">
                            {[
                                { value: "about", label: "About Product" },
                                { value: "benefits", label: "Benefits" },
                                { value: "faq", label: "FAQ's" },
                                { value: "shipping", label: "Shipping & Return" },
                                { value: "yt-video", label: "Product Video" },
                                { value: "reviews", label: "Product Reviews" },
                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/70 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600"
                                >
                                    {tab.label}
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 -z-10 rounded-xl bg-white/40 backdrop-blur-sm"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="about">
                            <div
                                className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                dangerouslySetInnerHTML={{ __html: cleanHTML(product.productAbout) }}
                            ></div>
                        </TabsContent>

                        <TabsContent value="benefits">
                            <div
                                className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                dangerouslySetInnerHTML={{ __html: cleanHTML(product.productBenefits) }}
                            ></div>
                        </TabsContent>

                        <TabsContent value="faq">
                            <div
                                className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                dangerouslySetInnerHTML={{ __html: cleanHTML(product.productFaqs) }}
                            ></div>
                        </TabsContent>

                        <TabsContent value="shipping">
                            <div
                                className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                dangerouslySetInnerHTML={{ __html: cleanHTML(product.productShipping) }}
                            ></div>
                        </TabsContent>

                        <TabsContent value="yt-video">
                            {product.youtubeLink ? (
                                <div className="mt-6 flex justify-start">
                                    {product.youtubeLink.includes("youtube.com") || product.youtubeLink.includes("youtu.be") ? (
                                        <iframe
                                            className="aspect-video w-full max-w-3xl rounded-2xl border border-gray-200 shadow-lg"
                                            src={`https://www.youtube.com/embed/${product.youtubeLink.split("v=")[1]?.split("&")[0] || product.youtubeLink.split("youtu.be/")[1]?.split("?")[0]}`}
                                            title={product.productName}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video controls className="w-full max-w-2xl rounded-xl border border-gray-200 shadow-md">
                                            <source src={product.youtubeLink} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ) : (
                                <p className="mt-6 text-left text-gray-600">No product video available.</p>
                            )}
                        </TabsContent>

                        <TabsContent value="reviews">
                            <div className="mt-6 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
                                <div className="rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md">
                                    <p className="font-semibold">Arpit Pandey - ⭐⭐⭐⭐⭐</p>
                                    <p className="text-gray-700">Very beautiful and powerful rudraksha. Helped me feel more energetic!</p>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md">
                                    <p className="font-semibold">Harsh Singh - ⭐⭐⭐⭐⭐</p>
                                    <p className="text-gray-700">Good quality stone and fast delivery. Highly recommended.</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Related Products */}
            <div className="mx-auto mt-10 max-w-7xl p-4 sm:px-6">
                <p className="mb-4 text-2xl font-bold text-gray-800">Related Products</p>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                    {(bracelet || []).slice(0, 4).map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            <Link href={`/bracelet/${item._id}`}>
                                <div className="relative h-64 w-full">
                                    {item.productImage?.[0] ? (
                                        <Image
                                            src={item.productImage[0]}
                                            alt={item?.productName}
                                            width={1000}
                                            height={1000}
                                            className="h-full w-full object-cover object-bottom transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">No Image</div>
                                    )}
                                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Bracelet</span>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                                    <div className="flex items-end justify-center gap-2">
                                        <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
                                        <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
                                        <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount}% OFF</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 pt-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        addItem(item)
                                        toast.success("Item added to cart!")
                                    }}
                                    className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share Popup Modal */}
            {showShare && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-80 rounded-2xl bg-white p-5 shadow-lg">
                        <button onClick={() => setShowShare(false)} className="absolute top-3 right-3 rounded-full p-1 hover:bg-gray-100" aria-label="Close share">
                            <X className="h-5 w-5 text-gray-600" />
                        </button>

                        <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">Share this product</h3>

                        <div className="mb-3 flex">
                            <input
                                id="pageLink"
                                type="text"
                                value={typeof window !== "undefined" ? window.location.href : `https://vedastructure.com/bracelet/${id}`}
                                readOnly
                                className="flex-1 rounded-l-lg border px-2 py-1 text-sm"
                            />
                            <button onClick={copyLink} className="rounded-r-lg bg-yellow-500 px-3 py-1 text-sm font-semibold text-white hover:bg-yellow-600">
                                Copy
                            </button>
                        </div>

                        <div className="mt-3 flex justify-around">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `https://vedastructure.com/bracelet/${id}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-600 hover:scale-110"
                            >
                                WhatsApp
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `https://vedastructure.com/bracelet/${id}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:scale-110"
                            >
                                Facebook
                            </a>
                            <a
                                href={`https://www.instagram.com/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `https://vedastructure.com/bracelet/${id}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-pink-600 hover:scale-110"
                            >
                                Instagram
                            </a>
                        </div>

                        <button onClick={() => setShowShare(false)} className="mt-5 w-full rounded-lg bg-yellow-600 py-2 font-semibold text-white hover:bg-yellow-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetails

// "use client"

// import { getBraceletById } from "@/apis/controllers/braceletController.js"
// import { useCart } from "@/context/cartContext"
// import useBracelet from "@/hooks/useBracelet"
// import { calculateDiscount } from "@/utils/utils"
// import { Share } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useParams, useRouter } from "next/navigation"
// import React, { useState, useEffect } from "react"
// import { toast } from "sonner"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { motion } from "framer-motion"

// function ProductDetails() {
//     const { id } = useParams()
//     const [product, setProduct] = useState({})
//     const { addItem } = useCart()
//     const { bracelet } = useBracelet()
//     const [certificate, setCertificate] = useState(null)
//     const [size, setSize] = useState(null)
//     const router = useRouter()
//     const [mainImageIdx, setMainImageIdx] = useState(0)
//     const [showShare, setShowShare] = useState(false)
//     const [selected, setSelected] = useState(false)
//     const [formData, setFormData] = useState({
//         wearerName: "",
//         dob: "",
//         birthPlace: "",
//         time: "",
//         gender: "male",
//         gotra: "",
//         purpose: "general",
//     })

//     useEffect(() => {
//         if (product?.sizes?.length) setSize(product.sizes[0]._id)
//         if (product?.certificates?.length) setCertificate(product.certificates[0]._id)
//     }, [product])

//     const validateForm = () => {
//         const requiredFields = ["wearerName", "dob", "birthPlace", "time", "gender", "purpose"]
//         return requiredFields.every((field) => formData[field]?.trim())
//     }

//     const handleFormChange = (e) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const fetchBracelet = async () => {
//         const res = await getBraceletById(id)
//         setProduct(res.data.bracelet)
//     }

//     useEffect(() => {
//         fetchBracelet()
//     }, [])

//     const copyLink = () => {
//         navigator.clipboard.writeText(`https://vedastructure.com/bracelet/${id}`)
//         toast.success("Link Copied! 📋")
//     }

//     const handleChange = (e) => {
//         const selectedOption = e.target.options[e.target.selectedIndex]
//         const value = Number(selectedOption.value)
//         const isHaveForm = selectedOption.dataset.ishaveform === "true"
//         setSelected({ value, isHaveForm })
//     }

//     const basePrice = product.productPrice || 0
//     const energizationPrice = selected.value || 0
//     const finalPrice = basePrice + energizationPrice

//     // ✅ Helper to clean HTML text (remove brackets, quotes, etc.)
//     const cleanHTML = (value) => {
//         if (!value) return ""
//         let html = Array.isArray(value) ? value[0] : value
//         if (typeof html !== "string") html = String(html)
//         try {
//             // If it's a JSON string like '["<p>text</p>"]', parse it
//             const parsed = JSON.parse(html)
//             if (Array.isArray(parsed)) html = parsed[0]
//             else if (typeof parsed === "object" && parsed.content) html = parsed.content
//         } catch {}
//         return html.replace(/^(\[|")|(\]|")$/g, "")
//     }

//     return (
//         <>
//             <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-600">
//                 <button className="font-semibold hover:text-yellow-600"> Home &gt; </button>
//                 <button className="font-semibold hover:text-yellow-600"> Store &gt; </button>
//                 <button className="font-semibold hover:text-yellow-600">Bracelet &gt;</button>
//                 <span className="font-bold text-red-600">{product?.productName || "Bracelet"}</span>
//             </div>

//             {/* Product Section */}
//             <section className="mx-auto grid max-w-7xl gap-8 p-4 sm:p-6 md:grid-cols-2">
//                 {/* Images */}
//                 <div>
//                     <Image src={product.productImage?.[mainImageIdx]} alt="Product Image" width={500} height={500} className="mb-4 w-full rounded-lg shadow-md" />
//                     <div className="hiderScrollbar flex space-x-3 overflow-auto">
//                         {product.productImage?.map((img, idx) => (
//                             <Image
//                                 key={img + idx}
//                                 src={img}
//                                 onClick={() => setMainImageIdx(idx)}
//                                 className={`h-20 w-20 cursor-pointer rounded border border-yellow-700 hover:border-2 ${mainImageIdx === idx ? "border-yellow-700" : ""}`}
//                                 width={100}
//                                 height={100}
//                                 alt="thumb"
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Product Info */}
//                 <div>
//                     <div className="flex items-start justify-between">
//                         <div>
//                             <h2 className="text-gray-500">Bracelet</h2>
//                             <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
//                             <div className="flex items-end gap-2">
//                                 <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(finalPrice, product.productDiscount)}</p>
//                                 <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{finalPrice}</p>
//                                 <p className="text-md mt-2 font-bold text-green-600">{product.productDiscount}% OFF</p>
//                             </div>
//                             {/* 🛒 Shopify link added here */}
//                             {product.shopifyLink && (
//                                 <a
//                                     href={product.shopifyLink}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="mt-3 inline-flex items-center gap-2 rounded-lg border border-yellow-500 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10m0 0a2 2 0 11-4 0m4 0a2 2 0 104 0" />
//                                     </svg>
//                                     Buy on Shopify
//                                 </a>
//                             )}
//                             <p className="text-lg font-semibold text-gray-500">100% Authentic Bracelet</p>
//                         </div>
//                         <div className="flex space-x-3">
//                             <button className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-yellow-100 hover:text-yellow-600" onClick={() => setShowShare(true)}>
//                                 <Share />
//                             </button>
//                         </div>
//                     </div>

//                     <marquee behavior="alternate" direction="right" className="font-bold text-red-500">
//                         Offer Available: 25/08/25-20/09/25
//                     </marquee>

//                     {/* Energization */}
//                     <div>
//                         <label className="mt-4 block font-semibold">Pooja/Energization</label>
//                         <select className="mt-1 w-full rounded-lg border p-2" onChange={handleChange}>
//                             <option>--choose--</option>
//                             {product.energization?.map((item) => (
//                                 <option className="capitalize" value={item.price} data-ishaveform={item.isHaveForm}>
//                                     {item.title}- ₹{item.price}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Form if energization needs it */}
//                     {selected?.isHaveForm && (
//                         <div className="mt-2 space-y-2 rounded-xl border bg-yellow-50 p-4">
//                             {[
//                                 { label: "Name of wearer:", name: "wearerName", type: "text" },
//                                 { label: "Date of Birth:", name: "dob", type: "date" },
//                                 { label: "Place of Birth:", name: "birthPlace", type: "text" },
//                                 { label: "Time of Birth:", name: "time", type: "time" },
//                             ].map(({ label, name, type }) => (
//                                 <div key={name} className="grid items-center gap-1 sm:grid-cols-2">
//                                     <label htmlFor={name} className="font-medium">
//                                         {label}
//                                     </label>
//                                     <input type={type} className="w-full rounded-lg border border-gray-400 p-2" name={name} value={formData[name]} onChange={handleFormChange} />
//                                 </div>
//                             ))}

//                             <div className="grid items-center gap-1 sm:grid-cols-2">
//                                 <label className="font-medium">Gender:</label>
//                                 <select name="gender" className="w-full rounded-lg border border-gray-400 p-2" value={formData.gender} onChange={handleFormChange}>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>
//                             <div className="grid items-center gap-1 sm:grid-cols-2">
//                                 <label htmlFor="gotra" className="font-medium">
//                                     Clan/Gotra (If Available):
//                                 </label>
//                                 <input type="text" className="w-full rounded-lg border border-gray-400 p-2" name="gotra" id="gotra" value={formData.gotra} onChange={handleFormChange} />
//                             </div>
//                             <div className="grid items-center gap-1 sm:grid-cols-2">
//                                 <label className="font-medium">Primary Purpose:</label>
//                                 <select name="purpose" className="w-full rounded-lg border border-gray-400 p-2" value={formData.purpose} onChange={handleFormChange}>
//                                     <option value="general">General</option>
//                                     <option value="health">Health</option>
//                                     <option value="wealth-fortune">Wealth & Fortune</option>
//                                     <option value="education">Education</option>
//                                     <option value="personal-relations">Personal Relations</option>
//                                 </select>
//                             </div>
//                         </div>
//                     )}

//                     {/* Size */}
//                     <div className="my-2 flex flex-wrap gap-3">
//                         {product?.sizes?.map((item) => (
//                             <label
//                                 key={item._id}
//                                 className={`cursor-pointer rounded-xl border px-2 transition ${
//                                     size === item._id ? "border-gray-300 bg-orange-500 text-white shadow-md" : "border-gray-300 bg-white hover:bg-gray-100"
//                                 }`}
//                             >
//                                 <input type="radio" name="options" value={item.size} checked={size === item._id} onChange={() => setSize(item._id)} className="hidden" />
//                                 <span className="font-medium">{item.size}</span>
//                             </label>
//                         ))}
//                     </div>

//                     {/* Certificates */}
//                     <div className="my-2 flex flex-wrap gap-3">
//                         {product?.certificates?.map((item) => (
//                             <label
//                                 key={item._id}
//                                 className={`cursor-pointer rounded-xl border px-2 transition ${
//                                     certificate === item._id ? "border-gray-300 bg-orange-500 text-white shadow-md" : "border-gray-300 bg-white hover:bg-gray-100"
//                                 }`}
//                             >
//                                 <input type="radio" name="options" value={item.type} checked={certificate === item._id} onChange={() => setCertificate(item._id)} className="hidden" />
//                                 <span className="font-medium">{item.type}</span>
//                             </label>
//                         ))}
//                     </div>

//                     {/* Add to cart + buy */}
//                     {product?.stock <= 0 && <p className="mt-2 text-sm text-red-500">Out of stock</p>}
//                     {!product?.stock <= 0 && (
//                         <div className="flex items-center space-x-3">
//                             <button
//                                 onClick={() => {
//                                     if (selected?.isHaveForm) {
//                                         if (validateForm()) {
//                                             addItem({
//                                                 ...product,
//                                                 productPrice: finalPrice,
//                                                 selectedEnergization: selected,
//                                                 energizationForm: selected?.isHaveForm ? formData : null,
//                                             })
//                                             toast.success("Added to cart!")
//                                         } else toast.error("Please fill all the fields")
//                                     } else {
//                                         addItem({
//                                             ...product,
//                                             productPrice: finalPrice,
//                                             selectedEnergization: selected,
//                                         })
//                                         toast.success("Added to cart!")
//                                     }
//                                 }}
//                                 className="mt-4 w-full rounded-lg border border-yellow-600 px-6 py-3 font-semibold text-yellow-600 transition duration-300 hover:bg-yellow-500 hover:shadow-md"
//                             >
//                                 Add to Cart
//                             </button>

//                             <button
//                                 onClick={() => {
//                                     if (selected?.isHaveForm) {
//                                         if (validateForm()) {
//                                             addItem({
//                                                 ...product,
//                                                 productPrice: finalPrice,
//                                                 selectedEnergization: selected,
//                                                 energizationForm: formData,
//                                             })
//                                             toast.success("Added to cart!")
//                                             router.push("/checkout")
//                                         } else toast.error("Please fill all the fields")
//                                     } else {
//                                         addItem({
//                                             ...product,
//                                             productPrice: finalPrice,
//                                             selectedEnergization: selected,
//                                         })
//                                         toast.success("Added to cart!")
//                                         router.push("/checkout")
//                                     }
//                                 }}
//                                 className="mt-4 w-full rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-yellow-500 hover:shadow-md"
//                             >
//                                 Buy now
//                             </button>
//                         </div>
//                     )}

//                     <div
//                         className="prose prose-gray mt-4 max-w-none [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
//                         dangerouslySetInnerHTML={{ __html: cleanHTML(product.productFeatures) }}
//                     ></div>
//                 </div>
//             </section>

//             {/* Tabs Section (Clean HTML fix applied here) */}
//             <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
//                 <div className="mt-8">
//                     <Tabs defaultValue="about" className="w-full">
//                         <TabsList className="flex flex-wrap justify-start gap-2 rounded-2xl p-1">
//                             {[
//                                 { value: "about", label: "About Product" },
//                                 { value: "benefits", label: "Benefits" },
//                                 { value: "faq", label: "FAQ's" },
//                                 { value: "shipping", label: "Shipping & Return" },
//                                 { value: "yt-video", label: "Product Video" },
//                                 { value: "reviews", label: "Product Reviews" },
//                             ].map((tab) => (
//                                 <TabsTrigger
//                                     key={tab.value}
//                                     value={tab.value}
//                                     className="relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/70 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600"
//                                 >
//                                     {tab.label}
//                                     <motion.div
//                                         layoutId="activeTab"
//                                         className="absolute inset-0 -z-10 rounded-xl bg-white/40 backdrop-blur-sm"
//                                         transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                                     />
//                                 </TabsTrigger>
//                             ))}
//                         </TabsList>

//                         <TabsContent value="about">
//                             <div
//                                 className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
//                                 dangerouslySetInnerHTML={{ __html: cleanHTML(product.productAbout) }}
//                             ></div>
//                         </TabsContent>

//                         <TabsContent value="benefits">
//                             <div
//                                 className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
//                                 dangerouslySetInnerHTML={{ __html: cleanHTML(product.productBenefits) }}
//                             ></div>
//                         </TabsContent>

//                         <TabsContent value="faq">
//                             <div
//                                 className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
//                                 dangerouslySetInnerHTML={{ __html: cleanHTML(product.productFaqs) }}
//                             ></div>
//                         </TabsContent>

//                         <TabsContent value="shipping">
//                             <div
//                                 className="prose prose-gray mt-6 max-w-none text-gray-700 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
//                                 dangerouslySetInnerHTML={{ __html: cleanHTML(product.productShipping) }}
//                             ></div>
//                         </TabsContent>

//                         {/* YouTube or Local Video */}
//                         <TabsContent value="yt-video">
//                             {product.youtubeLink ? (
//                                 <div className="mt-6 flex justify-start">
//                                     {product.youtubeLink.includes("youtube.com") || product.youtubeLink.includes("youtu.be") ? (
//                                         <iframe
//                                             className="aspect-video w-full max-w-3xl rounded-2xl border border-gray-200 shadow-lg"
//                                             src={`https://www.youtube.com/embed/${product.youtubeLink.split("v=")[1]?.split("&")[0] || product.youtubeLink.split("youtu.be/")[1]?.split("?")[0]}`}
//                                             title={product.productName}
//                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                             allowFullScreen
//                                         ></iframe>
//                                     ) : (
//                                         <video controls className="w-full max-w-2xl rounded-xl border border-gray-200 shadow-md">
//                                             <source src={product.youtubeLink} type="video/mp4" />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <p className="mt-6 text-left text-gray-600">No product video available.</p>
//                             )}
//                         </TabsContent>

//                         <TabsContent value="reviews">
//                             <div className="mt-6 space-y-4">
//                                 <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
//                                 <div className="rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md">
//                                     <p className="font-semibold">Arpit Pandey - ⭐⭐⭐⭐⭐</p>
//                                     <p className="text-gray-700">Very beautiful and powerful rudraksha. Helped me feel more energetic!</p>
//                                 </div>
//                                 <div className="rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md">
//                                     <p className="font-semibold">Harsh Singh - ⭐⭐⭐⭐⭐</p>
//                                     <p className="text-gray-700">Good quality stone and fast delivery. Highly recommended.</p>
//                                 </div>
//                             </div>
//                         </TabsContent>
//                     </Tabs>
//                 </div>
//             </div>
//             <div className="mx-auto mt-10 max-w-7xl p-4 sm:px-6">
//                 <p className="mb-4 text-2xl font-bold text-gray-800">Related Products</p>
//                 <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
//                     {/* {!bracelet?.length && (
//                         <div className="flex h-64 items-center justify-center">
//                             <p className="text-2xl font-semibold text-gray-600">No products found</p>
//                         </div>
//                     )} */}
//                     {bracelet?.slice(0, 4).map((item) => (
//                         <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
//                             {/* Make image + text a clickable link */}
//                             <Link href={`/bracelet/${item._id}`}>
//                                 <div className="relative h-64 w-full">
//                                     <Image
//                                         src={item.productImage[0]}
//                                         alt={item?.productName}
//                                         width={1000}
//                                         height={1000}
//                                         className="h-full w-full object-cover object-bottom transition-transform duration-500"
//                                     />
//                                     <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Bracelet</span>
//                                 </div>
//                                 <div className="p-4 text-center">
//                                     <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
//                                     <div className="flex items-end justify-center gap-2">
//                                         <p className="mt-2 text-xl font-bold text-orange-500">₹{calculateDiscount(item.productPrice, item.productDiscount)}</p>
//                                         <p className="mt-2 text-xl font-semibold text-gray-300 line-through">₹{item.productPrice}</p>
//                                         <p className="text-md mt-2 font-bold text-green-600">{item.productDiscount}% OFF</p>
//                                     </div>
//                                 </div>
//                             </Link>

//                             {/* Button OUTSIDE the Link so it only adds to cart */}
//                             <div className="p-4 pt-0">
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation() // stop click bubbling
//                                         addItem(item)
//                                         toast.success("Item added to cart!")
//                                     }}
//                                     className="mt-3 w-full cursor-pointer rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg"
//                                 >
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ProductDetails
