"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Upload, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import TiptapEditor from "@/components/dashboard/TipTapEditor";
import { Sidebar } from "@/components/layout/productSidebar";

interface RudrakshaData {
  _id: string;
  productName: string;
  stock: number;
  productPrice: number;
  productDiscount: number;
  productImage: string[];
  productAbout: string[];
  productFeatures: string[];
  productBenefits: string[];
  productFaqs: string[];
  productShipping: string[];
  options: { _id: string; title: string; price: number }[];
  energization: {
    _id: string;
    title: string;
    price: number;
    isHaveForm: boolean;
  }[];
}

export default function EditRudraksha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [rudraksha, setRudraksha] = useState<RudrakshaData | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
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
    existingImages: [] as string[],
    removedImages: [] as string[],
    newImages: [] as File[],
    shopifyLink: "",
    youtubeLink: "",
  });

  
//   const normalizeHtml = (value: any): string => {
//   if (!value) return "";

//   let html = value;

//   // Case 1: If it’s an array (most common in your API)
//   if (Array.isArray(html)) {
//     html = html[0]; // take first element
//   }

//   // Case 2: Try to parse JSON safely (handles nested "[\"<p>...</p>\"]")
//   if (typeof html === "string") {
//     try {
//       const parsed = JSON.parse(html);

//       // parsed could again be array or string
//       if (Array.isArray(parsed)) {
//         html = parsed[0] || "";
//       } else if (typeof parsed === "string") {
//         html = parsed;
//       }
//     } catch {
//       // If not JSON, clean outer brackets manually if present
//       html = html.replace(/^\[|\]$/g, "").trim();
//     }
//   }

