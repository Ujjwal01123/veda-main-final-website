"use client"

import { useState } from "react";

const categories = [
    {
        id: "rudraksha",
        name: "Rudrakhsha Products",
        brochures: {
            hindi: "/pdf/rudraksha-hindi.pdf",
            english: "/pdf/rudraksha-english.pdf",
        },
    },
    // {
    //     id: "bracelet",
    //     name: "Bracelets ",
    //     brochures: {
    //         hindi: "#",
    //         english: "#",
    //     },
    // },
    // {
    //     id: "inverters",
    //     name: "Inverters",
    //     brochures: {
    //         hindi: "/brochures/inverter-hindi.pdf",
    //         english: "/brochures/inverter-english.pdf",
    //     },
    // },
];

function page() {
    const [selected, setSelected] = useState(null);

    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    const selectedCategory = categories.find((cat) => cat.id === selected);

    return (
        <div className="flex min-h-[50vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white border border-yellow-400 p-6 shadow-lg">
                <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
                    Download Product Brochure
                </h2>

                <select
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 focus:border-yellow-400 focus:ring focus:ring-blue-200"
                    onChange={handleChange}
                    defaultValue=""
                >
                    <option value="" disabled>
                        -- Select a category --
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {selectedCategory && (
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <a
                            href={selectedCategory.brochures.hindi}
                            download
                            className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >
                            Hindi
                        </a>
                        <a
                            href={selectedCategory.brochures.english}
                            download
                            className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                        >
                            English
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default page
