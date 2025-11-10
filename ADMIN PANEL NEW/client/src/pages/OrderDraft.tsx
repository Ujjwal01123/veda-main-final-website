import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Add sidebar
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
import { Eye, Trash2, ArrowLeft } from "lucide-react";

export function ViewOrderDrafts() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/orders/drafts`)
      .then((res) => setOrders(res.data || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load draft orders",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredOrders = orders.filter((item) =>
    item.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => navigate(`/orders/view/${id}`);
  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/orders/restore/${id}`);
      setOrders((prev) => prev.filter((item) => item._id !== id));
      toast({ title: "Restored", description: "Order restored successfully" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore order",
        variant: "destructive",
      });
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this order?")) return;
    try {
      await axios.delete(`${apiUrl}/api/orders/${id}`);
      setOrders((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "Deleted",
        description: "Order permanently deleted",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* ✅ Sidebar on left */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        {" "}
        <Sidebar />{" "}
      </div>
      {/* ✅ Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-draft")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
              Draft Orders
            </h1>
          </div>

          {/* Search */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search draft orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
              />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <CardTitle className="text-foreground">Deleted Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Customer
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Items
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
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No draft orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((item) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {item.customerName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.items?.length || 0}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(item.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(item._id)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
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

// export function ViewOrderDrafts() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/orders/drafts`)
//       .then((res) => setOrders(res.data || []))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load draft orders",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   const filteredOrders = orders.filter((item) =>
//     item.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/orders/view/${id}`);
//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/orders/restore/${id}`);
//       setOrders((prev) => prev.filter((item) => item._id !== id));
//       toast({ title: "Restored", description: "Order restored successfully" });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore order",
//         variant: "destructive",
//       });
//     }
//   };
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this order?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/orders/${id}`);
//       setOrders((prev) => prev.filter((item) => item._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Order permanently deleted",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete order",
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
//             Draft Orders
//           </h1>
//         </div>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search draft orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <CardTitle className="text-foreground">Deleted Orders</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Customer
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Items
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
//                 {filteredOrders.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No draft orders found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredOrders.map((item) => (
//                     <TableRow
//                       key={item._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {item.customerName}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {item.items?.length || 0}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(item.deletedAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right flex gap-2 justify-end">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleView(item._id)}
//                         >
//                           <Eye className="w-4 h-4 mr-1" /> View
//                         </Button>
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
