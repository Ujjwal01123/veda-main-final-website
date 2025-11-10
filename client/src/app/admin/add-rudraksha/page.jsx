"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import TiptapEditor from "@/components/TiptapEditor"
import { postRudraksha } from "@/apis/controllers/rudrakshaController"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react" // 👈 for delete icon

export default function AddRudraksha() {
    const router = useRouter()
    const [productAbout, setProductAbout] = useState("")
    const [productFeatures, setProductFeatures] = useState("")
    const [productBenefits, setProductBenefits] = useState("")
    const [productFaqs, setProductFaqs] = useState("")
    const [productShipping, setProductShipping] = useState("")

    // Energization
    const [energization, setEnergization] = useState([{ title: "", price: "", isHaveForm: false }])
    const handleListChange = (index, field, value) => {
        const updatedList = [...energization]
        updatedList[index][field] = value
        setEnergization(updatedList)
    }
    const addNewEnergization = () => {
        setEnergization((prev) => [...prev, { title: "", price: "", isHaveForm: false }])
    }
    const removeEnergization = (index) => {
        setEnergization((prev) => prev.filter((_, i) => i !== index))
    }

    // Product Options
    const [options, setOptions] = useState([{ title: "", price: "" }])
    const handleOptionChange = (index, field, value) => {
        const updated = [...options]
        updated[index][field] = value
        setOptions(updated)
    }
    const addNewOption = () => {
        setOptions((prev) => [...prev, { title: "", price: "" }])
    }
    const removeOption = (index) => {
        setOptions((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        formData.append("productAbout", String(productAbout))
        formData.append("productFeatures", String(productFeatures))
        formData.append("productBenefits", String(productBenefits))
        formData.append("productFaqs", String(productFaqs))
        formData.append("productShipping", String(productShipping))
        formData.append("energization", JSON.stringify(energization))
        formData.append("options", JSON.stringify(options))

        try {
            const response = await postRudraksha(formData)
            if (response.success) {
                toast.success(response.message)
                router.push("/admin/rudraksha")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold uppercase">Add Rudraksha</h1>

            {/* Basic Info */}
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
                    <Label htmlFor="productPrice">Product Price</Label>
                    <Input id="productPrice" type="number" name="productPrice" placeholder="enter product price" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="productDiscount">Product Discount (in %)</Label>
                    <Input id="productDiscount" type="number" name="productDiscount" placeholder="enter product discount" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="productImage">Product Images</Label>
                    <Input id="productImage" type="file" name="image" multiple accept="image/*" />
                </div>
            </div>

            {/* Product Options */}
            <div>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label>Product Options</Label>
                        <Button type="button" variant="ghost" className="cursor-pointer border capitalize hover:bg-orange-500 hover:text-white" onClick={addNewOption}>
                            add new option
                        </Button>
                    </div>

                    {options.map((opt, index) => (
                        <div key={index} className="grid grid-cols-2 items-center gap-2 md:grid-cols-3">
                            <Input type="text" value={opt.title} onChange={(e) => handleOptionChange(index, "title", e.target.value)} placeholder="e.g. Only Bead / With Pendant" />
                            <Input type="number" value={opt.price} onChange={(e) => handleOptionChange(index, "price", e.target.value)} placeholder="enter option price" />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)} className="text-red-500 hover:bg-red-500 hover:text-white">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Energization */}
            <div>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label>Pooja / ENERGIZATION</Label>
                        <Button type="button" variant="ghost" className="cursor-pointer border capitalize hover:bg-orange-500 hover:text-white" onClick={addNewEnergization}>
                            add new energization
                        </Button>
                    </div>

                    {energization.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 items-center gap-2 md:grid-cols-4">
                            <Input type="text" value={item.title} onChange={(e) => handleListChange(index, "title", e.target.value)} placeholder="enter energization name" />
                            <Input type="number" value={item.price} onChange={(e) => handleListChange(index, "price", e.target.value)} placeholder="enter energization price" />
                            <div className="flex items-center gap-2">
                                <Checkbox id={`isHaveForm-${index}`} checked={item.isHaveForm} onCheckedChange={(checked) => handleListChange(index, "isHaveForm", checked)} className="w-4 border" />
                                <Label htmlFor={`isHaveForm-${index}`}>IsHaveForm?</Label>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeEnergization(index)} className="text-red-500 hover:bg-red-500 hover:text-white">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Editors */}
            <div className="grid gap-3">
                <Label>Product Features</Label>
                <TiptapEditor onChange={setProductFeatures} className="prose prose-sm max-w-none" />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>About Product</Label>
                <TiptapEditor onChange={setProductAbout} className="prose prose-sm max-w-none" />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Benefits</Label>
                <TiptapEditor onChange={setProductBenefits} className="prose prose-sm max-w-none" />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Faq's</Label>
                <TiptapEditor onChange={setProductFaqs} className="prose prose-sm max-w-none" />
            </div>
            <Separator />

            <div className="grid gap-3">
                <Label>Shipping & Return</Label>
                <TiptapEditor onChange={setProductShipping} className="prose prose-sm max-w-none" />
            </div>

            <button type="submit" className="mt-4 ml-auto w-fit rounded bg-orange-600 px-4 py-2 font-bold text-white">
                Add Product
            </button>
        </form>
    )
}
