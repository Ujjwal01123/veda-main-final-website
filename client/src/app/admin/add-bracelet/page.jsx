"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import TiptapEditor from "@/components/TiptapEditor"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { postBracelet } from "@/apis/controllers/braceletController.js"
import { X } from "lucide-react" // ✅ cross icon

export default function AddBracelet() {
    const router = useRouter()
    const [productAbout, setProductAbout] = useState("")
    const [productFeatures, setProductFeatures] = useState("")
    const [productBenefits, setProductBenefits] = useState("")
    const [productFaqs, setProductFaqs] = useState("")
    const [productShipping, setProductShipping] = useState("")
    const [loading, setLoading] = useState(false)

    const [energization, setEnergization] = useState([{ title: "", price: "", isHaveForm: false }])
    const [sizes, setSizes] = useState([{ size: "Small", price: "", stock: "" }])
    const [certificates, setCertificates] = useState([{ type: "Without Certificate", price: "" }])

    // ----------------- ENERGIZATION -------------------
    const handleListChange = (index, field, value) => {
        const updatedList = [...energization]
        updatedList[index][field] = value
        setEnergization(updatedList)
    }
    const addNewEnergization = () => setEnergization((prev) => [...prev, { title: "", price: "", isHaveForm: false }])
    const removeEnergization = (index) => setEnergization((prev) => prev.filter((_, i) => i !== index))

    // ----------------- SIZE -------------------
    const handleSizeChange = (index, field, value) => {
        const updated = [...sizes]
        updated[index][field] = value
        setSizes(updated)
    }
    const addNewSize = () => setSizes((prev) => [...prev, { size: "", price: "", stock: "" }])
    const removeSize = (index) => setSizes((prev) => prev.filter((_, i) => i !== index))

    // ----------------- CERTIFICATE -------------------
    const handleCertificateChange = (index, field, value) => {
        const updated = [...certificates]
        updated[index][field] = value
        setCertificates(updated)
    }
    const addNewCertificate = () => setCertificates((prev) => [...prev, { type: "", price: "" }])
    const removeCertificate = (index) => setCertificates((prev) => prev.filter((_, i) => i !== index))

    // ----------------- SUBMIT -------------------
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        formData.append("productAbout", String(productAbout))
        formData.append("productFeatures", String(productFeatures))
        formData.append("productBenefits", String(productBenefits))
        formData.append("productFaqs", String(productFaqs))
        formData.append("productShipping", String(productShipping))
        formData.append("energization", JSON.stringify(energization))
        formData.append("sizes", JSON.stringify(sizes))
        formData.append("certificates", JSON.stringify(certificates))
        setLoading(true)
        try {
            const response = await postBracelet(formData)
            if (response.success) {
                toast.success(response.message)
                router.push("/admin/bracelet")
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold uppercase">Add Bracelet</h1>

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
                    <Input id="productPrice" type="number" name="productPrice" placeholder="base product price" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="productDiscount">Product Discount (%)</Label>
                    <Input id="productDiscount" type="number" name="productDiscount" placeholder="enter discount" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="productImage">Product Images</Label>
                    <Input id="productImage" type="file" name="image" multiple accept="image/*" />
                </div>
            </div>

            {/* ENERGIZATION */}
            <div>
                <div className="flex items-center justify-between">
                    <Label>Pooja / ENERGIZATION</Label>
                    <Button type="button" variant="ghost" onClick={addNewEnergization}>
                        + Add Energization
                    </Button>
                </div>
                {energization.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-4 items-center gap-2">
                        <Input type="text" value={item.title} onChange={(e) => handleListChange(index, "title", e.target.value)} placeholder="energization name" />
                        <Input type="number" value={item.price} onChange={(e) => handleListChange(index, "price", e.target.value)} placeholder="price" />
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={item.isHaveForm} onChange={(e) => handleListChange(index, "isHaveForm", e.target.checked)} />
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
                <div className="mt-4 flex items-center justify-between">
                    <Label>Available Sizes</Label>
                    <Button type="button" variant="ghost" onClick={addNewSize}>
                        + Add Size
                    </Button>
                </div>
                {sizes.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-4 items-center gap-2">
                        <Input type="text" value={item.size} onChange={(e) => handleSizeChange(index, "size", e.target.value)} placeholder="e.g. Small, Medium, Large" />
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
                <div className="mt-4 flex items-center justify-between">
                    <Label>Certificate Options</Label>
                    <Button type="button" variant="ghost" onClick={addNewCertificate}>
                        + Add Certificate Option
                    </Button>
                </div>
                {certificates.map((item, index) => (
                    <div key={index} className="mt-2 grid grid-cols-3 items-center gap-2">
                        <Input type="text" value={item.type} onChange={(e) => handleCertificateChange(index, "type", e.target.value)} placeholder="e.g. With Certificate" />
                        <Input type="number" value={item.price} onChange={(e) => handleCertificateChange(index, "price", e.target.value)} placeholder="extra price" />
                        <button type="button" onClick={() => removeCertificate(index)} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* PRODUCT EDITORS */}
            <div className="grid gap-3">
                <Label>Product Features</Label>
                <TiptapEditor onChange={setProductFeatures} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>About Product</Label>
                <TiptapEditor onChange={setProductAbout} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Benefits</Label>
                <TiptapEditor onChange={setProductBenefits} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Faq's</Label>
                <TiptapEditor onChange={setProductFaqs} />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Shipping & Return</Label>
                <TiptapEditor onChange={setProductShipping} />
            </div>

            <button type="submit" className="mt-4 ml-auto w-fit rounded bg-orange-600 px-4 py-2 font-bold text-white">
                Add Product
            </button>
        </form>
    )
}
