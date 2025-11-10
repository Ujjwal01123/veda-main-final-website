const rareGemstones = [
    {
        name: "Columbian Emerald",
        src: "https://cdn.dhanshreegems.com/wysiwyg/new/columbian_emerald.png",
    },
    {
        name: "Kashmiri Neelam",
        src: "https://cdn.dhanshreegems.com/wysiwyg/new/kashmiri_neelam.png",
    },
    {
        name: "Pink Sapphire",
        src: "https://cdn.dhanshreegems.com/wysiwyg/new/pink_sapphire.png",
    },
    {
        name: "Burmese Ruby",
        src: "https://cdn.dhanshreegems.com/wysiwyg/new/burmese_ruby.png",
    },
]

const RareGemstoneSection = () => {
    return (
        <section className="bg-white py-12 text-center">
            {/* Decorative Header */}
            <div className="flex w-full flex-col items-center space-y-4 py-8">
                <div className="flex items-center space-x-4">
                    <span className="text-2xl text-red-500">🍃</span>
                    <h1 className="font-serif text-3xl font-bold tracking-wide text-gray-800 md:text-4xl">Rare Gemstones</h1>
                    <span className="text-2xl text-red-500">🍃</span>
                </div>

                {/* Gradient Bar */}
                <div className="flex items-center space-x-2">
                    <div className="h-2 w-4 rounded-sm bg-red-500 shadow-md"></div>
                    <div className="h-2 w-48 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 shadow-md"></div>
                    <div className="h-2 w-4 rounded-sm bg-red-500 shadow-md"></div>
                </div>
            </div>

            {/* Gemstone Grid */}
            <div className="mt-6 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-10">
                {rareGemstones.map((gem, index) => (
                    <div key={index} className="group inline-block overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1">
                        <img src={gem.src} alt={gem.name} className="h-full w-full transform object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                        <h3 className="mt-3 text-lg font-semibold text-gray-800">{gem.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RareGemstoneSection
