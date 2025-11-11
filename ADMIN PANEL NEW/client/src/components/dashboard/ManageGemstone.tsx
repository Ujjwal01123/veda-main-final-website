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
  Plus,
  Gem,
  Menu,
} from "lucide-react";
import { Sidebar } from "@/components/layout/productSidebar";

export function ManageGemstone() {
  const [gemstones, setGemstones] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch Gemstones
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/gemstone/`)
      .then((res) => setGemstones(res.data.data.gemstones || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load Gemstone products",
          variant: "destructive",
        })
      );
  }, []);

  // ✅ Filter Gemstones
  const filteredGemstones = gemstones.filter((item) => {
    const searchMatch = item.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  // ✅ Actions
  const handleView = (id: string) => navigate(`/gemstone/view/${id}`);
  const handleEdit = (id: string) => navigate(`/gemstone/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to move this gemstone to trash?")
    )
      return;
    try {
      await axios.delete(`${apiUrl}/api/product/gemstone/${id}`);
      setGemstones((prev) => prev.filter((item) => item._id !== id));
      toast({
        title: "💎 Moved",
        description: "Gemstone product moved successfully",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove Gemstone product",
        variant: "destructive",
      });
    }
  };

  const getStockStatus = (item: any) => {
    if (item.stock > 0) {
      return {
        text: `In Stock (${item.stock})`,
        color: "text-green-600 bg-green-500/20",
      };
    }
    return { text: "Out of Stock", color: "text-red-600 bg-red-500/20" };
  };

  // ✅ Layout
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
                <Gem className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Gemstone Inventory Management
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track, manage, and update your divine collection of gemstones.
            </p>
          </div>

          {/* Action Bar */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-spiritual" />
                <Input
                  placeholder="Search gemstone name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-spiritual/20 focus:border-spiritual focus:ring-spiritual/20 bg-background/80"
                />
              </div>
              <Button
                variant="spiritual"
                className="gap-2 shadow-spiritual"
                onClick={() => navigate("/dashboard/add-gemstone")}
              >
                <Plus className="w-4 h-4" /> Add New Gemstone
              </Button>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGemstones.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No gemstone products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGemstones.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 flex-wrap">
                            {item.productImage?.length > 0 ? (
                              item.productImage.map(
                                (img: string, idx: number) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                  />
                                )
                              )
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                No images
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>₹{item.productPrice}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStockStatus(item).color}`}
                          >
                            {getStockStatus(item).text}
                          </span>
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
                              <DropdownMenuItem
                                onClick={() => handleView(item._id)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(item._id)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(item._id)}
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
      </div>
    </div>
  );
}
