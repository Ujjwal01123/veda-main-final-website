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
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  BookOpen,
  Menu,
} from "lucide-react";

export function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl =
    import.meta.env.VITE_BASE_API_URL ||
    "[http://localhost:5000](http://localhost:5000)";

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/blogs`)
      .then((res) => setBlogs(res.data.data?.blogs || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load blogs",
          variant: "destructive",
        })
      );
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAuthor =
      authorFilter === "all" || blog.authorType === authorFilter;
    return matchesSearch && matchesAuthor;
  });

  const handleView = (id: string) => navigate(`/blogs/view/${id}`);
  const handleEdit = (id: string) => navigate(`/blogs/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${apiUrl}/api/blogs/soft/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "📰 Blog Moved",
        description: "The blog was moved successfully",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Sidebar for large screens */}{" "}
      <div className="hidden lg:block w-64 flex-shrink-0">
        {" "}
        <Sidebar open={true} setOpen={setSidebarOpen} />{" "}
      </div>
      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed z-50 top-0 left-0 w-64 h-full bg-background shadow-xl lg:hidden">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          </div>
        </>
      )}
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="shadow-sm bg-background/80 backdrop-blur-md"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
      {/* Main Content */}
      <main className="flex-1 w-full p-4 lg:p-6 overflow-x-hidden transition-all duration-300 ease-in-out">
        <div className="max-w-full lg:max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <BookOpen className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Divine Blog Management
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your collection of spiritual articles and divine insights
              shared by Admins and Users.
            </p>
          </div>

          {/* Action Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
                <Input
                  placeholder="Search blogs by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80 w-full"
                />
              </div>
              <Button
                variant="spiritual"
                className="gap-2 shadow-spiritual w-full sm:w-auto"
                onClick={() => navigate("/dashboard/add-blog")}
              >
                <Plus className="w-4 h-4" /> Add New Blog
              </Button>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
            <CardHeader className="pb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Filter Blogs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {["all", "admin", "user"].map((filter) => (
                <Button
                  key={filter}
                  variant={authorFilter === filter ? "spiritual" : "outline"}
                  onClick={() => setAuthorFilter(filter)}
                  className="w-full sm:w-auto"
                >
                  {filter === "all"
                    ? "All Blogs"
                    : filter === "admin"
                    ? "Admin Blogs"
                    : "User Blogs"}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardContent className="p-0">
              <Table className="min-w-full text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No blogs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBlogs.map((blog) => (
                      <TableRow key={blog._id}>
                        <TableCell>
                          <img
                            src={
                              blog.image
                                ? `${apiUrl}${blog.image}`
                                : `${apiUrl}/uploads/default-blog.jpg`
                            }
                            alt={blog.title}
                            className="w-16 h-16 object-cover rounded-md border border-border/30"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {blog.title}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs mt-1 px-2 py-0.5 w-fit rounded-full ${
                              blog.authorType === "admin"
                                ? "bg-purple-200/40 text-purple-700"
                                : "bg-blue-200/40 text-blue-700"
                            }`}
                          >
                            {blog.authorType === "admin" ? "Admin" : "User"}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(blog.createdAt).toLocaleDateString()}
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
                                onClick={() => handleView(blog._id)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(blog._id)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(blog._id)}
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
        </div>
      </main>
    </div>
  );
}

export default ManageBlogs;

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
//   Eye,
//   Edit,
//   Trash2,
//   MoreHorizontal,
//   Plus,
//   BookOpen,
//   Menu,
// } from "lucide-react";

// import { Sidebar } from "@/components/layout/updatedSidebar";
// import { cn } from "@/lib/utils";

// export function ManageBlogs() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [authorFilter, setAuthorFilter] = useState("all");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl =
//     import.meta.env.VITE_BASE_API_URL ||
//     "[http://localhost:5000](http://localhost:5000)";

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/blogs`)
//       .then((res) => setBlogs(res.data.data?.blogs || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load blogs",
//           variant: "destructive",
//         })
//       );
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch = blog.title
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesAuthor =
//       authorFilter === "all" ||
//       (authorFilter === "admin" && blog.authorType === "admin") ||
//       (authorFilter === "user" && blog.authorType === "user");
//     return matchesSearch && matchesAuthor;
//   });

//   const handleView = (id: string) => navigate(`/blogs/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/blogs/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/blogs/soft/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "📰 Blog Moved",
//         description: "The blog was moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-background via-secondary/20 to-accent/10">
//       {/* Sidebar */} <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       {/* Main Content */}
//       <main
//         className={cn(
//           "flex-1 transition-all duration-300 ease-in-out p-4 lg:p-6 space-y-8",
//           sidebarOpen ? "lg:ml-64" : "ml-0"
//         )}
//       >
//         {/* Mobile Sidebar Toggle */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden mb-4"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <Menu className="w-5 h-5" />
//         </Button>

