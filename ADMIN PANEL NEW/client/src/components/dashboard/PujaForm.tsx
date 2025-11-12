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

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
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
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
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
                        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
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
                        onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
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
                          setFormData((p) => ({ ...p, shortDescription: e.target.value }))
                        }
                        placeholder="Brief overview (1-2 lines)"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(val) => setFormData((p) => ({ ...p, category: val }))}
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
                          setFormData((p) => ({ ...p, metaTitle: e.target.value }))
                        }
                        placeholder="SEO title for search engines"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Meta Keywords</Label>
                      <Input
                        value={formData.metaKeywords}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, metaKeywords: e.target.value }))
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
                          setFormData((p) => ({ ...p, metaDescription: e.target.value }))
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
                    onChange={(val) => setFormData((p) => ({ ...p, description: val }))}
                  />
                </div>

                <div>
                  <Label>Significance</Label>
                  <TiptapEditor
                    value={formData.significance}
                    onChange={(val) => setFormData((p) => ({ ...p, significance: val }))}
                  />
                </div>

                <div>
                  <Label>Process</Label>
                  <TiptapEditor
                    value={formData.process}
                    onChange={(val) => setFormData((p) => ({ ...p, process: val }))}
                  />
                </div>

                {/* --- Benefits --- */}
                <div>
                  <Label>Benefits</Label>
                  <TiptapEditor
                    value={formData.benefits?.[0]?.detail || ""}
                    onChange={(val) => setFormData((p) => ({ ...p, benefits: [{ detail: val }] }))}
                  />
                </div>

                {/* --- FAQs --- */}
                <div>
                  <Label>FAQs</Label>
                  <TiptapEditor
                    value={formData.faqs?.[0]?.answer || ""}
                    onChange={(val) => setFormData((p) => ({ ...p, faqs: [{ answer: val }] }))}
                  />
                </div>

                {/* --- Image --- */}
                <div>
                  <Label>Puja Image</Label>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
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









// import { Sidebar } from "@/components/layout/updatedSidebar";
// import { cn } from "@/lib/utils";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload, Save, FileClock } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import TiptapEditor from "@/components/dashboard/TipTapEditor";

