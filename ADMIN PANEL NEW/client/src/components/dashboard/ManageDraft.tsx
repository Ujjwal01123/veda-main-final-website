"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar component import
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Sparkles,
  Star,
  ShoppingCart,
  BookOpen,
  Layers,
  Menu,
} from "lucide-react";

export function DraftsSection() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    {
      title: "Deleted Rudraksha",
      icon: Plus,
      route: "/drafts/rudraksha",
      description:
        "Manage all deleted Rudrakshas awaiting review or restoration",
    },
    {
      title: "Deleted Puja",
      icon: Star,
      route: "/drafts/puja",
      description: "Review sacred ceremonies that have been removed",
    },
    {
      title: "Deleted Bracelet",
      icon: Plus,
      route: "/drafts/bracelet",
      description: "Restore or permanently remove deleted bracelets",
    },
    {
      title: "Deleted Puja Form Details",
      icon: ShoppingCart,
      route: "/drafts/pujaForms",
      description: "Manage all canceled or deleted puja forms details",
    },
    {
      title: "Deleted Categories",
      icon: Layers,
      route: "/drafts/categories",
      description: "Review categories that have been removed",
    },
    {
      title: "Deleted Blogs",
      icon: BookOpen,
      route: "/drafts/blogs",
      description: "Manage all blogs moved to drafts or deleted",
    },
    {
      title: "Deleted Bookings",
      icon: ShoppingCart,
      route: "/drafts/bookings",
      description: "Restore or permanently remove canceled bookings",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection="drafts"
        onSectionChange={(section) => navigate(`/dashboard/${section}`)}
        className="fixed z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0"
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 transition-all duration-300 lg:ml-64 space-y-8 overflow-y-auto">
        {/* Mobile toggle */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold">Drafts & Deleted Items</h2>
        </div>

        <div className="max-w-full lg:max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Trash2 className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Drafts & Deleted Items
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              View, restore, or permanently remove items that have been moved to
              drafts or deleted sections.
            </p>
          </div>

          {/* Draft Sections */}
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
                    Open {section.title}
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
                Review your deleted items carefully and restore as needed
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DraftsSection;

// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar component import
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Plus,
//   Trash2,
//   Sparkles,
//   Star,
//   ShoppingCart,
//   BookOpen,
//   Layers,
//   Menu,
// } from "lucide-react";

// export function DraftsSection() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const sections = [
//     {
//       title: "Deleted Rudraksha",
//       icon: Plus,
//       route: "/drafts/rudraksha",
//       description:
//         "Manage all deleted Rudrakshas awaiting review or restoration",
//     },
//     {
//       title: "Deleted Puja",
//       icon: Star,
//       route: "/drafts/puja",
//       description: "Review sacred ceremonies that have been removed",
//     },
//     {
//       title: "Deleted Bracelet",
//       icon: Plus,
//       route: "/drafts/bracelet",
//       description: "Restore or permanently remove deleted bracelets",
//     },
//     {
//       title: "Deleted Puja Form Details",
//       icon: ShoppingCart,
//       route: "/drafts/pujaForms",
//       description: "Manage all canceled or deleted puja forms details",
//     },
//     {
//       title: "Deleted Categories",
//       icon: Layers,
//       route: "/drafts/categories",
//       description: "Review categories that have been removed",
//     },
//     {
//       title: "Deleted Blogs",
//       icon: BookOpen,
//       route: "/drafts/blogs",
//       description: "Manage all blogs moved to drafts or deleted",
//     },
//     {
//       title: "Deleted Bookings",
//       icon: ShoppingCart,
//       route: "/drafts/bookings",
//       description: "Restore or permanently remove canceled bookings",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* Sidebar */}
//       <div
//         className={`fixed z-40 md:static md:translate-x-0 transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } w-64 flex-shrink-0 bg-white shadow-md md:shadow-none`}
//       >
//         <Sidebar
//           open={sidebarOpen}
//           setOpen={setSidebarOpen}
//           activeSection="drafts"
//           onSectionChange={(section) => navigate(`/dashboard/${section}`)}
//         />
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300">
//         {/* Mobile toggle */}
//         <div className="md:hidden mb-4 flex justify-between items-center">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//           <h2 className="text-xl font-semibold">Drafts & Deleted Items</h2>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Trash2 className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Drafts & Deleted Items
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               View, restore, or permanently remove items that have been moved to
//               drafts or deleted sections.
//             </p>
//           </div>

//           {/* Draft Sections */}
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
//                     Open {section.title}
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
//                 Review your deleted items carefully and restore as needed
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
//   Plus,
//   Trash2,
//   Sparkles,
//   Star,
//   ShoppingCart,
//   BookOpen,
//   Layers,
// } from "lucide-react";

// export function DraftsSection() {
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "Deleted Rudraksha",
//       icon: Plus,
//       route: "/drafts/rudraksha",
//       description:
//         "Manage all deleted Rudrakshas awaiting review or restoration",
//     },
//     {
//       title: "Deleted Puja",
//       icon: Star,
//       route: "/drafts/puja",
//       description: "Review sacred ceremonies that have been removed",
//     },
//     {
//       title: "Deleted Bracelet",
//       icon: Plus,
//       route: "/drafts/bracelet",
//       description: "Restore or permanently remove deleted bracelets",
//     },
//     {
//       title: "Deleted Puja Form Details",
//       icon: ShoppingCart,
//       route: "/drafts/pujaForms",
//       description: "Manage all canceled or deleted puja forms details",
//     },
//     {
//       title: "Deleted Categories",
//       icon: Layers,
//       route: "/drafts/categories",
//       description: "Review categories that have been removed",
//     },
//     {
//       title: "Deleted Blogs",
//       icon: BookOpen,
//       route: "/drafts/blogs",
//       description: "Manage all blogs moved to drafts or deleted",
//     },
//     {
//       title: "Deleted Bookings",
//       icon: ShoppingCart,
//       route: "/drafts/bookings",
//       description: "Restore or permanently remove canceled bookings",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <Trash2 className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Drafts & Deleted Items
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View, restore, or permanently remove items that have been moved to
//             drafts or deleted sections.
//           </p>
//         </div>

//         {/* Draft Sections */}
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
//                   Open {section.title}
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
//               Review your deleted items carefully and restore as needed
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
