"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import TiptapEditor from "@/components/TiptapEditor"
import { useState } from "react"

export default function AddProduct() {
    const router = useRouter()
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const [productAbout, setProductAbout] = useState("")
    const [productFeatures, setProductFeatures] = useState("")
    const [productBenefits, setProductBenefits] = useState("")
    const [productFaqs, setProductFaqs] = useState("")
    const [productShipping, setProductShipping] = useState("")

    // ---------------- COMMON ENERGIZATION ----------------
    const [energization, setEnergization] = useState([{ title: "", price: "", isHaveForm: false }])
    const handleEnergizationChange = (i, f, v) => {
        const copy = [...energization]
        copy[i][f] = v
        setEnergization(copy)
    }
    const addEnergization = () => setEnergization((p) => [...p, { title: "", price: "", isHaveForm: false }])
    const removeEnergization = (i) => setEnergization((p) => p.filter((_, idx) => idx !== i))

    // ---------------- RUDRAKSHA FIELDS ----------------
    const [options, setOptions] = useState([{ title: "", price: "" }])
    const handleOptionChange = (i, f, v) => {
        const copy = [...options]
        copy[i][f] = v
        setOptions(copy)
    }
    const addOption = () => setOptions((p) => [...p, { title: "", price: "" }])
    const removeOption = (i) => setOptions((p) => p.filter((_, idx) => idx !== i))

    // ---------------- BRACELET FIELDS ----------------
    const [sizes, setSizes] = useState([{ size: "", price: "", stock: "" }])
    const [certificates, setCertificates] = useState([{ type: "", price: "" }])

    const handleSizeChange = (i, f, v) => {
        const copy = [...sizes]
        copy[i][f] = v
        setSizes(copy)
    }
    const addSize = () => setSizes((p) => [...p, { size: "", price: "", stock: "" }])
    const removeSize = (i) => setSizes((p) => p.filter((_, idx) => idx !== i))

    const handleCertificateChange = (i, f, v) => {
        const copy = [...certificates]
        copy[i][f] = v
        setCertificates(copy)
    }
    const addCertificate = () => setCertificates((p) => [...p, { type: "", price: "" }])
    const removeCertificate = (i) => setCertificates((p) => p.filter((_, idx) => idx !== i))

    // ---------------- SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!category) {
            toast.error("Please select a category first!")
            return
        }

        const formData = new FormData(e.target)
        formData.append("productAbout", String(productAbout))
        formData.append("productFeatures", String(productFeatures))
        formData.append("productBenefits", String(productBenefits))
        formData.append("productFaqs", String(productFaqs))
        formData.append("productShipping", String(productShipping))
        formData.append("energization", JSON.stringify(energization))

        if (category === "rudraksha") {
            formData.append("options", JSON.stringify(options))
        } else if (category === "bracelet") {
            formData.append("sizes", JSON.stringify(sizes))
            formData.append("certificates", JSON.stringify(certificates))
        }

        const data = Object.fromEntries(formData)
        console.log(data)

        // try {
        //     setLoading(true)
        //     const response = category === "rudraksha" ? await postRudraksha(formData) : await postBracelet(formData)

        //     if (response.success) {
        //         toast.success(response.message)
        //         router.push(`/admin/${category}`)
        //     }
        // } catch (error) {
        //     toast.error(error.message)
        // } finally {
        //     setLoading(false)
        // }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold uppercase">Add Product</h1>

            {/* CATEGORY SELECT */}
            <div>
                <Label>Choose Category</Label>
                <div className="mt-2 flex gap-6">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="category" value="rudraksha" onChange={(e) => setCategory(e.target.value)} required />
                        Rudraksha
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="category" value="bracelet" onChange={(e) => setCategory(e.target.value)} required />
                        Bracelet
                    </label>
                </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="grid gap-3">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" placeholder="enter product stock" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" name="productName" type="text" placeholder="enter product name" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productPrice">Base Price</Label>
                    <Input id="productPrice" name="productPrice" type="number" placeholder="base product price" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productDiscount">Product Discount (%)</Label>
                    <Input id="productDiscount" name="productDiscount" type="number" placeholder="enter discount" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productImage">Product Images</Label>
                    <Input id="productImage" name="image" type="file" multiple accept="image/*" />
                </div>
            </div>

            {/* CONDITIONAL SECTIONS */}
            {category === "rudraksha" && (
                <>
                    {/* OPTIONS */}
                    <div>
                        <div className="flex items-center justify-between">
                            <Label>Product Options</Label>
                            <Button type="button" variant="outline" onClick={addOption}>
                                + Add Option
                            </Button>
                        </div>
                        {options.map((opt, i) => (
                            <div key={i} className="mt-2 grid grid-cols-3 items-center gap-2">
                                <Input value={opt.title} onChange={(e) => handleOptionChange(i, "title", e.target.value)} placeholder="e.g. With Pendant" />
                                <Input type="number" value={opt.price} onChange={(e) => handleOptionChange(i, "price", e.target.value)} placeholder="price" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(i)} className="text-red-500 hover:bg-red-500 hover:text-white">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {category === "bracelet" && (
                <>
                    {/* SIZES */}
                    <div>
                        <div className="flex items-center justify-between">
                            <Label>Available Sizes</Label>
                            <Button type="button" variant="outline" onClick={addSize}>
                                + Add Size
                            </Button>
                        </div>
                        {sizes.map((item, i) => (
                            <div key={i} className="mt-2 grid grid-cols-4 gap-2">
                                <Input value={item.size} onChange={(e) => handleSizeChange(i, "size", e.target.value)} placeholder="e.g. Small" />
                                <Input type="number" value={item.price} onChange={(e) => handleSizeChange(i, "price", e.target.value)} placeholder="price" />
                                <Input type="number" value={item.stock} onChange={(e) => handleSizeChange(i, "stock", e.target.value)} placeholder="stock" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSize(i)} className="text-red-500 hover:bg-red-500 hover:text-white">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* CERTIFICATES */}
                    <div>
                        <div className="mt-4 flex items-center justify-between">
                            <Label>Certificate Options</Label>
                            <Button type="button" variant="outline" onClick={addCertificate}>
                                + Add Certificate
                            </Button>
                        </div>
                        {certificates.map((item, i) => (
                            <div key={i} className="mt-2 grid grid-cols-3 gap-2">
                                <Input value={item.type} onChange={(e) => handleCertificateChange(i, "type", e.target.value)} placeholder="e.g. With Certificate" />
                                <Input type="number" value={item.price} onChange={(e) => handleCertificateChange(i, "price", e.target.value)} placeholder="extra price" />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeCertificate(i)} className="text-red-500 hover:bg-red-500 hover:text-white">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* COMMON ENERGIZATION */}
            <div>
                <div className="flex items-center justify-between">
                    <Label>Pooja / Energization</Label>
                    <Button type="button" variant="outline" onClick={addEnergization}>
                        + Add
                    </Button>
                </div>
                {energization.map((item, i) => (
                    <div key={i} className="mt-2 grid grid-cols-4 items-center gap-2">
                        <Input value={item.title} onChange={(e) => handleEnergizationChange(i, "title", e.target.value)} placeholder="title" />
                        <Input type="number" value={item.price} onChange={(e) => handleEnergizationChange(i, "price", e.target.value)} placeholder="price" />
                        <div className="flex items-center gap-2">
                            <Checkbox checked={item.isHaveForm} onCheckedChange={(v) => handleEnergizationChange(i, "isHaveForm", v)} />
                            <Label>Form?</Label>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEnergization(i)} className="text-red-500 hover:bg-red-500 hover:text-white">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* PRODUCT DETAILS EDITORS */}
            {[
                { label: "Product Features", setter: setProductFeatures },
                { label: "About Product", setter: setProductAbout },
                { label: "Benefits", setter: setProductBenefits },
                { label: "FAQ's", setter: setProductFaqs },
                { label: "Shipping & Return", setter: setProductShipping },
            ].map((item, i) => (
                <div key={i}>
                    <Separator className="my-4" />
                    <Label>{item.label}</Label>
                    <TiptapEditor onChange={item.setter} />
                </div>
            ))}

            <button type="submit" disabled={loading} className="mt-4 ml-auto w-fit rounded bg-orange-600 px-4 py-2 font-bold text-white disabled:opacity-50">
                {loading ? "Adding..." : "Add Product"}
            </button>
        </form>
    )
}