// export function PujaForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
//     []
//   );
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     price: "", // ✅ added price field
//     category: "",
//     description: "",
//     // date: "", 
//     significance: "",
//     process: "",
//     benefits: [{ title: "", detail: "" }],
//     faqs: [{ question: "", answer: "" }],
//     reviews: [{ user: "", rating: 0, comment: "" }],
//     image: null as File | null,
//     isDraft: false,
//   });

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/api/categories/all`);
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (error: any) {
//         toast({
//           title: "Error fetching categories",
//           description: error.message,
//           variant: "destructive",
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (["benefits", "faqs", "reviews"].includes(key)) {
//           data.append(key, JSON.stringify(value));
//         } else if (key === "image" && value) {
//           data.append("image", value);
//         } else {
//           data.append(key, value as string);
//         }
//       });
//       data.append("isDraft", String(isDraft));

//       const res = await fetch(`${apiUrl}/api/pujas`, {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save Puja");
//       }

//       const savedPuja = await res.json();
//       toast({
//         title: isDraft ? "📝 Draft Saved" : "✅ Puja Added Successfully",
//         description: `${savedPuja.title} has been ${
//           isDraft ? "saved as draft." : "added successfully."
//         }`,
//       });
//       navigate(`/pujas/view/${savedPuja._id}`);
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

//   // --- UI ---
//   return (
//     <>
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
//         <div className="max-w-4xl mx-auto">
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-6">
//               <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
//                 <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
//                   <Upload className="w-6 h-6" />
//                 </div>
//                 Add Sacred Puja
//               </CardTitle>
//               <p className="text-muted-foreground mt-2">
//                 Create a new spiritual ceremony with divine details.
//               </p>
//             </CardHeader>

//             <CardContent className="space-y-8">
//               <form
//                 onSubmit={(e) => handleSubmit(e, false)}
//                 className="space-y-8"
//               >
//                 {/* Basic Info */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//                     <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
//                     Basic Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Puja Title */}
//                     <div className="space-y-2">
//                       <Label>Puja Title *</Label>
//                       <Input
//                         value={formData.title}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             title: e.target.value,
//                           }))
//                         }
//                         required
//                         placeholder="Enter the sacred name"
//                         className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                       />
//                     </div>

//                     {/* Puja Price ✅ */}
//                     <div className="space-y-2">
//                       <Label>Puja Price (₹)</Label>
//                       <Input
//                         type="number"
//                         value={formData.price}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             price: e.target.value,
//                           }))
//                         }
//                         required
//                         min="0"
//                         placeholder="Enter puja cost"
//                         className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                       />
//                     </div>

//                     {/* Date */}
//                     {/* <div className="space-y-2 md:col-span-2">
//                       <Label>Auspicious Date *</Label>
//                       <Input
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             date: e.target.value,
//                           }))
//                         }
//                         required
//                         className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                       />
//                     </div> */}

//                     {/* Category */}
//                     <div className="space-y-2 md:col-span-2">
//                       <Label>Category *</Label>
//                       <Select
//                         value={formData.category}
//                         onValueChange={(val) =>
//                           setFormData((prev) => ({ ...prev, category: val }))
//                         }
//                       >
//                         <SelectTrigger className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20">
//                           <SelectValue placeholder="Select sacred category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((cat) => (
//                             <SelectItem key={cat._id} value={cat._id}>
//                               {cat.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rich Text Sections */}
//                 <div>
//                   <Label>Description</Label>
//                   <TiptapEditor
//                     value={formData.description}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, description: val }))
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Significance</Label>
//                   <TiptapEditor
//                     value={formData.significance}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, significance: val }))
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Process</Label>
//                   <TiptapEditor
//                     value={formData.process}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, process: val }))
//                     }
//                   />
//                 </div>

//                 {/* Benefits */}
//                 <div>
//                   <Label>Benefits</Label>
//                   <TiptapEditor
//                     value={
//                       Array.isArray(formData.benefits)
//                         ? formData.benefits[0]?.detail || ""
//                         : formData.benefits
//                     }
//                     onChange={(val) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         benefits: [{ detail: val }],
//                       }))
//                     }
//                   />
//                 </div>

//                 {/* FAQs */}
//                 <div>
//                   <Label>FAQs</Label>
//                   <TiptapEditor
//                     value={
//                       Array.isArray(formData.faqs)
//                         ? formData.faqs[0]?.answer || ""
//                         : formData.faqs
//                     }
//                     onChange={(val) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         faqs: [{ answer: val }],
//                       }))
//                     }
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <Label>Puja Image</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                   {formData.image && (
//                     <p className="text-sm mt-1 text-spiritual font-medium">
//                       Selected: {formData.image.name}
//                     </p>
//                   )}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4">
//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     {loading ? "Saving..." : "Publish Puja"}
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={(e) => handleSubmit(e as any, true)}
//                     className="flex-1 border-dashed py-4 text-muted-foreground hover:bg-muted/10"
//                   >
//                     <FileClock className="w-4 h-4 mr-2" /> Save as Draft
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

// import { Sidebar } from "@/components/layout/updatedSidebar";
// import { cn } from "@/lib/utils";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload, Save, Plus, FileClock } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ import TipTap

// export function PujaForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
//     []
//   );
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     date: "",
//     significance: "",
//     process: "",
//     benefits: [{ title: "", detail: "" }],
//     faqs: [{ question: "", answer: "" }],
//     reviews: [{ user: "", rating: 0, comment: "" }],
//     image: null as File | null,
//     isDraft: false,
//   });

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/api/categories/all`);
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (error: any) {
//         toast({
//           title: "Error fetching categories",
//           description: error.message,
//           variant: "destructive",
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Array handlers
//   const handleArrayChange = (
//     field: "benefits" | "faqs" | "reviews",
//     index: number,
//     key: string,
//     value: string | number
//   ) => {
//     const updated = [...formData[field]];
//     updated[index] = { ...updated[index], [key]: value };
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   const addArrayItem = (
//     field: "benefits" | "faqs" | "reviews",
//     item: object
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: [...prev[field], item] }));
//   };

//   // Image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (["benefits", "faqs", "reviews"].includes(key)) {
//           data.append(key, JSON.stringify(value));
//         } else if (key === "image" && value) {
//           data.append("image", value);
//         } else {
//           data.append(key, value as string);
//         }
//       });
//       data.append("isDraft", String(isDraft));

//       const res = await fetch(`${apiUrl}/api/pujas`, {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save Puja");
//       }

//       const savedPuja = await res.json();
//       toast({
//         title: isDraft ? "📝 Draft Saved" : "✅ Puja Added Successfully",
//         description: `${savedPuja.title} has been ${
//           isDraft ? "saved as draft." : "added successfully."
//         }`,
//       });
//       navigate(`/pujas/view/${savedPuja._id}`);
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

//   // --- UI ---
//   return (
//     <>
//       {/* ✅ Sidebar */}
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
//         <div className="max-w-4xl mx-auto">
//           <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//             <CardHeader className="pb-6">
//               <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
//                 <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
//                   <Upload className="w-6 h-6" />
//                 </div>
//                 Add Sacred Puja
//               </CardTitle>
//               <p className="text-muted-foreground mt-2">
//                 Create a new spiritual ceremony with divine details.
//               </p>
//             </CardHeader>

//             <CardContent className="space-y-8">
//               <form
//                 onSubmit={(e) => handleSubmit(e, false)}
//                 className="space-y-8"
//               >
//                 {/* Basic Info */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//                     <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
//                     Basic Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label>Puja Title *</Label>
//                       <Input
//                         value={formData.title}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             title: e.target.value,
//                           }))
//                         }
//                         required
//                         placeholder="Enter the sacred name"
//                         className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Auspicious Date *</Label>
//                       <Input
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             date: e.target.value,
//                           }))
//                         }
//                         required
//                         className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                       />
//                     </div>
//                     <div className="space-y-2 md:col-span-2">
//                       <Label>Category *</Label>
//                       <Select
//                         value={formData.category}
//                         onValueChange={(val) =>
//                           setFormData((prev) => ({ ...prev, category: val }))
//                         }
//                       >
//                         <SelectTrigger className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20">
//                           <SelectValue placeholder="Select sacred category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((cat) => (
//                             <SelectItem key={cat._id} value={cat._id}>
//                               {cat.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Rich Text Sections (TipTap) */}
//                 <div>
//                   <Label>Description</Label>
//                   <TiptapEditor
//                     value={formData.description}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, description: val }))
//                     }
//                   />
//                 </div>
//                 <div>
//                   <Label>Significance</Label>
//                   <TiptapEditor
//                     value={formData.significance}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, significance: val }))
//                     }
//                   />
//                 </div>
//                 <div>
//                   <Label>Process</Label>
//                   <TiptapEditor
//                     value={formData.process}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, process: val }))
//                     }
//                   />
//                 </div>
//                 {/* Benefits (single TipTap editor) */}
//                 <div>
//                   <Label>Benefits</Label>
//                   <TiptapEditor
//                     value={
//                       Array.isArray(formData.benefits)
//                         ? formData.benefits[0]?.detail || ""
//                         : formData.benefits
//                     }
//                     onChange={(val) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         benefits: [{ detail: val }],
//                       }))
//                     }
//                   />
//                   <p className="text-xs text-muted-foreground mt-2">
//                     ✨ Add all puja benefits here (you can use lists, bold text,
//                     and formatting).
//                   </p>
//                 </div>
//                 {/* FAQs (single TipTap editor) */}
//                 <div>
//                   <Label>FAQs</Label>
//                   <TiptapEditor
//                     value={
//                       Array.isArray(formData.faqs)
//                         ? formData.faqs[0]?.answer || ""
//                         : formData.faqs
//                     }
//                     onChange={(val) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         faqs: [{ answer: val }],
//                       }))
//                     }
//                   />
//                   <p className="text-xs text-muted-foreground mt-2">
//                     💬 You can include multiple questions and answers using
//                     headings or bullet points.
//                   </p>
//                 </div>
//                 {/* Reviews
//                 <div>
//                   <Label>Reviews</Label>
//                   {formData.reviews.map((r, i) => (
//                     <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                       <Input
//                         placeholder="User"
//                         value={r.user}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "reviews",
//                             i,
//                             "user",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Rating"
//                         value={r.rating}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "reviews",
//                             i,
//                             "rating",
//                             Number(e.target.value)
//                           )
//                         }
//                       />
//                       <Input
//                         placeholder="Comment"
//                         value={r.comment}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "reviews",
//                             i,
//                             "comment",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() =>
//                       addArrayItem("reviews", {
//                         user: "",
//                         rating: 0,
//                         comment: "",
//                       })
//                     }
//                     className="w-full border-dashed border-2 hover:bg-spiritual/5 hover:border-spiritual/30"
//                   >
//                     <Plus className="w-4 h-4 mr-2" /> Add Devotee Testimonial
//                   </Button>
//                 </div> */}
//                 {/* Image */}
//                 <div>
//                   <Label>Puja Image</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                   {formData.image && (
//                     <p className="text-sm mt-1 text-spiritual font-medium">
//                       Selected: {formData.image.name}
//                     </p>
//                   )}
//                 </div>
//                 {/* Actions */}
//                 <div className="flex gap-4">
//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     {loading ? "Saving..." : "Publish Puja"}
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={(e) => handleSubmit(e as any, true)}
//                     className="flex-1 border-dashed py-4 text-muted-foreground hover:bg-muted/10"
//                   >
//                     <FileClock className="w-4 h-4 mr-2" /> Save as Draft
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload, Save, Plus, FileClock } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export function PujaForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
//     []
//   );
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     date: "",
//     significance: "",
//     process: "",
//     benefits: [{ title: "", detail: "" }],
//     faqs: [{ question: "", answer: "" }],
//     reviews: [{ user: "", rating: 0, comment: "" }],
//     image: null as File | null,
//     isDraft: false, // ✅ Added for draft feature
//   });

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/api/categories/all`);
//         if (!res.ok) throw new Error("Failed to fetch categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (error: any) {
//         toast({
//           title: "Error fetching categories",
//           description: error.message,
//           variant: "destructive",
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Helpers for handling array fields
//   const handleArrayChange = (
//     field: "benefits" | "faqs" | "reviews",
//     index: number,
//     key: string,
//     value: string | number
//   ) => {
//     const updated = [...formData[field]];
//     updated[index] = { ...updated[index], [key]: value };
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   const addArrayItem = (
//     field: "benefits" | "faqs" | "reviews",
//     item: object
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: [...prev[field], item] }));
//   };

//   const removeArrayItem = (
//     field: "benefits" | "faqs" | "reviews",
//     index: number
//   ) => {
//     const updated = [...formData[field]];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [field]: updated }));
//   };

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   // Submit handler (supports publish & draft)
//   const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (["benefits", "faqs", "reviews"].includes(key)) {
//           data.append(key, JSON.stringify(value));
//         } else if (key === "image" && value) {
//           data.append("image", value);
//         } else {
//           data.append(key, value as string);
//         }
//       });
//       data.append("isDraft", String(isDraft)); // ✅ send draft flag

//       const res = await fetch(`${apiUrl}/api/pujas`, {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save Puja");
//       }

//       const savedPuja = await res.json();

//       toast({
//         title: isDraft ? "📝 Draft Saved" : "✅ Puja Added Successfully",
//         description: `${savedPuja.title} has been ${
//           isDraft ? "saved as draft." : "added successfully."
//         }`,
//       });

//       navigate(`/pujas/view/${savedPuja._id}`);
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

//   // --- UI ---
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4">
//       <div className="max-w-4xl mx-auto">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader className="pb-6">
//             <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
//               <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
//                 <Upload className="w-6 h-6" />
//               </div>
//               Add Sacred Puja
//             </CardTitle>
//             <p className="text-muted-foreground mt-2">
//               Create a new spiritual ceremony with divine details.
//             </p>
//           </CardHeader>

//           <CardContent className="space-y-8">
//             <form
//               onSubmit={(e) => handleSubmit(e, false)}
//               className="space-y-8"
//             >
//               {/* Basic Info */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
//                   Basic Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label>Puja Title *</Label>
//                     <Input
//                       value={formData.title}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           title: e.target.value,
//                         }))
//                       }
//                       required
//                       placeholder="Enter the sacred name"
//                       className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Auspicious Date *</Label>
//                     <Input
//                       type="date"
//                       value={formData.date}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           date: e.target.value,
//                         }))
//                       }
//                       required
//                       className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                     />
//                   </div>
//                   <div className="space-y-2 md:col-span-2">
//                     <Label>Category *</Label>
//                     <Select
//                       value={formData.category}
//                       onValueChange={(val) =>
//                         setFormData((prev) => ({ ...prev, category: val }))
//                       }
//                     >
//                       <SelectTrigger className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20">
//                         <SelectValue placeholder="Select sacred category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories.map((cat) => (
//                           <SelectItem key={cat._id} value={cat._id}>
//                             {cat.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>

//               {/* Text sections */}
//               {["description", "significance", "process"].map((field) => (
//                 <div key={field}>
//                   <Label className="capitalize">{field}</Label>
//                   <Textarea
//                     value={formData[field as keyof typeof formData] as string}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         [field]: e.target.value,
//                       }))
//                     }
//                     className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                   />
//                 </div>
//               ))}

//               {/* Benefits */}
//               <div>
//                 <Label>Benefits</Label>
//                 {formData.benefits.map((b, i) => (
//                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Title"
//                       value={b.title}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "benefits",
//                           i,
//                           "title",
//                           e.target.value
//                         )
//                       }
//                       className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                     />
//                     <Input
//                       placeholder="Detail"
//                       value={b.detail}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "benefits",
//                           i,
//                           "detail",
//                           e.target.value
//                         )
//                       }
//                       className="bg-background/50 border-border focus:ring-2 focus:ring-spiritual/20"
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("benefits", { title: "", detail: "" })
//                   }
//                   className="w-full border-dashed border-2 hover:bg-spiritual/5 hover:border-spiritual/30"
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Divine Benefit
//                 </Button>
//               </div>

//               {/* FAQs */}
//               <div>
//                 <Label>FAQs</Label>
//                 {formData.faqs.map((f, i) => (
//                   <div key={i} className="grid grid-cols-2 gap-2 mb-2">
//                     <Input
//                       placeholder="Question"
//                       value={f.question}
//                       onChange={(e) =>
//                         handleArrayChange("faqs", i, "question", e.target.value)
//                       }
//                     />
//                     <Input
//                       placeholder="Answer"
//                       value={f.answer}
//                       onChange={(e) =>
//                         handleArrayChange("faqs", i, "answer", e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("faqs", { question: "", answer: "" })
//                   }
//                   className="w-full border-dashed border-2 hover:bg-accent/5 hover:border-accent/30"
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Sacred FAQ
//                 </Button>
//               </div>

//               {/* Reviews */}
//               <div>
//                 <Label>Reviews</Label>
//                 {formData.reviews.map((r, i) => (
//                   <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//                     <Input
//                       placeholder="User"
//                       value={r.user}
//                       onChange={(e) =>
//                         handleArrayChange("reviews", i, "user", e.target.value)
//                       }
//                     />
//                     <Input
//                       type="number"
//                       placeholder="Rating"
//                       value={r.rating}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "reviews",
//                           i,
//                           "rating",
//                           Number(e.target.value)
//                         )
//                       }
//                     />
//                     <Input
//                       placeholder="Comment"
//                       value={r.comment}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "reviews",
//                           i,
//                           "comment",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     addArrayItem("reviews", {
//                       user: "",
//                       rating: 0,
//                       comment: "",
//                     })
//                   }
//                   className="w-full border-dashed border-2 hover:bg-spiritual/5 hover:border-spiritual/30"
//                 >
//                   <Plus className="w-4 h-4 mr-2" /> Add Devotee Testimonial
//                 </Button>
//               </div>

//               {/* Image */}
//               <div>
//                 <Label>Puja Image</Label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//                 {formData.image && (
//                   <p className="text-sm mt-1 text-spiritual font-medium">
//                     Selected: {formData.image.name}
//                   </p>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex gap-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   {loading ? "Saving..." : "Publish Puja"}
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={(e) => handleSubmit(e as any, true)} // save as draft
//                   className="flex-1 border-dashed py-4 text-muted-foreground hover:bg-muted/10"
//                 >
//                   <FileClock className="w-4 h-4 mr-2" /> Save as Draft
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
