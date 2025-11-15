import { Sidebar } from "@/components/layout/updatedSidebar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Save, FileClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TiptapEditor from "@/components/dashboard/TipTapEditor";

export function PujaForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    price: "",
    category: "",
    description: "",
    significance: "",
    process: "",
    benefits: [{ title: "", detail: "" }],
    faqs: [{ question: "", answer: "" }],
    reviews: [{ user: "", rating: 0, comment: "" }],
    image: null as File | null,
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    isDraft: false,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/categories/all`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error: any) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    fetchCategories();
  }, []);

  // Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (["benefits", "faqs", "reviews"].includes(key)) {
          data.append(key, JSON.stringify(value));
        } else if (key === "image" && value) {
          data.append("image", value);
        } else {
          data.append(key, value as string);
        }
      });
      data.append("isDraft", String(isDraft));

      const res = await fetch(`${apiUrl}/api/pujas`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save Puja");
      }

      const savedPuja = await res.json();
      toast({
        title: isDraft ? "📝 Draft Saved" : "✅ Puja Added Successfully",
        description: `${savedPuja.title} has been ${
          isDraft ? "saved as draft." : "added successfully."
        }`,
      });
      navigate(`/pujas/view/${savedPuja._id}`);
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
                <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
                  <Upload className="w-6 h-6" />
                </div>
                Add Sacred Puja
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Create a new spiritual ceremony with divine details.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <form
                onSubmit={(e) => handleSubmit(e, false)}
                className="space-y-8"
              >
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Puja Title */}
                    <div className="space-y-2">
                      <Label>Puja Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, title: e.target.value }))
                        }
                        required
                        placeholder="Enter the sacred name"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label>Puja Price (₹)</Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, price: e.target.value }))
                        }
                        required
                        min="0"
                        placeholder="Enter puja cost"
                      />
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Short Description</Label>
                      <Input
                        value={formData.shortDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            shortDescription: e.target.value,
                          }))
                        }
                        placeholder="Brief overview (1-2 lines)"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(val) =>
                          setFormData((p) => ({ ...p, category: val }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* --- SEO SECTION --- */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                    SEO Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input
                        value={formData.metaTitle}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            metaTitle: e.target.value,
                          }))
                        }
                        placeholder="SEO title for search engines"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Meta Keywords</Label>
                      <Input
                        value={formData.metaKeywords}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            metaKeywords: e.target.value,
                          }))
                        }
                        placeholder="e.g., Ganesh Puja, Prosperity, Vedic rituals"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Meta Description</Label>
                      <Input
                        as="textarea"
                        value={formData.metaDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            metaDescription: e.target.value,
                          }))
                        }
                        placeholder="Short description (150–160 characters) for SEO"
                      />
                    </div>
                  </div>
                </div>

                {/* --- RICH TEXT SECTIONS --- */}
                <div>
                  <Label>Description</Label>
                  <TiptapEditor
                    value={formData.description}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, description: val }))
                    }
                  />
                </div>

                <div>
                  <Label>Significance</Label>
                  <TiptapEditor
                    value={formData.significance}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, significance: val }))
                    }
                  />
                </div>

                <div>
                  <Label>Process</Label>
                  <TiptapEditor
                    value={formData.process}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, process: val }))
                    }
                  />
                </div>

                {/* --- Benefits --- */}
                <div>
                  <Label>Benefits</Label>
                  <TiptapEditor
                    value={formData.benefits?.[0]?.detail || ""}
                    onChange={(val) =>
                      setFormData((p) => ({
                        ...p,
                        benefits: [{ detail: val }],
                      }))
                    }
                  />
                </div>

                {/* --- FAQs --- */}
                <div>
                  <Label>FAQs</Label>
                  <TiptapEditor
                    value={formData.faqs?.[0]?.answer || ""}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, faqs: [{ answer: val }] }))
                    }
                  />
                </div>

                {/* --- Image --- */}
                <div>
                  <Label>Puja Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {formData.image && (
                    <p className="text-sm mt-1 text-spiritual font-medium">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>

                {/* --- Buttons --- */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Publish Puja"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => handleSubmit(e as any, true)}
                    className="flex-1 border-dashed py-4 text-muted-foreground hover:bg-muted/10"
                  >
                    <FileClock className="w-4 h-4 mr-2" /> Save as Draft
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
