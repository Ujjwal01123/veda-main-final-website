import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export function ViewBookingDrafts() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/bookings/draft`)
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load draft bookings",
          variant: "destructive",
        })
      );
  }, [toast]);

  const filteredBookings = bookings.filter((b) =>
    b.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = async (id: string) => {
    try {
      await axios.put(`${apiUrl}/api/bookings/restore/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Restored",
        description: "Booking restored successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore booking",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this booking?")) return;
    try {
      await axios.delete(`${apiUrl}/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast({
        title: "Deleted",
        description: "Booking permanently deleted",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout activeSection="bookings">
      <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
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
              Draft Bookings
            </h1>
          </div>

          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search draft bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <CardTitle className="text-foreground">
                Deleted Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      Customer
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Puja/Service
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
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No draft bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((b) => (
                      <TableRow
                        key={b._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {b.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {b.puja?.title || "Unknown"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(b.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="spiritual"
                            onClick={() => handleRestore(b._id)}
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(b._id)}
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
    </DashboardLayout>
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

// export function ViewBookingDrafts() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/bookings/draft`)
//       .then((res) => {
//         setBookings(res.data || []);
//       })
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load draft bookings",
//           variant: "destructive",
//         })
//       );
//   }, [toast]);

//   // Filter by customer name
//   const filteredBookings = bookings.filter((b) =>
//     b.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleView = (id: string) => navigate(`/bookings/view/${id}`);

//   const handleRestore = async (id: string) => {
//     try {
//       await axios.put(`${apiUrl}/api/bookings/restore/${id}`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Restored",
//         description: "Booking restored successfully",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore booking",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this booking?")) return;
//     try {
//       await axios.delete(`${apiUrl}/api/bookings/${id}`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Booking permanently deleted",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete booking",
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
//             Draft Bookings
//           </h1>
//         </div>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search draft bookings..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <CardTitle className="text-foreground">Deleted Bookings</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Customer
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Puja/Service
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
//                 {filteredBookings.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No draft bookings found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredBookings.map((b) => (
//                     <TableRow
//                       key={b._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {b.name}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {b.puja?.title || "Unknown"}
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
//                           variant="spiritual"
//                           onClick={() => handleRestore(b._id)}
//                         >
//                           Restore
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(b._id)}
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
