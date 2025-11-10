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
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Sparkles,
  Menu,
} from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ManagePujas() {
  const [pujas, setPujas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/pujas/all`)
      .then((res) => setPujas(res.data || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load sacred offerings",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredPujas = pujas.filter((puja) => {
    return (
      puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleView = (id: string) => navigate(`/pujas/view/${id}`);
  const handleEdit = (id: string) => navigate(`/pujas/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to remove this sacred offering?")
    )
      return;

    try {
      await axios.delete(`${apiUrl}/api/pujas/${id}`);
      setPujas((prev) => prev.filter((puja) => puja._id !== id));

      toast({
        title: "🕉️ Moved",
        description: "Sacred offering moved successfully",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove offering",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */} <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out p-4 lg:p-6 space-y-6 lg:ml-64">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-start mb-4">
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
                Sacred Puja Management
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your divine offerings and sacred ceremonies with reverence
              and care
            </p>
          </div>

          {/* Action Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                <div className="w-10 h-10 rounded-full bg-gradient-spiritual flex items-center justify-center">
                  <Search className="w-5 h-5 text-spiritual-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Find Sacred Offerings
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Search and filter your pujas
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <Button
                  variant="spiritual"
                  className="gap-2 shadow-spiritual"
                  onClick={() => navigate("/dashboard/add-puja")}
                >
                  <Plus className="w-4 h-4" /> Add Sacred Offering
                </Button>
                <Button
                  variant="spiritual"
                  className="gap-2 shadow-spiritual"
                  onClick={() => navigate("/dashboard/manage-puja-forms")}
                >
                  <Plus className="w-4 h-4" /> Manage Puja Forms
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader className="pb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Sacred Filters</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
                <Input
                  placeholder="Search sacred offerings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80 w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Sacred Offerings Registry
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
                    <TableHead>Significance</TableHead>
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
                        No sacred offerings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPujas.map((puja) => (
                      <TableRow key={puja._id}>
                        <TableCell className="font-medium text-foreground">
                          {puja.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {puja.category?.name || "Universal"}
                        </TableCell>
                        {/* <TableCell className="text-muted-foreground">
                          {new Date(puja.date).toLocaleDateString()}
                        </TableCell> */}
                        <TableCell className="text-muted-foreground truncate max-w-xs">
                          <div
                            className="line-clamp-2 text-sm prose prose-sm prose-spiritual"
                            dangerouslySetInnerHTML={{
                              __html:
                                puja.significance?.slice(0, 200) +
                                  (puja.significance?.length > 200
                                    ? "..."
                                    : "") || "<em>Divine blessings await</em>",
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gradient-card border-border/50"
                            >
                              <DropdownMenuItem
                                onClick={() => handleView(puja._id)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(puja._id)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(puja._id)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" /> Move to
                                Trash
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
            <div className="flex items-center justify-center gap-2 text-muted-foreground flex-wrap">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">
                May your sacred offerings bring divine blessings
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Plus,
//   Sparkles,
//   Menu,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Import your sidebar

// export function ManagePujas() {
//   const [pujas, setPujas] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Fetch pujas
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/all`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load sacred offerings",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   // Filtered list
//   const filteredPujas = pujas.filter((puja) => {
//     return (
//       puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/pujas/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/pujas/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (
//       !window.confirm("Are you sure you want to remove this sacred offering?")
//     )
//       return;

//     try {
//       await axios.delete(`${apiUrl}/api/pujas/${id}`);
//       setPujas((prev) => prev.filter((puja) => puja._id !== id));

//       toast({
//         title: "🕉️ Moved",
//         description: "Sacred offering moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to remove offering",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* ✅ Sidebar (Left) */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       {/* ✅ Main Content Area (Right) */}
//       <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out p-6 space-y-8">
//         {/* Mobile Menu Button */}
//         <div className="lg:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Sacred Puja Management
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Manage your divine offerings and sacred ceremonies with reverence
//               and care
//             </p>
//           </div>

//           {/* Action Bar */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-spiritual flex items-center justify-center">
//                   <Search className="w-5 h-5 text-spiritual-foreground" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     Find Sacred Offerings
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     Search and filter your pujas
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <Button
//                   variant="spiritual"
//                   className="gap-2 shadow-spiritual"
//                   onClick={() => navigate("/dashboard/add-puja")}
//                 >
//                   <Plus className="w-4 h-4" /> Add Sacred Offering
//                 </Button>
//                 <Button
//                   variant="spiritual"
//                   className="gap-2 shadow-spiritual"
//                   onClick={() => navigate("/dashboard/manage-puja-forms")}
//                 >
//                   <Plus className="w-4 h-4" /> Manage Puja Forms
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Filters */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-4 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-primary" />
//               <CardTitle className="text-foreground">Sacred Filters</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//                 <Input
//                   placeholder="Search sacred offerings..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//               <div className="flex items-center gap-3">
//                 <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//                 <CardTitle className="text-foreground">
//                   Sacred Offerings Registry
//                 </CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                     <TableHead>Title</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Significance</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredPujas.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No sacred offerings found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredPujas.map((puja) => (
//                       <TableRow key={puja._id}>
//                         <TableCell className="font-medium text-foreground">
//                           {puja.title}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {puja.category?.name || "Universal"}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {new Date(puja.date).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground truncate max-w-xs">
//                           <div
//                             className="line-clamp-2 text-sm prose prose-sm prose-spiritual"
//                             dangerouslySetInnerHTML={{
//                               __html:
//                                 puja.significance?.slice(0, 200) +
//                                   (puja.significance?.length > 200
//                                     ? "..."
//                                     : "") || "<em>Divine blessings await</em>",
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreHorizontal className="w-4 h-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent
//                               align="end"
//                               className="bg-gradient-card border-border/50"
//                             >
//                               <DropdownMenuItem
//                                 onClick={() => handleView(puja._id)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(puja._id)}
//                               >
//                                 <Edit className="w-4 h-4 mr-2" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(puja._id)}
//                                 className="text-destructive"
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2" /> Move to
//                                 Trash
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
//                 May your sacred offerings bring divine blessings
//               </span>
//               <Sparkles className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </div>
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
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Plus,
//   Sparkles,
// } from "lucide-react";

// export function ManagePujas() {
//   const [pujas, setPujas] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Fetch pujas
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/all`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load sacred offerings",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   // Filtered list
//   const filteredPujas = pujas.filter((puja) => {
//     return (
//       puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/pujas/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/pujas/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (
//       !window.confirm("Are you sure you want to remove this sacred offering?")
//     )
//       return;

//     try {
//       await axios.delete(`${apiUrl}/api/pujas/${id}`);
//       setPujas((prev) => prev.filter((puja) => puja._id !== id));

//       toast({
//         title: "🕉️ Moved",
//         description: "Sacred offering moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to remove offering",
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
//               Sacred Puja Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Manage your divine offerings and sacred ceremonies with reverence
//             and care
//           </p>
//         </div>

//         {/* Action Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-spiritual flex items-center justify-center">
//                 <Search className="w-5 h-5 text-spiritual-foreground" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-foreground">
//                   Find Sacred Offerings
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   Search and filter your pujas
//                 </p>
//               </div>
//             </div>
//             <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/add-puja")}
//             >
//               <Plus className="w-4 h-4" /> Add Sacred Offering
//             </Button>
//             <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/manage-puja-forms")}
//             >
//               <Plus className="w-4 h-4" /> Manage Puja Forms
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-4 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-primary" />
//             <CardTitle className="text-foreground">Sacred Filters</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//               <Input
//                 placeholder="Search sacred offerings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Sacred Offerings Registry
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
//                       No sacred offerings found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredPujas.map((puja) => (
//                     <TableRow
//                       key={puja._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {puja.title}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {puja.category?.name || "Universal"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(puja.date).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground truncate max-w-xs">
//                         {/* ✅ Render HTML safely */}
//                         <div
//                           className="line-clamp-2 text-sm prose prose-sm prose-spiritual"
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               puja.significance?.slice(0, 200) +
//                                 (puja.significance?.length > 200
//                                   ? "..."
//                                   : "") || "<em>Divine blessings await</em>",
//                           }}
//                         />
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
//                               <Eye className="w-4 h-4" /> View Sacred Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(puja._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit Offering
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(puja._id)}
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
//               May your sacred offerings bring divine blessings
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
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
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Plus,
//   Sparkles,
// } from "lucide-react";

// export function ManagePujas() {
//   const [pujas, setPujas] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Fetch pujas
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/all`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load sacred offerings",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   // Filtered list
//   const filteredPujas = pujas.filter((puja) => {
//     return (
//       puja.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       puja.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/pujas/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/pujas/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (
//       !window.confirm("Are you sure you want to remove this sacred offering?")
//     )
//       return;

//     try {
//       await axios.delete(`${apiUrl}/api/pujas/${id}`);
//       setPujas((prev) => prev.filter((puja) => puja._id !== id));

//       toast({
//         title: "🕉️ Moved",
//         description: "Sacred offering moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to remove offering",
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
//               Sacred Puja Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Manage your divine offerings and sacred ceremonies with reverence
//             and care
//           </p>
//         </div>

//         {/* Action Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-spiritual flex items-center justify-center">
//                 <Search className="w-5 h-5 text-spiritual-foreground" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-foreground">
//                   Find Sacred Offerings
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   Search and filter your pujas
//                 </p>
//               </div>
//             </div>
//             <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/add-puja")}
//             >
//               <Plus className="w-4 h-4" /> Add Sacred Offering
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-4 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-primary" />
//             <CardTitle className="text-foreground">Sacred Filters</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//               <Input
//                 placeholder="Search sacred offerings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="gap-2 border-spiritual/20 hover:border-spiritual"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Status: {statusFilter === "all" ? "All Sacred" : statusFilter}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="bg-gradient-card border-border/50">
//                 <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                   All Sacred Offerings
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
//                 Sacred Offerings Registry
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
//                       No sacred offerings found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredPujas.map((puja) => (
//                     <TableRow
//                       key={puja._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {puja.title}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {puja.category?.name || "Universal"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(puja.date).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground truncate max-w-xs">
//                         {puja.significance || "Divine blessings await"}
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
//                               <Eye className="w-4 h-4" /> View Sacred Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(puja._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit Offering
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(puja._id)}
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
//               May your sacred offerings bring divine blessings
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
