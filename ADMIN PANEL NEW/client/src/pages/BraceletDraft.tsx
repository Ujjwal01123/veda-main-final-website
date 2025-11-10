import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ same sidebar
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

export function ViewBraceletDrafts() {
  const [bracelets, setBracelets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/bracelet/drafts`)
      .then((res) => setBracelets(res.data.data.drafts || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load draft Bracelets",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredBracelets = bracelets.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/product/bracelet/restore/${id}`);
      setBracelets((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Restored",
        description: "Bracelet restored successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore Bracelet",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this Bracelet?")) return;
    try {
      await axios.delete(`${apiUrl}/api/product/bracelet/${id}/hard-delete`);
      setBracelets((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Deleted",
        description: "Bracelet permanently deleted",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete Bracelet",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* ✅ Sidebar (left) */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main content (right) */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-bracelets")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
              🧿 Draft Bracelets
            </h1>
          </div>

          {/* Search */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search draft Bracelets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
              />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <CardTitle className="text-foreground">
                Deleted Bracelets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Price
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
                  {filteredBracelets.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No draft Bracelets found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBracelets.map((item) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {item.productName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          ₹{item.productPrice}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(item.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleRestore(item._id)}
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item._id)}
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
// import { Eye, Trash2, ArrowLeft } from "lucide-react";

// export function ViewBraceletDrafts() {
//   const [bracelets, setBracelets] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/bracelet/drafts`)
//       .then((res) => setBracelets(res.data.data.drafts || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load draft Bracelets",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   const filteredBracelets = bracelets.filter((item) =>
//     item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/bracelet/view/${id}`);

//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/product/bracelet/restore/${id}`);
//       setBracelets((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Restored",
//         description: "Bracelet restored successfully",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore Bracelet",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this Bracelet?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/product/bracelet/${id}/hard-delete`);
//       setBracelets((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Bracelet permanently deleted",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete Bracelet",
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
//             onClick={() => navigate("/dashboard/manage-bracelets")}
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Button>
//           <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//             Draft Bracelets
//           </h1>
//         </div>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search draft Bracelets..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <CardTitle className="text-foreground">Deleted Bracelets</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Name
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Price
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
//                 {filteredBracelets.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No draft Bracelets found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBracelets.map((item) => (
//                     <TableRow
//                       key={item._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {item.productName}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         ₹{item.productPrice}
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
