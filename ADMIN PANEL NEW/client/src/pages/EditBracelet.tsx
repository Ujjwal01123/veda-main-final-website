"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/productSidebar"; // ✅ Sidebar added
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Upload, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import TiptapEditor from "@/components/dashboard/TipTapEditor";

interface BraceletData {
  _id: string;
  productName: string;
  stock: number;
  shortDescription: "";
  metaTitle: "";
  metaKeywords: "";
  metaDescription: "";
  productPrice: number;
  productDiscount: number;
  productImage: string[];
  productAbout: string[];
  productFeatures: string[];
  productBenefits: string[];
  productFaqs: string[];
  productShipping: string[];
  sizes: { _id: string; size: string; price: number; stock: number }[];
  certificates: { _id: string; type: string; price: number }[];
  energization: {
    _id: string;
    title: string;
    price: number;
    isHaveForm: boolean;
  }[];
}

export default function EditBracelet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [bracelet, setBracelet] = useState<BraceletData | null>(null);
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
    sizes: [{ size: "", price: 0, stock: 0 }],
    certificates: [{ type: "", price: 0 }],
    energization: [{ title: "", price: 0, isHaveForm: false }],
    existingImages: [] as string[],
    removedImages: [] as string[],
    newImages: [] as File[],
    shopifyLink: "",
    youtubeLink: "",
    shortDescription: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  });

  // const normalizeHtml = (value: any): string => {
  //   if (!value) return "";
  //   if (Array.isArray(value)) return value[0] || "";
  //   if (typeof value === "string") {
  //     try {
  //       const parsed = JSON.parse(value);
  //       if (Array.isArray(parsed)) return parsed[0] || "";
  //       return parsed;
  //     } catch {
  //       return value;
  //     }
  //   }
  //   return "";
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

  // Fetch bracelet data
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/bracelet/${id}`)
      .then((res) => {
        const data = res.data.data.bracelet;
        setBracelet(data);
        setFormData({
          productName: data.productName,
          shortDescription: data.shortDescription || "",
          metaTitle: data.metaTitle || "",
          metaKeywords: data.metaKeywords || "",
          metaDescription: data.metaDescription || "",
          stock: data.stock,
          productPrice: data.productPrice,
          productDiscount: data.productDiscount,
          productAbout: [normalizeHtml(data.productAbout)],
          productFeatures: [normalizeHtml(data.productFeatures)],
          productBenefits: [normalizeHtml(data.productBenefits)],
          productFaqs: [normalizeHtml(data.productFaqs)],
          productShipping: [normalizeHtml(data.productShipping)],
          sizes: data.sizes?.length
            ? data.sizes
            : [{ size: "", price: 0, stock: 0 }],
          certificates: data.certificates?.length
            ? data.certificates
            : [{ type: "", price: 0 }],
          energization: data.energization?.length
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
          description: "Failed to fetch Bracelet data",
          variant: "destructive",
        })
      );
  }, [id]);

  // Handlers (array, image, form submit etc.)
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
    if (e.target.files) {
      setFormData({
        ...formData,
        newImages: [...formData.newImages, ...Array.from(e.target.files)],
      });
    }
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
      data.append("shortDescription", formData.shortDescription);
      data.append("metaTitle", formData.metaTitle);
      data.append("metaKeywords", formData.metaKeywords);
      data.append("metaDescription", formData.metaDescription);
      data.append("stock", formData.stock.toString());
      data.append("productPrice", formData.productPrice.toString());
      data.append("productDiscount", formData.productDiscount.toString());
      [
        "productAbout",
        "productFeatures",
        "productBenefits",
        "productFaqs",
        "productShipping",
        "sizes",
        "certificates",
        "energization",
      ].forEach((field) => data.append(field, JSON.stringify(formData[field])));
      data.append("existingImages", JSON.stringify(formData.existingImages));
      data.append("removedImages", JSON.stringify(formData.removedImages));
      data.append("shopifyLink", formData.shopifyLink);
      data.append("youtubeLink", formData.youtubeLink);
      formData.newImages.forEach((file: File) => data.append("images", file));

      const res = await fetch(`${apiUrl}/api/product/bracelet/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to update Bracelet");
      const result = await res.json();
      toast({
        title: "✅ Bracelet Updated",
        description: `${result.data.productName} updated successfully`,
      });
      navigate(`/bracelet/view/${id}`);
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

  if (!bracelet)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading Bracelet...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* ✅ Sidebar (same as EditBooking) */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-bracelets")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              ✨ Edit Bracelet
            </h1>
          </div>

          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-6 h-6" /> Update Bracelet Details
              </CardTitle>
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

                <div className="col-span-2">
                  <Label>Short Description</Label>
                  <Input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="A brief summary for listing or preview."
                  />
                </div>

                {/* SEO Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-600 border-b pb-2">
                    🔍 SEO Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label>Meta Title</Label>
                      <Input
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            metaTitle: e.target.value,
                          })
                        }
                        placeholder="Best Puja for Peace and Prosperity"
                      />
                    </div>
                    <div>
                      <Label>Meta Keywords</Label>
                      <Input
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            metaKeywords: e.target.value,
                          })
                        }
                        placeholder="peace, prosperity, hindu puja"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Input
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="A detailed SEO-friendly description for search engines."
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

                {/* ✅ TipTap Editors for Rich Text Fields */}
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

                {/* Sizes, Certificates, Energization */}
                {/* Sizes */}
                <div>
                  <Label>Sizes</Label>
                  {formData.sizes.map((s: any, i: number) => (
                    <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                      <Input
                        placeholder="Size"
                        value={s.size}
                        onChange={(e) =>
                          handleArrayChange("sizes", i, "size", e.target.value)
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={s.price}
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
                        value={s.stock}
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
                        variant="outline"
                        onClick={() => removeArrayItem("sizes", i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("sizes", { size: "", price: 0, stock: 0 })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Size
                  </Button>
                </div>

                {/* Certificates */}
                <div>
                  <Label>Certificates</Label>
                  {formData.certificates.map((c: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="Type"
                        value={c.type}
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
                        value={c.price}
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
                        variant="outline"
                        onClick={() => removeArrayItem("certificates", i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("certificates", { type: "", price: 0 })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Certificate
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
                    {loading ? "Saving..." : "Update Bracelet"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/bracelet/view/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              {/* </CardContent> */}
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
// import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ Add TipTap

// interface BraceletData {
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
//   sizes: { _id: string; size: string; price: number; stock: number }[];
//   certificates: { _id: string; type: string; price: number }[];
//   energization: {
//     _id: string;
//     title: string;
//     price: number;
//     isHaveForm: boolean;
//   }[];
// }

// export default function EditBracelet() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [bracelet, setBracelet] = useState<BraceletData | null>(null);
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
//     sizes: [{ size: "", price: 0, stock: 0 }],
//     certificates: [{ type: "", price: 0 }],
//     energization: [{ title: "", price: 0, isHaveForm: false }],
//     existingImages: [] as string[],
//     removedImages: [] as string[],
//     newImages: [] as File[],
//     shopifyLink: "",
//     youtubeLink: "",
//   });

//   // 🧠 Normalize HTML fields (just like Rudraksha)
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

//   // 🧩 Fetch bracelet data
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/bracelet/${id}`)
//       .then((res) => {
//         const data = res.data.data.bracelet;
//         setBracelet(data);
//         setFormData({
//           productName: data.productName,
//           stock: data.stock,
//           productPrice: data.productPrice,
//           productDiscount: data.productDiscount,

//           // ✅ Clean HTML for editors
//           productAbout: [normalizeHtml(data.productAbout)],
//           productFeatures: [normalizeHtml(data.productFeatures)],
//           productBenefits: [normalizeHtml(data.productBenefits)],
//           productFaqs: [normalizeHtml(data.productFaqs)],
//           productShipping: [normalizeHtml(data.productShipping)],

//           sizes: data.sizes?.length
//             ? data.sizes
//             : [{ size: "", price: 0, stock: 0 }],
//           certificates: data.certificates?.length
//             ? data.certificates
//             : [{ type: "", price: 0 }],
//           energization: data.energization?.length
//             ? data.energization
//             : [{ title: "", price: 0, isHaveForm: false }],

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
//           description: "Failed to fetch Bracelet data",
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
//         "sizes",
//         "certificates",
//         "energization",
//       ].forEach((field) => data.append(field, JSON.stringify(formData[field])));

//       data.append("existingImages", JSON.stringify(formData.existingImages));
//       data.append("removedImages", JSON.stringify(formData.removedImages));
//       data.append("shopifyLink", formData.shopifyLink);
//       data.append("youtubeLink", formData.youtubeLink);

//       formData.newImages.forEach((file: File) => data.append("images", file));

//       const res = await fetch(`${apiUrl}/api/product/bracelet/${id}`, {
//         method: "PUT",
//         body: data,
//       });

//       if (!res.ok) throw new Error("Failed to update Bracelet");

//       const result = await res.json();
//       toast({
//         title: "✅ Bracelet Updated",
//         description: `${result.data.productName} updated successfully`,
//       });

//       navigate(`/bracelet/view/${id}`);
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

//   if (!bracelet) return <p className="p-8 text-white">Loading Bracelet...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-6">
//             <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-foreground">
//               <Upload className="w-6 h-6" /> Edit Bracelet
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Name *</Label>
//                   <Input
//                     value={formData.productName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, productName: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Stock *</Label>
//                   <Input
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         stock: Number(e.target.value),
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Price *</Label>
//                   <Input
//                     type="number"
//                     value={formData.productPrice}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         productPrice: Number(e.target.value),
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Discount</Label>
//                   <Input
//                     type="number"
//                     value={formData.productDiscount}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         productDiscount: Number(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Shopify & YouTube Links */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Shopify Link</Label>
//                   <Input
//                     value={formData.shopifyLink}
//                     onChange={(e) =>
//                       setFormData({ ...formData, shopifyLink: e.target.value })
//                     }
//                     placeholder="https://shopify.com/product-link"
//                   />
//                 </div>
//                 <div>
//                   <Label>YouTube Link</Label>
//                   <Input
//                     value={formData.youtubeLink}
//                     onChange={(e) =>
//                       setFormData({ ...formData, youtubeLink: e.target.value })
//                     }
//                     placeholder="https://youtube.com/watch?v=..."
//                   />
//                 </div>
//               </div>

//               {/* Images */}
//               <div>
//                 <Label>Existing Images</Label>
//                 <div className="flex gap-2 flex-wrap mt-2">
//                   {formData.existingImages.map((img: string) => (
//                     <div key={img} className="relative group">
//                       <button
//                         type="button"
//                         onClick={() => removeExistingImage(img)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//                       >
//                         ×
//                       </button>
//                       <img
//                         src={img}
//                         alt="existing"
//                         className="w-24 h-24 object-cover rounded-md shadow-sm hover:opacity-75 transition"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <Label>Upload New Images</Label>
//                 <Input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.newImages.map((file: File, i: number) => (
//                     <div
//                       key={i}
//                       className="relative text-sm bg-muted/20 p-2 rounded-md"
//                     >
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(i)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                       {file.name}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ✅ TipTap Editors for Rich Text Fields */}
//               {[
//                 { label: "About", field: "productAbout" },
//                 { label: "Features", field: "productFeatures" },
//                 { label: "Benefits", field: "productBenefits" },
//                 { label: "FAQs", field: "productFaqs" },
//                 { label: "Shipping", field: "productShipping" },
//               ].map(({ label, field }) => (
//                 <div key={field} className="space-y-2">
//                   <Label>{label}</Label>
//                   <TiptapEditor
//                     value={(formData[field] as string[])[0] || ""}
//                     onChange={(html) =>
//                       setFormData((prev: any) => ({
//                         ...prev,
//                         [field]: [html],
//                       }))
//                     }
//                     placeholder={`Write ${label.toLowerCase()} details...`}
//                   />
//                 </div>
//               ))}

//               {/* Sizes, Certificates, Energization */}
//               {/* Sizes */}
//               <div>
//                 <Label>Sizes</Label>
//                 {formData.sizes.map((s: any, i: number) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                     <Input
//                       placeholder="Size"
//                       value={s.size}
//                       onChange={(e) =>
//                         handleArrayChange("sizes", i, "size", e.target.value)
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={s.price}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "price",
//                           Number(e.target.value)
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Stock"
//                       value={s.stock}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "stock",
//                           Number(e.target.value)
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
//                 {formData.certificates.map((c: any, i: number) => (
//                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Type"
//                       value={c.type}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "type",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={c.price}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "price",
//                           Number(e.target.value)
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

//               {/* Energization */}
//               <div>
//                 <Label>Energization</Label>
//                 {formData.energization.map((e: any, i: number) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
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
//                     <label className="flex items-center gap-2 text-sm">
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

//               {/* Submit */}
//               <div className="flex gap-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   {loading ? "Saving..." : "Update Bracelet"}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1"
//                   onClick={() => navigate(`/bracelet/view/${id}`)}
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

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Plus, Save, Upload } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";

// interface BraceletData {
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
//   sizes: { _id: string; size: string; price: number; stock: number }[];
//   certificates: { _id: string; type: string; price: number }[];
//   energization: {
//     _id: string;
//     title: string;
//     price: number;
//     isHaveForm: boolean;
//   }[];
// }

// export default function EditBracelet() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [bracelet, setBracelet] = useState<BraceletData | null>(null);
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
//     sizes: [{ size: "", price: 0, stock: 0 }],
//     certificates: [{ type: "", price: 0 }],
//     energization: [{ title: "", price: 0, isHaveForm: false }],
//     existingImages: [] as string[],
//     removedImages: [] as string[],
//     newImages: [] as File[],
//     shopifyLink: "", // <-- add
//     youtubeLink: "", // <-- add
//   });

//   // Fetch bracelet data
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/bracelet/${id}`)
//       .then((res) => {
//         const data = res.data.data.bracelet;
//         setBracelet(data);
//         setFormData({
//           productName: data.productName,
//           stock: data.stock,
//           productPrice: data.productPrice,
//           productDiscount: data.productDiscount,
//           productAbout: data.productAbout?.length ? data.productAbout : [""],
//           productFeatures: data.productFeatures?.length
//             ? data.productFeatures
//             : [""],
//           productBenefits: data.productBenefits?.length
//             ? data.productBenefits
//             : [""],
//           productFaqs: data.productFaqs?.length ? data.productFaqs : [""],
//           productShipping: data.productShipping?.length
//             ? data.productShipping
//             : [""],
//           sizes: data.sizes?.length
//             ? data.sizes
//             : [{ size: "", price: 0, stock: 0 }],
//           certificates: data.certificates?.length
//             ? data.certificates
//             : [{ type: "", price: 0 }],
//           energization: data.energization?.length
//             ? data.energization
//             : [{ title: "", price: 0, isHaveForm: false }],
//           existingImages: data.productImage || [],
//           removedImages: [],
//           newImages: [],
//           shopifyLink: data.shopifyLink || "", // <-- add
//           youtubeLink: data.youtubeLink || "", // <-- add
//         });
//       })
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to fetch Bracelet data",
//           variant: "destructive",
//         })
//       );
//   }, [id]);

//   // Helpers for arrays
//   const handleArrayChange = (
//     field: string,
//     index: number,
//     key: string,
//     value: any
//   ) => {
//     const updated = [...formData[field]];
//     updated[index] = { ...updated[index], [key]: value };
//     setFormData({ ...formData, [field]: updated });
//   };

//   const addArrayItem = (field: string, item: any) => {
//     setFormData({ ...formData, [field]: [...formData[field], item] });
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     const updated = [...formData[field]];
//     updated.splice(index, 1);
//     setFormData({ ...formData, [field]: updated });
//   };

//   // Helpers for string arrays
//   const handleInputArrayChange = (
//     field: string,
//     index: number,
//     value: string
//   ) => {
//     const arr = [...formData[field]];
//     arr[index] = value;
//     setFormData({ ...formData, [field]: arr });
//   };

//   const addInputArrayItem = (field: string) => {
//     setFormData({ ...formData, [field]: [...formData[field], ""] });
//   };

//   const removeInputArrayItem = (field: string, index: number) => {
//     const arr = [...formData[field]];
//     arr.splice(index, 1);
//     setFormData({ ...formData, [field]: arr });
//   };

//   // Image handling
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({
//         ...formData,
//         newImages: [...formData.newImages, ...Array.from(e.target.files)],
//       });
//     }
//   };

//   const removeNewImage = (index: number) => {
//     const updated = [...formData.newImages];
//     updated.splice(index, 1);
//     setFormData({ ...formData, newImages: updated });
//   };

//   const removeExistingImage = (img: string) => {
//     setFormData({
//       ...formData,
//       existingImages: formData.existingImages.filter((i: string) => i !== img),
//       removedImages: [...formData.removedImages, img],
//     });
//   };

//   // Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();

//       // Append main fields
//       data.append("productName", formData.productName);
//       data.append("stock", formData.stock.toString());
//       data.append("productPrice", formData.productPrice.toString());
//       data.append("productDiscount", formData.productDiscount.toString());

//       // Append string arrays
//       [
//         "productAbout",
//         "productFeatures",
//         "productBenefits",
//         "productFaqs",
//         "productShipping",
//       ].forEach((field) => data.append(field, JSON.stringify(formData[field])));

//       // Append object arrays
//       data.append("sizes", JSON.stringify(formData.sizes));
//       data.append("certificates", JSON.stringify(formData.certificates));
//       data.append("energization", JSON.stringify(formData.energization));

//       // Images
//       data.append("existingImages", JSON.stringify(formData.existingImages));
//       data.append("removedImages", JSON.stringify(formData.removedImages));

//       data.append("shopifyLink", formData.shopifyLink);
//       data.append("youtubeLink", formData.youtubeLink);

//       formData.newImages.forEach((file: File) => data.append("images", file));

//       const res = await fetch(`${apiUrl}/api/product/bracelet/${id}`, {
//         method: "PUT",
//         body: data,
//       });

//       if (!res.ok) throw new Error("Failed to update Bracelet");

//       const result = await res.json();
//       toast({
//         title: "✅ Bracelet Updated",
//         description: `${result.data.productName} updated successfully`,
//       });

//       navigate(`/bracelet/view/${id}`);
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

//   if (!bracelet) return <p className="p-8 text-white">Loading Bracelet...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
//       <div className="max-w-5xl mx-auto">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-6">
//             <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-foreground">
//               <Upload className="w-6 h-6" /> Edit Bracelet
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Name *</Label>
//                   <Input
//                     value={formData.productName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, productName: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Stock *</Label>
//                   <Input
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         stock: Number(e.target.value),
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Price *</Label>
//                   <Input
//                     type="number"
//                     value={formData.productPrice}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         productPrice: Number(e.target.value),
//                       })
//                     }
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>Discount</Label>
//                   <Input
//                     type="number"
//                     value={formData.productDiscount}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         productDiscount: Number(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Shopify & YouTube Links */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Shopify Link</Label>
//                   <Input
//                     value={formData.shopifyLink}
//                     onChange={(e) =>
//                       setFormData({ ...formData, shopifyLink: e.target.value })
//                     }
//                     placeholder="https://shopify.com/product-link"
//                   />
//                 </div>
//                 <div>
//                   <Label>YouTube Link</Label>
//                   <Input
//                     value={formData.youtubeLink}
//                     onChange={(e) =>
//                       setFormData({ ...formData, youtubeLink: e.target.value })
//                     }
//                     placeholder="https://youtube.com/watch?v=..."
//                   />
//                 </div>
//               </div>

//               {/* Existing Images */}
//               <div>
//                 <Label>Existing Images</Label>
//                 <div className="flex gap-2 flex-wrap mt-2">
//                   {formData.existingImages.map((img: string) => (
//                     <div key={img} className="relative">
//                       <button
//                         type="button"
//                         onClick={() => removeExistingImage(img)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                       <img
//                         src={img}
//                         alt="existing"
//                         className="w-24 h-24 object-cover rounded-md"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Upload New Images */}
//               <div>
//                 <Label>Upload New Images</Label>
//                 <Input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.newImages.map((file: File, i: number) => (
//                     <div key={i} className="relative">
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(i)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                       <p className="text-sm">{file.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Product Details Arrays */}
//               {[
//                 { label: "About", field: "productAbout" },
//                 { label: "Features", field: "productFeatures" },
//                 { label: "Benefits", field: "productBenefits" },
//                 { label: "FAQs", field: "productFaqs" },
//                 { label: "Shipping", field: "productShipping" },
//               ].map(({ label, field }) => (
//                 <div key={field} className="space-y-2">
//                   <Label>{label}</Label>
//                   {(formData[field] as string[]).map(
//                     (item: string, i: number) => (
//                       <div key={i} className="flex gap-2 mb-2">
//                         <Input
//                           value={item}
//                           onChange={(e) =>
//                             handleInputArrayChange(field, i, e.target.value)
//                           }
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => removeInputArrayItem(field, i)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     )
//                   )}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => addInputArrayItem(field)}
//                   >
//                     <Plus className="w-4 h-4 mr-2" /> Add {label}
//                   </Button>
//                 </div>
//               ))}

//               {/* Sizes, Certificates, Energization (unchanged) */}
//               {/* Sizes */}
//               <div>
//                 <Label>Sizes</Label>
//                 {formData.sizes.map((s: any, i: number) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                     <Input
//                       placeholder="Size"
//                       value={s.size}
//                       onChange={(e) =>
//                         handleArrayChange("sizes", i, "size", e.target.value)
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={s.price}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "price",
//                           Number(e.target.value)
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Stock"
//                       value={s.stock}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "sizes",
//                           i,
//                           "stock",
//                           Number(e.target.value)
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
//                 {formData.certificates.map((c: any, i: number) => (
//                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Type"
//                       value={c.type}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "type",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       value={c.price}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "certificates",
//                           i,
//                           "price",
//                           Number(e.target.value)
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

//               {/* Energization */}
//               <div>
//                 <Label>Energization</Label>
//                 {formData.energization.map((e: any, i: number) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
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

//               {/* Submit */}
//               <div className="flex gap-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   {loading ? "Saving..." : "Update Bracelet"}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1"
//                   onClick={() => navigate(`/bracelet/view/${id}`)}
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

// // // EditBracelet.tsx
// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Plus, Save, Upload } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";
// // import axios from "axios";

// // interface BraceletData {
// //   _id: string;
// //   productName: string;
// //   stock: number;
// //   productPrice: number;
// //   productDiscount: number;
// //   productImage: string[];
// //   productPath: string[];
// //   productAbout: string[];
// //   productFeatures: string[];
// //   productBenefits: string[];
// //   productFaqs: string[];
// //   productShipping: string[];
// //   sizes: { _id: string; size: string; price: number; stock: number }[];
// //   certificates: { _id: string; type: string; price: number }[];
// //   energization: {
// //     _id: string;
// //     title: string;
// //     price: number;
// //     isHaveForm: boolean;
// //   }[];
// // }

// // export default function EditBracelet() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();
// //   const apiUrl = import.meta.env.VITE_BASE_API_URL;

// //   const [bracelet, setBracelet] = useState<BraceletData | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const [formData, setFormData] = useState<any>({
// //     productName: "",
// //     stock: 0,
// //     productPrice: 0,
// //     productDiscount: 0,
// //     productAbout: [""],
// //     productFeatures: [""],
// //     productBenefits: [""],
// //     productFaqs: [""],
// //     productShipping: [""],
// //     sizes: [{ size: "", price: 0, stock: 0 }],
// //     certificates: [{ type: "", price: 0 }],
// //     energization: [{ title: "", price: 0, isHaveForm: false }],
// //     existingImages: [] as string[],
// //     removedImages: [] as string[],
// //     images: [] as File[],
// //   });

// //   useEffect(() => {
// //     axios
// //       .get(`${apiUrl}/api/product/bracelet/${id}`)
// //       .then((res) => {
// //         const data = res.data.data.bracelet;
// //         setBracelet(data);
// //         setFormData({
// //           productName: data.productName,
// //           stock: data.stock,
// //           productPrice: data.productPrice,
// //           productDiscount: data.productDiscount,
// //           productAbout: data.productAbout || [""],
// //           productFeatures: data.productFeatures || [""],
// //           productBenefits: data.productBenefits || [""],
// //           productFaqs: data.productFaqs || [""],
// //           productShipping: data.productShipping || [""],
// //           sizes:
// //             data.sizes.length > 0
// //               ? data.sizes
// //               : [{ size: "", price: 0, stock: 0 }],
// //           certificates:
// //             data.certificates.length > 0
// //               ? data.certificates
// //               : [{ type: "", price: 0 }],
// //           energization:
// //             data.energization.length > 0
// //               ? data.energization
// //               : [{ title: "", price: 0, isHaveForm: false }],
// //           existingImages: data.productImage || [],
// //           removedImages: [],
// //           images: [],
// //         });
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         toast({
// //           title: "Error",
// //           description: "Failed to fetch Bracelet data",
// //           variant: "destructive",
// //         });
// //       });
// //   }, [id]);

// //   // Helper functions
// //   const handleArrayChange = (
// //     field: string,
// //     index: number,
// //     key: string,
// //     value: any
// //   ) => {
// //     const updated = [...formData[field]];
// //     updated[index] = { ...updated[index], [key]: value };
// //     setFormData({ ...formData, [field]: updated });
// //   };

// //   const addArrayItem = (field: string, item: any) => {
// //     setFormData({ ...formData, [field]: [...formData[field], item] });
// //   };

// //   const removeArrayItem = (field: string, index: number) => {
// //     const updated = [...formData[field]];
// //     updated.splice(index, 1);
// //     setFormData({ ...formData, [field]: updated });
// //   };

// //   const handleInputArrayChange = (
// //     field: string,
// //     index: number,
// //     value: string
// //   ) => {
// //     const arr = [...formData[field]];
// //     arr[index] = value;
// //     setFormData({ ...formData, [field]: arr });
// //   };

// //   const addInputArrayItem = (field: string) => {
// //     setFormData({ ...formData, [field]: [...formData[field], ""] });
// //   };

// //   const removeInputArrayItem = (field: string, index: number) => {
// //     const arr = [...formData[field]];
// //     arr.splice(index, 1);
// //     setFormData({ ...formData, [field]: arr });
// //   };

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files) {
// //       setFormData({
// //         ...formData,
// //         images: [...formData.images, ...Array.from(e.target.files)],
// //       });
// //     }
// //   };

// //   const removeSelectedImage = (index: number) => {
// //     const updated = [...formData.images];
// //     updated.splice(index, 1);
// //     setFormData({ ...formData, images: updated });
// //   };

// //   const removeExistingImage = (img: string) => {
// //     setFormData({
// //       ...formData,
// //       existingImages: formData.existingImages.filter((i: string) => i !== img),
// //       removedImages: [...formData.removedImages, img],
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const data = new FormData();
// //       Object.entries(formData).forEach(([key, value]) => {
// //         if (
// //           [
// //             "productAbout",
// //             "productFeatures",
// //             "productBenefits",
// //             "productFaqs",
// //             "productShipping",
// //             "sizes",
// //             "certificates",
// //             "energization",
// //             "existingImages",
// //             "removedImages",
// //           ].includes(key)
// //         ) {
// //           data.append(key, JSON.stringify(value));
// //         } else if (key === "images" && value) {
// //           (value as File[]).forEach((file) => data.append("images", file));
// //         } else {
// //           data.append(key, value.toString());
// //         }
// //       });

// //       const res = await fetch(`${apiUrl}/api/product/bracelet/${id}`, {
// //         method: "PUT",
// //         body: data,
// //       });

// //       if (!res.ok) {
// //         const errorData = await res.json();
// //         throw new Error(errorData.message || "Failed to update Bracelet");
// //       }

// //       const updatedItem = await res.json();
// //       toast({
// //         title: "✅ Bracelet Updated",
// //         description: `${updatedItem.data.productName} has been updated`,
// //       });

// //       navigate(`/bracelet/view/${id}`);
// //     } catch (error: any) {
// //       toast({
// //         title: "❌ Error",
// //         description: error.message || "Something went wrong",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!bracelet) return <p className="p-8 text-white">Loading Bracelet...</p>;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
// //       <div className="max-w-5xl mx-auto">
// //         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
// //           <CardHeader className="pb-6">
// //             <CardTitle className="text-2xl flex items-center gap-2 font-semibold text-foreground">
// //               <Upload className="w-6 h-6" /> Edit Bracelet
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* Basic Info */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="space-y-1">
// //                   <Label>Name *</Label>
// //                   <Input
// //                     value={formData.productName}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, productName: e.target.value })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="space-y-1">
// //                   <Label>Stock *</Label>
// //                   <Input
// //                     type="number"
// //                     value={formData.stock}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         stock: Number(e.target.value),
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="space-y-1">
// //                   <Label>Price *</Label>
// //                   <Input
// //                     type="number"
// //                     value={formData.productPrice}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         productPrice: Number(e.target.value),
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="space-y-1">
// //                   <Label>Discount</Label>
// //                   <Input
// //                     type="number"
// //                     value={formData.productDiscount}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         productDiscount: Number(e.target.value),
// //                       })
// //                     }
// //                   />
// //                 </div>
// //               </div>

// //               {/* Existing Images */}
// //               <div>
// //                 <Label>Existing Images</Label>
// //                 <div className="flex gap-2 flex-wrap mt-2">
// //                   {formData.existingImages.map((img: string) => (
// //                     <div key={img} className="relative">
// //                       <span
// //                         onClick={() => removeExistingImage(img)}
// //                         className="absolute -top-2 -right-2 bg-red-500 text-white px-1 rounded-full cursor-pointer"
// //                       >
// //                         ×
// //                       </span>
// //                       <img
// //                         src={img}
// //                         alt="existing"
// //                         className="w-24 h-24 object-cover rounded-lg"
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Upload New Images */}
// //               <div>
// //                 <Label>Upload New Images</Label>
// //                 <Input
// //                   type="file"
// //                   multiple
// //                   accept="image/*"
// //                   onChange={handleImageUpload}
// //                 />
// //                 <div className="flex gap-2 flex-wrap mt-2">
// //                   {formData.images.map((img, i) => (
// //                     <div key={i} className="relative">
// //                       <span
// //                         onClick={() => removeSelectedImage(i)}
// //                         className="absolute -top-2 -right-2 bg-red-500 text-white px-1 rounded-full cursor-pointer"
// //                       >
// //                         ×
// //                       </span>
// //                       <p className="text-sm">{(img as File).name}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Arrays: About, Features, Benefits, FAQ, Shipping */}
// //               {[
// //                 "productAbout",
// //                 "productFeatures",
// //                 "productBenefits",
// //                 "productFaqs",
// //                 "productShipping",
// //               ].map((field) => (
// //                 <div key={field}>
// //                   <Label>{field.replace("product", "")}</Label>
// //                   {(formData[field] as string[]).map(
// //                     (item: string, i: number) => (
// //                       <div key={i} className="flex gap-2 mb-2">
// //                         <Input
// //                           value={item}
// //                           onChange={(e) =>
// //                             handleInputArrayChange(field, i, e.target.value)
// //                           }
// //                           className="flex-1"
// //                         />
// //                         <Button
// //                           type="button"
// //                           variant="outline"
// //                           onClick={() => removeInputArrayItem(field, i)}
// //                         >
// //                           Remove
// //                         </Button>
// //                       </div>
// //                     )
// //                   )}
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     onClick={() => addInputArrayItem(field)}
// //                   >
// //                     <Plus className="w-4 h-4 mr-2" /> Add
// //                   </Button>
// //                 </div>
// //               ))}

// //               {/* Sizes */}
// //               <div>
// //                 <Label>Sizes</Label>
// //                 {formData.sizes.map((size: any, i: number) => (
// //                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
// //                     <Input
// //                       placeholder="Size"
// //                       value={size.size}
// //                       onChange={(ev) =>
// //                         handleArrayChange("sizes", i, "size", ev.target.value)
// //                       }
// //                     />
// //                     <Input
// //                       type="number"
// //                       placeholder="Price"
// //                       value={size.price}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "sizes",
// //                           i,
// //                           "price",
// //                           Number(ev.target.value)
// //                         )
// //                       }
// //                     />
// //                     <Input
// //                       type="number"
// //                       placeholder="Stock"
// //                       value={size.stock}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "sizes",
// //                           i,
// //                           "stock",
// //                           Number(ev.target.value)
// //                         )
// //                       }
// //                     />
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       onClick={() => removeArrayItem("sizes", i)}
// //                     >
// //                       Remove
// //                     </Button>
// //                   </div>
// //                 ))}
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() =>
// //                     addArrayItem("sizes", { size: "", price: 0, stock: 0 })
// //                   }
// //                 >
// //                   <Plus className="w-4 h-4 mr-2" /> Add Size
// //                 </Button>
// //               </div>

// //               {/* Certificates */}
// //               <div>
// //                 <Label>Certificates</Label>
// //                 {formData.certificates.map((c: any, i: number) => (
// //                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
// //                     <Input
// //                       placeholder="Type"
// //                       value={c.type}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "certificates",
// //                           i,
// //                           "type",
// //                           ev.target.value
// //                         )
// //                       }
// //                     />
// //                     <Input
// //                       type="number"
// //                       placeholder="Price"
// //                       value={c.price}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "certificates",
// //                           i,
// //                           "price",
// //                           Number(ev.target.value)
// //                         )
// //                       }
// //                     />
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       onClick={() => removeArrayItem("certificates", i)}
// //                     >
// //                       Remove
// //                     </Button>
// //                   </div>
// //                 ))}
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() =>
// //                     addArrayItem("certificates", { type: "", price: 0 })
// //                   }
// //                 >
// //                   <Plus className="w-4 h-4 mr-2" /> Add Certificate
// //                 </Button>
// //               </div>

// //               {/* Energization */}
// //               <div>
// //                 <Label>Energization</Label>
// //                 {formData.energization.map((e: any, i: number) => (
// //                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
// //                     <Input
// //                       placeholder="Title"
// //                       value={e.title}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "energization",
// //                           i,
// //                           "title",
// //                           ev.target.value
// //                         )
// //                       }
// //                     />
// //                     <Input
// //                       type="number"
// //                       placeholder="Price"
// //                       value={e.price}
// //                       onChange={(ev) =>
// //                         handleArrayChange(
// //                           "energization",
// //                           i,
// //                           "price",
// //                           Number(ev.target.value)
// //                         )
// //                       }
// //                     />
// //                     <label className="flex items-center gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={e.isHaveForm}
// //                         onChange={(ev) =>
// //                           handleArrayChange(
// //                             "energization",
// //                             i,
// //                             "isHaveForm",
// //                             ev.target.checked
// //                           )
// //                         }
// //                       />
// //                       Form Required
// //                     </label>
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       onClick={() => removeArrayItem("energization", i)}
// //                     >
// //                       Remove
// //                     </Button>
// //                   </div>
// //                 ))}
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   onClick={() =>
// //                     addArrayItem("energization", {
// //                       title: "",
// //                       price: 0,
// //                       isHaveForm: false,
// //                     })
// //                   }
// //                 >
// //                   <Plus className="w-4 h-4 mr-2" /> Add Energization
// //                 </Button>
// //               </div>

// //               {/* Submit */}
// //               <div className="flex gap-4">
// //                 <Button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
// //                 >
// //                   <Save className="w-4 h-4 mr-2" />{" "}
// //                   {loading ? "Saving..." : "Update Bracelet"}
// //                 </Button>
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   className="flex-1"
// //                   onClick={() => navigate(`/bracelet/view/${id}`)}
// //                 >
// //                   Cancel
// //                 </Button>
// //               </div>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }
