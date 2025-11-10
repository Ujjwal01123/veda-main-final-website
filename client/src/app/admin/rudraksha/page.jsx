"use client"
import { deleteRudraksha } from "@/apis/controllers/rudrakshaController"
import useRudraksha from "@/hooks/useRudraksha"
import { Pen, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export default function Rudraksha() {
    const { rudraksha, refetchRudraksha } = useRudraksha()
    const handleDelete = async (id) => {
        await deleteRudraksha(id)
        await refetchRudraksha()
    }
    return (
        <div>
            <div className="flex justify-end">
                <Link href="/admin/add-rudraksha" className="my-2 inline-block rounded bg-orange-500 px-4 py-2 font-bold text-white transition-all hover:scale-105">
                    Add Rudraksha
                </Link>
            </div>
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {rudraksha?.map((item) => (
                    <div className="relative rounded-2xl bg-white shadow-lg" key={item?._id}>
                        <div className="m-2 flex justify-end gap-2">
                            <Link
                                href={`/admin/edit-rudraksha/${item._id}`}
                                className="bg-secondary text-primary mt-3 grid aspect-square w-10 cursor-pointer place-items-center rounded border font-semibold shadow-md transition-all hover:shadow-lg"
                                title="edit product"
                            >
                                <Pen />
                            </Link>
                            <button
                                onClick={() => handleDelete(item?._id)}
                                className="bg-secondary hover:bg-destructive text-primary mt-3 grid aspect-square w-10 cursor-pointer place-items-center rounded border font-semibold shadow-md transition-all hover:shadow-lg"
                                title="remove product"
                            >
                                <Trash />
                            </button>
                        </div>
                        <div className="relative w-full" key={item?.id}>
                            <div className="grid grid-cols-2 gap-2 p-4">
                                {item.productImage.map((url) => (
                                    <Image src={url} alt={item?.productName} className="inline-block h-full w-full object-contain transition-transform duration-500" width={500} height={500} />
                                ))}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{item?.productName}</h3>
                            <div>
                                <p>Price: ₹{item?.productPrice}</p>
                                <p>Discount: {item?.productDiscount}%</p>
                                <p>Stock: {item?.stock}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
