import AllProductPage from "@/components/AllProductPage"
import Image from "next/image"

function page() {
    return (
        <>
            <div>
                <Image src="/images/Artboard-4.jpg" width={1920} height={1080} alt="all products" className="h-[350px] w-full object-cover object-right md:h-full md:object-center" />
            </div>
            <AllProductPage />
        </>
    )
}

export default page
