"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Menu,
} from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ManageUpcomingPujas() {
  const [pujas, setPujas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;




  useEffect(() => {
    axios
      .get(`${apiUrl}/api/pujas/all`)
      .then((res) => {
        // Filter pujas where category name = "Upcoming Festival Puja"
        const upcoming = res.data.filter(
          (puja) => puja.category?.name === "Upcoming Festival Puja"
        );
        setPujas(upcoming || [])}
      )
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load upcoming pujas",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredPujas = pujas.filter((puja) => {
    const matchesSearch =
      puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || puja.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (id) => navigate(`/pujas/view/${id}`);
  const handleEdit = (id) => navigate(`/pujas/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this puja?")) return;
    try {
      await axios.delete(`${apiUrl}/api/pujas/${id}`);
      setPujas((prev) => prev.filter((puja) => puja._id !== id));
      toast({
        title: "Deleted",
        description: "Puja deleted successfully",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete puja",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */} <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 lg:ml-64 p-4 lg:p-6 space-y-6">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <div className="max-w-full lg:max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Sparkles className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Upcoming Pujas
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              View, edit, and manage all upcoming puja events
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
                <Input
                  placeholder="Search by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
                    Upcoming
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Upcoming Puja Registry
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    {/* <TableHead>Date</TableHead> */}
                    {/* <TableHead>Significance</TableHead> */}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPujas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No upcoming pujas found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPujas.map((puja) => (
                      <TableRow
                        key={puja._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground">
                          {puja.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {puja.category?.name || "—"}
                        </TableCell>
                        {/* <TableCell className="text-muted-foreground">
                          {new Date(puja.date).toLocaleDateString()}
                        </TableCell> */}
                        {/* <TableCell className="text-muted-foreground truncate max-w-xs">
                          {puja.significance}
                        </TableCell> */}
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
                                onClick={() => handleView(puja._id)}
                                className="gap-2 hover:bg-spiritual/10"
                              >
                                <Eye className="w-4 h-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(puja._id)}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(puja._id)}
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
          <div className="text-center py-8 flex flex-wrap justify-center items-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">
              Keep track of all upcoming puja events efficiently
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageUpcomingPujas;

// "use client";

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
//   Filter,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash2,
//   Sparkles,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Import your Sidebar component

// export function ManageUpcomingPujas() {
//   const [pujas, setPujas] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Fetch all pujas
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/upcomingPuja`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load upcoming pujas",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   // Filter logic
//   const filteredPujas = pujas.filter((puja) => {
//     const matchesSearch =
//       puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || puja.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Actions
//   const handleView = (id) => navigate(`/pujas/view/${id}`);
//   const handleEdit = (id) => navigate(`/pujas/edit/${id}`);
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this puja?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/pujas/${id}`);
//       setPujas((prev) => prev.filter((puja) => puja._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Puja deleted successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete puja",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* ✅ Sidebar */}
//       <div className="w-64 fixed top-0 left-0 h-full bg-white border-r border-border shadow-md">
//         <Sidebar />
//       </div>

//       {/* ✅ Main Content */}
//       <div className="flex-1 ml-64 p-6 space-y-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Upcoming Pujas
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               View, edit, and manage all upcoming puja events
//             </p>
//           </div>

//           {/* Filters */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//                 <Input
//                   placeholder="Search by title or category..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="gap-2">
//                     <Filter className="w-4 h-4" />
//                     Status: {statusFilter === "all" ? "All" : statusFilter}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                     All Status
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
//                     Upcoming
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setStatusFilter("completed")}
//                   >
//                     Completed
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//               <div className="flex items-center gap-3">
//                 <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//                 <CardTitle className="text-foreground">
//                   Upcoming Puja Registry
//                 </CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                     <TableHead className="font-semibold text-foreground">
//                       Title
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Category
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Date
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Significance
//                     </TableHead>
//                     <TableHead className="text-right font-semibold text-foreground">
//                       Actions
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredPujas.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No upcoming pujas found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredPujas.map((puja) => (
//                       <TableRow
//                         key={puja._id}
//                         className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                       >
//                         <TableCell className="font-medium text-foreground">
//                           {puja.title}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {puja.category?.name || "—"}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {new Date(puja.date).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {puja.significance}
//                         </TableCell>
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
//                                 onClick={() => handleView(puja._id)}
//                                 className="gap-2 hover:bg-spiritual/10"
//                               >
//                                 <Eye className="w-4 h-4" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(puja._id)}
//                                 className="gap-2 hover:bg-primary/10"
//                               >
//                                 <Edit className="w-4 h-4" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(puja._id)}
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
//                 Keep track of all upcoming puja events efficiently
//               </span>
//               <Sparkles className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageUpcomingPujas;

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
//   Filter,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash2,
//   Sparkles,
// } from "lucide-react";

// export function ManageUpcomingPujas() {
//   const [pujas, setPujas] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/upcomingPuja`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load upcoming pujas",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   const filteredPujas = pujas.filter((puja) => {
//     const matchesSearch =
//       puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || puja.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleView = (id: string) => navigate(`/pujas/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/pujas/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this puja?")) return;

//     try {
//       await axios.delete(`${apiUrl}/api/pujas/${id}`);
//       setPujas((prev) => prev.filter((puja) => puja._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Puja deleted successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete puja",
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
//               Upcoming Pujas
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View, edit, and manage all upcoming puja events
//           </p>
//         </div>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//               <Input
//                 placeholder="Search by title or category..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2">
//                   <Filter className="w-4 h-4" />
//                   Status: {statusFilter === "all" ? "All" : statusFilter}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                   All Status
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
//                   Upcoming
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
//                   Completed
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Upcoming Puja Registry
//               </CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Title
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Category
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Date
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Significance
//                   </TableHead>
//                   <TableHead className="text-right font-semibold text-foreground">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredPujas.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No upcoming pujas found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredPujas.map((puja) => (
//                     <TableRow
//                       key={puja._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground">
//                         {puja.title}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {puja.category?.name || "—"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(puja.date).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {puja.significance}
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
//                               onClick={() => handleView(puja._id)}
//                               className="gap-2 hover:bg-spiritual/10"
//                             >
//                               <Eye className="w-4 h-4" /> View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(puja._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(puja._id)}
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
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm">
//               Keep track of all upcoming puja events efficiently
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
