'use client'
import Link from 'next/link'
import { Eye, EyeOff, Home } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { loginUser, registerUser } from '@/apis/controllers/userController'
import Image from 'next/image'
import { useAuth } from '@/context/useAuth'

export default function AuthForm({ type }) {
    const router = useRouter()
    const { refetchUser } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const fullname = formData.get('fullname')
        const email = formData.get('email')
        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')

        if (type === 'signup') {
            try {
                if (password !== confirmPassword) throw new Error('Passwords do not match')

                const res = await registerUser({ fullname, email, password })
                if (res.success) {
                    router.push('/sign-in')
                }
            } catch (error) {
                toast.error(error.message)
            }
        } else {
            try {
                const res = await loginUser({ email, password })
                await refetchUser()
                if (res.success) {
                    router.push('/')
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <>
            <div className="grid lg:grid-cols-2">
                <div className="bg-muted relative hidden lg:block">
                    <Image
                        src="/images/login.jpg"
                        alt="Image"
                        width={500}
                        height={500}
                        className="w-full max-h-screen min-h-[100dvh] object-cover object-bottom"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="absolute inset-0 grid items-center justify-center text-white">
                        <div className="text-center px-4 space-y-2">
                            <h1 className="text-5xl font-bold text-orange-400">Veda Structure</h1>
                            <p className="text-sm">
                                Veda Structure is your one-stop rudraksha for all astrology needs.
                                Established in 2022, we are a team of highly qualified astrologers,
                                pundits, and experts dedicated to providing a safe, efficient,
                                pleasant, and personalized experience in the field of astrology,
                                numerology, horoscope prediction, Vedic Puja and various related
                                products.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link href="/" className="flex items-center gap-2 font-medium">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <Home className="size-4" />
                            </div>
                            Veda Structure
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">
                                        {' '}
                                        {type === 'signin'
                                            ? 'Login to your account'
                                            : 'Create new account'}
                                    </h1>
                                    <p className="text-muted-foreground text-sm text-balance">
                                        {type === 'signin'
                                            ? 'Enter your credentials to sign in'
                                            : 'Fill details to register'}
                                    </p>
                                </div>
                                <div className="grid gap-6">
                                    {type === 'signup' && (
                                        <div className="grid gap-3">
                                            <Label htmlFor="fullname">Fullname</Label>
                                            <Input
                                                id="fullname"
                                                type="text"
                                                name="fullname"
                                                placeholder="type your fullname"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="********"
                                                required
                                            />
                                            <button
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        </div>
                                    </div>
                                    {type === 'signup' && (
                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Confirm Password</Label>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="********"
                                                    required
                                                />
                                                <button
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                >
                                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-500 font-bold hover:bg-orange-600 cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    {type === 'signin' ? (
                                        <>
                                            {' '}
                                            Don&apos;t have an account?{' '}
                                            <Link
                                                href="sign-up"
                                                className="underline underline-offset-4"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            {' '}
                                            Already have an account?{' '}
                                            <Link
                                                href="sign-in"
                                                className="underline underline-offset-4"
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