//   return html;
// };
const normalizeHtml = (value: any): string => {
  if (!value) return "";

  let html = value;

  // 🧩 1️⃣ If array → take the first element
  if (Array.isArray(html)) html = html[0];

  // 🧩 2️⃣ If object → convert to string
  if (typeof html === "object") html = JSON.stringify(html);

  // 🧩 3️⃣ Decode escaped HTML entities (e.g., \u003C → <)
  if (typeof html === "string") {
    html = html
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/\\u0026/g, "&")
      .replace(/\\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }

  html = html.trim();

  // 🧩 4️⃣ Try to parse JSON-like strings
  // Examples: "[\"<p>hello</p>\"]", "\"<p>hello</p>\""
  if (/^\s*(\[|\{)?".*"\}?/.test(html)) {
    try {
      const parsed = JSON.parse(html);
      if (Array.isArray(parsed)) {
        html = parsed[0] || "";
      } else if (typeof parsed === "string") {
        html = parsed;
      } else if (parsed && typeof parsed === "object") {
        html = Object.values(parsed)[0] as string;
      }
    } catch {
      // fallback: continue cleanup
    }
  }

  // 🧩 5️⃣ Remove wrapping quotes, brackets, or stray commas
  html = html
    .trim()
    .replace(/^"+|"+$/g, "") // remove leading/trailing double quotes
    .replace(/^'+|'+$/g, "") // remove single quotes
    .replace(/^`+|`+$/g, "") // remove backticks
    .replace(/^\[|\]$/g, "") // remove square brackets
    .replace(/^,|,$/g, "") // remove commas
    .trim();

  // 🧩 6️⃣ If the result is still something like "content" or ""content"",
  // strip those inner quotes too.
  if (/^"+.*"+$/.test(html)) {
    html = html.replace(/^"+|"+$/g, "").trim();
  }
  if (/^'+.*'+$/.test(html)) {
    html = html.replace(/^'+|'+$/g, "").trim();
  }

  // 🧩 7️⃣ Remove the literal word "content" if accidentally saved as just that
  if (html.toLowerCase().trim() === "content") html = "";

  return html.trim();
};



  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/rudraksha/${id}`)
      .then((res) => {
        const data = res.data.data.rudraksha;
        setRudraksha(data);
        setFormData({
          productName: data.productName || "",
          stock: data.stock || 0,
          productPrice: data.productPrice || 0,
          productDiscount: data.productDiscount || 0,
          productAbout: [normalizeHtml(data.productAbout)],
          productFeatures: [normalizeHtml(data.productFeatures)],
          productBenefits: [normalizeHtml(data.productBenefits)],
          productFaqs: [normalizeHtml(data.productFaqs)],
          productShipping: [normalizeHtml(data.productShipping)],
          options: data.options?.length
            ? data.options
            : [{ title: "", price: 0 }],
          energization:
            data.energization?.length > 0
              ? data.energization
              : [{ title: "", price: 0, isHaveForm: false }],
          existingImages: data.productImage || [],
          removedImages: [],
          newImages: [],
          shopifyLink: data.shopifyLink || "",
          youtubeLink: data.youtubeLink || "",
        });
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to fetch Rudraksha data",
          variant: "destructive",
        })
      );
  }, [id]);

  const handleArrayChange = (
    field: string,
    i: number,
    key: string,
    val: any
  ) => {
    const updated = [...formData[field]];
    updated[i] = { ...updated[i], [key]: val };
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayItem = (field: string, item: any) =>
    setFormData({ ...formData, [field]: [...formData[field], item] });
  const removeArrayItem = (field: string, i: number) => {
    const updated = [...formData[field]];
    updated.splice(i, 1);
    setFormData({ ...formData, [field]: updated });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setFormData({
        ...formData,
        newImages: [...formData.newImages, ...Array.from(e.target.files)],
      });
  };
  const removeNewImage = (i: number) => {
    const updated = [...formData.newImages];
    updated.splice(i, 1);
    setFormData({ ...formData, newImages: updated });
  };
  const removeExistingImage = (img: string) => {
    setFormData({
      ...formData,
      existingImages: formData.existingImages.filter((i: string) => i !== img),
      removedImages: [...formData.removedImages, img],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("stock", formData.stock.toString());
      data.append("productPrice", formData.productPrice.toString());
      data.append("productDiscount", formData.productDiscount.toString());
      [
        "productAbout",
        "productFeatures",
        "productBenefits",
        "productFaqs",
        "productShipping",
        "options",
        "energization",
      ].forEach((field) => data.append(field, JSON.stringify(formData[field])));
      data.append("existingImages", JSON.stringify(formData.existingImages));
      data.append("removedImages", JSON.stringify(formData.removedImages));
      data.append("shopifyLink", formData.shopifyLink);
      data.append("youtubeLink", formData.youtubeLink);
      formData.newImages.forEach((file: File) => data.append("images", file));
      const res = await fetch(`${apiUrl}/api/product/rudraksha/${id}`, {
        method: "PUT",
        body: data,
      });
      if (!res.ok) throw new Error("Failed to update Rudraksha");
      const result = await res.json();
      toast({
        title: "✅ Rudraksha Updated",
        description: `${result.data.productName} updated successfully`,
      });
      navigate(`/rudraksha/view/${id}`);
    } catch (err: any) {
      toast({
        title: "❌ Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!rudraksha) return <p className="p-8 text-white">Loading Rudraksha...</p>;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-orange-50 to-background/60">
      {/* Sidebar */}{" "}
      <div className="w-64 fixed left-0 top-0 h-full border-r border-border/30 bg-white/90 backdrop-blur-md shadow-md z-50">
        {" "}
        <Sidebar />{" "}
      </div>
      {/* Scrollable Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/90 border border-border/30 shadow-md backdrop-blur-sm">
            <CardHeader className="pb-6 flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-orange-600">
                <Upload className="w-6 h-6" /> Edit Rudraksha
              </CardTitle>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Stock *</Label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      value={formData.productPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productPrice: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Discount</Label>
                    <Input
                      type="number"
                      value={formData.productDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDiscount: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                {/* Shopify & YouTube Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Shopify Link</Label>
                    <Input
                      value={formData.shopifyLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shopifyLink: e.target.value,
                        })
                      }
                      placeholder="https://shopify.com/product-link"
                    />
                  </div>
                  <div>
                    <Label>YouTube Link</Label>
                    <Input
                      value={formData.youtubeLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          youtubeLink: e.target.value,
                        })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                {/* Images */}
                <div>
                  <Label>Existing Images</Label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {formData.existingImages.map((img: string) => (
                      <div key={img} className="relative group">
                        <button
                          type="button"
                          onClick={() => removeExistingImage(img)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                        <img
                          src={img}
                          alt="existing"
                          className="w-24 h-24 object-cover rounded-md shadow-sm hover:opacity-75 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Upload New Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.newImages.map((file: File, i: number) => (
                      <div
                        key={i}
                        className="relative text-sm bg-muted/20 p-2 rounded-md"
                      >
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rich Text Sections (TipTap) */}
                {[
                  { label: "About", field: "productAbout" },
                  { label: "Features", field: "productFeatures" },
                  { label: "Benefits", field: "productBenefits" },
                  { label: "FAQs", field: "productFaqs" },
                  { label: "Shipping", field: "productShipping" },
                ].map(({ label, field }) => (
                  <div key={field} className="space-y-2">
                    <Label>{label}</Label>
                    <TiptapEditor
                      value={(formData[field] as string[])[0] || ""}
                      onChange={(html) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [field]: [html],
                        }))
                      }
                      placeholder={`Write ${label.toLowerCase()} details...`}
                    />
                  </div>
                ))}

                {/* Options */}
                <div>
                  <Label>Options</Label>
                  {formData.options.map((o: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="Title"
                        value={o.title}
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
                        value={o.price}
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
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem("options", i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("options", { title: "", price: 0 })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Option
                  </Button>
                </div>

                {/* Energization */}
                <div>
                  <Label>Energization</Label>
                  {formData.energization.map((e: any, i: number) => (
                    <div key={i} className="grid grid-cols-3 gap-2 mb-2">
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
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem("energization", i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
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

                {/* Submit */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Update Rudraksha"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/rudraksha/view/${id}`)}
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
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Plus, Save, Upload } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";
// import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ Added TipTap

