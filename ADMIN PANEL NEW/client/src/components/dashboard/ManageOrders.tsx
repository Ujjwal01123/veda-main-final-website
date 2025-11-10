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
  ListOrdered,
  Menu,
} from "lucide-react";

export function ManageOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/orders`)
      .then((res) => {
        const ordersData = res.data.data.orders || [];
        const mappedOrders = ordersData.map((o: any) => ({
          ...o,
          customerName: o.userId?.fullname || "N/A",
          totalAmount: o.transactionId?.amount || 0,
          orderId: o._id.slice(18).toUpperCase(),
          status: o.status || "pending",
        }));
        setOrders(mappedOrders);
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load orders.",
          variant: "destructive",
        })
      );
  }, [apiUrl, toast]);

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    const searchMatch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleView = (id: string) => navigate(`/dashboard/orders/view/${id}`);
  const handleEdit = (id: string) => navigate(`/dashboard/orders/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${apiUrl}/api/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast({
        title: "📦 Order Removed",
        description: "The customer order has been removed successfully.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove order.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-500/20";
      case "shipped":
        return "text-blue-600 bg-blue-500/20";
      case "pending":
        return "text-yellow-600 bg-yellow-500/20";
      case "cancelled":
        return "text-red-600 bg-red-500/20";
      default:
        return "text-gray-600 bg-gray-500/20";
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-hero">
      {/* Sidebar */}{" "}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeSection="orders"
        className="fixed z-40 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0"
      />
      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 transition-all duration-300 lg:ml-64 space-y-8 overflow-y-auto">
        {/* Mobile Sidebar Toggle */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold">Manage Orders</h2>
        </div>

        <div className="max-w-full lg:max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <ListOrdered className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Order Fulfillment Management
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Oversee and track all customer product orders with efficiency and
              care.
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
            <CardHeader className="pb-4 flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Filter Orders</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
                <Input
                  placeholder="Search Order ID or Customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 border-spiritual/20 hover:border-spiritual w-full sm:w-auto justify-between"
                  >
                    <Filter className="w-4 h-4" />
                    Status:{" "}
                    {statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gradient-card border-border/50"
                >
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
                    Shipped
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("delivered")}
                  >
                    Delivered
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("cancelled")}
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-x-auto">
            <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <ListOrdered className="w-5 h-5 text-spiritual-foreground" />
                <CardTitle className="text-foreground">
                  Order Transaction Log
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No orders found matching the criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow
                        key={order._id}
                        className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
                      >
                        <TableCell className="font-medium py-4">
                          #{order.orderId}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {order.customerName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
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
                                onClick={() => handleView(order._id)}
                                className="gap-2 hover:bg-spiritual/10"
                              >
                                <Eye className="w-4 h-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(order._id)}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" /> Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(order._id)}
                                className="gap-2 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" /> Delete Order
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
          <div className="text-center py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
              <ListOrdered className="w-4 h-4" />
              <span className="text-sm">
                Efficiently manage your spiritual product fulfillment
              </span>
              <ListOrdered className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageOrders;

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Adjust path as needed
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
//   ListOrdered,
// } from "lucide-react";

// export function ManageOrders() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Sidebar toggle state

//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Format currency
//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);

//   // Fetch orders
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/orders`)
//       .then((res) => {
//         const ordersData = res.data.data.orders || [];
//         const mappedOrders = ordersData.map((o: any) => ({
//           ...o,
//           customerName: o.userId?.fullname || "N/A",
//           totalAmount: o.transactionId?.amount || 0,
//           orderId: o._id.slice(18).toUpperCase(),
//           status: o.status || "pending",
//         }));
//         setOrders(mappedOrders);
//       })
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load orders.",
//           variant: "destructive",
//         })
//       );
//   }, [apiUrl, toast]);

//   // Filtered list
//   const filteredOrders = orders.filter((order) => {
//     const statusMatch =
//       statusFilter === "all" ||
//       order.status.toLowerCase() === statusFilter.toLowerCase();
//     const searchMatch =
//       order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return statusMatch && searchMatch;
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/dashboard/orders/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/dashboard/orders/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     try {
//       await axios.delete(`${apiUrl}/api/orders/${id}`);
//       setOrders((prev) => prev.filter((order) => order._id !== id));
//       toast({
//         title: "📦 Order Removed",
//         description: "The customer order has been removed successfully.",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to remove order.",
//         variant: "destructive",
//       });
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "delivered":
//         return "text-green-600 bg-green-500/20";
//       case "shipped":
//         return "text-blue-600 bg-blue-500/20";
//       case "pending":
//         return "text-yellow-600 bg-yellow-500/20";
//       case "cancelled":
//         return "text-red-600 bg-red-500/20";
//       default:
//         return "text-gray-600 bg-gray-500/20";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-hero">
//       {/* Sidebar */}
//       <Sidebar
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//         activeSection="orders"
//       />

//       {/* Main Content */}
//       <div className="flex-1 p-6 transition-all duration-300 ease-in-out overflow-y-auto lg:ml-64">
//         <div className="max-w-7xl mx-auto space-y-8">
//           {/* Header */}
//           <div className="text-center space-y-4 py-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <ListOrdered className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Order Fulfillment Management
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Oversee and track all customer product orders with efficiency and
//               care.
//             </p>
//           </div>

//           {/* Filters */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//             <CardHeader className="pb-4 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-primary" />
//               <CardTitle className="text-foreground">Filter Orders</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//                 <Input
//                   placeholder="Search Order ID or Customer..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//                 />
//               </div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="gap-2 border-spiritual/20 hover:border-spiritual"
//                   >
//                     <Filter className="w-4 h-4" />
//                     Status:{" "}
//                     {statusFilter.charAt(0).toUpperCase() +
//                       statusFilter.slice(1)}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className="bg-gradient-card border-border/50"
//                 >
//                   <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                     All Orders
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
//                     Pending
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
//                     Shipped
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setStatusFilter("delivered")}
//                   >
//                     Delivered
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setStatusFilter("cancelled")}
//                   >
//                     Cancelled
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </CardContent>
//           </Card>

//           {/* Orders Table */}
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//               <div className="flex items-center gap-3">
//                 <ListOrdered className="w-5 h-5 text-spiritual-foreground" />
//                 <CardTitle className="text-foreground">
//                   Order Transaction Log
//                 </CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0 overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                     <TableHead className="font-semibold text-foreground">
//                       Order ID
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Customer Name
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Date
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Total Amount
//                     </TableHead>
//                     <TableHead className="font-semibold text-foreground">
//                       Status
//                     </TableHead>
//                     <TableHead className="text-right font-semibold text-foreground">
//                       Actions
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredOrders.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={6}
//                         className="text-center py-12 text-muted-foreground"
//                       >
//                         No orders found matching the criteria.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredOrders.map((order) => (
//                       <TableRow
//                         key={order._id}
//                         className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                       >
//                         <TableCell className="font-medium text-foreground py-4">
//                           #{order.orderId}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {order.customerName}
//                         </TableCell>
//                         <TableCell className="text-muted-foreground">
//                           {new Date(order.createdAt).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell className="font-semibold text-foreground">
//                           {formatCurrency(order.totalAmount)}
//                         </TableCell>
//                         <TableCell>
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                               order.status
//                             )}`}
//                           >
//                             {order.status}
//                           </span>
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
//                                 onClick={() => handleView(order._id)}
//                                 className="gap-2 hover:bg-spiritual/10"
//                               >
//                                 <Eye className="w-4 h-4" /> View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(order._id)}
//                                 className="gap-2 hover:bg-primary/10"
//                               >
//                                 <Edit className="w-4 h-4" /> Update Status
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(order._id)}
//                                 className="gap-2 text-destructive hover:bg-destructive/10"
//                               >
//                                 <Trash2 className="w-4 h-4" /> Delete Order
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
//               <ListOrdered className="w-4 h-4" />
//               <span className="text-sm">
//                 Efficiently manage your spiritual product fulfillment
//               </span>
//               <ListOrdered className="w-4 h-4" />
//             </div>
//           </div>
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
//   ListOrdered,
// } from "lucide-react";

