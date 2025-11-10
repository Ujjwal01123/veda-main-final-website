import { Sidebar } from "@/components/layout/updatedSidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CategoryForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
      };

      const apiUrl = import.meta.env.VITE_BASE_API_URL;
      const res = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "✅ Category Added Successfully",
          description: `${data.name} has been created.`,
        });

        // Navigate to the newly created category view page
        navigate(`/categories/view/${data._id}`);
      } else {
        toast({
          title: "❌ Error",
          description: data.message || "Failed to create category.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* ✅ Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
                <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
                  <Plus className="w-6 h-6" />
                </div>
                Add New Category
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Create a new sacred category with description
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter category name"
                    required
                    className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter category description"
                    rows={4}
                    className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Category"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="border-border text-foreground hover:bg-muted/10 py-4 flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
