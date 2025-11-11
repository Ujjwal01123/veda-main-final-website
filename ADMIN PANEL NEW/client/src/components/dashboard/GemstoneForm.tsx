"use client";

import { Sidebar } from "@/components/layout/productSidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, Plus } from "lucide-react";
import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ Rich Text Editor

export default function GemstoneForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    gemstoneType: "",
    weight: "",
    certification: "",
    stock: 0,
    productPrice: 0,
    productDiscount: 0,
    productAbout: [""],
    productFeatures: [""],
    productBenefits: [""],
    productFaqs: [""],
    productShipping: [""],
    images: [] as File[],
    shopifyLink: "",
    youtubeLink: "",
  });

  // ---------- Helpers ----------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files!)],
      }));
    }
  };

  const removeSelectedImage = (index: number) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (
          [
            "productAbout",
            "productFeatures",
            "productBenefits",
            "productFaqs",
            "productShipping",
          ].includes(key)
        ) {
          data.append(key, JSON.stringify(value));
        } else if (key === "images") {
          (value as File[]).forEach((file) => data.append("images", file));
        } else {
          data.append(key, value.toString());
        }
      });

      const res = await fetch(`${apiUrl}/api/product/gemstone`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save gemstone");
      }

      const savedItem = await res.json();
      toast({
        title: "💎 Gemstone Added Successfully",
        description: `${savedItem.data.productName} has been added.`,
      });

      navigate(`/gemstone/view/${savedItem.data._id}`);
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

  return (
    <>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 ml-10">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
                <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
                  <Upload className="w-6 h-6" />
                </div>
                Add Gemstone
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Add new gemstone details including weight, certification, and
                pricing.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Gemstone Name *</Label>
                    <Input
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          productName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gemstone Type *</Label>
                    <Input
                      placeholder="e.g. Blue Sapphire, Emerald"
                      value={formData.gemstoneType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gemstoneType: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Weight (in carats) *</Label>
                    <Input
                      type="text"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Certification Details</Label>
                    <Input
                      placeholder="e.g. IGI Certified"
                      value={formData.certification}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          certification: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Stock *</Label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          stock: Number(e.target.value),
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      value={formData.productPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          productPrice: Number(e.target.value),
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Discount (%)</Label>
                    <Input
                      type="number"
                      value={formData.productDiscount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          productDiscount: Number(e.target.value),
                        }))
                      }
                    />
                  </div>

                  {/* Links */}
                  <div className="space-y-2">
                    <Label>Shopify Link</Label>
                    <Input
                      type="url"
                      placeholder="https://yourshopifylink.com"
                      value={formData.shopifyLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shopifyLink: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>YouTube Video Link</Label>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/yourvideo"
                      value={formData.youtubeLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          youtubeLink: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <Separator className="bg-orange-200" />

                {/* TipTap Sections */}
                {[
                  { key: "productAbout", label: "About Gemstone" },
                  { key: "productFeatures", label: "Features" },
                  { key: "productBenefits", label: "Benefits" },
                  { key: "productFaqs", label: "FAQs" },
                  { key: "productShipping", label: "Shipping Details" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">{label}</Label>
                    <TiptapEditor
                      value={
                        (
                          formData[key as keyof typeof formData] as string[]
                        )[0] || ""
                      }
                      onChange={(html) =>
                        setFormData((prev) => ({
                          ...prev,
                          [key]: [html],
                        }))
                      }
                      placeholder={`Write ${label.toLowerCase()}...`}
                    />
                  </div>
                ))}

                <Separator className="bg-orange-200" />

                {/* Image Upload */}
                <div>
                  <Label>Upload Gemstone Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative border rounded p-1">
                        <span
                          className="absolute -top-2 -right-2 bg-red-500 text-white px-1 rounded-full cursor-pointer"
                          onClick={() => removeSelectedImage(i)}
                        >
                          ×
                        </span>
                        <p className="text-sm">{img.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Gemstone"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
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
