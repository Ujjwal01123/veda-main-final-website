"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Menu,
} from "lucide-react";

export function ManageBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/bookings`);
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm)
  );

  const handleView = (id: string) => navigate(`/bookings/view/${id}`);
  const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await axios.delete(`${apiUrl}/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Moved",
        description: "Booking moved successfully",
        variant: "destructive",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to move booking",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}{" "}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection="manage-bookings"
        className="fixed z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0"
      />
      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 transition-all duration-300 lg:ml-64 space-y-8">
        {/* Mobile toggle */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold">Manage Bookings</h2>
        </div>

        <div className="max-w-full lg:max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Sparkles className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Sacred Booking Management
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              View, edit, and manage all sacred bookings
            </p>
          </div>

          {/* Search Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Booking Registry
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow
                        key={booking._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300"
                      >
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.email}</TableCell>
                        <TableCell>{booking.phone}</TableCell>
                        <TableCell>
                          {booking.item?.title ||
                            booking.item?.name ||
                            booking.item?.productName ||
                            "—"}
                        </TableCell>
                        <TableCell>{booking.itemType || "—"}</TableCell>
                        <TableCell>
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 hover:bg-spiritual/10"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gradient-card border-border/50"
                            >
                              <DropdownMenuItem
                                onClick={() => handleView(booking._id)}
                                className="gap-2 hover:bg-spiritual/10"
                              >
                                <Eye className="w-4 h-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(booking._id)}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(booking._id)}
                                className="gap-2 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" /> Move to Trash
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">
                Manage bookings efficiently to keep everything organized
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageBookings;

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Import your sidebar
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash2,
//   Sparkles,
//   Menu,
// } from "lucide-react";

// export function ManageBookings() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/api/bookings`);
//       setBookings(res.data || []);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to load bookings",
//         variant: "destructive",
//       });
//     }
//   };

//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.phone?.includes(searchTerm)
//   );

//   const handleView = (id: string) => navigate(`/bookings/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this booking?"))
//       return;
//     try {
//       await axios.delete(`${apiUrl}/api/bookings/${id}`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Booking deleted successfully",
//         variant: "destructive",
//       });
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to delete booking",
//         variant: "destructive",
//       });
//     }
//   };

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
//           activeSection="manage-bookings"
//           onSectionChange={(section) => navigate(`/dashboard/${section}`)}
//         />
//       </div>

//       {/* Right side - Main content */}
//       <main className="flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300">
//         {/* Toggle Button (mobile only) */}
//         <div className="md:hidden mb-4 flex justify-between items-center">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//           <h2 className="text-xl font-semibold">Manage Bookings</h2>
//         </div>

//         <div className="max-w-7xl mx-auto space-y-8">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Sacred Booking Management
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               View, edit, and manage all sacred bookings
//             </p>
//           </div>

//           {/* Search Bar */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//                 <Input
//                   placeholder="Search by name, email, or phone..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Bookings Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//               <div className="flex items-center gap-3">
//                 <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//                 <CardTitle className="text-foreground">
//                   Booking Registry
//                 </CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Phone</TableHead>
//                     <TableHead>Item</TableHead>
//                     <TableHead>Item Type</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredBookings.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={8}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No bookings found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredBookings.map((booking) => (
//                       <TableRow
//                         key={booking._id}
//                         className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300"
//                       >
//                         <TableCell>{booking.name}</TableCell>
//                         <TableCell>{booking.email}</TableCell>
//                         <TableCell>{booking.phone}</TableCell>
//                         <TableCell>
//                           {booking.item?.title ||
//                             booking.item?.name ||
//                             booking.item?.productName ||
//                             "—"}
//                         </TableCell>
//                         <TableCell>{booking.itemType || "—"}</TableCell>
//                         <TableCell>
//                           {new Date(booking.bookingDate).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell>{booking.status}</TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="w-8 h-8 hover:bg-spiritual/10"
//                               >
//                                 <MoreHorizontal className="w-4 h-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent
//                               align="end"
//                               className="bg-gradient-card border-border/50"
//                             >
//                               <DropdownMenuItem
//                                 onClick={() => handleView(booking._id)}
//                                 className="gap-2 hover:bg-spiritual/10"
//                               >
//                                 <Eye className="w-4 h-4" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(booking._id)}
//                                 className="gap-2 hover:bg-primary/10"
//                               >
//                                 <Edit className="w-4 h-4" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(booking._id)}
//                                 className="gap-2 text-destructive hover:bg-destructive/10"
//                               >
//                                 <Trash2 className="w-4 h-4" /> Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>

//           {/* Footer */}
//           <div className="text-center py-8">
//             <div className="flex items-center justify-center gap-2 text-muted-foreground">
//               <Sparkles className="w-4 h-4" />
//               <span className="text-sm">
//                 Manage bookings efficiently to keep everything organized
//               </span>
//               <Sparkles className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash2,
//   Sparkles,
// } from "lucide-react";

// export function ManageBookings() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Fetch bookings
//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/api/bookings`);
//       setBookings(res.data || []);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to load bookings",
//         variant: "destructive",
//       });
//     }
//   };

//   // Filter bookings by search term
//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.phone?.includes(searchTerm)
//   );

//   // Handlers
//   const handleView = (id: string) => navigate(`/bookings/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this booking?"))
//       return;
//     try {
//       await axios.delete(`${apiUrl}/api/bookings/${id}`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Moved",
//         description: "Booking moved successfully",
//         variant: "destructive",
//       });
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to delete booking",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Sacred Booking Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View, edit, and manage all sacred bookings
//           </p>
//         </div>

//         {/* Search Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//               <Input
//                 placeholder="Search by name, email, or phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Bookings Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Booking Registry
//               </CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Name
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Email
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Phone
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Item
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Item Type
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Date
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Status
//                   </TableHead>
//                   <TableHead className="text-right font-semibold text-foreground">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredBookings.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={8}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No bookings found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBookings.map((booking) => (
//                     <TableRow
//                       key={booking._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground">
//                         {booking.name}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {booking.email}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {booking.phone}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {booking.item?.title ||
//                           booking.item?.name ||
//                           booking.item?.productName ||
//                           "—"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {booking.itemType || "—"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(booking.bookingDate).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {booking.status}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="w-8 h-8 hover:bg-spiritual/10"
//                             >
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent
//                             align="end"
//                             className="bg-gradient-card border-border/50"
//                           >
//                             <DropdownMenuItem
//                               onClick={() => handleView(booking._id)}
//                               className="gap-2 hover:bg-spiritual/10"
//                             >
//                               <Eye className="w-4 h-4" /> View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(booking._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(booking._id)}
//                               className="gap-2 text-destructive hover:bg-destructive/10"
//                             >
//                               <Trash2 className="w-4 h-4" /> Move to Trash
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div className="text-center py-8">
//           <div className="flex items-center justify-center gap-2 text-muted-foreground">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm">
//               Manage bookings efficiently to keep everything organized
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { useToast } from "@/components/ui/use-toast";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   Search,
// //   MoreHorizontal,
// //   Eye,
// //   Edit,
// //   Trash2,
// //   Sparkles,
// //   Plus,
// // } from "lucide-react";

// // export function ManageBookings() {
// //   const [bookings, setBookings] = useState<any[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const { toast } = useToast();
// //   const navigate = useNavigate();

// //   // Fetch bookings
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   const apiUrl = import.meta.env.VITE_BASE_API_URL;

// //   const fetchBookings = async () => {
// //     try {
// //       const res = await axios.get(`${apiUrl}/api/bookings`);
// //       setBookings(res.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       toast({
// //         title: "Error",
// //         description: "Failed to load bookings",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   // Filter bookings by search term
// //   const filteredBookings = bookings.filter(
// //     (booking) =>
// //       booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       booking.phone?.includes(searchTerm)
// //   );

// //   // Handlers
// //   const handleView = (id: string) => navigate(`/bookings/view/${id}`);
// //   const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
// //   const handleDelete = async (id: string) => {
// //     if (!window.confirm("Are you sure you want to delete this booking?"))
// //       return;
// //     try {
// //       await axios.delete(`${apiUrl}/api/bookings/${id}`);
// //       setBookings((prev) => prev.filter((b) => b._id !== id));
// //       toast({
// //         title: "Moved",
// //         description: "Booking moved successfully",
// //         variant: "destructive",
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       toast({
// //         title: "Error",
// //         description: "Failed to delete booking",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center space-y-4 py-8">
// //           <div className="flex items-center justify-center gap-3 mb-4">
// //             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
// //               <Sparkles className="w-6 h-6 text-spiritual-foreground" />
// //             </div>
// //             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
// //               Sacred Booking Management
// //             </h1>
// //           </div>
// //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// //             View, edit, and manage all sacred bookings
// //           </p>
// //         </div>

// //         {/* Search Bar */}
// //         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
// //           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
// //               <Input
// //                 placeholder="Search by name, email, or phone..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="pl-10"
// //               />
// //             </div>
// //             {/* <Button
// //               variant="spiritual"
// //               className="gap-2 shadow-spiritual"
// //               onClick={() => navigate("/bookings/add")}
// //             >
// //               <Plus className="w-4 h-4" /> Add Booking
// //             </Button> */}
// //           </CardContent>
// //         </Card>

// //         {/* Bookings Table */}
// //         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
// //           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
// //             <div className="flex items-center gap-3">
// //               <Sparkles className="w-5 h-5 text-spiritual-foreground" />
// //               <CardTitle className="text-foreground">
// //                 Booking Registry
// //               </CardTitle>
// //             </div>
// //           </CardHeader>
// //           <CardContent className="p-0 overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
// //                   <TableHead className="font-semibold text-foreground">
// //                     Name
// //                   </TableHead>
// //                   <TableHead className="font-semibold text-foreground">
// //                     Email
// //                   </TableHead>
// //                   <TableHead className="font-semibold text-foreground">
// //                     Phone
// //                   </TableHead>
// //                   <TableHead className="font-semibold text-foreground">
// //                     Puja
// //                   </TableHead>
// //                   <TableHead className="font-semibold text-foreground">
// //                     Date
// //                   </TableHead>
// //                   <TableHead className="font-semibold text-foreground">
// //                     Status
// //                   </TableHead>
// //                   <TableHead className="text-right font-semibold text-foreground">
// //                     Actions
// //                   </TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredBookings.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell
// //                       colSpan={7}
// //                       className="text-center py-12 text-muted-foreground"
// //                     >
// //                       No bookings found
// //                     </TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   filteredBookings.map((booking) => (
// //                     <TableRow
// //                       key={booking._id}
// //                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
// //                     >
// //                       <TableCell className="font-medium text-foreground">
// //                         {booking.name}
// //                       </TableCell>
// //                       <TableCell className="text-muted-foreground">
// //                         {booking.email}
// //                       </TableCell>
// //                       <TableCell className="text-muted-foreground">
// //                         {booking.phone}
// //                       </TableCell>
// //                       <TableCell className="text-muted-foreground">
// //                         {booking.puja?.title || "—"}
// //                       </TableCell>
// //                       <TableCell className="text-muted-foreground">
// //                         {new Date(booking.createdAt).toLocaleDateString()}
// //                       </TableCell>
// //                       <TableCell className="text-muted-foreground">
// //                         {booking.status}
// //                       </TableCell>
// //                       <TableCell className="text-right">
// //                         <DropdownMenu>
// //                           <DropdownMenuTrigger asChild>
// //                             <Button
// //                               variant="ghost"
// //                               size="icon"
// //                               className="w-8 h-8 hover:bg-spiritual/10"
// //                             >
// //                               <MoreHorizontal className="w-4 h-4" />
// //                             </Button>
// //                           </DropdownMenuTrigger>
// //                           <DropdownMenuContent
// //                             align="end"
// //                             className="bg-gradient-card border-border/50"
// //                           >
// //                             <DropdownMenuItem
// //                               onClick={() => handleView(booking._id)}
// //                               className="gap-2 hover:bg-spiritual/10"
// //                             >
// //                               <Eye className="w-4 h-4" /> View
// //                             </DropdownMenuItem>
// //                             <DropdownMenuItem
// //                               onClick={() => handleEdit(booking._id)}
// //                               className="gap-2 hover:bg-primary/10"
// //                             >
// //                               <Edit className="w-4 h-4" /> Edit
// //                             </DropdownMenuItem>
// //                             <DropdownMenuItem
// //                               onClick={() => handleDelete(booking._id)}
// //                               className="gap-2 text-destructive hover:bg-destructive/10"
// //                             >
// //                               <Trash2 className="w-4 h-4" /> Move to Trash
// //                             </DropdownMenuItem>
// //                           </DropdownMenuContent>
// //                         </DropdownMenu>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </CardContent>
// //         </Card>

// //         {/* Footer */}
// //         <div className="text-center py-8">
// //           <div className="flex items-center justify-center gap-2 text-muted-foreground">
// //             <Sparkles className="w-4 h-4" />
// //             <span className="text-sm">
// //               Manage bookings efficiently to keep everything organized
// //             </span>
// //             <Sparkles className="w-4 h-4" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
