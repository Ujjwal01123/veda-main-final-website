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
import Image from "next/image"
import { getBraceletById, updateBracelet } from "@/apis/controllers/braceletController.js"
import { X } from "lucide-react"

export default function EditBracelet() {
    const router = useRouter()
    const params = useParams()
    const braceletId = params?.id

    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState(0)
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDiscount, setProductDiscount] = useState("")
    const [productAbout, setProductAbout] = useState("")
    const [productFeatures, setProductFeatures] = useState("")
    const [productBenefits, setProductBenefits] = useState("")
    const [productFaqs, setProductFaqs] = useState("")
    const [productShipping, setProductShipping] = useState("")

    const [energization, setEnergization] = useState([{ title: "", price: "", isHaveForm: false }])
    const [sizes, setSizes] = useState([{ size: "Small", price: "", stock: "" }])
    const [certificates, setCertificates] = useState([{ type: "Without Certificate", price: "" }])

    const [existingImages, setExistingImages] = useState([])
    const [removedImages, setRemovedImages] = useState([])
    const [newImages, setNewImages] = useState([])

    // ----------------- FETCH DATA -------------------
    useEffect(() => {
        if (!braceletId) return
        const fetchData = async () => {
            try {
                const res = await getBraceletById(braceletId)
                if (res.success) {
                    const data = res.data.bracelet
                    setStock(data.stock || 0)
                    setProductName(data.productName || "")
                    setProductPrice(data.productPrice || "")
                    setProductDiscount(data.productDiscount || "")

                    setProductAbout(data.productAbout || "")
                    setProductFeatures(data.productFeatures || "")
                    setProductBenefits(data.productBenefits || "")
                    setProductFaqs(data.productFaqs || "")
                    setProductShipping(data.productShipping || "")

                    setEnergization(data.energization?.length ? data.energization : [{ title: "", price: "", isHaveForm: false }])
                    setSizes(data.sizes?.length ? data.sizes : [{ size: "Small", price: "", stock: "" }])
                    setCertificates(data.certificates?.length ? data.certificates : [{ type: "Without Certificate", price: "" }])

                    setExistingImages(data.productImage || [])
                }
            } catch (err) {
                toast.error("Failed to load product")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [braceletId])

    // ----------------- ENERGIZATION -------------------
    const handleEnergizationChange = (index, field, value) => {
        const updated = [...energization]
        updated[index][field] = value
        setEnergization(updated)
    }
    const addEnergization = () => setEnergization((prev) => [...prev, { title: "", price: "", isHaveForm: false }])
    const removeEnergization = (index) => setEnergization((prev) => prev.filter((_, i) => i !== index))

    // ----------------- SIZE -------------------
    const handleSizeChange = (index, field, value) => {
        const updated = [...sizes]
        updated[index][field] = value
        setSizes(updated)
    }
    const addSize = () => setSizes((prev) => [...prev, { size: "", price: "", stock: "" }])
    const removeSize = (index) => setSizes((prev) => prev.filter((_, i) => i !== index))

    // ----------------- CERTIFICATE -------------------
    const handleCertificateChange = (index, field, value) => {
        const updated = [...certificates]
        updated[index][field] = value
        setCertificates(updated)
    }
    const addCertificate = () => setCertificates((prev) => [...prev, { type: "", price: "" }])
    const removeCertificate = (index) => setCertificates((prev) => prev.filter((_, i) => i !== index))

    // ----------------- IMAGE HANDLING -------------------
    const handleRemoveImage = (url) => {
        setRemovedImages((prev) => [...prev, url])
        setExistingImages((prev) => prev.filter((img) => img !== url))
    }
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setNewImages(files)
    }

    // ----------------- SUBMIT -------------------
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
        formData.append("sizes", JSON.stringify(sizes))
        formData.append("certificates", JSON.stringify(certificates))
        formData.append("removedImages", JSON.stringify(removedImages))
        formData.append("existingImages", JSON.stringify(existingImages))

        newImages.forEach((file) => {
            formData.append("image", file)
        })

        try {
            const response = await updateBracelet(braceletId, formData)
            if (response.success) {
                toast.success(response.message || "Product updated successfully!")
                router.push("/admin/bracelet")
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
            <h1 className="text-2xl font-bold uppercase">Edit Bracelet</h1>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="grid gap-3">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productPrice">Base Price</Label>
                    <Input id="productPrice" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="productDiscount">Product Discount (%)</Label>
                    <Input id="productDiscount" type="number" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
                </div>

                {/* EXISTING IMAGES */}
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

                {/* UPLOAD NEW IMAGES */}
                <div className="grid gap-3">
                    <Label htmlFor="productImage">Upload New Images</Label>
                    <Input id="productImage" type="file" multiple accept="image/*" onChange={handleFileChange} />
                    {newImages.length > 0 && <p className="text-sm text-gray-600">{newImages.length} files selected</p>}
                </div>
            </div>

            {/* ENERGIZATION */}
            <div>
                <div className="flex items-center justify-between">
                    <Label>Pooja / ENERGIZATION</Label>
                    <Button type="button" variant="ghost" onClick={addEnergization}>
                        + Add
                    </Button>
                </div>
                {energization.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-4 gap-2">
                        <Input type="text" value={item.title} onChange={(e) => handleEnergizationChange(index, "title", e.target.value)} placeholder="name" />
                        <Input type="number" value={item.price} onChange={(e) => handleEnergizationChange(index, "price", e.target.value)} placeholder="price" />
                        <div className="flex items-center gap-2">
                            <Checkbox checked={item.isHaveForm} onCheckedChange={(checked) => handleEnergizationChange(index, "isHaveForm", !!checked)} />
                            <Label>Form?</Label>
                        </div>
                        <button type="button" onClick={() => removeEnergization(index)} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* SIZES */}
            <div>
                <div className="flex items-center justify-between">
                    <Label>Available Sizes</Label>
                    <Button type="button" variant="ghost" onClick={addSize}>
                        + Add
                    </Button>
                </div>
                {sizes.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-4 gap-2">
                        <Input type="text" value={item.size} onChange={(e) => handleSizeChange(index, "size", e.target.value)} placeholder="Small / Medium / Large" />
                        <Input type="number" value={item.price} onChange={(e) => handleSizeChange(index, "price", e.target.value)} placeholder="price" />
                        <Input type="number" value={item.stock} onChange={(e) => handleSizeChange(index, "stock", e.target.value)} placeholder="stock" />
                        <button type="button" onClick={() => removeSize(index)} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* CERTIFICATES */}
            <div>
                <div className="flex items-center justify-between">
                    <Label>Certificates</Label>
                    <Button type="button" variant="ghost" onClick={addCertificate}>
                        + Add
                    </Button>
                </div>
                {certificates.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-3 gap-2">
                        <Input type="text" value={item.type} onChange={(e) => handleCertificateChange(index, "type", e.target.value)} placeholder="With / Without Certificate" />
                        <Input type="number" value={item.price} onChange={(e) => handleCertificateChange(index, "price", e.target.value)} placeholder="extra price" />
                        <button type="button" onClick={() => removeCertificate(index)} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="grid gap-3">
                <Label>Product Features</Label>
                <TiptapEditor value={productFeatures} onChange={setProductFeatures} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>About Product</Label>
                <TiptapEditor value={productAbout} onChange={setProductAbout} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Benefits</Label>
                <TiptapEditor value={productBenefits} onChange={setProductBenefits} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>FAQ's</Label>
                <TiptapEditor value={productFaqs} onChange={setProductFaqs} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Shipping & Return</Label>
                <TiptapEditor value={productShipping} onChange={setProductShipping} />
            </div>

            <Button type="submit" className="mt-4 ml-auto w-fit rounded bg-orange-600 px-6 py-2 font-bold text-white">
                Update Product
            </Button>
        </form>
    )
}
