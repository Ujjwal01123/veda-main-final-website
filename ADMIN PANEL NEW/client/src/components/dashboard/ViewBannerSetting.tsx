import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";
// import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Sparkles,
  Sun,
  Moon,
  Star,
  Gem,
  BookOpen,
} from "lucide-react";

export function BannerViewSettings() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    {
      title: "View Puja Banners",
      icon: Sun,
      route: "/banners/view/puja",
      description: "Browse all current Puja section banners.",
    },
    {
      title: "View Astrology Banners",
      icon: Moon,
      route: "/banners/view/astrology",
      description: "Explore all astrology page banners with cosmic charm.",
    },
    {
      title: "View Rudraksha Banners",
      icon: Star,
      route: "/banners/view/rudraksha",
      description: "See the latest Rudraksha product banners.",
    },
    {
      title: "View Bracelet Banners",
      icon: Gem,
      route: "/banners/view/bracelet",
      description: "Check all bracelet display banners in gallery view.",
    },
    {
      title: "View Blog Banners",
      icon: BookOpen,
      route: "/banners/view/blog",
      description: "Preview all blog section banners and visuals.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection="bannerView"
      />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          "lg:ml-64" // Adjusts spacing when sidebar is open
        )}
      >
        {/* Header
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> */}

        {/* Page Content */}
        <main className="p-6 space-y-8 bg-gradient-to-br from-background via-background to-secondary/10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                  <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                  View Banners Gallery
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore all section banners currently displayed on your
                platform.
              </p>
            </div>

            {/* Banner Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.title}
                    className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer flex flex-col items-center justify-center text-center p-6"
                    onClick={() => navigate(section.route)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual mb-4">
                      <Icon className="w-6 h-6 text-spiritual-foreground" />
                    </div>
                    <CardTitle className="text-foreground mb-2">
                      {section.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <Button
                      variant="spiritual"
                      className="shadow-spiritual"
                      onClick={() => navigate(section.route)}
                    >
                      {section.title}
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">
                  Keep an eye on all your section banners in one gallery
                  dashboard.
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Image as ImageIcon,
//   Sparkles,
//   Sun,
//   Moon,
//   Star,
//   Gem,
//   BookOpen,
// } from "lucide-react";

// export function BannerViewSettings() {
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "View Puja Banners",
//       icon: Sun,
//       route: "/banners/view/puja",
//       description: "Browse all current Puja section banners.",
//     },
//     {
//       title: "View Astrology Banners",
//       icon: Moon,
//       route: "/banners/view/astrology",
//       description: "Explore all astrology page banners with cosmic charm.",
//     },
//     {
//       title: "View Rudraksha Banners",
//       icon: Star,
//       route: "/banners/view/rudraksha",
//       description: "See the latest Rudraksha product banners.",
//     },
//     {
//       title: "View Bracelet Banners",
//       icon: Gem,
//       route: "/banners/view/bracelet",
//       description: "Check all bracelet display banners in gallery view.",
//     },
//     {
//       title: "View Blog Banners",
//       icon: BookOpen,
//       route: "/banners/view/blog",
//       description: "Preview all blog section banners and visuals.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               View Banners Gallery
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Explore all section banners currently displayed on your platform.
//           </p>
//         </div>

//         {/* Banner Sections */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sections.map((section) => {
//             const Icon = section.icon;
//             return (
//               <Card
//                 key={section.title}
//                 className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer flex flex-col items-center justify-center text-center p-6"
//                 onClick={() => navigate(section.route)}
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual mb-4">
//                   <Icon className="w-6 h-6 text-spiritual-foreground" />
//                 </div>
//                 <CardTitle className="text-foreground mb-2">
//                   {section.title}
//                 </CardTitle>
//                 <p className="text-muted-foreground mb-4">
//                   {section.description}
//                 </p>
//                 <Button
//                   variant="spiritual"
//                   className="shadow-spiritual"
//                   onClick={() => navigate(section.route)}
//                 >
//                   {section.title}
//                 </Button>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         <div className="text-center py-8">
//           <div className="flex items-center justify-center gap-2 text-muted-foreground">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm">
//               Keep an eye on all your section banners in one gallery dashboard.
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