// interface RudrakshaData {
//   _id: string;
//   productName: string;
//   stock: number;
//   productPrice: number;
//   productDiscount: number;
//   productImage: string[];
//   productAbout: string[];
//   productFeatures: string[];
//   productBenefits: string[];
//   productFaqs: string[];
//   productShipping: string[];
//   options: { _id: string; title: string; price: number }[];
//   energization: {
//     _id: string;
//     title: string;
//     price: number;
//     isHaveForm: boolean;
//   }[];
// }

// export default function EditRudraksha() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [rudraksha, setRudraksha] = useState<RudrakshaData | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<any>({
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
//     existingImages: [] as string[],
//     removedImages: [] as string[],
//     newImages: [] as File[],
//     shopifyLink: "",
//     youtubeLink: "",
//   });

//   // 🧠 Helper function — ensures HTML fields are always clean strings (no arrays or brackets)
//   const normalizeHtml = (value: any): string => {
//     if (!value) return "";
//     if (Array.isArray(value)) return value[0] || "";
//     if (typeof value === "string") {
//       try {
//         const parsed = JSON.parse(value);
//         if (Array.isArray(parsed)) return parsed[0] || "";
//         return parsed;
//       } catch {
//         return value;
//       }
//     }
//     return "";
//   };

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/rudraksha/${id}`)
//       .then((res) => {
//         const data = res.data.data.rudraksha;

//         setRudraksha(data);

//         setFormData({
//           productName: data.productName || "",
//           stock: data.stock || 0,
//           productPrice: data.productPrice || 0,
//           productDiscount: data.productDiscount || 0,

//           // ✅ Clean HTML for editor fields
//           productAbout: [normalizeHtml(data.productAbout)],
//           productFeatures: [normalizeHtml(data.productFeatures)],
//           productBenefits: [normalizeHtml(data.productBenefits)],
//           productFaqs: [normalizeHtml(data.productFaqs)],
//           productShipping: [normalizeHtml(data.productShipping)],

//           options: data.options?.length
//             ? data.options
//             : [{ title: "", price: 0 }],

//           energization:
//             data.energization?.length > 0
//               ? data.energization
//               : [{ title: "", price: 0, isHaveForm: false }],

//           existingImages: data.productImage || [],
//           removedImages: [],
//           newImages: [],
//           shopifyLink: data.shopifyLink || "",
//           youtubeLink: data.youtubeLink || "",
//         });
//       })
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to fetch Rudraksha data",
//           variant: "destructive",
//         })
//       );
//   }, [id]);

//   // ----- Helpers -----
//   const handleArrayChange = (
//     field: string,
//     i: number,
//     key: string,
//     val: any
//   ) => {
//     const updated = [...formData[field]];
//     updated[i] = { ...updated[i], [key]: val };
//     setFormData({ ...formData, [field]: updated });
//   };

//   const addArrayItem = (field: string, item: any) =>
//     setFormData({ ...formData, [field]: [...formData[field], item] });

//   const removeArrayItem = (field: string, i: number) => {
//     const updated = [...formData[field]];
//     updated.splice(i, 1);
//     setFormData({ ...formData, [field]: updated });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({
//         ...formData,
//         newImages: [...formData.newImages, ...Array.from(e.target.files)],
//       });
//     }
//   };

//   const removeNewImage = (i: number) => {
//     const updated = [...formData.newImages];
//     updated.splice(i, 1);
//     setFormData({ ...formData, newImages: updated });
//   };

//   const removeExistingImage = (img: string) => {
//     setFormData({
//       ...formData,
//       existingImages: formData.existingImages.filter((i: string) => i !== img),
//       removedImages: [...formData.removedImages, img],
//     });
//   };

//   // ----- Submit -----
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = new FormData();

//       data.append("productName", formData.productName);
//       data.append("stock", formData.stock.toString());
//       data.append("productPrice", formData.productPrice.toString());
//       data.append("productDiscount", formData.productDiscount.toString());

//       [
//         "productAbout",
//         "productFeatures",
//         "productBenefits",
//         "productFaqs",
//         "productShipping",
//         "options",
//         "energization",
//       ].forEach((field) => data.append(field, JSON.stringify(formData[field])));

//       data.append("existingImages", JSON.stringify(formData.existingImages));
//       data.append("removedImages", JSON.stringify(formData.removedImages));
//       data.append("shopifyLink", formData.shopifyLink);
//       data.append("youtubeLink", formData.youtubeLink);

//       formData.newImages.forEach((file: File) => data.append("images", file));

//       const res = await fetch(`${apiUrl}/api/product/rudraksha/${id}`, {
//         method: "PUT",
//         body: data,
//       });

//       if (!res.ok) throw new Error("Failed to update Rudraksha");

//       const result = await res.json();
//       toast({
//         title: "✅ Rudraksha Updated",
//         description: `${result.data.productName} updated successfully`,
//       });

//       navigate(`/rudraksha/view/${id}`);
//     } catch (err: any) {
//       toast({
//         title: "❌ Error",
//         description: err.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!rudraksha) return <p className="p-8 text-white">Loading Rudraksha...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-6">
//             <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-foreground">
//               <Upload className="w-6 h-6" /> Edit Rudraksha
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
// {/* Basic Info */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   <div>
//     <Label>Name *</Label>
//     <Input
//       value={formData.productName}
//       onChange={(e) =>
//         setFormData({ ...formData, productName: e.target.value })
//       }
//       required
//     />
//   </div>
//   <div>
//     <Label>Stock *</Label>
//     <Input
//       type="number"
//       value={formData.stock}
//       onChange={(e) =>
//         setFormData({
//           ...formData,
//           stock: Number(e.target.value),
//         })
//       }
//       required
//     />
//   </div>
//   <div>
//     <Label>Price *</Label>
//     <Input
//       type="number"
//       value={formData.productPrice}
//       onChange={(e) =>
//         setFormData({
//           ...formData,
//           productPrice: Number(e.target.value),
//         })
//       }
//       required
//     />
//   </div>
//   <div>
//     <Label>Discount</Label>
//     <Input
//       type="number"
//       value={formData.productDiscount}
//       onChange={(e) =>
//         setFormData({
//           ...formData,
//           productDiscount: Number(e.target.value),
//         })
//       }
//     />
//   </div>
// </div>

// {/* Shopify & YouTube Links */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   <div>
//     <Label>Shopify Link</Label>
//     <Input
//       value={formData.shopifyLink}
//       onChange={(e) =>
//         setFormData({ ...formData, shopifyLink: e.target.value })
//       }
//       placeholder="https://shopify.com/product-link"
//     />
//   </div>
//   <div>
//     <Label>YouTube Link</Label>
//     <Input
//       value={formData.youtubeLink}
//       onChange={(e) =>
//         setFormData({ ...formData, youtubeLink: e.target.value })
//       }
//       placeholder="https://youtube.com/watch?v=..."
//     />
//   </div>
// </div>

// {/* Images */}
// <div>
//   <Label>Existing Images</Label>
//   <div className="flex gap-2 flex-wrap mt-2">
//     {formData.existingImages.map((img: string) => (
//       <div key={img} className="relative group">
//         <button
//           type="button"
//           onClick={() => removeExistingImage(img)}
//           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//         >
//           ×
//         </button>
//         <img
//           src={img}
//           alt="existing"
//           className="w-24 h-24 object-cover rounded-md shadow-sm hover:opacity-75 transition"
//         />
//       </div>
//     ))}
//   </div>
// </div>

// <div>
//   <Label>Upload New Images</Label>
//   <Input
//     type="file"
//     multiple
//     accept="image/*"
//     onChange={handleImageUpload}
//   />
//   <div className="flex flex-wrap gap-2 mt-2">
//     {formData.newImages.map((file: File, i: number) => (
//       <div
//         key={i}
//         className="relative text-sm bg-muted/20 p-2 rounded-md"
//       >
//         <button
//           type="button"
//           onClick={() => removeNewImage(i)}
//           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
//         >
//           ×
//         </button>
//         {file.name}
//       </div>
//     ))}
//   </div>
// </div>

// {/* Rich Text Sections (TipTap) */}
// {[
//   { label: "About", field: "productAbout" },
//   { label: "Features", field: "productFeatures" },
//   { label: "Benefits", field: "productBenefits" },
//   { label: "FAQs", field: "productFaqs" },
//   { label: "Shipping", field: "productShipping" },
// ].map(({ label, field }) => (
//   <div key={field} className="space-y-2">
//     <Label>{label}</Label>
//     <TiptapEditor
//       value={(formData[field] as string[])[0] || ""}
//       onChange={(html) =>
//         setFormData((prev: any) => ({
//           ...prev,
//           [field]: [html],
//         }))
//       }
//       placeholder={`Write ${label.toLowerCase()} details...`}
//     />
//   </div>
// ))}

// {/* Options */}
// <div>
//   <Label>Options</Label>
//   {formData.options.map((o: any, i: number) => (
//     <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//       <Input
//         placeholder="Title"
//         value={o.title}
//         onChange={(e) =>
//           handleArrayChange("options", i, "title", e.target.value)
//         }
//       />
//       <Input
//         type="number"
//         placeholder="Price"
//         value={o.price}
//         onChange={(e) =>
//           handleArrayChange(
//             "options",
//             i,
//             "price",
//             Number(e.target.value)
//           )
//         }
//       />
//       <Button
//         type="button"
//         variant="outline"
//         onClick={() => removeArrayItem("options", i)}
//       >
//         Remove
//       </Button>
//     </div>
//   ))}
//   <Button
//     type="button"
//     variant="outline"
//     onClick={() =>
//       addArrayItem("options", { title: "", price: 0 })
//     }
//   >
//     <Plus className="w-4 h-4 mr-2" /> Add Option
//   </Button>
// </div>

// {/* Energization */}
// <div>
//   <Label>Energization</Label>
//   {formData.energization.map((e: any, i: number) => (
//     <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//       <Input
//         placeholder="Title"
//         value={e.title}
//         onChange={(ev) =>
//           handleArrayChange(
//             "energization",
//             i,
//             "title",
//             ev.target.value
//           )
//         }
//       />
//       <Input
//         type="number"
//         placeholder="Price"
//         value={e.price}
//         onChange={(ev) =>
//           handleArrayChange(
//             "energization",
//             i,
//             "price",
//             Number(ev.target.value)
//           )
//         }
//       />
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={e.isHaveForm}
//           onChange={(ev) =>
//             handleArrayChange(
//               "energization",
//               i,
//               "isHaveForm",
//               ev.target.checked
//             )
//           }
//         />
//         Form Required
//       </label>
//       <Button
//         type="button"
//         variant="outline"
//         onClick={() => removeArrayItem("energization", i)}
//       >
//         Remove
//       </Button>
//     </div>
//   ))}
//   <Button
//     type="button"
//     variant="outline"
//     onClick={() =>
//       addArrayItem("energization", {
//         title: "",
//         price: 0,
//         isHaveForm: false,
//       })
//     }
//   >
//     <Plus className="w-4 h-4 mr-2" /> Add Energization
//   </Button>
// </div>

// {/* Submit */}
// <div className="flex gap-4">
//   <Button
//     type="submit"
//     disabled={loading}
//     className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//   >
//     <Save className="w-4 h-4 mr-2" />
//     {loading ? "Saving..." : "Update Rudraksha"}
//   </Button>
//   <Button
//     type="button"
//     variant="outline"
//     className="flex-1"
//     onClick={() => navigate(`/rudraksha/view/${id}`)}
//   >
//     Cancel
//   </Button>
// </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
