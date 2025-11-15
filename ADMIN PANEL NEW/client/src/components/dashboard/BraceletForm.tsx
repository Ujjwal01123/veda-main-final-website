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
import { Upload, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ TipTap import

interface EnergizationItem {
  title: string;
  price: number;
  isHaveForm: boolean;
}

interface SizeItem {
  size: string;
  price: number;
  stock: number;
}

interface CertificateItem {
  type: string;
  price: number;
}

export default function AddBraceletForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    stock: 0,
    productPrice: 0,
    productDiscount: 0,
    energization: [
      { title: "", price: 0, isHaveForm: false } as EnergizationItem,
    ],
    sizes: [{ size: "Small", price: 0, stock: 0 } as SizeItem],
    certificates: [
      { type: "Without Certificate", price: 0 } as CertificateItem,
    ],
    productAbout: [""],
    productFeatures: [""],
    productBenefits: [""],
    productFaqs: [""],
    productShipping: [""],
    images: [] as File[],
    shopifyLink: "",
    youtubeLink: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    shortDescription: "",
  });

  // ---------- Handle Array Change ----------
  const handleArrayChange = (
    field: "energization" | "sizes" | "certificates",
    index: number,
    key: string,
    value: string | number | boolean
  ) => {
    const updated = [...(formData[field] as any)];
    (updated[index] as any)[key] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: any, item: any) => {
    const updated = [...(formData[field] as any), item];
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const removeArrayItem = (field: any, index: number) => {
    const updated = [...(formData[field] as any)];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  // ---------- Handle Image Upload ----------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // ---------- Handle Submit ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("stock", String(formData.stock));
      data.append("productPrice", String(formData.productPrice));
      data.append("productDiscount", String(formData.productDiscount));
      data.append("productAbout", JSON.stringify(formData.productAbout));
      data.append("productFeatures", JSON.stringify(formData.productFeatures));
      data.append("productBenefits", JSON.stringify(formData.productBenefits));
      data.append("productFaqs", JSON.stringify(formData.productFaqs));
      data.append("productShipping", JSON.stringify(formData.productShipping));
      data.append("energization", JSON.stringify(formData.energization));
      data.append("sizes", JSON.stringify(formData.sizes));
      data.append("certificates", JSON.stringify(formData.certificates));
      data.append("shopifyLink", formData.shopifyLink);
      data.append("youtubeLink", formData.youtubeLink);
      data.append("shortDescription", formData.shortDescription);
      data.append("metaTitle", formData.metaTitle);
      data.append("metaDescription", formData.metaDescription);
      data.append("metaKeywords", formData.metaKeywords);

      formData.images.forEach((file) => data.append("image", file));

      const res = await fetch(`${apiUrl}/api/product/bracelet`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save Bracelet");
      }

      const savedItem = await res.json();
      toast({
        title: "✅ Bracelet Added Successfully",
        description: `${savedItem.data.productName} has been added.`,
      });
      navigate(`/bracelet/view/${savedItem.data._id}`);
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
      <div className="flex min-h-screen">
        {/* LEFT SIDEBAR (fixed on desktop, drawer on mobile) */}
        <div className="hidden md:block w-64 border-r bg-white shadow-sm">
          {/* ✅ Sidebar */}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>

        {/* MOBILE SIDEBAR SLIDE-IN */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* 👇 YOUR PAGE CONTENT GOES INSIDE HERE */}

          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 ml-10">
            <div className="max-w-5xl mx-auto">
              <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
                    <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
                      <Upload className="w-6 h-6" />
                    </div>
                    Add Bracelet
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Fill in details to create a new bracelet product.
                  </p>
                </CardHeader>

                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Product Name *</Label>
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

                      {/* Shopify / YouTube Links */}
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

                      {/* Image Upload */}
                      <div className="md:col-span-2 space-y-2">
                        <Label>Upload Images</Label>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <div className="flex flex-wrap gap-3 mt-2">
                          {formData.images.map((img, i) => (
                            <div
                              key={i}
                              className="relative border rounded-md p-2 shadow-sm"
                            >
                              <button
                                type="button"
                                onClick={() => removeSelectedImage(i)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                              <p className="text-sm">{img.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-orange-200" />

                    {/* ✅ Rich Text Sections */}
                    {[
                      { key: "productAbout", label: "About" },
                      { key: "productFeatures", label: "Features" },
                      { key: "productBenefits", label: "Benefits" },
                      { key: "productFaqs", label: "FAQs" },
                      { key: "productShipping", label: "Shipping" },
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
                          placeholder={`Write ${label.toLowerCase()} details...`}
                        />
                      </div>
                    ))}

                    <Separator className="bg-orange-200" />

                    {/* Energization Section */}
                    <div>
                      <Label className="text-lg font-semibold">
                        Energization
                      </Label>
                      {formData.energization.map((item, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 items-center"
                        >
                          <Input
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) =>
                              handleArrayChange(
                                "energization",
                                i,
                                "title",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) =>
                              handleArrayChange(
                                "energization",
                                i,
                                "price",
                                Number(e.target.value)
                              )
                            }
                          />
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Have Form?</Label>
                            <input
                              type="checkbox"
                              checked={item.isHaveForm}
                              onChange={(e) =>
                                handleArrayChange(
                                  "energization",
                                  i,
                                  "isHaveForm",
                                  e.target.checked
                                )
                              }
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeArrayItem("energization", i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        className="mt-3"
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

                    <Separator className="bg-orange-200" />

                    {/* Sizes Section */}
                    <div>
                      <Label className="text-lg font-semibold">Sizes</Label>
                      {formData.sizes.map((size, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 items-center"
                        >
                          <Input
                            placeholder="Size"
                            value={size.size}
                            onChange={(e) =>
                              handleArrayChange(
                                "sizes",
                                i,
                                "size",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={size.price}
                            onChange={(e) =>
                              handleArrayChange(
                                "sizes",
                                i,
                                "price",
                                Number(e.target.value)
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Stock"
                            value={size.stock}
                            onChange={(e) =>
                              handleArrayChange(
                                "sizes",
                                i,
                                "stock",
                                Number(e.target.value)
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeArrayItem("sizes", i)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        className="mt-3"
                        onClick={() =>
                          addArrayItem("sizes", {
                            size: "",
                            price: 0,
                            stock: 0,
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Size
                      </Button>
                    </div>

                    <Separator className="bg-orange-200" />

                    {/* Certificates Section */}
                    <div>
                      <Label className="text-lg font-semibold">
                        Certificates
                      </Label>
                      {formData.certificates.map((cert, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 items-center"
                        >
                          <Input
                            placeholder="Certificate Type"
                            value={cert.type}
                            onChange={(e) =>
                              handleArrayChange(
                                "certificates",
                                i,
                                "type",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            value={cert.price}
                            onChange={(e) =>
                              handleArrayChange(
                                "certificates",
                                i,
                                "price",
                                Number(e.target.value)
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeArrayItem("certificates", i)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        className="mt-3"
                        onClick={() =>
                          addArrayItem("certificates", { type: "", price: 0 })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Certificate
                      </Button>
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

                    <Separator className="bg-orange-200" />

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                      >
                        <Save className="w-4 h-4 mr-2" />{" "}
                        {loading ? "Saving..." : "Save Bracelet"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Upload, Save, Plus } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface EnergizationItem {
//   title: string;
//   price: number;
//   isHaveForm: boolean;
// }

// interface SizeItem {
//   size: string;
//   price: number;
//   stock: number;
// }

// interface CertificateItem {
//   type: string;
//   price: number;
// }

// export default function AddBraceletForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     productName: "",
//     stock: 0,
//     productPrice: 0,
//     productDiscount: 0,
//     energization: [
//       { title: "", price: 0, isHaveForm: false } as EnergizationItem,
//     ],
//     sizes: [{ size: "Small", price: 0, stock: 0 } as SizeItem],
//     certificates: [
//       { type: "Without Certificate", price: 0 } as CertificateItem,
//     ],
//     productAbout: [""],
//     productFeatures: [""],
//     productBenefits: [""],
//     productFaqs: [""],
//     productShipping: [""],
//     images: [] as File[],
//     shopifyLink: "", // <-- added
//     youtubeLink: "", // <-- added
//   });

//   // ---------- Dynamic Arrays ----------
//   const handleArrayChange = (
//     field: "energization" | "sizes" | "certificates",
//     index: number,
//     key: string,
//     value: string | number | boolean
//   ) => {
//     const updated = [...(formData[field] as any)];
//     (updated[index] as any)[key] = value;
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   const addArrayItem = (field: any, item: any) => {
//     const updated = [...(formData[field] as any), item];
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   const removeArrayItem = (field: any, index: number) => {
//     const updated = [...(formData[field] as any)];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   // ---------- Handle Images ----------
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...Array.from(e.target.files)],
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
//       data.append("productName", formData.productName);
//       data.append("stock", String(formData.stock));
//       data.append("productPrice", String(formData.productPrice));
//       data.append("productDiscount", String(formData.productDiscount));
//       data.append("productAbout", JSON.stringify(formData.productAbout));
//       data.append("productFeatures", JSON.stringify(formData.productFeatures));
//       data.append("productBenefits", JSON.stringify(formData.productBenefits));
//       data.append("productFaqs", JSON.stringify(formData.productFaqs));
//       data.append("productShipping", JSON.stringify(formData.productShipping));
//       data.append("energization", JSON.stringify(formData.energization));
//       data.append("sizes", JSON.stringify(formData.sizes));
//       data.append("certificates", JSON.stringify(formData.certificates));
//       data.append("shopifyLink", formData.shopifyLink);
//       data.append("youtubeLink", formData.youtubeLink);

//       formData.images.forEach((file) => data.append("image", file));

//       const res = await fetch(`${apiUrl}/api/product/bracelet`, {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save Bracelet");
//       }

//       const savedItem = await res.json();
//       toast({
//         title: "✅ Bracelet Added Successfully",
//         description: `${savedItem.data.productName} has been added.`,
//       });
//       navigate(`/bracelet/view/${savedItem.data._id}`);
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-6">
//             <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
//               <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
//                 <Upload className="w-6 h-6" />
//               </div>
//               Add Bracelet
//             </CardTitle>
//             <p className="text-muted-foreground mt-2">
//               Create a new Bracelet product
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-8">
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label>Product Name *</Label>
//                   <Input
//                     value={formData.productName}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         productName: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Stock *</Label>
//                   <Input
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         stock: Number(e.target.value),
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Price *</Label>
//                   <Input
//                     type="number"
//                     value={formData.productPrice}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         productPrice: Number(e.target.value),
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Discount (%)</Label>
//                   <Input
//                     type="number"
//                     value={formData.productDiscount}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         productDiscount: Number(e.target.value),
//                       }))
//                     }
//                   />
//                 </div>

//                 {/*  */}
//                 <div className="space-y-2">
//                   <Label>Shopify Link</Label>
//                   <Input
//                     type="url"
//                     placeholder="https://yourshopifylink.com"
//                     value={formData.shopifyLink}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         shopifyLink: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>YouTube Video Link</Label>
//                   <Input
//                     type="url"
//                     placeholder="https://youtube.com/yourvideo"
//                     value={formData.youtubeLink}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         youtubeLink: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>

//                 {/*  */}

//                 <div className="md:col-span-2 space-y-2">
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
//               </div>

//               <Separator className="bg-orange-200" />

//               {/* Energization */}
//               <div>
//                 <Label>Energization</Label>
//                 {formData.energization.map((e, i) => (
//                   <div
//                     key={i}
//                     className="grid grid-cols-3 gap-2 mb-2 items-center"
//                   >
//                     <Input
//                       placeholder="Title"
//                       value={e.title}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "energization",
//                           i,
//                           "title",
//                           ev.target.value
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={e.price}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "energization",
//                           i,
//                           "price",
//                           Number(ev.target.value)
//                         )
//                       }
//                     />
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={e.isHaveForm}
//                         onChange={(ev) =>
//                           handleArrayChange(
//                             "energization",
//                             i,
//                             "isHaveForm",
//                             ev.target.checked
//                           )
//                         }
//                       />
//                       Form Required
//                     </label>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => removeArrayItem("energization", i)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("energization", {
//                       title: "",
//                       price: 0,
//                       isHaveForm: false,
//                     })
//                   }
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Energization
//                 </Button>
//               </div>

//               {/* Sizes */}
//               <div>
//                 <Label>Sizes</Label>
//                 {formData.sizes.map((s, i) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                     <Input
//                       placeholder="Size"
//                       value={s.size}
//                       onChange={(ev) =>
//                         handleArrayChange("sizes", i, "size", ev.target.value)
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={s.price}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "price",
//                           Number(ev.target.value)
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Stock"
//                       value={s.stock}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "stock",
//                           Number(ev.target.value)
//                         )
//                       }
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => removeArrayItem("sizes", i)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("sizes", { size: "", price: 0, stock: 0 })
//                   }
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Size
//                 </Button>
//               </div>

//               {/* Certificates */}
//               <div>
//                 <Label>Certificates</Label>
//                 {formData.certificates.map((c, i) => (
//                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Type"
//                       value={c.type}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "type",
//                           ev.target.value
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={c.price}
//                       onChange={(ev) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "price",
//                           Number(ev.target.value)
//                         )
//                       }
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => removeArrayItem("certificates", i)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("certificates", { type: "", price: 0 })
//                   }
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Certificate
//                 </Button>
//               </div>

//               <Separator className="bg-orange-200" />

//               {/* Product Details (Multiple Inputs) */}
//               {[
//                 "productAbout",
//                 "productFeatures",
//                 "productBenefits",
//                 "productFaqs",
//                 "productShipping",
//               ].map((field) => (
//                 <div key={field} className="space-y-2">
//                   <Label className="capitalize">
//                     {field.replace("product", "")}
//                   </Label>
//                   {(formData[field as keyof typeof formData] as string[]).map(
//                     (item, i) => (
//                       <div key={i} className="flex gap-2 mb-2">
//                         <Input
//                           value={item}
//                           onChange={(e) => {
//                             const arr = [
//                               ...(formData[
//                                 field as keyof typeof formData
//                               ] as string[]),
//                             ];
//                             arr[i] = e.target.value;
//                             setFormData((prev) => ({ ...prev, [field]: arr }));
//                           }}
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => {
//                             const arr = [
//                               ...(formData[
//                                 field as keyof typeof formData
//                               ] as string[]),
//                             ];
//                             arr.splice(i, 1);
//                             setFormData((prev) => ({ ...prev, [field]: arr }));
//                           }}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     )
//                   )}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       const arr = [
//                         ...(formData[
//                           field as keyof typeof formData
//                         ] as string[]),
//                         "",
//                       ];
//                       setFormData((prev) => ({ ...prev, [field]: arr }));
//                     }}
//                   >
//                     <Plus className="w-4 h-4 mr-2" /> Add
//                   </Button>
//                 </div>
//               ))}

//               {/* Submit */}
//               <div className="flex gap-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                 >
//                   <Save className="w-4 h-4 mr-2" />{" "}
//                   {loading ? "Saving..." : "Save Bracelet"}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1"
//                   onClick={() => navigate("/dashboard")}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
