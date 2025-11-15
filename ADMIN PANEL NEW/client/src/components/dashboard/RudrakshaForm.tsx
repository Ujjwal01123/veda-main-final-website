"use client";

import { Sidebar } from "@/components/layout/productSidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, Plus } from "lucide-react";
import TiptapEditor from "@/components/dashboard/TipTapEditor";

export default function RudrakshaForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    stock: 0,
    productPrice: 0,
    productDiscount: 0,
    productAbout: [""],
    productFeatures: [""],
    productBenefits: [""],
    productFaqs: [""],
    productShipping: [""],
    options: [{ title: "", price: 0 }],
    energization: [{ title: "", price: 0, isHaveForm: false }],
    images: [] as File[],
    shopifyLink: "",
    youtubeLink: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    shortDescription: "",
  });

  /* ------------------ Helpers ------------------ */
  const handleArrayChange = (
    field: any,
    index: number,
    key: string,
    value: any
  ) => {
    const updated = [...(formData[field] as any)];
    updated[index] = { ...updated[index], [key]: value };
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: any, item: object) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any), item],
    }));
  };

  const removeArrayItem = (field: any, index: number) => {
    const updated = [...(formData[field] as any)];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleImageUpload = (e: any) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files)],
      }));
    }
  };

  const removeSelectedImage = (index: number) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  /* ------------------ Submit ------------------ */
  const handleSubmit = async (e: any) => {
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
            "options",
            "energization",
          ].includes(key)
        ) {
          data.append(key, JSON.stringify(value));
        } else if (key === "images") {
          (value as File[]).forEach((file) => data.append("images", file));
        } else {
          data.append(key, value.toString());
        }
      });

      const res = await fetch(`${apiUrl}/api/product/rudraksha`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast({
        title: "Rudraksha Added Successfully",
        description: "Your product is now live.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* LEFT SIDEBAR (fixed on desktop, drawer on mobile) */}
        <div className="hidden md:block w-64 border-r bg-white shadow-sm">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>

        {/* MOBILE SIDEBAR SLIDE-IN */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* 👇 YOUR PAGE CONTENT GOES INSIDE HERE */}
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 md:ml-10">
            <div className="max-w-5xl mx-auto">
              <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-3 text-xl md:text-2xl">
                    <span className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground">
                      <Upload className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                    Add Rudraksha
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ------------------ Basic Info ------------------ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Rudraksha Name *</Label>
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

                      <div className="space-y-2">
                        <Label>Shopify Link</Label>
                        <Input
                          type="url"
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
                        <Label>YouTube Link</Label>
                        <Input
                          type="url"
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

                    <Separator />

                    {/* ------------------ TipTap Rich Sections ------------------ */}
                    {[
                      { key: "productAbout", label: "About" },
                      { key: "productFeatures", label: "Features" },
                      { key: "productBenefits", label: "Benefits" },
                      { key: "productFaqs", label: "FAQs" },
                      { key: "productShipping", label: "Shipping" },
                    ].map(({ key, label }) => (
                      <div key={key} className="space-y-2">
                        <Label>{label}</Label>
                        <TiptapEditor
                          value={(formData[key as any] as string[])[0]}
                          onChange={(html) =>
                            setFormData((prev) => ({ ...prev, [key]: [html] }))
                          }
                        />
                      </div>
                    ))}

                    <Separator />

                    {/* ------------------ Options ------------------ */}
                    <div>
                      <Label>Options</Label>

                      <div className="space-y-4 mt-2">
                        {formData.options.map((opt, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 border rounded-lg"
                          >
                            <Input
                              placeholder="Title"
                              value={opt.title}
                              onChange={(e) =>
                                handleArrayChange(
                                  "options",
                                  i,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Price"
                              value={opt.price}
                              onChange={(e) =>
                                handleArrayChange(
                                  "options",
                                  i,
                                  "price",
                                  Number(e.target.value)
                                )
                              }
                            />

                            <Button
                              onClick={() => removeArrayItem("options", i)}
                              type="button"
                              variant="destructive"
                              className="w-full"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        type="button"
                        className="mt-3"
                        variant="outline"
                        onClick={() =>
                          addArrayItem("options", { title: "", price: 0 })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Option
                      </Button>
                    </div>

                    {/* ------------------ Energization ------------------ */}
                    <div>
                      <Label>Energization</Label>

                      <div className="space-y-4 mt-2">
                        {formData.energization.map((e, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 border rounded-lg"
                          >
                            <Input
                              placeholder="Title"
                              value={e.title}
                              onChange={(ev) =>
                                handleArrayChange(
                                  "energization",
                                  i,
                                  "title",
                                  ev.target.value
                                )
                              }
                            />

                            <Input
                              type="number"
                              placeholder="Price"
                              value={e.price}
                              onChange={(ev) =>
                                handleArrayChange(
                                  "energization",
                                  i,
                                  "price",
                                  Number(ev.target.value)
                                )
                              }
                            />

                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={e.isHaveForm}
                                onChange={(ev) =>
                                  handleArrayChange(
                                    "energization",
                                    i,
                                    "isHaveForm",
                                    ev.target.checked
                                  )
                                }
                              />
                              Form Required
                            </label>

                            <Button
                              onClick={() => removeArrayItem("energization", i)}
                              type="button"
                              variant="destructive"
                              className="w-full"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        type="button"
                        className="mt-3"
                        variant="outline"
                        onClick={() =>
                          addArrayItem("energization", {
                            title: "",
                            price: 0,
                            isHaveForm: false,
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Energization
                      </Button>
                    </div>

                    {/* ------------------ Images ------------------ */}
                    <div>
                      <Label>Upload Images</Label>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />

                      <div className="flex flex-wrap gap-3 mt-3">
                        {formData.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative border rounded-lg p-2 bg-white shadow-sm w-36 break-words"
                          >
                            <button
                              onClick={() => removeSelectedImage(i)}
                              type="button"
                              className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded-full px-2"
                            >
                              ×
                            </button>
                            <p className="text-xs">{img.name}</p>
                          </div>
                        ))}
                      </div>
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
                            placeholder="e.g., 1 Mukhi Rudraksha,etc"
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

                    {/* ------------------ Submit Buttons ------------------ */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-spiritual text-white py-3"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Rudraksha"}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 py-3"
                        onClick={() => navigate("/dashboard")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";

// import { Sidebar } from "@/components/layout/productSidebar";
// import { cn } from "@/lib/utils";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";
// import { Upload, Save, Plus } from "lucide-react";
// import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ Added TipTap

// export default function RudrakshaForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     productName: "",
//     stock: 0,
//     productPrice: 0,
//     productDiscount: 0,
//     productAbout: [""],
//     productFeatures: [""],
//     productBenefits: [""],
//     productFaqs: [""],
//     productShipping: [""],
//     options: [{ title: "", price: 0 }],
//     energization: [{ title: "", price: 0, isHaveForm: false }],
//     images: [] as File[],
//     shopifyLink: "",
//     youtubeLink: "",
//   });

//   // ---------- Dynamic field helpers ----------
//   const handleArrayChange = (
//     field: keyof typeof formData,
//     index: number,
//     key: string,
//     value: string | number | boolean
//   ) => {
//     const updated = [...(formData[field] as any)];
//     updated[index] = { ...updated[index], [key]: value };
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   const addArrayItem = (field: keyof typeof formData, item: object) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...(prev[field] as any), item],
//     }));
//   };

//   const removeArrayItem = (field: keyof typeof formData, index: number) => {
//     const updated = [...(formData[field] as any)];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   // ---------- Image handling ----------
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...Array.from(e.target.files!)],
//       }));
//     }
//   };

//   const removeSelectedImage = (index: number) => {
//     const updated = [...formData.images];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, images: updated }));
//   };

//   // ---------- Submit ----------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (
//           [
//             "productAbout",
//             "productFeatures",
//             "productBenefits",
//             "productFaqs",
//             "productShipping",
//             "options",
//             "energization",
//           ].includes(key)
//         ) {
//           data.append(key, JSON.stringify(value));
//         } else if (key === "images" && value) {
//           (value as File[]).forEach((file) => data.append("images", file));
//         } else {
//           data.append(key, value.toString());
//         }
//       });

//       const res = await fetch(`${apiUrl}/api/product/rudraksha`, {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save Rudraksha");
//       }

//       const savedItem = await res.json();
//       toast({
//         title: "✅ Rudraksha Added Successfully",
//         description: `${savedItem.data.productName} has been added.`,
//       });

//       navigate(`/rudraksha/view/${savedItem.data._id}`);
//     } catch (error: any) {
//       toast({
//         title: "❌ Error",
//         description: error.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <>
//       {/* ✅ Sidebar */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 ml-10">
//         <div className="max-w-5xl mx-auto">
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-6">
//               <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
//                 <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
//                   <Upload className="w-6 h-6" />
//                 </div>
//                 Add Rudraksha
//               </CardTitle>
//               <p className="text-muted-foreground mt-2">
//                 Create a new Rudraksha product with full details and optional
//                 Shopify & YouTube links.
//               </p>
//             </CardHeader>

//             <CardContent className="space-y-8">
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Basic Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label>Rudraksha Name *</Label>
//                     <Input
//                       value={formData.productName}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           productName: e.target.value,
//                         }))
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Stock *</Label>
//                     <Input
//                       type="number"
//                       value={formData.stock}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           stock: Number(e.target.value),
//                         }))
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Price *</Label>
//                     <Input
//                       type="number"
//                       value={formData.productPrice}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           productPrice: Number(e.target.value),
//                         }))
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Discount (%)</Label>
//                     <Input
//                       type="number"
//                       value={formData.productDiscount}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           productDiscount: Number(e.target.value),
//                         }))
//                       }
//                     />
//                   </div>

//                   {/* Links */}
//                   <div className="space-y-2">
//                     <Label>Shopify Link</Label>
//                     <Input
//                       type="url"
//                       placeholder="https://yourshopifylink.com"
//                       value={formData.shopifyLink}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           shopifyLink: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>YouTube Video Link</Label>
//                     <Input
//                       type="url"
//                       placeholder="https://youtube.com/yourvideo"
//                       value={formData.youtubeLink}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           youtubeLink: e.target.value,
//                         }))
//                       }
//                     />
//                   </div>
//                 </div>

//                 <Separator className="bg-orange-200" />

//                 {/* Rich text sections using TipTap */}
//                 {[
//                   { key: "productAbout", label: "About" },
//                   { key: "productFeatures", label: "Features" },
//                   { key: "productBenefits", label: "Benefits" },
//                   { key: "productFaqs", label: "FAQs" },
//                   { key: "productShipping", label: "Shipping" },
//                 ].map(({ key, label }) => (
//                   <div key={key} className="space-y-2">
//                     <Label className="capitalize">{label}</Label>
//                     <TiptapEditor
//                       value={
//                         (
//                           formData[key as keyof typeof formData] as string[]
//                         )[0] || ""
//                       }
//                       onChange={(html) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           [key]: [html],
//                         }))
//                       }
//                       placeholder={`Write ${label.toLowerCase()} details...`}
//                     />
//                   </div>
//                 ))}

//                 <Separator className="bg-orange-200" />

//                 {/* Options */}
//                 <div>
//                   <Label>Options</Label>
//                   {formData.options.map((opt, i) => (
//                     <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                       <Input
//                         placeholder="Title"
//                         value={opt.title}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "options",
//                             i,
//                             "title",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Price"
//                         value={opt.price}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "options",
//                             i,
//                             "price",
//                             Number(e.target.value)
//                           )
//                         }
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => removeArrayItem("options", i)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() =>
//                       addArrayItem("options", { title: "", price: 0 })
//                     }
//                   >
//                     <Plus className="w-4 h-4 mr-2" /> Add Option
//                   </Button>
//                 </div>

//                 {/* Energization */}
//                 <div>
//                   <Label>Energization</Label>
//                   {formData.energization.map((e, i) => (
//                     <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                       <Input
//                         placeholder="Title"
//                         value={e.title}
//                         onChange={(ev) =>
//                           handleArrayChange(
//                             "energization",
//                             i,
//                             "title",
//                             ev.target.value
//                           )
//                         }
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Price"
//                         value={e.price}
//                         onChange={(ev) =>
//                           handleArrayChange(
//                             "energization",
//                             i,
//                             "price",
//                             Number(ev.target.value)
//                           )
//                         }
//                       />
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={e.isHaveForm}
//                           onChange={(ev) =>
//                             handleArrayChange(
//                               "energization",
//                               i,
//                               "isHaveForm",
//                               ev.target.checked
//                             )
//                           }
//                         />
//                         Form Required
//                       </label>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => removeArrayItem("energization", i)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() =>
//                       addArrayItem("energization", {
//                         title: "",
//                         price: 0,
//                         isHaveForm: false,
//                       })
//                     }
//                   >
//                     <Plus className="w-4 h-4 mr-2" /> Add Energization
//                   </Button>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <Label>Upload Images</Label>
//                   <Input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                   <div className="flex gap-2 mt-2 flex-wrap">
//                     {formData.images.map((img, i) => (
//                       <div key={i} className="relative border rounded p-1">
//                         <span
//                           className="absolute -top-2 -right-2 bg-red-500 text-white px-1 rounded-full cursor-pointer"
//                           onClick={() => removeSelectedImage(i)}
//                         >
//                           ×
//                         </span>
//                         <p className="text-sm">{img.name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <div className="flex gap-4">
//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                   >
//                     <Save className="w-4 h-4 mr-2" />{" "}
//                     {loading ? "Saving..." : "Save Rudraksha"}
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => navigate("/dashboard")}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// }
