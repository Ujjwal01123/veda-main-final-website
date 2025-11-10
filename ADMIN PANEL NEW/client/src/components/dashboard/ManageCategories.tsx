"use client";

import { useState, useEffect } from "react";
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
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Plus,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/categories/all`);
      const data = await res.json();

      const categoriesWithPujaCount = await Promise.all(
        data.map(async (cat: any) => {
          const pujaRes = await fetch(
            `${apiUrl}/api/pujas/getPujaByCategory/${cat._id}`
          );
          const pujaData = await pujaRes.json();
          return { ...cat, pujaCount: pujaData.length };
        })
      );

      setCategories(categoriesWithPujaCount);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => navigate(`/categories/view/${id}`);
  const handleEdit = (id: string) => navigate(`/categories/edit/${id}`);

  const handleMoveToTrash = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to move this category to trash? It will be permanently deleted after 30 days."
      )
    )
      return;
    try {
      const res = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({
          title: "Moved to Trash",
          description: "Category moved to trash successfully.",
        });
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: "Failed to move category to trash.",
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection="manage-categories"
        onSectionChange={(section) => navigate(`/dashboard/${section}`)}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto transition-all duration-300 lg:ml-64">
        <div className="max-w-full lg:max-w-7xl mx-auto space-y-6">
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

          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Sparkles className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Sacred Category Management
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              View, edit, and manage all categories for your sacred offerings
            </p>
          </div>

          {/* Action Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Button
                variant="spiritual"
                className="gap-2 shadow-spiritual flex-shrink-0"
                onClick={() => navigate("/dashboard/add-category")}
              >
                <Plus className="w-4 h-4" /> Add Category
              </Button>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Category Registry
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>No. of Pujas</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((cat) => (
                      <TableRow
                        key={cat._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground">
                          {cat.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {cat.description}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {cat.pujaCount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {getRelativeDate(cat.updatedAt || cat.createdAt)}
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
                                onClick={() => handleView(cat._id)}
                                className="gap-2 hover:bg-spiritual/10"
                              >
                                <Eye className="w-4 h-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(cat._id)}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" /> Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleMoveToTrash(cat._id)}
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
          <div className="text-center py-8 flex flex-wrap justify-center items-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">
              Manage categories to keep your offerings organized
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </main>
    </div>
  );
}

// "use client";

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
// import {
//   Search,
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Sparkles,
//   Plus,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ your sidebar

// export function ManageCategories() {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/categories/all`);
//       const data = await res.json();

//       const categoriesWithPujaCount = await Promise.all(
//         data.map(async (cat: any) => {
//           const pujaRes = await fetch(
//             `${apiUrl}/api/pujas/getPujaByCategory/${cat._id}`
//           );
//           const pujaData = await pujaRes.json();
//           return { ...cat, pujaCount: pujaData.length };
//         })
//       );

//       setCategories(categoriesWithPujaCount);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to fetch categories",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const filteredCategories = categories.filter(
//     (cat) =>
//       cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       cat.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/categories/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/categories/edit/${id}`);

//   const handleMoveToTrash = async (id: string) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to move this category to trash? It will be permanently deleted after 30 days."
//       )
//     )
//       return;
//     try {
//       const res = await fetch(`${apiUrl}/api/categories/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         toast({
//           title: "Moved to Trash",
//           description: "Category moved to trash successfully.",
//         });
//         fetchCategories();
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to move category to trash.",
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
//     <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
//       {/* Sidebar (fixed width) */}
//       <div className="w-64 flex-shrink-0">
//         <Sidebar
//           open={sidebarOpen}
//           setOpen={setSidebarOpen}
//           activeSection="manage-categories"
//           onSectionChange={(section) => navigate(`/dashboard/${section}`)}
//         />
//       </div>

//       {/* Main content fills the rest */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="max-w-7xl mx-auto space-y-8">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Sacred Category Management
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               View, edit, and manage all categories for your sacred offerings
//             </p>
//           </div>

