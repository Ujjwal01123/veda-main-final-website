import { AuthProvider } from "@/context/useAuth"
import { Toaster } from "sonner"
import { currentUser } from "@/apis/controllers/userController"
import { CartProvider } from "@/context/cartContext"

export default async function ClientWrappers({ children }) {
    let user = null
    try {
        user = await currentUser()
    } catch (err) {
        user = null
    }

    return (
        <>
            <AuthProvider initialUser={user}>
                <CartProvider>
                    <div>
                        <Toaster position="bottom-right" />
                    </div>
                    {children}
                </CartProvider>
            </AuthProvider>
        </>
    )
}
