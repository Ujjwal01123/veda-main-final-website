import { useState, useEffect } from "react";
import { Sidebar } from "../layout/updatedSidebar"; // adjust import path as needed
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
import { Search, Eye, Edit, Trash2, MoreHorizontal, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ManageActiveBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const fetchActiveBookings = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/bookings/status/active`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch active bookings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchActiveBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.puja?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => navigate(`/bookings/view/${id}`);
  const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({
          title: "Deleted",
          description: "Booking deleted successfully.",
        });
        fetchActiveBookings();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete booking.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const getRelativeDate = (dateString: string) => {
    const updatedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - updatedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar on Left */}
      <div className="hidden lg:block w-64 border-r border-border/20 bg-background/60 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* Right Section - Main Content */}
      <div className="flex-1 p-6 space-y-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Users className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Active Bookings
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View, edit, and manage all active bookings efficiently
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
                <Input
                  placeholder="Search by name, phone, or puja..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Active Bookings List
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Phone
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Puja
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Last Updated
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No active bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((b) => (
                      <TableRow
                        key={b._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground">
                          {b.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {b.phone}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {b.puja?.title}
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          {b.status}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {getRelativeDate(b.updatedAt || b.createdAt)}
                        </TableCell>
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
                                onClick={() => handleView(b._id)}
                                className="gap-2 hover:bg-spiritual/10"
                              >
                                <Eye className="w-4 h-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(b._id)}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(b._id)}
                                className="gap-2 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
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
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                Manage all active bookings efficiently
              </span>
              <Users className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
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
// import { Search, Eye, Edit, Trash2, MoreHorizontal, Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export function ManageActiveBookings() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   // Fetch Active Bookings
//   const fetchActiveBookings = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/bookings/status/active`);
//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to fetch active bookings",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchActiveBookings();
//   }, []);

//   const filteredBookings = bookings.filter(
//     (b) =>
//       b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.puja?.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/bookings/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/bookings/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this booking?"))
//       return;
//     try {
//       const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         toast({
//           title: "Deleted",
//           description: "Booking deleted successfully.",
//         });
//         fetchActiveBookings();
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to delete booking.",
//           variant: "destructive",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Something went wrong.",
//         variant: "destructive",
//       });
//     }
//   };

//   const getRelativeDate = (dateString: string) => {
//     const updatedDate = new Date(dateString);
//     const today = new Date();
//     const diffTime = Math.abs(today.getTime() - updatedDate.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "1 day ago";
//     return `${diffDays} days ago`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <Users className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Active Bookings
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View, edit, and manage all active bookings efficiently
//           </p>
//         </div>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//               <Input
//                 placeholder="Search by name, phone, or puja..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <Users className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Active Bookings List
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
//                     Phone
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Puja
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Status
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Last Updated
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
//                       colSpan={6}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No active bookings found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBookings.map((b) => (
//                     <TableRow
//                       key={b._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground">
//                         {b.name}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {b.phone}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {b.puja?.title}
//                       </TableCell>
//                       <TableCell className="text-green-600 font-semibold">
//                         {b.status}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {getRelativeDate(b.updatedAt || b.createdAt)}
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
//                               onClick={() => handleView(b._id)}
//                               className="gap-2 hover:bg-spiritual/10"
//                             >
//                               <Eye className="w-4 h-4" /> View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(b._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(b._id)}
//                               className="gap-2 text-destructive hover:bg-destructive/10"
//                             >
//                               <Trash2 className="w-4 h-4" /> Delete
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
//             <Users className="w-4 h-4" />
//             <span className="text-sm">
//               Manage all active bookings efficiently
//             </span>
//             <Users className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
