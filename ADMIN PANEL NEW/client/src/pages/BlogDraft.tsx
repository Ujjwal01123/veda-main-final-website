import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Make sure path is correct
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
import { Trash2, ArrowLeft, RotateCcw } from "lucide-react";

export function ViewBlogDrafts() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch deleted blogs
  useEffect(() => {
    const fetchDeletedBlogs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/blogs/trash`);
        const deletedBlogs = res.data?.data?.deletedBlogs || [];
        setBlogs(deletedBlogs);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load deleted blogs.",
          variant: "destructive",
        });
      }
    };
    fetchDeletedBlogs();
  }, [toast]);

  // ✅ Filter blogs by search term
  const filteredBlogs = blogs.filter((b) =>
    b.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Restore blog
  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/blogs/restore/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Restored",
        description: "Blog restored successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore blog.",
        variant: "destructive",
      });
    }
  };

  // ✅ Permanently delete blog
  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this blog?")) return;
    try {
      await axios.delete(`${apiUrl}/api/blogs/hard/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Deleted",
        description: "Blog permanently deleted.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete blog.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50">
      {/* ✅ Sidebar on left */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main content area on the right */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              🗑️ Deleted Blogs
            </h1>
          </div>

          {/* Search Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search deleted blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-orange-200 focus:border-orange-500 focus:ring-orange-200 bg-background/80"
              />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-100/10 to-amber-100/10 border-b border-border/50">
              <CardTitle className="text-foreground">Deleted Blogs</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-orange-50/10 to-amber-50/10 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Author
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Deleted At
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No deleted blogs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBlogs.map((b) => (
                      <TableRow
                        key={b._id}
                        className="hover:bg-gradient-to-r hover:from-orange-50/10 hover:to-amber-50/10 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {b.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {b.authorType}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(b.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleRestore(b._id)}
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(b._id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
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
// import { Eye, Trash2, ArrowLeft, RotateCcw } from "lucide-react";

// export function ViewBlogDrafts() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // ✅ Fetch deleted blogs
//   useEffect(() => {
//     const fetchDeletedBlogs = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/blogs/trash`);
//         const deletedBlogs = res.data?.data?.deletedBlogs || [];
//         setBlogs(deletedBlogs);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load deleted blogs.",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchDeletedBlogs();
//   }, [toast]);

//   // ✅ Filter blogs by search term
//   const filteredBlogs = blogs.filter((b) =>
//     b.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ View blog
//   const handleView = (id: string) => navigate(`/blogs/view/${id}`);

//   // ✅ Restore blog
//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/blogs/restore/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Restored",
//         description: "Blog restored successfully.",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore blog.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ✅ Permanently delete blog
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this blog?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/blogs/hard/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Blog permanently deleted.",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="ghost"
//             className="flex items-center gap-2"
//             onClick={() => navigate("/dashboard")}
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Button>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
//             🗑️ Deleted Blogs
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search deleted blogs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-orange-200 focus:border-orange-500 focus:ring-orange-200 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-orange-100/10 to-amber-100/10 border-b border-border/50">
//             <CardTitle className="text-foreground">Deleted Blogs</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-orange-50/10 to-amber-50/10 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Title
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Author
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Deleted At
//                   </TableHead>
//                   <TableHead className="text-right font-semibold text-foreground">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredBlogs.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No deleted blogs found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBlogs.map((b) => (
//                     <TableRow
//                       key={b._id}
//                       className="hover:bg-gradient-to-r hover:from-orange-50/10 hover:to-amber-50/10 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {b.title}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {b.authorType}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(b.deletedAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right flex gap-2 justify-end">
//                         {/* <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleView(b._id)}
//                         >
//                           <Eye className="w-4 h-4 mr-1" /> View
//                         </Button> */}
//                         <Button
//                           size="sm"
//                           className="bg-green-500 hover:bg-green-600 text-white"
//                           onClick={() => handleRestore(b._id)}
//                         >
//                           <RotateCcw className="w-4 h-4 mr-1" /> Restore
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(b._id)}
//                         >
//                           <Trash2 className="w-4 h-4 mr-1" /> Delete
//                         </Button>
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
