import About from "@/components/Home/About"
import Banner from "@/components/Home/Banner"
// import Download from "@/components/Download"
import Services from "@/components/Home/Services"
import HomepageProducts from "@/components/HomepageProducts"

export default function Home() {
    return (
        <>
            <Banner />
            <About />
            <Services />
            <section className="py-10 md:py-12 lg:py-16">
                <div className="mx-auto mb-12 max-w-7xl text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl" data-aos="fade-up">
                        Our Products
                    </h2>
                    <p className="mt-3 text-lg text-gray-600" data-aos="fade-down">
                        Explore our wide range of products that cater to various needs and preferences.
                    </p>
                </div>
                <HomepageProducts />

                {/* testimonials */}
                {/* <div className="my-12">
                    <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl">Testimonials</h2>
                    <p className="text-md text-center italic">Check out what our customers have to say about our products.</p>
                    <iframe src="https://widgets.sociablekit.com/google-reviews/iframe/25609563" frameborder="0" width="100%" height="600"></iframe>
                </div> */}
            </section>
            {/* <Download /> */}
        </>
    )
}
