import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Sparkles } from "lucide-react";

interface Banner {
  _id: string;
  sectionName: string;
  imageUrl: string;
  altText: string;
  isActive: boolean;
}

// ...imports remain the same

export function ViewBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/banners`);
        if (res.data.success) {
          setBanners(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const getBannerRoute = (sectionName: string) => {
    const routes: Record<string, string> = {
      puja: "/banners/puja",
      astrology: "/banners/astrology",
      rudraksha: "/banners/rudraksha",
      bracelet: "/banners/bracelet",
      blog: "/banners/blog",
    };
    return routes[sectionName] || "/dashboard/manage-banners";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
              <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-accent to-orange-500 bg-clip-text text-transparent">
              Current Banners Gallery
            </h1>
          </div>
          <p className="text-orange-500 text-xl max-w-2xl mx-auto">
            Explore all banners in their original aspect ratio and divine
            detail.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-orange-500 text-lg">
            Loading banners...
          </p>
        ) : banners.length === 0 ? (
          <p className="text-center text-orange-500 text-lg">
            No banners uploaded yet.
          </p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="break-inside-avoid relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Banner Image */}
                <img
                  src={`${apiUrl}${banner.imageUrl}`}
                  alt={banner.altText || "Banner"}
                  className="w-full h-auto rounded-2xl object-contain transition-all duration-700 ease-out group-hover:brightness-75"
                />

                {/* Always-visible section name text */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                  <h2 className="text-2xl sm:text-3xl font-bold capitalize drop-shadow-md text-white/90 transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                    {banner.sectionName} Banner
                  </h2>
                </div>

                {/* Overlay background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Hover button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button
                    className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(getBannerRoute(banner.sectionName));
                    }}
                  >
                    Set New {banner.sectionName} Banner
                  </Button>
                </div>

                {/* Glow Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400/40 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-orange-500">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <p>
              © 2025 Divine Banners — All images preserved in original aspect
              ratio.
            </p>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}
