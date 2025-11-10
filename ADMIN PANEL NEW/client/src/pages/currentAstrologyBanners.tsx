import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Sparkles } from "lucide-react";

interface BannerImage {
  _id: string;
  imageUrl: string;
  altText: string;
}

interface Banner {
  _id: string;
  sectionName: string;
  imageUrl: string; // main image
  altText: string;
  isActive: boolean;
  images?: BannerImage[]; // optional extra images
}

export function AstrologyBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/banners`);
        if (res.data.success) {
          const filtered = res.data.data.filter(
            (b: Banner) => b.sectionName === "astrology"
          );
          setBanners(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 relative">
      {/* Sticky Floating Button */}
      <div className="fixed top-24 right-6 z-50">
        <Button
          className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300 opacity-90 hover:opacity-100 backdrop-blur-md"
          onClick={() => navigate("/banners/astrology")}
        >
          Set New Astrology Banner
        </Button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
              <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 bg-clip-text text-transparent">
              Current Astrology Banners
            </h1>
          </div>
          <p className="text-orange-500 text-xl max-w-2xl mx-auto">
            All active banners for our divine Astrology section.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-orange-500 text-lg">Loading...</p>
        ) : banners.length === 0 ? (
          <p className="text-center text-orange-500 text-lg">
            No Astrology banners found.
          </p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 relative">
            {banners.map((banner) => {
              const allImages = banner.images || [];

              return allImages.map((img, idx) => (
                <div
                  key={`${banner._id}-${idx}`}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
                >
                  <img
                    src={`${apiUrl}${img.imageUrl}`}
                    alt={img.altText || `Astrology Banner ${idx + 1}`}
                    className="w-full h-auto rounded-2xl object-contain transition-all duration-700 ease-out group-hover:brightness-75"
                  />

                  {/* Hover Alt Text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="bg-black/70 text-white text-center px-3 py-2 rounded-md">
                      {img.altText || `Astrology Banner ${idx + 1}`}
                    </p>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                </div>
              ));
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-orange-500">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <p>© 2025 Divine Banners — Astrology Section</p>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Image as ImageIcon, Sparkles } from "lucide-react";

// interface Banner {
//   _id: string;
//   sectionName: string;
//   imageUrl: string;
//   altText: string;
//   isActive: boolean;
// }

// export function AstrologyBanners() {
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/banners`);
//         if (res.data.success) {
//           const filtered = res.data.data.filter(
//             (b: Banner) => b.sectionName === "astrology"
//           );
//           setBanners(filtered);
//         }
//       } catch (error) {
//         console.error("Failed to fetch banners", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBanners();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
//       {/* Header */}
//       <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
//         <div className="container mx-auto px-4 py-6 text-center">
//           <div className="flex justify-center items-center gap-3 mb-3">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 bg-clip-text text-transparent">
//               Current Astrology Banners
//             </h1>
//           </div>
//           <p className="text-orange-500 text-xl max-w-2xl mx-auto">
//             All active banners for our divine Astrology section.
//           </p>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="container mx-auto px-4 py-12">
//         {loading ? (
//           <p className="text-center text-orange-500 text-lg">Loading...</p>
//         ) : banners.length === 0 ? (
//           <p className="text-center text-orange-500 text-lg">
//             No Astrology banners found.
//           </p>
//         ) : (
//           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
//             {banners.map((banner) => (
//               <div
//                 key={banner._id}
//                 className="break-inside-avoid relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
//               >
//                 <img
//                   src={`${apiUrl}${banner.imageUrl}`}
//                   alt={banner.altText || "Banner"}
//                   className="w-full h-auto rounded-2xl object-contain transition-all duration-700 ease-out group-hover:brightness-75"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <Button
//                     className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
//                     onClick={() => navigate("/banners/puja")}
//                   >
//                     Set New Astrology Banner
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       <footer className="mt-16 py-8 border-t border-border bg-muted/30">
//         <div className="container mx-auto px-4 text-center text-orange-500">
//           <div className="flex items-center justify-center gap-2">
//             <Sparkles className="w-4 h-4 animate-pulse" />
//             <p>© 2025 Divine Banners — Astrology Section</p>
//             <Sparkles className="w-4 h-4 animate-pulse" />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
