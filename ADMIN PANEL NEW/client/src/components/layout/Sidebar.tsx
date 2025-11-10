import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { CategoryForm } from "../components/dashboard/CategoryForm";
import {
  LayoutDashboard,
  Plus,
  List,
  Upload,
  Settings,
  Flower,
  X,
  Trash2,
} from "lucide-react";
import type { DashboardSection } from "@/pages/Dashboard";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeSection?: DashboardSection;
  onSectionChange?: (section: DashboardSection) => void;
}

const navigation = [
  {
    name: "Dashboard",
    section: "dashboard" as DashboardSection,
    icon: LayoutDashboard,
  },
  { name: "Add Puja", section: "add-puja" as DashboardSection, icon: Plus },
  {
    name: "Add Categories",
    section: "add-category" as DashboardSection,
    icon: Plus,
  },
  {
    name: "Add Rudraksha",
    section: "add-rudraksha" as DashboardSection,
    icon: Plus,
  },
  {
    name: "Add Bracelets",
    section: "add-bracelet" as DashboardSection,
    icon: Plus,
  },
  {
    name: "Add Blog",
    section: "add-blog" as DashboardSection,
    icon: Plus,
  },
  {
    name: "Manage Orders",
    section: "manage-orders" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Blogs",
    section: "manage-blogs" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Rudraksha",
    section: "manage-rudraksha" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Bracelets",
    section: "manage-bracelets" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Pujas",
    section: "manage" as DashboardSection,
    icon: List,
  },
  // {
  //   name: "Manage Puja Forms",
  //   section: "manage-puja-forms" as DashboardSection,
  //   icon: List,
  // },
  {
    name: "Manage Categories",
    section: "manage-categories" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Bookings",
    section: "manage-bookings" as DashboardSection,
    icon: List,
  },
  {
    name: "Manage Banner",
    section: "banner-options" as DashboardSection,
    icon: Upload, // you can choose any icon you prefer
  },
  {
    name: "Drafts & Trash",
    section: "manage-draft" as DashboardSection,
    icon: Trash2,
  },

  // { name: "Upload Data", section: "upload" as DashboardSection, icon: Upload },
  // { name: "Settings", section: "settings" as DashboardSection, icon: Settings },
];

export function Sidebar({
  open,
  setOpen,
  activeSection = "dashboard",
  onSectionChange,
}: SidebarProps) {
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
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            return (
              <Button
                key={item.name}
                variant={isActive ? "spiritual" : "ghost"}
                className={cn("w-full justify-start gap-3 transition-smooth")}
                onClick={() => {
                  onSectionChange?.(item.section);
                  setOpen(false); // Close mobile sidebar
                }}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
