"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  Package,
} from "lucide-react";
import { Sidebar } from "@/components/layout/productSidebar";

export function ManageProductOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/orders`);
      const rawOrders = res.data.data?.orders || [];
      setOrders(rawOrders);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Filter Orders
  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "all" ||
      order.status?.toLowerCase() === statusFilter.toLowerCase();
    return searchMatch && statusMatch;
  });

  // ✅ Handlers
  const handleView = (id: string) => navigate(`/orders/view/${id}`);
  const handleEdit = (id: string) => navigate(`/orders/edit/${id}`);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`${apiUrl}/api/orders/${id}`);
      toast({
        title: "Deleted",
        description: "Order deleted successfully",
        variant: "destructive",
      });
      fetchOrders();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  // ✅ Get Status Badge
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { icon: Clock, text: "Pending", color: "bg-yellow-500/20 text-yellow-600" };
      case "processing":
        return { icon: Truck, text: "Processing", color: "bg-blue-500/20 text-blue-600" };
      case "completed":
        return { icon: CheckCircle, text: "Completed", color: "bg-green-500/20 text-green-600" };
      case "cancelled":
        return { icon: XCircle, text: "Cancelled", color: "bg-red-500/20 text-red-600" };
      default:
        return { icon: Clock, text: "Unknown", color: "bg-gray-300 text-gray-700" };
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Package className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Manage Customer Orders
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View, update, and track all customer product orders with ease.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md p-2 text-sm focus:ring-spiritual/30"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      const Icon = badge.icon;

                      return (
                        <TableRow key={order._id}>
                          <TableCell className="font-medium">{order.orderNumber || order._id}</TableCell>
                          <TableCell>{order.user?.fullname || "Guest"}</TableCell>
                          <TableCell>
                            {order.products?.length || 0} item{order.products?.length !== 1 ? "s" : ""}
                          </TableCell>
                          <TableCell>₹{order.totalAmount?.toLocaleString("en-IN")}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${badge.color}`}>
                              <Icon className="w-3 h-3" /> {badge.text}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
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
                                <DropdownMenuItem onClick={() => handleView(order._id)}>
                                  <Eye className="w-4 h-4 mr-2" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(order._id)}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(order._id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
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

export default ManageProductOrders;
