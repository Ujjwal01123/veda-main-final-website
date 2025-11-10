"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Make sure path is correct
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
  Menu,
} from "lucide-react";

export function BannerSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sections = [
    {
      title: "Set Puja Banner",
      icon: Sun,
      route: "/banners/puja",
      description: "Upload and customize the banner image for Puja section",
    },
    {
      title: "Set Astrology Banner",
      icon: Moon,
      route: "/banners/astrology",
      description: "Set the astrology page banner with a celestial touch",
    },
    {
      title: "Set Rudraksha Banner",
      icon: Star,
      route: "/banners/rudraksha",
      description: "Design and update the Rudraksha product banner",
    },
    {
      title: "Set Bracelet Banner",
      icon: Gem,
      route: "/banners/bracelet",
      description: "Choose and upload the bracelet showcase banner",
    },
    {
      title: "Set Blog Banner",
      icon: BookOpen,
      route: "/banners/blog",
      description: "Upload a featured image for your blog section banner",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar (Fixed Left) */}{" "}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        className="fixed z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0"
      />
      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 transition-all duration-300 lg:ml-64 space-y-8">
        {/* Mobile toggle button */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold">Banner Settings</h2>
        </div>

        <div className="max-w-full lg:max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Banner Settings
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage and customize banner images for different sections of your
              platform to maintain a unified visual theme.
            </p>
          </div>

          {/* Banner Sections */}
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
                    className="shadow-spiritual w-full sm:w-auto"
                    onClick={() => navigate(section.route)}
                  >
                    Set {section.title}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">
                Keep your website’s banners fresh and visually aligned with your
                brand.
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BannerSettings;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Make sure path is correct
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

// export function BannerSettings() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "Set Puja Banner",
//       icon: Sun,
//       route: "/banners/puja",
//       description: "Upload and customize the banner image for Puja section",
//     },
//     {
//       title: "Set Astrology Banner",
//       icon: Moon,
//       route: "/banners/astrology",
//       description: "Set the astrology page banner with a celestial touch",
//     },
//     {
//       title: "Set Rudraksha Banner",
//       icon: Star,
//       route: "/banners/rudraksha",
//       description: "Design and update the Rudraksha product banner",
//     },
//     {
//       title: "Set Bracelet Banner",
//       icon: Gem,
//       route: "/banners/bracelet",
//       description: "Choose and upload the bracelet showcase banner",
//     },
//     {
//       title: "Set Blog Banner",
//       icon: BookOpen,
//       route: "/banners/blog",
//       description: "Upload a featured image for your blog section banner",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* ✅ Sidebar (Fixed Left) */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       {/* ✅ Main Content Area */}
//       <div className="flex-1 p-6 space-y-8 transition-all duration-300 lg:ml-64">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Banner Settings
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Manage and customize banner images for different sections of your
//               platform to maintain a unified visual theme.
//             </p>
//           </div>

//           {/* Banner Sections */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sections.map((section) => {
//               const Icon = section.icon;
//               return (
//                 <Card
//                   key={section.title}
//                   className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer flex flex-col items-center justify-center text-center p-6"
//                   onClick={() => navigate(section.route)}
//                 >
//                   <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual mb-4">
//                     <Icon className="w-6 h-6 text-spiritual-foreground" />
//                   </div>
//                   <CardTitle className="text-foreground mb-2">
//                     {section.title}
//                   </CardTitle>
//                   <p className="text-muted-foreground mb-4">
//                     {section.description}
//                   </p>
//                   <Button
//                     variant="spiritual"
//                     className="shadow-spiritual"
//                     onClick={() => navigate(section.route)}
//                   >
//                     Set {section.title}
//                   </Button>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Footer */}
//           <div className="text-center py-8">
//             <div className="flex items-center justify-center gap-2 text-muted-foreground">
//               <Sparkles className="w-4 h-4" />
//               <span className="text-sm">
//                 Keep your website’s banners fresh and visually aligned with your
//                 brand.
//               </span>
//               <Sparkles className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

// export function BannerSettings() {
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "Set Puja Banner",
//       icon: Sun,
//       route: "/banners/puja",
//       description: "Upload and customize the banner image for Puja section",
//     },
//     {
//       title: "Set Astrology Banner",
//       icon: Moon,
//       route: "/banners/astrology",
//       description: "Set the astrology page banner with a celestial touch",
//     },
//     {
//       title: "Set Rudraksha Banner",
//       icon: Star,
//       route: "/banners/rudraksha",
//       description: "Design and update the Rudraksha product banner",
//     },
//     {
//       title: "Set Bracelet Banner",
//       icon: Gem,
//       route: "/banners/bracelet",
//       description: "Choose and upload the bracelet showcase banner",
//     },
//     {
//       title: "Set Blog Banner",
//       icon: BookOpen,
//       route: "/banners/blog",
//       description: "Upload a featured image for your blog section banner",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Banner Settings
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Manage and customize banner images for different sections of your
//             platform to maintain a unified visual theme.
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
//                   Set {section.title}
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
//               Keep your website’s banners fresh and visually aligned with your
//               brand.
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
