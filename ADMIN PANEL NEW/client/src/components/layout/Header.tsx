import { Button } from "@/components/ui/button";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Added necessary Dropdown imports

interface HeaderProps {
  onMenuClick: () => void;
  // A placeholder function to handle the actual logout logic
  onLogout: () => void;
}

export function Header({ onMenuClick, onLogout }: HeaderProps) {
  return (
    // Added sticky top-0 and z-index for common header behavior
    <header className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Veda Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your spiritual offerings
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notification Button (currently commented out) */}
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-spiritual rounded-full"></span>
          </Button> */}

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white shadow-xl border-gray-200"
            >
              {/* Logout Action - Only this item is kept */}
              <DropdownMenuItem
                onClick={onLogout}
                className="gap-2 text-red-600 cursor-pointer hover:bg-red-50 hover:text-red-700 font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
