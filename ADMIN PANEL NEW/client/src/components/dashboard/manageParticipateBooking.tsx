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
  ScrollText,
  Menu,
} from "lucide-react";

export function ManagePujaForms() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/participate/bookings`);
        const allForms = Array.isArray(res.data?.data) ? res.data.data : [];
        const activeForms = allForms.filter((form) => !form.isDeleted);
        setForms(activeForms);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load puja forms",
          variant: "destructive",
        });
      }
    };
    fetchForms();
  }, [apiUrl, toast]);

  const filteredForms = forms.filter((form) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const participantNames =
      form.participants?.map((p) => p.name?.toLowerCase() || "").join(" ") ||
      "";
    return (
      form.fullName?.toLowerCase().includes(term) ||
      form.gotra?.toLowerCase().includes(term) ||
      form.city?.toLowerCase().includes(term) ||
      form.whatsappNumber?.toLowerCase().includes(term) ||
      participantNames.includes(term)
    );
  });

  const handleView = (id) => navigate(`/puja/forms/view/${id}`);
  const handleEdit = (id) => navigate(`/puja/forms/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    try {
      await axios.patch(
        `${apiUrl}/api/participate/bookings/soft-delete/${id}`,
        { isDeleted: true }
      );
      setForms((prev) => prev.filter((form) => form._id !== id));
      toast({
        title: "Moved to Trash",
        description: "Puja form has been soft deleted successfully.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to soft delete puja form.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
      {/* Sidebar */} <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 transition-all duration-300 lg:ml-64 space-y-8">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mb-4"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="max-w-full lg:max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <ScrollText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Manage Puja Forms
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              View and manage sacred puja submissions
            </p>
          </div>

          {/* Search + Filter */}
          <Card className="bg-white/80 border-border/40 shadow-sm backdrop-blur-sm">
            <CardHeader className="pb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-600" />
              <CardTitle>Filter Submissions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                <Input
                  placeholder="Search by name, gotra, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-200 bg-white/90 w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-white/90 border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-border/40">
              <div className="flex items-center gap-3">
                <ScrollText className="w-5 h-5 text-amber-700" />
                <CardTitle>Puja Form Registry</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-border/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Gotra</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Prasad</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No puja form submissions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredForms.map((form) => (
                      <TableRow
                        key={form._id}
                        className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium">
                          {form.fullName || form.participants?.[0]?.name || "—"}
                        </TableCell>
                        <TableCell>{form.gotra || "—"}</TableCell>
                        <TableCell>{form.participants?.length || 0}</TableCell>
                        <TableCell>
                          {form.prasadDelivery
                            ? `${form.prasadType || "Yes"}`
                            : "No"}
                        </TableCell>
                        <TableCell>{form.city || "—"}</TableCell>
                        <TableCell>
                          {new Date(form.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 hover:bg-amber-100"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(form._id)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(form._id)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(form._id)}
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

export default ManagePujaForms;

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Ensure path is correct
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
//   ScrollText,
// } from "lucide-react";

// export function ManagePujaForms() {
//   const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Sidebar state
//   const [forms, setForms] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // 🕉️ Fetch forms from API
//   useEffect(() => {
//     const fetchForms = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/participate/bookings`);
//         const allForms = Array.isArray(res.data?.data) ? res.data.data : [];
//         const activeForms = allForms.filter((form) => !form.isDeleted);
//         setForms(activeForms);
//       } catch (err) {
//         console.error(err);
//         toast({
//           title: "Error",
//           description: "Failed to load puja forms",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchForms();
//   }, [apiUrl, toast]);

//   // 🔍 Filter forms
//   const filteredForms = forms.filter((form) => {
//     const term = searchTerm.trim().toLowerCase();
//     if (!term) return true;

//     const participantNames =
//       form.participants?.map((p) => p.name?.toLowerCase() || "").join(" ") ||
//       "";

//     return (
//       form.fullName?.toLowerCase().includes(term) ||
//       form.gotra?.toLowerCase().includes(term) ||
//       form.city?.toLowerCase().includes(term) ||
//       form.whatsappNumber?.toLowerCase().includes(term) ||
//       participantNames.includes(term)
//     );
//   });

//   // ✨ Actions
//   const handleView = (id) => navigate(`/puja/forms/view/${id}`);
//   const handleEdit = (id) => navigate(`/puja/forms/edit/${id}`);
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this form?")) return;

//     try {
//       await axios.patch(
//         `${apiUrl}/api/participate/bookings/soft-delete/${id}`,
//         {
//           isDeleted: true,
//         }
//       );

//       setForms((prev) => prev.filter((form) => form._id !== id));

//       toast({
//         title: "Moved to Trash",
//         description: "Puja form has been soft deleted successfully.",
//         variant: "destructive",
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to soft delete puja form.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
//       {/* ✅ Sidebar */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       {/* ✅ Main Content */}
//       <div className="flex-1 p-6 space-y-8 transition-all duration-300 lg:ml-64">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
//                 <ScrollText className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
//                 Manage Puja Forms
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               View and manage sacred puja submissions
//             </p>
//           </div>

//           {/* Search + Filter */}
//           <Card className="bg-white/80 border-border/40 shadow-sm backdrop-blur-sm">
//             <CardHeader className="pb-4 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-amber-600" />
//               <CardTitle>Filter Submissions</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
//                 <Input
//                   placeholder="Search by name, gotra, or city..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-200 bg-white/90"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Table */}
//           <Card className="bg-white/90 border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-border/40">
//               <div className="flex items-center gap-3">
//                 <ScrollText className="w-5 h-5 text-amber-700" />
//                 <CardTitle>Puja Form Registry</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-border/30">
//                     <TableHead>Name</TableHead>
//                     <TableHead>Gotra</TableHead>
//                     <TableHead>Participants</TableHead>
//                     <TableHead>Prasad</TableHead>
//                     <TableHead>City</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredForms.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={7}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No puja form submissions found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredForms.map((form) => (
//                       <TableRow
//                         key={form._id}
//                         className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border-b border-border/20"
//                       >
//                         <TableCell className="font-medium">
//                           {form.fullName || form.participants?.[0]?.name || "—"}
//                         </TableCell>
//                         <TableCell>{form.gotra || "—"}</TableCell>
//                         <TableCell>{form.participants?.length || 0}</TableCell>
//                         <TableCell>
//                           {form.prasadDelivery
//                             ? `${form.prasadType || "Yes"}`
//                             : "No"}
//                         </TableCell>
//                         <TableCell>{form.city || "—"}</TableCell>
//                         <TableCell>
//                           {new Date(form.createdAt).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="w-8 h-8 hover:bg-amber-100"
//                               >
//                                 <MoreHorizontal className="w-4 h-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem
//                                 onClick={() => handleView(form._id)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(form._id)}
//                               >
//                                 <Edit className="w-4 h-4 mr-2" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(form._id)}
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

// export default ManagePujaForms;

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
//   ScrollText,
// } from "lucide-react";

// export function ManagePujaForms() {
//   const [forms, setForms] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // 🕉️ Fetch forms from your API
//   // 🕉️ Fetch forms from your API
//   useEffect(() => {
//     const fetchForms = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/participate/bookings`);
//         const allForms = Array.isArray(res.data?.data) ? res.data.data : [];

//         // ✅ Only include non-deleted forms
//         const activeForms = allForms.filter((form) => !form.isDeleted);

//         setForms(activeForms);
//       } catch (err) {
//         console.error(err);
//         toast({
//           title: "Error",
//           description: "Failed to load puja forms",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchForms();
//   }, [apiUrl, toast]);

//   // 🔍 Filter forms by fullName or gotra or city
//   // 🔍 Filter forms by fullName, gotra, city, participants' names, or WhatsApp
//   const filteredForms = forms.filter((form) => {
//     const term = searchTerm.trim().toLowerCase();

//     if (!term) return true; // show all if empty search

//     const participantNames =
//       form.participants?.map((p) => p.name?.toLowerCase() || "").join(" ") ||
//       "";

//     return (
//       form.fullName?.toLowerCase().includes(term) ||
//       form.gotra?.toLowerCase().includes(term) ||
//       form.city?.toLowerCase().includes(term) ||
//       form.whatsappNumber?.toLowerCase().includes(term) ||
//       participantNames.includes(term)
//     );
//   });

//   // ✨ Actions
//   const handleView = (id) => navigate(`/puja/forms/view/${id}`);
//   const handleEdit = (id) => navigate(`/puja/forms/edit/${id}`);
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this form?")) return;

//     try {
//       await axios.patch(
//         `${apiUrl}/api/participate/bookings/soft-delete/${id}`,
//         {
//           isDeleted: true,
//         }
//       );

//       // Remove it from frontend state (optional, for immediate UI update)
//       setForms((prev) => prev.filter((form) => form._id !== id));

//       toast({
//         title: "Moved to Trash",
//         description: "Puja form has been soft deleted successfully.",
//         variant: "destructive",
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to soft delete puja form.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
//               <ScrollText className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
//               Manage Puja Forms
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             View and manage sacred puja submissions
//           </p>
//         </div>

//         {/* Search + Add */}
//         <Card className="bg-white/80 border-border/40 shadow-sm backdrop-blur-sm">
//           <CardHeader className="pb-4 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-amber-600" />
//             <CardTitle>Filter Submissions</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
//               <Input
//                 placeholder="Search by name, gotra, or city..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-200 bg-white/90"
//               />
//             </div>
//             {/* <Button
//               className="gap-2 shadow-md bg-gradient-to-tr from-amber-500 to-orange-600 text-white"
//               onClick={() => navigate("/dashboard/add-form")}
//             >
//               <Plus className="w-4 h-4" /> Add New Form
//             </Button> */}
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card className="bg-white/90 border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-border/40">
//             <div className="flex items-center gap-3">
//               <ScrollText className="w-5 h-5 text-amber-700" />
//               <CardTitle>Puja Form Registry</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-border/30">
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gotra</TableHead>
//                   <TableHead>Participants</TableHead>
//                   <TableHead>Prasad</TableHead>
//                   <TableHead>City</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredForms.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={7}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No puja form submissions found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredForms.map((form) => (
//                     <TableRow
//                       key={form._id}
//                       className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium">
//                         {form.fullName || form.participants?.[0]?.name || "—"}
//                       </TableCell>
//                       <TableCell>{form.gotra || "—"}</TableCell>
//                       <TableCell>{form.participants?.length || 0}</TableCell>
//                       <TableCell>
//                         {form.prasadDelivery
//                           ? `${form.prasadType || "Yes"}`
//                           : "No"}
//                       </TableCell>
//                       <TableCell>{form.city || "—"}</TableCell>
//                       <TableCell>
//                         {new Date(form.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="w-8 h-8 hover:bg-amber-100"
//                             >
//                               <MoreHorizontal className="w-4 h-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem
//                               onClick={() => handleView(form._id)}
//                             >
//                               <Eye className="w-4 h-4 mr-2" /> View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(form._id)}
//                             >
//                               <Edit className="w-4 h-4 mr-2" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(form._id)}
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

// export default ManagePujaForms;
