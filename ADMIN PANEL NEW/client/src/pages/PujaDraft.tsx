import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar added
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
import { ArrowLeft } from "lucide-react";

export function ViewPujaDrafts() {
  const [pujas, setPujas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/pujas/deleted`)
      .then((res) => setPujas(res.data || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load draft Puja",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredPujas = pujas.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/pujas/restore/${id}`);
      setPujas((prev) => prev.filter((item) => item._id !== id));
      toast({ title: "Restored", description: "Puja restored successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore Puja",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this Puja?")) return;
    try {
      await axios.delete(`${apiUrl}/api/pujas/hard-delete/${id}`);
      setPujas((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Deleted",
        description: "Puja permanently deleted",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete Puja",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* ✅ Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 border-r border-border/40 bg-white/80 backdrop-blur-md z-20">
        <Sidebar />
      </div>

      {/* ✅ Main content area (scrollable only) */}
      <div className="lg:pl-64 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back Button + Page Title */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-draft")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
              Draft Puja
            </h1>
          </div>

          {/* Search Input */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search draft Puja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
              />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <CardTitle className="text-foreground">Deleted Puja</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPujas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No draft Puja found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPujas.map((item) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {item.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.category?.name || "Universal"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(item.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="spiritual"
                            onClick={() => handleRestore(item._id)}
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
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
// import { Eye, Trash2, ArrowLeft } from "lucide-react";

// export function ViewPujaDrafts() {
//   const [pujas, setPujas] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/pujas/deleted`)
//       .then((res) => setPujas(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load draft Puja",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   const filteredPujas = pujas.filter((item) =>
//     item.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/pujas/view/${id}`);
//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/pujas/restore/${id}`);
//       setPujas((prev) => prev.filter((item) => item._id !== id));
//       toast({ title: "Restored", description: "Puja restored successfully" });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore Puja",
//         variant: "destructive",
//       });
//     }
//   };
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this Puja?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/pujas/hard-delete/${id}`);
//       setPujas((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Puja permanently deleted",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete Puja",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="ghost"
//             className="flex items-center gap-2"
//             onClick={() => navigate("/dashboard/manage-draft")}
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Button>
//           <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//             Draft Puja
//           </h1>
//         </div>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search draft Puja..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <CardTitle className="text-foreground">Deleted Puja</CardTitle>
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
//                   <TableHead className="text-right font-semibold text-foreground">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredPujas.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No draft Puja found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredPujas.map((item) => (
//                     <TableRow
//                       key={item._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {item.title}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {item.category?.name || "Universal"}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(item.deletedAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right flex gap-2 justify-end">
//                         {/* <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleView(item._id)}
//                         >
//                           <Eye className="w-4 h-4 mr-1" /> View
//                         </Button> */}
//                         <Button
//                           size="sm"
//                           variant="spiritual"
//                           onClick={() => handleRestore(item._id)}
//                         >
//                           Restore
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                           Delete
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
