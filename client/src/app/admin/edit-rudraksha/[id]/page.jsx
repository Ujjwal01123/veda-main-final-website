"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import TiptapEditor from "@/components/TiptapEditor"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { getRudrakshaById, updateRudraksha } from "@/apis/controllers/rudrakshaController"
import Image from "next/image"
import { X } from "lucide-react"

export default function EditRudraksha() {
    const router = useRouter()
    const { id: rudrakshaId } = useParams()

    const [loading, setLoading] = useState(true)

    // Basic fields
    const [stock, setStock] = useState("")
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDiscount, setProductDiscount] = useState("")

    // Editors
    const [productAbout, setProductAbout] = useState("")
    const [productFeatures, setProductFeatures] = useState("")
    const [productBenefits, setProductBenefits] = useState("")
    const [productFaqs, setProductFaqs] = useState("")
    const [productShipping, setProductShipping] = useState("")

    // Arrays
    const [energization, setEnergization] = useState([{ title: "", price: "", isHaveForm: false }])
    const [options, setOptions] = useState([{ title: "", price: "" }])

    // Images
    const [existingImages, setExistingImages] = useState([])
    const [removedImages, setRemovedImages] = useState([])
    const [newImages, setNewImages] = useState([])

    // Fetch data
    useEffect(() => {
        if (!rudrakshaId) return
        const fetchData = async () => {
            try {
                const res = await getRudrakshaById(rudrakshaId)
                if (res.success) {
                    const data = res.data.rudraksha

                    setStock(data.stock || "")
                    setProductName(data.productName || "")
                    setProductPrice(data.productPrice || "")
                    setProductDiscount(data.productDiscount || "")

                    setProductAbout(Array.isArray(data.productAbout) ? data.productAbout[0] : data.productAbout || "")
                    setProductFeatures(Array.isArray(data.productFeatures) ? data.productFeatures[0] : data.productFeatures || "")
                    setProductBenefits(Array.isArray(data.productBenefits) ? data.productBenefits[0] : data.productBenefits || "")
                    setProductFaqs(Array.isArray(data.productFaqs) ? data.productFaqs[0] : data.productFaqs || "")
                    setProductShipping(Array.isArray(data.productShipping) ? data.productShipping[0] : data.productShipping || "")

                    setEnergization(data.energization?.length ? data.energization : [{ title: "", price: "", isHaveForm: false }])
                    setOptions(data.options?.length ? data.options : [{ title: "", price: "" }])
                    setExistingImages(data.productImage || [])
                }
            } catch (err) {
                toast.error("Failed to load product")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [rudrakshaId])

    // Handlers
    const handleEnergizationChange = (index, field, value) => {
        const updated = [...energization]
        updated[index][field] = value
        setEnergization(updated)
    }

    const addEnergization = () => {
        setEnergization((prev) => [...prev, { title: "", price: "", isHaveForm: false }])
    }

    const removeEnergization = (index) => {
        setEnergization((prev) => prev.filter((_, i) => i !== index))
    }

    const handleOptionChange = (index, field, value) => {
        const updated = [...options]
        updated[index][field] = value
        setOptions(updated)
    }

    const addOption = () => {
        setOptions((prev) => [...prev, { title: "", price: "" }])
    }

    const removeOption = (index) => {
        setOptions((prev) => prev.filter((_, i) => i !== index))
    }

    const handleRemoveImage = (url) => {
        setRemovedImages((prev) => [...prev, url])
        setExistingImages((prev) => prev.filter((img) => img !== url))
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setNewImages(files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("stock", stock)
        formData.append("productName", productName)
        formData.append("productPrice", productPrice)
        formData.append("productDiscount", productDiscount)

        formData.append("productAbout", productAbout)
        formData.append("productFeatures", productFeatures)
        formData.append("productBenefits", productBenefits)
        formData.append("productFaqs", productFaqs)
        formData.append("productShipping", productShipping)

        formData.append("energization", JSON.stringify(energization))
        formData.append("options", JSON.stringify(options))
        formData.append("removedImages", JSON.stringify(removedImages))
        formData.append("existingImages", JSON.stringify(existingImages))

        newImages.forEach((file) => {
            formData.append("image", file)
        })

        try {
            const response = await updateRudraksha(rudrakshaId, formData)
            if (response.success) {
                toast.success(response.message || "Product updated successfully!")
                router.push("/admin/rudraksha")
            } else {
                toast.error(response.message || "Update failed")
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    if (loading) return <p className="text-center">Loading...</p>

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold uppercase">Edit Rudraksha</h1>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <InputWithLabel id="stock" label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                <InputWithLabel id="productName" label="Product Name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <InputWithLabel id="productPrice" label="Product Price" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                <InputWithLabel id="productDiscount" label="Product Discount (%)" type="number" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />

                {/* Existing Images */}
                <div className="grid gap-3">
                    <Label>Existing Images</Label>
                    <div className="flex flex-wrap gap-3">
                        {existingImages.map((url, idx) => (
                            <div key={idx} className="relative h-24 w-24">
                                <Image src={url} alt="product" className="h-24 w-24 rounded border object-cover" width={96} height={96} />
                                <button type="button" className="absolute top-0 right-0 rounded bg-red-500 px-1 text-xs text-white" onClick={() => handleRemoveImage(url)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                        {existingImages.length === 0 && <p className="text-sm text-gray-500">No images uploaded</p>}
                    </div>
                </div>

                {/* Upload New Images */}
                <div className="grid gap-3">
                    <Label htmlFor="productImage">Upload New Images</Label>
                    <Input id="productImage" type="file" name="image" multiple accept="image/*" onChange={handleFileChange} />
                    {newImages.length > 0 && <p className="text-sm text-gray-600">{newImages.length} files selected</p>}
                </div>
            </div>

            {/* Options */}
            <Section label="Product Options" onAdd={addOption}>
                {options.map((opt, index) => (
                    <div key={index} className="grid grid-cols-2 items-center gap-2 md:grid-cols-3">
                        <Input type="text" value={opt.title} onChange={(e) => handleOptionChange(index, "title", e.target.value)} placeholder="e.g. Only Bead / With Pendant" />
                        <Input type="number" value={opt.price} onChange={(e) => handleOptionChange(index, "price", e.target.value)} placeholder="enter option price" />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)} className="text-red-500 hover:bg-red-500 hover:text-white">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </Section>

            {/* Energization */}
            <Section label="Pooja / Energization" onAdd={addEnergization}>
                {energization.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 items-center gap-2 md:grid-cols-4">
                        <Input type="text" value={item.title} onChange={(e) => handleEnergizationChange(index, "title", e.target.value)} placeholder="enter name" />
                        <Input type="number" value={item.price} onChange={(e) => handleEnergizationChange(index, "price", e.target.value)} placeholder="enter price" />
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id={`isHaveForm-${index}`}
                                checked={item.isHaveForm}
                                onCheckedChange={(checked) => handleEnergizationChange(index, "isHaveForm", !!checked)}
                                className="w-4 border"
                            />
                            <Label htmlFor={`isHaveForm-${index}`}>Has Form?</Label>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEnergization(index)} className="text-red-500 hover:bg-red-500 hover:text-white">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </Section>

            {/* Editors */}
            <EditorSection label="Product Features" value={productFeatures} onChange={setProductFeatures} />
            <EditorSection label="About Product" value={productAbout} onChange={setProductAbout} />
            <EditorSection label="Benefits" value={productBenefits} onChange={setProductBenefits} />
            <EditorSection label="FAQ's" value={productFaqs} onChange={setProductFaqs} />
            <EditorSection label="Shipping & Return" value={productShipping} onChange={setProductShipping} />

            <Button type="submit" className="mt-4 ml-auto w-fit rounded bg-orange-600 px-6 py-2 font-bold text-white">
                Update Product
            </Button>
        </form>
    )
}

/* ---- Small Reusable Components ---- */
function InputWithLabel({ id, label, ...props }) {
    return (
        <div className="grid gap-3">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...props} />
        </div>
    )
}

function EditorSection({ label, value, onChange }) {
    return (
        <div className="grid gap-3">
            <Label>{label}</Label>
            <TiptapEditor value={value} onChange={onChange} />
            <Separator />
        </div>
    )
}

function Section({ label, onAdd, children }) {
    return (
        <div className="grid gap-3">
            <div className="flex items-center justify-between">
                <Label>{label}</Label>
                <Button type="button" variant="ghost" className="border capitalize hover:bg-orange-500 hover:text-white" onClick={onAdd}>
                    Add New
                </Button>
            </div>
            {children}
        </div>
    )
}
