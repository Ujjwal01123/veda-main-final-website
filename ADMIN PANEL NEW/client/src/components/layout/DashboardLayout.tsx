"use client";

import { useState } from "react";
import { Sidebar } from "./updatedSidebar"; // ✅ your latest sidebar
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import type { DashboardSection } from "@/pages/Dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection?: DashboardSection;
  onSectionChange?: (section: DashboardSection) => void;
}

export function DashboardLayout({
  children,
  activeSection = "dashboard",
  onSectionChange,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-hero">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out overflow-y-auto",
          "lg:ml-64"
        )}
      >
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { cn } from "@/lib/utils";
// import type { DashboardSection } from "@/pages/Dashboard";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   activeSection?: DashboardSection;
//   onSectionChange?: (section: DashboardSection) => void;
// }

// export function DashboardLayout({ children, activeSection = 'dashboard', onSectionChange }: DashboardLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Sidebar
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//         activeSection={activeSection}
//         onSectionChange={onSectionChange}
//       />
//       <div className={cn(
//         "transition-all duration-300 ease-in-out",
//         "lg:ml-64"
//       )}>
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