//           {/* Action Bar */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="relative flex-1 flex items-center gap-3">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//                 <Input
//                   placeholder="Search categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Button
//                 variant="spiritual"
//                 className="gap-2 shadow-spiritual"
//                 onClick={() => navigate("/dashboard/add-category")}
//               >
//                 <Plus className="w-4 h-4" /> Add Category
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//               <div className="flex items-center gap-3">
//                 <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//                 <CardTitle className="text-foreground">
//                   Category Registry
//                 </CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                     <TableHead className="font-semibold text-foreground">
//                       Name
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Description
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       No. of Pujas
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Last Updated
//                     </TableHead>
//                     <TableHead className="text-right font-semibold text-foreground">
//                       Actions
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredCategories.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No categories found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredCategories.map((cat) => (
//                       <TableRow
//                         key={cat._id}
//                         className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                       >
//                         <TableCell className="font-medium text-foreground">
//                           {cat.name}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {cat.description}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {cat.pujaCount}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {getRelativeDate(cat.updatedAt || cat.createdAt)}
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
//                                 onClick={() => handleView(cat._id)}
//                                 className="gap-2 hover:bg-spiritual/10"
//                               >
//                                 <Eye className="w-4 h-4" /> View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(cat._id)}
//                                 className="gap-2 hover:bg-primary/10"
//                               >
//                                 <Edit className="w-4 h-4" /> Edit Category
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleMoveToTrash(cat._id)}
//                                 className="gap-2 text-destructive hover:bg-destructive/10"
//                               >
//                                 <Trash2 className="w-4 h-4" /> Move to Trash
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
//                 Manage categories to keep your offerings organized
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
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Sparkles,
//   Plus,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export function ManageCategories() {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Fetch categories
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   const fetchCategories = async () => {
//     try {
//       // The backend route /api/categories/all now only returns ACTIVE categories (not in trash)
//       const res = await fetch(`${apiUrl}/api/categories/all`);
//       const data = await res.json();

//       const categoriesWithPujaCount = await Promise.all(
//         data.map(async (cat: any) => {
//           const pujaRes = await fetch(
//             `${apiUrl}/api/pujas/getPujaByCategory/${cat._id}`
//           );
//           const pujaData = await pujaRes.json();
//           return { ...cat, pujaCount: pujaData.length };
//         })
//       );

//       setCategories(categoriesWithPujaCount);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Failed to fetch categories",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Filtered categories
//   const filteredCategories = categories.filter(
//     (cat) =>
//       cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       cat.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handlers
//   const handleView = (id: string) => navigate(`/categories/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/categories/edit/${id}`);

//   // Renamed from handleDelete to handleMoveToTrash for clarity
//   const handleMoveToTrash = async (id: string) => {
//     if (
//       !window.confirm(
//         // Updated confirmation message
//         "Are you sure you want to move this category to trash? It will be permanently deleted after 30 days."
//       )
//     )
//       return;
//     try {
//       // This will now use the soft-delete logic on the backend
//       const res = await fetch(`${apiUrl}/api/categories/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         toast({
//           title: "Moved to Trash",
//           description: "Category moved to trash successfully.",
//         });
//         fetchCategories(); // Refresh the list to remove the soft-deleted item
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to move category to trash.",
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
//               <Sparkles className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Sacred Category Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View, edit, and manage all categories for your sacred offerings
//           </p>
//         </div>

//         {/* Action Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="relative flex-1 flex items-center gap-3">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-spiritual-foreground" />
//               <Input
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/add-category")}
//             >
//               <Plus className="w-4 h-4" /> Add Category
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <Sparkles className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Category Registry
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
//                     Description
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     No. of Pujas
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
//                 {filteredCategories.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No categories found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredCategories.map((cat) => (
//                     <TableRow
//                       key={cat._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground">
//                         {cat.name}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {cat.description}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {cat.pujaCount}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {getRelativeDate(cat.updatedAt || cat.createdAt)}
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
//                               onClick={() => handleView(cat._id)}
//                               className="gap-2 hover:bg-spiritual/10"
//                             >
//                               <Eye className="w-4 h-4" /> View Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(cat._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Edit Category
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               // Changed onClick handler name
//                               onClick={() => handleMoveToTrash(cat._id)}
//                               className="gap-2 text-destructive hover:bg-destructive/10"
//                             >
//                               {/* Renamed option text */}
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
//               Manage categories to keep your offerings organized
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