// export function ManageOrders() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // Format currency
//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);

//   // Fetch orders
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/orders`)
//       .then((res) => {
//         const ordersData = res.data.data.orders || [];
//         const mappedOrders = ordersData.map((o: any) => ({
//           ...o,
//           customerName: o.userId?.fullname || "N/A",
//           totalAmount: o.transactionId?.amount || 0,
//           orderId: o._id.slice(18).toUpperCase(),
//           status: o.status || "pending",
//         }));
//         setOrders(mappedOrders);
//       })
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load orders.",
//           variant: "destructive",
//         })
//       );
//   }, [apiUrl, toast]);

//   // Filtered list
//   const filteredOrders = orders.filter((order) => {
//     const statusMatch =
//       statusFilter === "all" ||
//       order.status.toLowerCase() === statusFilter.toLowerCase();
//     const searchMatch =
//       order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
//     return statusMatch && searchMatch;
//   });

//   // Actions
//   const handleView = (id: string) => navigate(`/dashboard/orders/view/${id}`);
//   const handleEdit = (id: string) => navigate(`/dashboard/orders/edit/${id}`);
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     try {
//       await axios.delete(`${apiUrl}/api/orders/${id}`);
//       setOrders((prev) => prev.filter((order) => order._id !== id));
//       toast({
//         title: "📦 Order Removed",
//         description: "The customer order has been removed successfully.",
//         variant: "destructive",
//       });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to remove order.",
//         variant: "destructive",
//       });
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "delivered":
//         return "text-green-600 bg-green-500/20";
//       case "shipped":
//         return "text-blue-600 bg-blue-500/20";
//       case "pending":
//         return "text-yellow-600 bg-yellow-500/20";
//       case "cancelled":
//         return "text-red-600 bg-red-500/20";
//       default:
//         return "text-gray-600 bg-gray-500/20";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5 p-6 space-y-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-4 py-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <ListOrdered className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Order Fulfillment Management
//             </h1>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Oversee and track all customer product orders with efficiency and
//             care.
//           </p>
//         </div>

//         {/* Action Bar */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//           <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-spiritual flex items-center justify-center">
//                 <Search className="w-5 h-5 text-spiritual-foreground" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-foreground">
//                   Order Search Console
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   Search by Order ID or Customer Name
//                 </p>
//               </div>
//             </div>
//             {/* <Button
//               variant="spiritual"
//               className="gap-2 shadow-spiritual"
//               onClick={() => navigate("/dashboard/add-order")}
//             >
//               <Plus className="w-4 h-4" /> Add Manual Order
//             </Button> */}
//           </CardContent>
//         </Card>

//         {/* Filters */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
//           <CardHeader className="pb-4 flex items-center gap-2">
//             <Filter className="w-5 h-5 text-primary" />
//             <CardTitle className="text-foreground">Filter Orders</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
//               <Input
//                 placeholder="Search Order ID or Customer..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="gap-2 border-spiritual/20 hover:border-spiritual"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Status:{" "}
//                   {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="bg-gradient-card border-border/50"
//               >
//                 <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                   All Orders
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
//                   Pending
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
//                   Shipped
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
//                   Delivered
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
//                   Cancelled
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </CardContent>
//         </Card>

//         {/* Orders Table */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-spiritual/5 to-primary/5 border-b border-border/50">
//             <div className="flex items-center gap-3">
//               <ListOrdered className="w-5 h-5 text-spiritual-foreground" />
//               <CardTitle className="text-foreground">
//                 Order Transaction Log
//               </CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gradient-to-r from-spiritual/5 to-accent/5 border-b border-border/30">
//                   <TableHead className="font-semibold text-foreground">
//                     Order ID
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Customer Name
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Date
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Total Amount
//                   </TableHead>
//                   <TableHead className="font-semibold text-foreground">
//                     Status
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
//                       colSpan={6}
//                       className="text-center py-12 text-muted-foreground"
//                     >
//                       No orders found matching the criteria.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredOrders.map((order) => (
//                     <TableRow
//                       key={order._id}
//                       className="hover:bg-gradient-to-r hover:from-spiritual/5 hover:to-primary/5 transition-all duration-300 border-b border-border/20"
//                     >
//                       <TableCell className="font-medium text-foreground py-4">
//                         #{order.orderId}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {order.customerName}
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="font-semibold text-foreground">
//                         {formatCurrency(order.totalAmount)}
//                       </TableCell>
//                       <TableCell>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                             order.status
//                           )}`}
//                         >
//                           {order.status}
//                         </span>
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
//                               onClick={() => handleView(order._id)}
//                               className="gap-2 hover:bg-spiritual/10"
//                             >
//                               <Eye className="w-4 h-4" /> View Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleEdit(order._id)}
//                               className="gap-2 hover:bg-primary/10"
//                             >
//                               <Edit className="w-4 h-4" /> Update Status
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => handleDelete(order._id)}
//                               className="gap-2 text-destructive hover:bg-destructive/10"
//                             >
//                               <Trash2 className="w-4 h-4" /> Delete Order
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
//             <ListOrdered className="w-4 h-4" />
//             <span className="text-sm">
//               Efficiently manage your spiritual product fulfillment
//             </span>
//             <ListOrdered className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
