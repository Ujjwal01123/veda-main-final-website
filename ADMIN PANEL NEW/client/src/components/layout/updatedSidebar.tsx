import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Plus,
  List,
  Upload,
  Trash2,
  Flower,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();

  // ✅ Collapsible state
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    puja: false,
    rudraksha: false,
    bracelet: false,
    blog: false,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ✅ Helper to check active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-gradient-card border-r border-border shadow-card transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-spiritual rounded-lg flex items-center justify-center">
              <Flower className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">
              Veda Dashboard
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto">
          {/* === SINGLE COMMON BUTTONS === */}
          <Link to="/dashboard/dashboard" onClick={() => setOpen(false)}>
            <Button
              variant={isActive("/dashboard/dashboard") ? "spiritual" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Button>
          </Link>

          <Link to="/dashboard/manage-orders" onClick={() => setOpen(false)}>
            <Button
              variant={
                isActive("/dashboard/manage-orders") ? "spiritual" : "ghost"
              }
              className="w-full justify-start gap-3"
            >
              <ShoppingCart className="w-4 h-4" /> Orders
            </Button>
          </Link>

          <Link to="/dashboard/manage-draft" onClick={() => setOpen(false)}>
            <Button
              variant={
                isActive("/dashboard/manage-draft") ? "spiritual" : "ghost"
              }
              className="w-full justify-start gap-3"
            >
              <Trash2 className="w-4 h-4" /> Drafts & Trash
            </Button>
          </Link>

          {/* === DROPDOWN SECTION: PUJA === */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between gap-3"
              onClick={() => toggleMenu("puja")}
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" /> Puja Management
              </span>
              {openMenus.puja ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
            {openMenus.puja && (
              <div className="ml-6 mt-1 space-y-1">
                <SidebarLink
                  to="/dashboard/add-puja"
                  label="Add Puja"
                  active={isActive("/dashboard/add-puja")}
                  setOpen={setOpen}
                />
                <SidebarLink
                  to="/dashboard/manage"
                  label="Manage Puja"
                  active={isActive("/dashboard/manage")}
                  setOpen={setOpen}
                />
                <SidebarLink
                  to="/dashboard/manage-puja-forms"
                  label="Manage Puja Form"
                  active={isActive("/dashboard/manage-puja-forms")}
                  setOpen={setOpen}
                />
              </div>
            )}
          </div>

          {/* === DROPDOWN SECTION: RUDRAKSHA === */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between gap-3"
              onClick={() => toggleMenu("rudraksha")}
            >
              <span className="flex items-center gap-3">
                <List className="w-4 h-4" /> Rudraksha
              </span>
              {openMenus.rudraksha ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
            {openMenus.rudraksha && (
              <div className="ml-6 mt-1 space-y-1">
                <SidebarLink
                  to="/dashboard/add-rudraksha"
                  label="Add Rudraksha"
                  active={isActive("/dashboard/add-rudraksha")}
                  setOpen={setOpen}
                />
                <SidebarLink
                  to="/dashboard/manage-rudraksha"
                  label="Manage Rudraksha"
                  active={isActive("/dashboard/manage-rudraksha")}
                  setOpen={setOpen}
                />
              </div>
            )}
          </div>

          {/* === DROPDOWN SECTION: BRACELET === */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between gap-3"
              onClick={() => toggleMenu("bracelet")}
            >
              <span className="flex items-center gap-3">
                <List className="w-4 h-4" /> Bracelets
              </span>
              {openMenus.bracelet ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
            {openMenus.bracelet && (
              <div className="ml-6 mt-1 space-y-1">
                <SidebarLink
                  to="/dashboard/add-bracelet"
                  label="Add Bracelet"
                  active={isActive("/dashboard/add-bracelet")}
                  setOpen={setOpen}
                />
                <SidebarLink
                  to="/dashboard/manage-bracelets"
                  label="Manage Bracelets"
                  active={isActive("/dashboard/manage-bracelets")}
                  setOpen={setOpen}
                />
              </div>
            )}
          </div>

          {/* === OTHER === */}
          <Link to="/dashboard/banner-options" onClick={() => setOpen(false)}>
            <Button
              variant={
                isActive("/dashboard/banner-options") ? "spiritual" : "ghost"
              }
              className="w-full justify-start gap-3"
            >
              <Upload className="w-4 h-4" /> Manage Banner
            </Button>
          </Link>

          <Link to="/dashboard/manage-blogs" onClick={() => setOpen(false)}>
            <Button
              variant={
                isActive("/dashboard/manage-blogs") ? "spiritual" : "ghost"
              }
              className="w-full justify-start gap-3"
            >
              <List className="w-4 h-4" /> Manage Blogs
            </Button>
          </Link>

          <Link to="/dashboard/manage-bookings" onClick={() => setOpen(false)}>
            <Button
              variant={
                isActive("/dashboard/manage-bookings") ? "spiritual" : "ghost"
              }
              className="w-full justify-start gap-3"
            >
              <List className="w-4 h-4" /> Manage Bookings
            </Button>
          </Link>
        </nav>
      </div>
    </>
  );
}

// ✅ Subcomponent for cleaner code
function SidebarLink({
  to,
  label,
  active,
  setOpen,
}: {
  to: string;
  label: string;
  active: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Link to={to} onClick={() => setOpen(false)}>
      <Button
        variant={active ? "spiritual" : "ghost"}
        className="w-full justify-start text-sm pl-8"
      >
        {label}
      </Button>
    </Link>
  );
}

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   LayoutDashboard,
//   Plus,
//   List,
//   Upload,
//   Trash2,
//   Flower,
//   X,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// interface SidebarProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// // ✅ Navigation items with routes
// const navigation = [
//   { name: "Dashboard", href: "/dashboard/dashboard", icon: LayoutDashboard },
//   { name: "Add Puja", href: "/dashboard/add-puja", icon: Plus },
//   {
//     name: "Manage Puja Form",
//     href: "/dashboard/manage-puja-forms",
//     icon: List,
//   },
//   { name: "Manage Pujas", href: "/dashboard/manage", icon: List },
//   { name: "Add Categories", href: "/dashboard/add-category", icon: Plus },
//   {
//     name: "Manage Categories",
//     href: "/dashboard/manage-categories",
//     icon: List,
//   },
//   { name: "Add Rudraksha", href: "/dashboard/add-rudraksha", icon: Plus },
//   { name: "Manage Rudraksha", href: "/dashboard/manage-rudraksha", icon: List },
//   { name: "Add Bracelets", href: "/dashboard/add-bracelet", icon: Plus },
//   { name: "Manage Bracelets", href: "/dashboard/manage-bracelets", icon: List },
//   //   { name: "Add Blog", href: "/dashboard/add-blog", icon: Plus },
//   { name: "Manage Orders", href: "/dashboard/manage-orders", icon: List },
//   { name: "Manage Blogs", href: "/dashboard/manage-blogs", icon: List },
//   { name: "Manage Bookings", href: "/dashboard/manage-bookings", icon: List },
//   { name: "Manage Banner", href: "/dashboard/banner-options", icon: Upload },
//   { name: "Drafts & Trash", href: "/dashboard/manage-draft", icon: Trash2 },
// ];

// export function Sidebar({ open, setOpen }: SidebarProps) {
//   const location = useLocation();

//   return (
//     <>
//       {/* Mobile backdrop */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={cn(
//           "fixed inset-y-0 left-0 z-30 w-64 bg-gradient-card border-r border-border shadow-card transform transition-transform duration-300 ease-in-out",
//           open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         )}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-border">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-spiritual rounded-lg flex items-center justify-center">
//               <Flower className="w-5 h-5 text-white" />
//             </div>
//             <h1 className="text-lg font-semibold text-foreground">
//               Veda Dashboard
//             </h1>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setOpen(false)}
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-2">
//           {navigation.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.href;

//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 onClick={() => setOpen(false)}
//               >
//                 <Button
//                   variant={isActive ? "spiritual" : "ghost"}
//                   className={cn(
//                     "w-full justify-start gap-3 transition-smooth text-left mb-1"
//                   )}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {item.name}
//                 </Button>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </>
//   );
// }
