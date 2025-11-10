"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Sparkles, Sun, Moon, Menu, X } from "lucide-react";

export function BannerOptions() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    {
      title: "View Banners",
      icon: Sun,
      route: "/banners/view",
      description: "Upload and customize the banner image for Puja section",
    },
    {
      title: "Set Banners",
      icon: Moon,
      route: "/dashboard/manage-banners",
      description: "Set the astrology page banner with a celestial touch",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar (responsive) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          activeSection="banner-options"
          onSectionChange={(section) => navigate(`/dashboard/${section}`)}
        />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          sidebarOpen ? "lg:ml-64" : ""
        } w-full`}
      >
        {/* Header bar on mobile */}
        <div className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur-md flex items-center justify-between p-4 border-b border-border/20">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          <h2 className="text-lg font-semibold">Banner Options</h2>
        </div>

        {/* Main content area */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
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
                    {section.title}
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

export default BannerOptions;

// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ your sidebar
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Image as ImageIcon, Sparkles, Sun, Moon, Menu } from "lucide-react";

// export function BannerOptions() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const sections = [
//     {
//       title: "View Banners",
//       icon: Sun,
//       route: "/banners/view",
//       description: "Upload and customize the banner image for Puja section",
//     },
//     {
//       title: "Set Banners",
//       icon: Moon,
//       route: "/dashboard/manage-banners",
//       description: "Set the astrology page banner with a celestial touch",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* Sidebar (left) */}
//       <Sidebar
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//         activeSection="banner-options"
//         onSectionChange={(section) => navigate(`/dashboard/${section}`)}
//         className="fixed z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0"
//       />

//       {/* Main content (right) */}
//       <main className="flex-1 p-4 lg:p-6 transition-all duration-300 overflow-y-auto">
//         {/* Toggle button (mobile) */}
//         <div className="lg:hidden mb-4 flex justify-between items-center">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//           <h2 className="text-xl font-semibold">Banner Options</h2>
//         </div>

//         <div className="max-w-full lg:max-w-7xl mx-auto space-y-8">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <ImageIcon className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Banner Settings
//               </h1>
//             </div>
//             <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
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
//                     className="shadow-spiritual w-full sm:w-auto"
//                     onClick={() => navigate(section.route)}
//                   >
//                     {section.title}
//                   </Button>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Footer */}
//           <div className="text-center py-8">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
//               <Sparkles className="w-4 h-4" />
//               <span className="text-sm">
//                 Keep your website’s banners fresh and visually aligned with your
//                 brand.
//               </span>
//               <Sparkles className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default BannerOptions;

// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ your sidebar
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Image as ImageIcon, Sparkles, Sun, Moon, Menu } from "lucide-react";

// export function BannerOptions() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const sections = [
//     {
//       title: "View Banners",
//       icon: Sun,
//       route: "/banners/view",
//       description: "Upload and customize the banner image for Puja section",
//     },
//     {
//       title: "Set Banners",
//       icon: Moon,
//       route: "/dashboard/manage-banners",
//       description: "Set the astrology page banner with a celestial touch",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* Sidebar (left) */}
//       <div
//         className={`fixed z-40 md:static md:translate-x-0 transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } w-64 flex-shrink-0 bg-white shadow-md md:shadow-none`}
//       >
//         <Sidebar
//           open={sidebarOpen}
//           setOpen={setSidebarOpen}
//           activeSection="banner-options"
//           onSectionChange={(section) => navigate(`/dashboard/${section}`)}
//         />
//       </div>

//       {/* Main content (right) */}
//       <main className="flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300">
//         {/* Toggle button (mobile) */}
//         <div className="md:hidden mb-4 flex justify-between items-center">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//           <h2 className="text-xl font-semibold">Banner Options</h2>
//         </div>

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
//                     {section.title}
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
//       </main>
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

// export function BannerOptions() {
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "View Banners",
//       icon: Sun,
//       route: "/banners/view",
//       description: "Upload and customize the banner image for Puja section",
//     },
//     {
//       title: "Set Banners",
//       icon: Moon,
//       route: "/dashboard/manage-banners",
//       description: "Set the astrology page banner with a celestial touch",
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
