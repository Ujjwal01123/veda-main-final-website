const HeroSection = () => {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            {/* 🎥 Full-width Background Video */}
            <video className="absolute inset-0 h-full w-full object-cover" src="/gemstone/Pink Yellow Purple and White Modern Creativity Presentation.mp4" autoPlay loop muted playsInline />

            {/* 🌑 Optional Overlay for subtle cinematic effect */}
            <div className="absolute inset-0 bg-black/20"></div>
        </section>
    )
}

export default HeroSection