//         <div className="max-w-full lg:max-w-7xl mx-auto space-y-6">
//           {/* Header */}
//           <div className="text-center space-y-4 py-6">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <BookOpen className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Divine Blog Management
//               </h1>
//             </div>
//             <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//               Manage your collection of spiritual articles and divine insights
//               shared by Admins and Users.
//             </p>
//           </div>

//           {/* Action Bar */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//             <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
//               <div className="relative flex-1 w-full sm:w-auto">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//                 <Input
//                   placeholder="Search blogs by title..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80 w-full"
//                 />
//               </div>
//               <Button
//                 variant="spiritual"
//                 className="gap-2 shadow-spiritual w-full sm:w-auto"
//                 onClick={() => navigate("/dashboard/add-blog")}
//               >
//                 <Plus className="w-4 h-4" /> Add New Blog
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Filters */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-4 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-primary" />
//               <CardTitle className="text-foreground">Filter Blogs</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col sm:flex-row gap-4 flex-wrap">
//               <Button
//                 variant={authorFilter === "all" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("all")}
//                 className="w-full sm:w-auto"
//               >
//                 All Blogs
//               </Button>
//               <Button
//                 variant={authorFilter === "admin" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("admin")}
//                 className="w-full sm:w-auto"
//               >
//                 Admin Blogs
//               </Button>
//               <Button
//                 variant={authorFilter === "user" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("user")}
//                 className="w-full sm:w-auto"
//               >
//                 User Blogs
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
//             <CardContent className="p-0">
//               <Table className="min-w-full">
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Image</TableHead>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Author</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredBlogs.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No blogs found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredBlogs.map((blog) => (
//                       <TableRow key={blog._id}>
//                         <TableCell>
//                           <img
//                             src={
//                               blog.image
//                                 ? `${apiUrl}${blog.image}`
//                                 : `${apiUrl}/uploads/default-blog.jpg`
//                             }
//                             alt={blog.title}
//                             className="w-16 h-16 object-cover rounded-md border border-border/30"
//                           />
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {blog.title}
//                         </TableCell>
//                         <TableCell>
//                           <span
//                             className={`text-xs mt-1 px-2 py-0.5 w-fit rounded-full ${
//                               blog.authorType === "admin"
//                                 ? "bg-purple-200/40 text-purple-700"
//                                 : "bg-blue-200/40 text-blue-700"
//                             }`}
//                           >
//                             {blog.authorType === "admin" ? "Admin" : "User"}
//                           </span>
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {new Date(blog.createdAt).toLocaleDateString()}
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
//                                 onClick={() => handleView(blog._id)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(blog._id)}
//                               >
//                                 <Edit className="w-4 h-4 mr-2" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(blog._id)}
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
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ManageBlogs;

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
//   BookOpen,
//   Menu,
// } from "lucide-react";

// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Import Sidebar
// import { cn } from "@/lib/utils"; // ✅ For conditional class merging

// export function ManageBlogs() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [authorFilter, setAuthorFilter] = useState("all");
//   const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ sidebar toggle
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

//   // Fetch blogs
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/blogs`)
//       .then((res) => setBlogs(res.data.data?.blogs || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load blogs",
//           variant: "destructive",
//         })
//       );
//   }, []);

//   // Filters
//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch = blog.title
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesAuthor =
//       authorFilter === "all" ||
//       (authorFilter === "admin" && blog.authorType === "admin") ||
//       (authorFilter === "user" && blog.authorType === "user");
//     return matchesSearch && matchesAuthor;
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/blogs/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/blogs/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/blogs/soft/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "📰 Blog Moved",
//         description: "The blog was moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-background via-secondary/20 to-accent/10">
//       {/* ✅ Sidebar */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       {/* ✅ Main Content */}
//       <div
//         className={cn(
//           "flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out p-6 space-y-8"
//         )}
//       >
//         {/* ✅ Mobile Sidebar Toggle Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden mb-4"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <Menu className="w-5 h-5" />
//         </Button>

//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <BookOpen className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Divine Blog Management
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Manage your collection of spiritual articles and divine insights
//               shared by Admins and Users.
//             </p>
//           </div>

//           {/* Action Bar */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//             <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//                 <Input
//                   placeholder="Search blogs by title..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//                 />
//               </div>
//               <Button
//                 variant="spiritual"
//                 className="gap-2 shadow-spiritual"
//                 onClick={() => navigate("/dashboard/add-blog")}
//               >
//                 <Plus className="w-4 h-4" /> Add New Blog
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Filters */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-4 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-primary" />
//               <CardTitle className="text-foreground">Filter Blogs</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 variant={authorFilter === "all" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("all")}
//                 className="w-full sm:w-auto"
//               >
//                 All Blogs
//               </Button>
//               <Button
//                 variant={authorFilter === "admin" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("admin")}
//                 className="w-full sm:w-auto"
//               >
//                 Admin Blogs
//               </Button>
//               <Button
//                 variant={authorFilter === "user" ? "spiritual" : "outline"}
//                 onClick={() => setAuthorFilter("user")}
//                 className="w-full sm:w-auto"
//               >
//                 User Blogs
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Image</TableHead>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Author</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredBlogs.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No blogs found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredBlogs.map((blog) => (
//                       <TableRow key={blog._id}>
//                         <TableCell>
//                           <img
//                             src={
//                               blog.image
//                                 ? `${apiUrl}${blog.image}`
//                                 : `${apiUrl}/uploads/default-blog.jpg`
//                             }
//                             alt={blog.title}
//                             className="w-16 h-16 object-cover rounded-md border border-border/30"
//                           />
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {blog.title}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex flex-col">
//                             <span
//                               className={`text-xs mt-1 px-2 py-0.5 w-fit rounded-full ${
//                                 blog.authorType === "admin"
//                                   ? "bg-purple-200/40 text-purple-700"
//                                   : "bg-blue-200/40 text-blue-700"
//                               }`}
//                             >
//                               {blog.authorType === "admin" ? "Admin" : "User"}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {new Date(blog.createdAt).toLocaleDateString()}
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
//                                 onClick={() => handleView(blog._id)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(blog._id)}
//                               >
//                                 <Edit className="w-4 h-4 mr-2" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(blog._id)}
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
//   BookOpen,
// } from "lucide-react";

// export function ManageBlogs() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [authorFilter, setAuthorFilter] = useState("all"); // all | admin | user
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

//   // Fetch blogs
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/blogs`)
//       .then((res) => setBlogs(res.data.data?.blogs || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load blogs",
//           variant: "destructive",
//         })
//       );
//   }, []);

//   // Filters
//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch = blog.title
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesAuthor =
//       authorFilter === "all" ||
//       (authorFilter === "admin" && blog.authorType === "admin") ||
//       (authorFilter === "user" && blog.authorType === "user");
//     return matchesSearch && matchesAuthor;
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/blogs/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/blogs/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/blogs/soft/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "📰 Blog Moved",
//         description: "The blog was moved successfully",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog",
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
//               <BookOpen className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Divine Blog Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Manage your collection of spiritual articles and divine insights
//             shared by Admins and Users.
//           </p>
//         </div>

//         {/* Action Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//               <Input
//                 placeholder="Search blogs by title..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//               />
//             </div>
//             <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/add-blog")}
//             >
//               <Plus className="w-4 h-4" /> Add New Blog
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-4 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-primary" />
//             <CardTitle className="text-foreground">Filter Blogs</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <Button
//               variant={authorFilter === "all" ? "spiritual" : "outline"}
//               onClick={() => setAuthorFilter("all")}
//               className="w-full sm:w-auto"
//             >
//               All Blogs
//             </Button>
//             <Button
//               variant={authorFilter === "admin" ? "spiritual" : "outline"}
//               onClick={() => setAuthorFilter("admin")}
//               className="w-full sm:w-auto"
//             >
//               Admin Blogs
//             </Button>
//             <Button
//               variant={authorFilter === "user" ? "spiritual" : "outline"}
//               onClick={() => setAuthorFilter("user")}
//               className="w-full sm:w-auto"
//             >
//               User Blogs
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Author</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredBlogs.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No blogs found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBlogs.map((blog) => (
//                     <TableRow key={blog._id}>
//                       <TableCell>
//                         <img
//                           src={
//                             blog.image
//                               ? `${apiUrl}${blog.image}` // prefix API URL if image exists
//                               : `${apiUrl}/uploads/default-blog.jpg` // fallback
//                           }
//                           alt={blog.title}
//                           className="w-16 h-16 object-cover rounded-md border border-border/30"
//                         />
//                       </TableCell>

//                       <TableCell className="font-medium">
//                         {blog.title}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex flex-col">
//                           {/* <span className="font-medium">
//                             {blog.authorName || "Unknown"}
//                           </span> */}
//                           <span
//                             className={`text-xs mt-1 px-2 py-0.5 w-fit rounded-full ${
//                               blog.authorType === "admin"
//                                 ? "bg-purple-200/40 text-purple-700"
//                                 : "bg-blue-200/40 text-blue-700"
//                             }`}
//                           >
//                             {blog.authorType === "admin" ? "Admin" : "User"}
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(blog.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent
//                             align="end"
//                             className="bg-gradient-card border-border/50"
//                           >
//                             <DropdownMenuItem
//                               onClick={() => handleView(blog._id)}
//                             >
//                               <Eye className="w-4 h-4 mr-2" /> View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(blog._id)}
//                             >
//                               <Edit className="w-4 h-4 mr-2" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(blog._id)}
//                               className="text-destructive"
//                             >
//                               <Trash2 className="w-4 h-4 mr-2" /> Move to Trash
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
//       </div>
//     </div>
//   );
// }
