'use client'
import { useState } from 'react'
import { X, User, Mail, CalendarDays, Clock, ChevronDown, FileText } from 'lucide-react'

export default function BookSection() {
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        type: '',
        notes: '',
    })

    const sessionTypes = [
        'Styling Advice',
        'Custom Design Consultation',
        'Virtual Try-On',
        'Energy & Crystal Guidance',
    ]

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.date || !form.time || !form.type) {
            alert('Please fill all required fields ✍️')
            return
        }

        try {
            setSubmitting(true)
            alert('Session booked! ✅ Check your email for details.')
            setOpen(false)
            setForm({
                name: '',
                email: '',
                date: '',
                time: '',
                type: '',
                notes: '',
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-orange-300 blur-3xl opacity-30" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-yellow-400 blur-3xl opacity-30" />

            <div className="relative max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-14" data-aos="fade-down">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-orange-700 drop-shadow-md">
                        Book a Session
                    </h2>
                    <p
                        className="mt-3 text-gray-700 max-w-2xl mx-auto text-lg"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Get personalized guidance from our experts—styling tips, crystal
                        recommendations, and bespoke designs tailored to you.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Video Block */}
                    <div className="relative" data-aos="zoom-in-right">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-orange-200">
                            <video
                                src="/images/BookSession.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
                        </div>
                        <div
                            className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-md rounded-xl shadow-md px-5 py-3 ring-1 ring-orange-100"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <p className="text-sm text-gray-700">
                                Avg. session:{' '}
                                <span className="font-semibold text-orange-600">20–30 mins</span>
                            </p>
                        </div>
                    </div>

                    {/* CTA Panel */}
                    <div
                        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-orange-100"
                        data-aos="zoom-in-left"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            ✨ Talk to a Bracelet Expert
                        </h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                            Share your preferences and we’ll match the perfect pieces for your
                            energy, style and budget.
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-7 py-3 font-semibold text-white shadow-lg hover:shadow-orange-300/50 transition"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            Book Your Session
                        </button>

                        <ul
                            className="mt-6 space-y-2 text-sm text-gray-700"
                            data-aos="fade-up"
                            data-aos-delay="600"
                        >
                            <li>• Free consultation • No commitment</li>
                            <li>• Choose in-store / video call</li>
                            <li>• Get curated picks & offers</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => !submitting && setOpen(false)}
                    />
                    <div
                        className="relative z-10 w-[92%] max-w-2xl rounded-3xl 
             bg-white/90 backdrop-blur-xl 
             shadow-2xl border border-orange-200/40"
                        data-aos="zoom-in"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-3xl flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-orange-700 flex items-center gap-2">
                                    ✨ Book Your Session
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Fill the details below to confirm
                                </p>
                            </div>
                            <button
                                onClick={() => !submitting && setOpen(false)}
                                className="p-2 rounded-full hover:bg-orange-100 transition"
                            >
                                <X className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 gap-5">
                            {/* Name + Email */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                    <User className="h-5 w-5 text-orange-500" />
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={onChange}
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full outline-none bg-transparent"
                                        required
                                    />
                                </label>
                                <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                    <Mail className="h-5 w-5 text-orange-500" />
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full outline-none bg-transparent"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Date + Time */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                    <CalendarDays className="h-5 w-5 text-orange-500" />
                                    <input
                                        name="date"
                                        value={form.date}
                                        onChange={onChange}
                                        type="date"
                                        className="w-full outline-none bg-transparent"
                                        required
                                    />
                                </label>
                                <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                    <Clock className="h-5 w-5 text-orange-500" />
                                    <input
                                        name="time"
                                        value={form.time}
                                        onChange={onChange}
                                        type="time"
                                        className="w-full outline-none bg-transparent"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Session Type */}
                            <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                <ChevronDown className="h-5 w-5 text-orange-500" />
                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={onChange}
                                    className="w-full outline-none bg-transparent"
                                    required
                                >
                                    <option value="">Select Session Type</option>
                                    {sessionTypes.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Notes */}
                            <label className="flex items-start gap-3 rounded-2xl border px-4 py-3 bg-white/70 shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                                <FileText className="h-5 w-5 text-orange-500 mt-2" />
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={onChange}
                                    rows={4}
                                    placeholder="Any preferences, wrist size, gemstones you like… (optional)"
                                    className="w-full outline-none bg-transparent resize-none"
                                />
                            </label>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => !submitting && setOpen(false)}
                                    className="px-5 py-2 rounded-xl border hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 rounded-xl text-white font-semibold 
                   bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600
                   shadow-lg hover:shadow-orange-300/60 
                   transition-all duration-300 disabled:opacity-60"
                                >
                                    {submitting ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}
