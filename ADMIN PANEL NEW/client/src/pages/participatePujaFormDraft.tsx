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
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";

export function ParticipatedViewPujaDrafts() {
  const [forms, setForms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchDeletedForms = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/participate/bookings`);
        const allForms = Array.isArray(res.data?.data) ? res.data.data : [];
        const deletedForms = allForms.filter((form) => form.isDeleted === true);
        setForms(deletedForms);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load deleted puja forms.",
          variant: "destructive",
        });
      }
    };
    fetchDeletedForms();
  }, [apiUrl, toast]);

  const filteredForms = forms.filter(
    (f) =>
      f.whatsappNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.participants?.some((p: any) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleRestore = async (id: string) => {
    try {
      await axios.patch(
        `${apiUrl}/api/participate/bookings/restore/deleted/${id}`
      );
      setForms((prev) => prev.filter((f) => f._id !== id));
      toast({
        title: "Restored",
        description: "Puja form restored successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore puja form.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this puja form?")) return;
    try {
      await axios.delete(
        `${apiUrl}/api/participate/bookings/hard-delete/${id}`
      );
      setForms((prev) => prev.filter((f) => f._id !== id));
      toast({
        title: "Deleted",
        description: "Puja form permanently deleted.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete puja form.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-amber-50/10 to-background/70">
      {/* ✅ Sidebar on left */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>
      {/* ✅ Main content */}
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              🪔 Deleted Puja Forms
            </h1>
          </div>

          {/* Search Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
            <CardContent>
              <Input
                placeholder="Search by participant or WhatsApp number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 border-amber-200 focus:border-amber-500 focus:ring-amber-200 bg-background/80"
              />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-100/10 to-orange-100/10 border-b border-border/50">
              <CardTitle className="text-foreground">
                Deleted Puja Forms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-amber-50/10 to-orange-50/10 border-b border-border/30">
                    <TableHead className="font-semibold text-foreground">
                      WhatsApp Number
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Participants
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Form Type
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
                  {filteredForms.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No deleted puja forms found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredForms.map((f) => (
                      <TableRow
                        key={f._id}
                        className="hover:bg-gradient-to-r hover:from-amber-50/10 hover:to-orange-50/10 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium text-foreground py-4">
                          {f.whatsappNumber}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {f.participants?.map((p: any) => p.name).join(", ")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {f.formType?.replace("_", " ")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(f.deletedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleRestore(f._id)}
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(f._id)}
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
// import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";

// export function ParticipatedViewPujaDrafts() {
//   const [forms, setForms] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // ✅ Fetch soft-deleted puja forms
//   // ✅ Fetch all bookings and filter only deleted ones
//   useEffect(() => {
//     const fetchDeletedForms = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/participate/bookings`);
//         const allForms = Array.isArray(res.data?.data) ? res.data.data : [];

//         // ✅ Only keep those that are soft-deleted
//         const deletedForms = allForms.filter((form) => form.isDeleted === true);

//         setForms(deletedForms);
//       } catch (error) {
//         console.error(error);
//         toast({
//           title: "Error",
//           description: "Failed to load deleted puja forms.",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchDeletedForms();
//   }, [apiUrl, toast]);

//   // ✅ Filter forms by WhatsApp number or participant name
//   const filteredForms = forms.filter(
//     (f) =>
//       f.whatsappNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       f.participants?.some((p: any) =>
//         p.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//   );

//   // ♻️ Restore soft-deleted form
//   const handleRestore = async (id: string) => {
//     try {
//       await axios.patch(
//         `${apiUrl}/api/participate/bookings/restore/deleted/${id}`
//       );
//       setForms((prev) => prev.filter((f) => f._id !== id));
//       toast({
//         title: "Restored",
//         description: "Puja form restored successfully.",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to restore puja form.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ❌ Permanently delete form
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Permanently delete this puja form?")) return;
//     try {
//       await axios.delete(
//         `${apiUrl}/api/participate/bookings/hard-delete/${id}`
//       );
//       setForms((prev) => prev.filter((f) => f._id !== id));
//       toast({
//         title: "Deleted",
//         description: "Puja form permanently deleted.",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete puja form.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-amber-50/10 to-background/70 p-6 space-y-8">
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
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
//             🪔 Deleted Puja Forms
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-4">
//           <CardContent>
//             <Input
//               placeholder="Search by participant or WhatsApp number..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-3 border-amber-200 focus:border-amber-500 focus:ring-amber-200 bg-background/80"
//             />
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-amber-100/10 to-orange-100/10 border-b border-border/50">
//             <CardTitle className="text-foreground">
//               Deleted Puja Forms
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-amber-50/10 to-orange-50/10 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     WhatsApp Number
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Participants
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Form Type
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
//                 {filteredForms.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No deleted puja forms found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredForms.map((f) => (
//                     <TableRow
//                       key={f._id}
//                       className="hover:bg-gradient-to-r hover:from-amber-50/10 hover:to-orange-50/10 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         {f.whatsappNumber}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {f.participants?.map((p: any) => p.name).join(", ")}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {f.formType?.replace("_", " ")}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(f.deletedAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right flex gap-2 justify-end">
//                         <Button
//                           size="sm"
//                           className="bg-green-500 hover:bg-green-600 text-white"
//                           onClick={() => handleRestore(f._id)}
//                         >
//                           <RotateCcw className="w-4 h-4 mr-1" /> Restore
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(f._id)}
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
