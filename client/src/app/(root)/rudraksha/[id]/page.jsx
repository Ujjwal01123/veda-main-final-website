"use client"
import { getRudrakshaById } from "@/apis/controllers/rudrakshaController"
import { useCart } from "@/context/cartContext"
import useRudraksha from "@/hooks/useRudraksha"
import { calculateDiscount } from "@/utils/utils"
import { Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const { cart, addItem, increaseQty, decreaseQty } = useCart()
    const { rudraksha } = useRudraksha()
    const router = useRouter()
    const [radioSelected, setRadioSelected] = useState(null)
    const [formData, setFormData] = useState({
        wearerName: "",
        dob: "",
        birthPlace: "",
        time: "",
        gender: "male",
        gotra: "",
        purpose: "general",
    })
    const validateForm = () => {
        const requiredFields = ["wearerName", "dob", "birthPlace", "time", "gender", "purpose"]
        return requiredFields.every((field) => formData[field]?.trim())
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const fetchRudraksha = async () => {
        const res = await getRudrakshaById(id)
        console.log(res.data)
        setProduct(res.data.rudraksha)
    }

    useEffect(() => {
        fetchRudraksha()
    }, [])

    const [mainImageIdx, setMainImageIdx] = useState(0)

    const copyLink = () => {
        const currentUrl = window.location.href
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                toast.success("Link Copied! 📋")
            })
            .catch(() => {
                toast.error("Failed to copy link ❌")
            })
    }

    const [selected, setSelected] = useState(false)

    const handleChange = (val) => {
        const selected = JSON.parse(val)
        setSelected({
            value: Number(selected.price),
            isHaveForm: selected.isHaveForm,
        })
    }

    const basePrice = product.productPrice || 0
    const energizationPrice = selected.value || 0
    const selectedOptionPrice = radioSelected ? radioSelected.price : 0
    const finalPrice = basePrice + energizationPrice + selectedOptionPrice
    return (
        <>
            <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-600">
                <button className="font-semibold hover:text-yellow-600"> Home &gt; </button>
                <button className="font-semibold hover:text-yellow-600"> Store &gt; </button>
                <button className="font-semibold hover:text-yellow-600">Rudraksha &gt;</button>
                <span className="font-bold text-red-600">{product?.productName || "Rudraksha"}</span>
            </div>
            <section className="mx-auto grid max-w-7xl gap-8 p-4 sm:p-6 md:grid-cols-2">
                <div>
                    {product?.productImage?.[mainImageIdx] ? (
                        <Image src={product.productImage[mainImageIdx]} alt={product?.productName || "Rudraksha"} width={500} height={500} className="mb-4 w-full rounded-lg object-cover shadow-md" />
                    ) : (
                        <div className="mb-4 flex h-[500px] w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">No Image Available</div>
                    )}

                    <div className="hideScrollbar flex space-x-3 overflow-auto">
                        {product?.productImage?.map((img, idx) =>
                            img ? (
                                <Image
                                    key={img + idx}
                                    src={img}
                                    onClick={() => setMainImageIdx(idx)}
                                    onMouseEnter={() => setMainImageIdx(idx)}
                                    className={`h-20 w-20 cursor-pointer rounded border border-yellow-700 hover:border-2 ${mainImageIdx === idx ? "border-yellow-700" : ""}`}
                                    width={100}
                                    height={100}
                                    alt="Rudraksha Thumbnail"
                                />
                            ) : (
                                <div key={"placeholder-" + idx} className="flex h-20 w-20 items-center justify-center rounded border border-gray-300 bg-gray-100 text-xs text-gray-400">
                                    No Img
                                </div>
                            ),
                        )}
                    </div>
                </div>
                <div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-gray-500">Rudraksha</h2>
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

                            <p className="text-lg font-semibold text-gray-500">100% Authentic Rudraksha</p>
                        </div>
                        <div className="flex space-x-3">
                            <Dialog>
                                <DialogTrigger>
                                    <Share />
                                </DialogTrigger>
                                <DialogContent>
                                    <div>
                                        <h2 className="mb-3 text-lg font-bold text-yellow-600">Share this Rudraksha</h2>
                                        <div className="mb-4 flex items-center">
                                            <input id="pageLink" type="text" value={window.location.href} readOnly className="flex-1 rounded-l-lg border px-2 py-1 text-sm" />
                                            <button onClick={copyLink} className="rounded-r-lg bg-yellow-500 px-3 py-1 text-white">
                                                Copy
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <Link
                                                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                                                target="_blank"
                                                className="rounded-lg bg-green-500 py-2 text-white hover:opacity-90"
                                            >
                                                WhatsApp
                                            </Link>
                                            <Link
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                                target="_blank"
                                                className="rounded-lg bg-blue-600 py-2 text-white hover:opacity-90"
                                            >
                                                Facebook
                                            </Link>
                                            <Link href="https://www.instagram.com/" target="_blank" className="rounded-lg bg-pink-500 py-2 text-white hover:opacity-90">
                                                Instagram
                                            </Link>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="my-2 flex items-center justify-between gap-2 border-t-2 border-b-2 border-dotted py-2">
                        <label className="block font-semibold">Pooja/Energization (optional)</label>
                        <Select onValueChange={handleChange} defaultValue="">
                            <SelectTrigger>
                                <SelectValue placeholder="--choose energization--" />
                            </SelectTrigger>

                            <SelectContent>
                                {product.energization?.map((item, idx) => (
                                    <SelectItem key={idx} value={JSON.stringify(item)}>
                                        {item.title} - ₹{item.price}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selected?.isHaveForm && (
                        <div className="mt-2 space-y-2 rounded-xl border bg-yellow-50 p-4">
                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label htmlFor="name" className="font-medium">
                                    Name of wearer:
                                </label>
                                <input type="text" className="w-full rounded-lg border border-gray-400 p-2" name="wearerName" id="name" value={formData.wearerName} onChange={handleFormChange} />
                            </div>
                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label htmlFor="dob" className="font-medium">
                                    Date of Birth:
                                </label>
                                <input type="date" className="w-full rounded-lg border border-gray-400 p-2" name="dob" id="dob" value={formData.dob} onChange={handleFormChange} />
                            </div>
                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label htmlFor="place" className="font-medium">
                                    Place of Birth:
                                </label>
                                <input type="text" className="w-full rounded-lg border border-gray-400 p-2" name="birthPlace" id="place" value={formData.birthPlace} onChange={handleFormChange} />
                            </div>
                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label htmlFor="time" className="font-medium">
                                    Time of Birth:
                                </label>
                                <input type="time" className="w-full rounded-lg border border-gray-400 p-2" name="time" id="time" value={formData.time} onChange={handleFormChange} />
                            </div>
                            <div className="grid items-center gap-1 sm:grid-cols-2">
                                <label className="font-medium">Gender:</label>
                                <select name="gender" className="w-full rounded-lg border border-gray-400 p-2" id="" value={formData.gender} onChange={handleFormChange}>
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
                                <label htmlFor="name" className="font-medium">
                                    Primary Purpose:
                                </label>
                                <select name="purpose" className="w-full rounded-lg border border-gray-400 p-2" id="" value={formData.purpose} onChange={handleFormChange}>
                                    <option value="general">General</option>
                                    <option value="health">Health</option>
                                    <option value="wealth-fortune">Wealth & Fortune</option>
                                    <option value="education">Education</option>
                                    <option value="personal-relations">Personal Relations</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="my-2 flex flex-wrap gap-3">
                        {product?.options?.map((item) => (
                            <label
                                key={item._id}
                                className={`size-36 cursor-pointer rounded-xl border px-2 transition ${radioSelected?._id === item._id ? "bg-orange-500 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md" : "border-gray-300 bg-white"}`}
                            >
                                <input type="radio" name="options" value={item._id} checked={radioSelected === item._id} onChange={() => setRadioSelected(item)} className="hidden" />

                                <div className="w-full text-center font-medium">
                                    {item.title === "Only Bead" && <Image width={100} height={100} src="/images/bead-icon.jpg" alt="bead" className="h-24 object-cover" />}
                                    {item.title.trim() === "Silver Pendant".trim() && <Image width={100} height={100} src="/images/rudra-pandent.png" alt="pendant" className="h-24 object-cover" />}
                                </div>
                                <div className={`block w-full text-center ${radioSelected?._id === item._id && "font-bold text-white"}`}>{item.title}</div>
                            </label>
                        ))}
                    </div>
                    {product?.stock <= 0 && <p className="mt-2 text-sm text-red-500">Out of stock</p>}
                    {!product?.stock <= 0 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <div className="col-span-1 flex gap-1">
                                    <Button onClick={() => decreaseQty(product._id)} variant={"outline"} className={"hover:text-white"}>
                                        -
                                    </Button>
                                    <Button readOnly variant={"ghost"}>
                                        {cart.items?.find((item) => item._id === product._id)?.quantity || 0}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const item = cart.items.find((c) => c._id === product._id)
                                            if (item) {
                                                increaseQty(product._id)
                                            } else {
                                                addItem({
                                                    ...product,
                                                    productPrice: finalPrice,
                                                    selectedEnergization: selected,
                                                    selectedOption: radioSelected,
                                                    energizationForm: selected?.isHaveForm ? formData : null,
                                                })
                                            }
                                        }}
                                        variant={"outline"}
                                        className={"hover:text-white"}
                                    >
                                        +
                                    </Button>
                                </div>
                                <div className="col-span-3 w-full">
                                    <button
                                        onClick={() => {
                                            if (selected?.isHaveForm) {
                                                if (validateForm()) {
                                                    addItem({
                                                        ...product,
                                                        productPrice: finalPrice,
                                                        selectedEnergization: selected,
                                                        selectedOption: radioSelected,
                                                        energizationForm: selected?.isHaveForm ? formData : null,
                                                    })
                                                    toast.success("Added to cart!")
                                                } else {
                                                    toast.error("Please fill all the fields")
                                                }
                                            } else {
                                                addItem({
                                                    ...product,
                                                    productPrice: finalPrice,
                                                    selectedEnergization: selected,
                                                    selectedOption: radioSelected,
                                                    energizationForm: selected?.isHaveForm ? formData : null, // store form if needed
                                                })
                                                toast.success("Added to cart!")
                                            }
                                        }}
                                        className="w-full rounded-lg border border-yellow-600 px-6 py-3 font-semibold text-yellow-600 transition duration-300 hover:bg-yellow-500 hover:shadow-md"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        if (selected?.isHaveForm) {
                                            if (validateForm()) {
                                                addItem({
                                                    ...product,
                                                    productPrice: finalPrice,
                                                    selectedEnergization: selected,
                                                    selectedOption: radioSelected,
                                                    energizationForm: selected?.isHaveForm ? formData : null, // store form if needed
                                                })
                                                toast.success("Added to cart!")
                                                router.push("/checkout")
                                            } else {
                                                toast.error("Please fill all the fields")
                                            }
                                        } else {
                                            addItem({
                                                ...product,
                                                productPrice: finalPrice,
                                                selectedEnergization: selected,
                                                selectedOption: radioSelected,
                                                energizationForm: selected?.isHaveForm ? formData : null, // store form if needed
                                            })
                                            toast.success("Added to cart!")
                                            router.push("/checkout")
                                        }
                                    }}
                                    className="w-full rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-yellow-500 hover:shadow-md"
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="mt-6">
                        {product.productFeatures && product.productFeatures.length > 0 ? (
                            (() => {
                                let htmlContent = ""
                                try {
                                    const parsed = JSON.parse(product.productFeatures[0])
                                    htmlContent = Array.isArray(parsed) ? parsed.join("") : parsed
                                } catch {
                                    htmlContent = product.productFeatures[0]
                                }

                                return (
                                    <div
                                        className="prose prose-gray max-w-none text-gray-800 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                                    />
                                )
                            })()
                        ) : (
                            <p className="text-sm text-gray-600">No product features available.</p>
                        )}
                    </div>
                </div>
            </section>

            <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
                <div className="mt-8">
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="flex h-12 w-full flex-wrap justify-start gap-2 rounded-full p-1">
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
                                    className="relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/70 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-600"
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

                        {/* Helper function to safely render HTML */}
                        {[
                            { key: "about", data: product.productAbout, fallback: "No information available." },
                            { key: "features", data: product.productFeatures, fallback: "No features available." },
                            { key: "benefits", data: product.productBenefits, fallback: "No benefits available." },
                            { key: "faq", data: product.productFaqs, fallback: "No FAQs available." },
                            { key: "shipping", data: product.productShipping, fallback: "No shipping details available." },
                        ].map(({ key, data, fallback }) => (
                            <TabsContent key={key} value={key}>
                                <div
                                    className="prose prose-gray mt-6 max-w-none text-gray-700 [&_h2]:mt-4 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-disc"
                                    dangerouslySetInnerHTML={{
                                        __html: (() => {
                                            if (!data || data.length === 0) return fallback
                                            try {
                                                const parsed = JSON.parse(data[0])
                                                // If parsed is an array of strings (like ["<p>...</p>"])
                                                if (Array.isArray(parsed)) return parsed.join("")
                                                // If it's just HTML string
                                                if (typeof parsed === "string") return parsed
                                                // Otherwise fallback
                                                return fallback
                                            } catch {
                                                // data[0] was already an HTML string
                                                return data[0] || fallback
                                            }
                                        })(),
                                    }}
                                />
                            </TabsContent>
                        ))}

                        {/* Reviews Section */}
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

                        {/* YouTube or Local Video */}
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
                    </Tabs>
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-7xl p-4 sm:px-6">
                <p className="mb-4 text-2xl font-bold text-gray-800">Related Products</p>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                    {rudraksha?.slice(0, 4).map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl">
                            <Link href={`/rudraksha/${item._id}`}>
                                <div className="relative h-64 w-full">
                                    {item?.productImage?.[0] ? (
                                        <Image
                                            src={item.productImage[0]}
                                            alt={item?.productName || "Rudraksha"}
                                            width={1000}
                                            height={1000}
                                            className="h-full w-full object-cover object-bottom transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">No Image</div>
                                    )}

                                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">Rudraksha</span>
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
        </>
    )
}

export default ProductDetails
