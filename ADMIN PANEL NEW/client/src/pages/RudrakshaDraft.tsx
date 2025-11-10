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
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";

// Custom interface based on your model
interface RudrakshaDraft {
  _id: string;
  productName: string;
  deletedAt: string;
  // Add other properties if needed
}

export function ViewRudrakshaDrafts() {
  const [rudrakshas, setRudrakshas] = useState<RudrakshaDraft[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl =
    import.meta.env.VITE_BASE_API_URL ||
    "[http://localhost:5000](http://localhost:5000)";

  const fetchDrafts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/product/rudraksha/draft`);
      setRudrakshas(res.data?.data?.rudraksha || []);
    } catch (error) {
      console.error("Fetch draft error:", error);
      toast({
        title: "Error",
        description: "Failed to load draft Rudrakshas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, [apiUrl, toast]);

  const filteredRudrakshas = rudrakshas.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/product/rudraksha/restore/${id}`);
      setRudrakshas((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Restored",
        description: "Rudraksha restored successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore Rudraksha.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePermanent = async (id: string) => {
    if (
      !window.confirm(
        "Permanently delete this Rudraksha? This action cannot be undone."
      )
    )
      return;
    try {
      await axios.delete(`${apiUrl}/api/product/rudraksha/hard/${id}`);
      setRudrakshas((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Permanently Deleted",
        description: "Rudraksha permanently removed from the database.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to permanently delete Rudraksha.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md">
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
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
              Draft Rudrakshas
            </h1>
          </div>

          {/* Search */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent className="flex items-center gap-3">
              <Input
                placeholder="Search draft Rudrakshas..."
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
                Deleted Rudrakshas (Auto-delete in 30 days)
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
                      Draft Date
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-12 text-muted-foreground"
                      >
                        Loading drafts...
                      </TableCell>
                    </TableRow>
                  ) : filteredRudrakshas.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No draft Rudrakshas found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRudrakshas.map((item) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {item.productName}
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
                            <RotateCcw className="w-4 h-4 mr-1" /> Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePermanent(item._id)}
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
// import { Eye, ArrowLeft, RotateCcw, Trash2 } from "lucide-react"; // Using RotateCcw for Restore

// // Custom interface based on your model
// interface RudrakshaDraft {
//   _id: string;
//   productName: string;
//   deletedAt: string;
//   // Add other properties if needed
// }

// export function ViewRudrakshaDrafts() {
//   // Update state type to use the new interface
//   const [rudrakshas, setRudrakshas] = useState<RudrakshaDraft[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   // Using custom state for loading, as recommended for async operations
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   // Ensure the environment variable is used correctly, if needed
//   const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

//   // Function to fetch draft rudrakshas
//   const fetchDrafts = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${apiUrl}/api/product/rudraksha/draft`);
//       // CRITICAL FIX 1: Accessing the nested data structure from the API response
//       setRudrakshas(res.data?.data?.rudraksha || []);
//     } catch (error) {
//       console.error("Fetch draft error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load draft Rudrakshas.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDrafts();
//   }, [apiUrl, toast]);

//   // Filtered list - CRITICAL FIX 2: Use 'productName' for filtering
//   const filteredRudrakshas = rudrakshas.filter((item) =>
//     item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Actions
//   const handleView = (id: string) => navigate(`/rudraksha/view/${id}`);

//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/product/rudraksha/restore/${id}`);
//       // On success, filter the item out of the current list
//       setRudrakshas((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Restored",
//         description: "Rudraksha restored successfully.",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore Rudraksha.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeletePermanent = async (id: string) => {
//     // IMPORTANT: Avoid using window.confirm in production applications (use a custom modal instead).
//     // For this example, we keep it but acknowledge the practice.
//     if (
//       !window.confirm(
//         "Permanently delete this Rudraksha? This action cannot be undone."
//       )
//     )
//       return;

//     try {
//       // CRITICAL FIX 3: Use the new HARD DELETE endpoint
//       await axios.delete(`${apiUrl}/api/product/rudraksha/hard/${id}`);
//       setRudrakshas((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Permanently Deleted",
//         description: "Rudraksha permanently removed from the database.",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to permanently delete Rudraksha.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="ghost"
//             className="flex items-center gap-2"
//             onClick={() => navigate("/dashboard/manage-draft")}
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </Button>
//           <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//             Draft Rudrakshas
//           </h1>
//         </div>

//         {/* Search */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent className="flex items-center gap-3">
//             <Input
//               placeholder="Search draft Rudrakshas..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <CardTitle className="text-foreground">
//               Deleted Rudrakshas (Auto-delete in 30 days)
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Name
//                   </TableHead>
//                   {/* Removed 'Type' column as it's ambiguous in the model */}
//                   <TableHead className="font-semibold text-foreground">
//                     Draft Date
//                   </TableHead>
//                   <TableHead className="text-right font-semibold text-foreground">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={3}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       Loading drafts...
//                     </TableCell>
//                   </TableRow>
//                 ) : filteredRudrakshas.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={3} // Adjusted colspan to 3
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No draft Rudrakshas found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredRudrakshas.map((item) => (
//                     <TableRow
//                       key={item._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       {/* CRITICAL FIX 4: Use 'productName' */}
//                       <TableCell className="font-medium text-foreground py-4">
//                         {item.productName}
//                       </TableCell>

//                       <TableCell className="text-muted-foreground">
//                         {/* CRITICAL FIX 5: Use 'deletedAt' */}
//                         {new Date(item.deletedAt).toLocaleDateString()}
//                       </TableCell>

//                       <TableCell className="text-right flex gap-2 justify-end">
//                         {/* View only allows viewing details, assuming ID is correct */}
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
//                           <RotateCcw className="w-4 h-4 mr-1" /> Restore
//                         </Button>
//                         {/* Calls the permanent delete function */}
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDeletePermanent(item._id)}
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
