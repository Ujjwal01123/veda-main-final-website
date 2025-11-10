"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ import TipTap

export default function EditPuja() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    // date: "",
    category: "",
    significance: "",
    process: "",
    price: "", // ✅ Added
    benefits: [{ detail: "" }],
    faqs: [{ answer: "" }],
    reviews: [],
    image: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch Puja + Categories
  useEffect(() => {
    async function fetchData() {
      try {
        const [pujaRes, catRes] = await Promise.all([
          axios.get(`${apiUrl}/api/pujas/${id}`),
          axios.get(`${apiUrl}/api/categories/all`),
        ]);

        const data = pujaRes.data;
        setForm({
          title: data.title,
          description: data.description || "",
          // date: data.date ? data.date.split("T")[0] : "",
          category: data.category?._id || "",
          significance: data.significance || "",
          process: data.process || "",
          price: data.price || "", // ✅ added
          benefits:
            Array.isArray(data.benefits) && data.benefits.length
              ? data.benefits
              : [{ detail: "" }],
          faqs:
            Array.isArray(data.faqs) && data.faqs.length
              ? data.faqs
              : [{ answer: "" }],
          reviews: data.reviews || [],
          image: data.image || "",
        });
        setCategories(catRes.data || []);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load puja details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      // formData.append("date", form.date);
      formData.append("category", form.category);
      formData.append("significance", form.significance);
      formData.append("process", form.process);
      formData.append("price", form.price); // ✅ include in payload
      formData.append("benefits", JSON.stringify(form.benefits));
      formData.append("faqs", JSON.stringify(form.faqs));
      formData.append("reviews", JSON.stringify(form.reviews));
      if (form.image instanceof File) formData.append("image", form.image);

      await axios.put(`${apiUrl}/api/pujas/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Success",
        description: `${form.title} updated successfully.`,
      });

      navigate(`/pujas/view/${id}`);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update puja.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background/60">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-orange-50 to-background/60">
      {/* ✅ Fixed Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-full border-r border-border/30 bg-white/90 backdrop-blur-md shadow-md z-50">
        <Sidebar />
      </div>

      {/* ✅ Scrollable Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
              onClick={() => navigate(`/pujas/view/${id}`)}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              🔱 Edit Puja
            </h1>
          </div>

          {/* Main Card */}
          <Card className="shadow-md bg-white/90 rounded-xl p-6 backdrop-blur-sm border border-border/30">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-600">
                Puja Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Image Upload */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  {form.image && !(form.image instanceof File) ? (
                    <img
                      src={`${apiUrl}${form.image}`}
                      alt="Puja"
                      className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
                    />
                  ) : form.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="Puja"
                      className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-3">
                      No Image
                    </div>
                  )}
                  <Input type="file" onChange={handleFileChange} />
                </div>

                {/* Fields */}
                <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label>Title</Label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div>
                    <Label>Category</Label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ✅ Price Field */}
                  <div>
                    <Label>Price (₹)</Label>
                    <Input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter Puja Price"
                    />
                  </div>
                </div>
              </div>

              {/* ✅ Rich Text Editors */}
              <div>
                <Label>Description</Label>
                <TiptapEditor
                  value={form.description}
                  onChange={(val) =>
                    setForm((prev: any) => ({ ...prev, description: val }))
                  }
                />
              </div>

              <div>
                <Label>Significance</Label>
                <TiptapEditor
                  value={form.significance}
                  onChange={(val) =>
                    setForm((prev: any) => ({ ...prev, significance: val }))
                  }
                />
              </div>

              <div>
                <Label>Process</Label>
                <TiptapEditor
                  value={form.process}
                  onChange={(val) =>
                    setForm((prev: any) => ({ ...prev, process: val }))
                  }
                />
              </div>

              <div>
                <Label>Benefits</Label>
                <TiptapEditor
                  value={
                    Array.isArray(form.benefits)
                      ? form.benefits[0]?.detail || ""
                      : form.benefits
                  }
                  onChange={(val) =>
                    setForm((prev: any) => ({
                      ...prev,
                      benefits: [{ detail: val }],
                    }))
                  }
                />
              </div>

              <div>
                <Label>FAQs</Label>
                <TiptapEditor
                  value={
                    Array.isArray(form.faqs)
                      ? form.faqs[0]?.answer || ""
                      : form.faqs
                  }
                  onChange={(val) =>
                    setForm((prev: any) => ({
                      ...prev,
                      faqs: [{ answer: val }],
                    }))
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end mt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:opacity-90 transition"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Update Puja"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/pujas/view/${id}`)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Sidebar } from "@/components/layout/updatedSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2, ArrowLeft } from "lucide-react";
// import TiptapEditor from "@/components/dashboard/TipTapEditor"; // ✅ import TipTap

// export default function EditPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [form, setForm] = useState<any>({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//     significance: "",
//     process: "",
//     benefits: [{ detail: "" }],
//     faqs: [{ answer: "" }],
//     reviews: [],
//     image: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // ✅ Fetch Puja + Categories
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [pujaRes, catRes] = await Promise.all([
//           axios.get(`${apiUrl}/api/pujas/${id}`),
//           axios.get(`${apiUrl}/api/categories/all`),
//         ]);

//         const data = pujaRes.data;
//         setForm({
//           title: data.title,
//           description: data.description || "",
//           date: data.date ? data.date.split("T")[0] : "",
//           category: data.category?._id || "",
//           significance: data.significance || "",
//           process: data.process || "",
//           benefits:
//             Array.isArray(data.benefits) && data.benefits.length
//               ? data.benefits
//               : [{ detail: "" }],
//           faqs:
//             Array.isArray(data.faqs) && data.faqs.length
//               ? data.faqs
//               : [{ answer: "" }],
//           reviews: data.reviews || [],
//           image: data.image || "",
//         });
//         setCategories(catRes.data || []);
//       } catch {
//         toast({
//           title: "Error",
//           description: "Failed to load puja details.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setForm({ ...form, image: e.target.files[0] });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);
//       formData.append("date", form.date);
//       formData.append("category", form.category);
//       formData.append("significance", form.significance);
//       formData.append("process", form.process);
//       formData.append("benefits", JSON.stringify(form.benefits));
//       formData.append("faqs", JSON.stringify(form.faqs));
//       formData.append("reviews", JSON.stringify(form.reviews));
//       if (form.image instanceof File) formData.append("image", form.image);

//       await axios.put(`${apiUrl}/api/pujas/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast({
//         title: "Success",
//         description: `${form.title} updated successfully.`,
//       });

//       navigate(`/pujas/view/${id}`);
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.response?.data?.message || "Failed to update puja.",
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background/60">
//         <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
//       </div>
//     );

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-orange-50 to-background/60">
//       {/* ✅ Fixed Sidebar */}
//       <div className="w-64 fixed left-0 top-0 h-full border-r border-border/30 bg-white/90 backdrop-blur-md shadow-md z-50">
//         <Sidebar />
//       </div>

//       {/* ✅ Scrollable Main Content */}
//       <div className="flex-1 ml-64 overflow-y-auto p-6">
//         <div className="max-w-6xl mx-auto space-y-8 pb-20">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
//               onClick={() => navigate(`/pujas/view/${id}`)}
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Button>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
//               🔱 Edit Puja
//             </h1>
//           </div>

//           {/* Main Card */}
//           <Card className="shadow-md bg-white/90 rounded-xl p-6 backdrop-blur-sm border border-border/30">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-orange-600">
//                 Puja Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-8">
//               {/* Image Upload */}
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/3 flex flex-col items-center">
//                   {form.image && !(form.image instanceof File) ? (
//                     <img
//                       src={`${apiUrl}${form.image}`}
//                       alt="Puja"
//                       className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
//                     />
//                   ) : form.image instanceof File ? (
//                     <img
//                       src={URL.createObjectURL(form.image)}
//                       alt="Puja"
//                       className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
//                     />
//                   ) : (
//                     <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-3">
//                       No Image
//                     </div>
//                   )}
//                   <Input type="file" onChange={handleFileChange} />
//                 </div>

//                 {/* Fields */}
//                 <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="col-span-2">
//                     <Label>Title</Label>
//                     <Input
//                       name="title"
//                       value={form.title}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label>Date</Label>
//                     <Input
//                       type="date"
//                       name="date"
//                       value={form.date}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label>Category</Label>
//                     <select
//                       name="category"
//                       value={form.category}
//                       onChange={handleChange}
//                       className="w-full border p-2 rounded-md"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* ✅ Rich Text Editors */}
//               <div>
//                 <Label>Description</Label>
//                 <TiptapEditor
//                   value={form.description}
//                   onChange={(val) =>
//                     setForm((prev: any) => ({ ...prev, description: val }))
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Significance</Label>
//                 <TiptapEditor
//                   value={form.significance}
//                   onChange={(val) =>
//                     setForm((prev: any) => ({ ...prev, significance: val }))
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Process</Label>
//                 <TiptapEditor
//                   value={form.process}
//                   onChange={(val) =>
//                     setForm((prev: any) => ({ ...prev, process: val }))
//                   }
//                 />
//               </div>

//               {/* ✅ Benefits (Single Editor) */}
//               <div>
//                 <Label>Benefits</Label>
//                 <TiptapEditor
//                   value={
//                     Array.isArray(form.benefits)
//                       ? form.benefits[0]?.detail || ""
//                       : form.benefits
//                   }
//                   onChange={(val) =>
//                     setForm((prev: any) => ({
//                       ...prev,
//                       benefits: [{ detail: val }],
//                     }))
//                   }
//                 />
//               </div>

//               {/* ✅ FAQs (Single Editor) */}
//               <div>
//                 <Label>FAQs</Label>
//                 <TiptapEditor
//                   value={
//                     Array.isArray(form.faqs)
//                       ? form.faqs[0]?.answer || ""
//                       : form.faqs
//                   }
//                   onChange={(val) =>
//                     setForm((prev: any) => ({
//                       ...prev,
//                       faqs: [{ answer: val }],
//                     }))
//                   }
//                 />
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex gap-4 justify-end mt-6">
//                 <Button
//                   onClick={handleSubmit}
//                   disabled={saving}
//                   className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:opacity-90 transition"
//                 >
//                   {saving ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
//                       Saving...
//                     </>
//                   ) : (
//                     "Update Puja"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate(`/pujas/view/${id}`)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Sidebar } from "@/components/layout/updatedSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2, ArrowLeft } from "lucide-react";

// export default function EditPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [form, setForm] = useState<any>({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//     significance: "",
//     process: "",
//     benefits: [],
//     faqs: [],
//     reviews: [],
//     image: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [pujaRes, catRes] = await Promise.all([
//           axios.get(`${apiUrl}/api/pujas/${id}`),
//           axios.get(`${apiUrl}/api/categories/all`),
//         ]);

//         const data = pujaRes.data;
//         setForm({
//           title: data.title,
//           description: data.description,
//           date: data.date ? data.date.split("T")[0] : "",
//           category: data.category?._id || "",
//           significance: data.significance || "",
//           process: data.process || "",
//           benefits: data.benefits || [],
//           faqs: data.faqs || [],
//           reviews: data.reviews || [],
//           image: data.image || "",
//         });
//         setCategories(catRes.data || []);
//       } catch {
//         toast({
//           title: "Error",
//           description: "Failed to load puja details.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setForm({ ...form, image: e.target.files[0] });
//     }
//   };

//   const handleArrayChange = (
//     field: string,
//     index: number,
//     key: string,
//     value: string
//   ) => {
//     const updated = [...form[field]];
//     updated[index][key] = value;
//     setForm({ ...form, [field]: updated });
//   };

//   const addArrayItem = (field: string, newItem: any) => {
//     setForm({ ...form, [field]: [...form[field], newItem] });
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     const updated = [...form[field]];
//     updated.splice(index, 1);
//     setForm({ ...form, [field]: updated });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);
//       formData.append("date", form.date);
//       formData.append("category", form.category);
//       formData.append("significance", form.significance);
//       formData.append("process", form.process);
//       formData.append("benefits", JSON.stringify(form.benefits || []));
//       formData.append("faqs", JSON.stringify(form.faqs || []));
//       formData.append("reviews", JSON.stringify(form.reviews || []));
//       if (form.image instanceof File) formData.append("image", form.image);

//       await axios.put(`${apiUrl}/api/pujas/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast({
//         title: "Success",
//         description: `${form.title} updated successfully.`,
//       });

//       navigate(`/pujas/view/${id}`);
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.response?.data?.message || "Failed to update puja.",
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background/60">
//         <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
//       </div>
//     );

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-orange-50 to-background/60">
//       {/* ✅ Fixed Sidebar */}
//       <div className="w-64 fixed left-0 top-0 h-full border-r border-border/30 bg-white/90 backdrop-blur-md shadow-md z-50">
//         <Sidebar />
//       </div>

//       {/* ✅ Scrollable Main Content */}
//       <div className="flex-1 ml-64 overflow-y-auto p-6">
//         <div className="max-w-6xl mx-auto space-y-8 pb-20">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <Button
//               variant="ghost"
//               className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
//               onClick={() => navigate(`/pujas/view/${id}`)}
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Button>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
//               🔱 Edit Puja
//             </h1>
//           </div>

//           {/* Main Card */}
//           <Card className="shadow-md bg-white/90 rounded-xl p-6 backdrop-blur-sm border border-border/30">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-orange-600">
//                 Puja Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Image Upload */}
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/3 flex flex-col items-center">
//                   {form.image && !(form.image instanceof File) ? (
//                     <img
//                       src={`${apiUrl}${form.image}`}
//                       alt="Puja"
//                       className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
//                     />
//                   ) : form.image instanceof File ? (
//                     <img
//                       src={URL.createObjectURL(form.image)}
//                       alt="Puja"
//                       className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
//                     />
//                   ) : (
//                     <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-3">
//                       No Image
//                     </div>
//                   )}
//                   <Input type="file" onChange={handleFileChange} />
//                 </div>

//                 {/* Fields */}
//                 <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="col-span-2">
//                     <Label>Title</Label>
//                     <Input
//                       name="title"
//                       value={form.title}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-span-2">
//                     <Label>Description</Label>
//                     <Textarea
//                       name="description"
//                       value={form.description}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label>Date</Label>
//                     <Input
//                       type="date"
//                       name="date"
//                       value={form.date}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label>Category</Label>
//                     <select
//                       name="category"
//                       value={form.category}
//                       onChange={handleChange}
//                       className="w-full border p-2 rounded-md"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="col-span-2">
//                     <Label>Significance</Label>
//                     <Textarea
//                       name="significance"
//                       value={form.significance}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="col-span-2">
//                     <Label>Process</Label>
//                     <Textarea
//                       name="process"
//                       value={form.process}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Benefits */}
//               <Card className="border border-border/30 shadow-sm">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-orange-500">
//                     Benefits
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {form.benefits.map((b: any, i: number) => (
//                     <div key={i} className="flex gap-2 mb-2">
//                       <Input
//                         placeholder="Title"
//                         value={b.title}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "benefits",
//                             i,
//                             "title",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Input
//                         placeholder="Detail"
//                         value={b.detail}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "benefits",
//                             i,
//                             "detail",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Button
//                         variant="outline"
//                         onClick={() => removeArrayItem("benefits", i)}
//                       >
//                         ✕
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     onClick={() =>
//                       addArrayItem("benefits", { title: "", detail: "" })
//                     }
//                     className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90"
//                   >
//                     + Add Benefit
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* FAQs */}
//               <Card className="border border-border/30 shadow-sm">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-orange-500">
//                     FAQs
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {form.faqs.map((f: any, i: number) => (
//                     <div key={i} className="mb-2">
//                       <Input
//                         placeholder="Question"
//                         value={f.question}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "faqs",
//                             i,
//                             "question",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Textarea
//                         placeholder="Answer"
//                         value={f.answer}
//                         onChange={(e) =>
//                           handleArrayChange("faqs", i, "answer", e.target.value)
//                         }
//                       />
//                       <Button
//                         variant="outline"
//                         onClick={() => removeArrayItem("faqs", i)}
//                       >
//                         ✕
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     onClick={() =>
//                       addArrayItem("faqs", { question: "", answer: "" })
//                     }
//                     className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90"
//                   >
//                     + Add FAQ
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* Reviews */}
//               <Card className="border border-border/30 shadow-sm">
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-orange-500">
//                     Reviews
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {form.reviews.map((r: any, i: number) => (
//                     <div key={i} className="mb-2">
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
//                         placeholder="Rating"
//                         type="number"
//                         value={r.rating}
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "reviews",
//                             i,
//                             "rating",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <Textarea
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
//                       <Button
//                         variant="outline"
//                         onClick={() => removeArrayItem("reviews", i)}
//                       >
//                         ✕
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     onClick={() =>
//                       addArrayItem("reviews", {
//                         user: "",
//                         rating: "",
//                         comment: "",
//                       })
//                     }
//                     className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90"
//                   >
//                     + Add Review
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* Submit Buttons */}
//               <div className="flex gap-4 justify-end mt-6">
//                 <Button
//                   onClick={handleSubmit}
//                   disabled={saving}
//                   className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:opacity-90 transition"
//                 >
//                   {saving ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
//                       Saving...
//                     </>
//                   ) : (
//                     "Update Puja"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate(`/pujas/view/${id}`)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

// export default function EditPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [form, setForm] = useState<any>({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//     significance: "",
//     process: "",
//     benefits: [],
//     faqs: [],
//     reviews: [],
//     image: "",
//   });

//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => {
//       const data = res.data;
//       setForm({
//         title: data.title,
//         description: data.description,
//         date: data.date ? data.date.split("T")[0] : "",
//         category: data.category?._id || "",
//         significance: data.significance || "",
//         process: data.process || "",
//         benefits: data.benefits || [],
//         faqs: data.faqs || [],
//         reviews: data.reviews || [],
//         image: data.image || "",
//       });
//     });

//     axios.get(`${apiUrl}/api/categories/all`).then((res) => {
//       setCategories(res.data || []);
//     });
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setForm({ ...form, image: e.target.files[0] });
//     }
//   };

//   // Handle array field updates (benefits, faqs, reviews)
//   const handleArrayChange = (
//     field: string,
//     index: number,
//     key: string,
//     value: string
//   ) => {
//     const updated = [...form[field]];
//     updated[index][key] = value;
//     setForm({ ...form, [field]: updated });
//   };

//   const addArrayItem = (field: string, newItem: any) => {
//     setForm({ ...form, [field]: [...form[field], newItem] });
//   };

//   const removeArrayItem = (field: string, index: number) => {
//     const updated = [...form[field]];
//     updated.splice(index, 1);
//     setForm({ ...form, [field]: updated });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);
//       formData.append("date", form.date);
//       formData.append("category", form.category);
//       formData.append("significance", form.significance);
//       formData.append("process", form.process);

//       formData.append("benefits", JSON.stringify(form.benefits || []));
//       formData.append("faqs", JSON.stringify(form.faqs || []));
//       formData.append("reviews", JSON.stringify(form.reviews || []));

//       if (form.image instanceof File) {
//         formData.append("image", form.image);
//       }

//       await axios.put(`${apiUrl}/api/pujas/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast({
//         title: "Puja Updated",
//         description: `${form.title} updated successfully.`,
//       });

//       // ✅ Navigate to view page after update
//       navigate(`/pujas/view/${id}`);
//     } catch (err: any) {
//       console.log(err.response?.data);
//       toast({
//         title: "Error",
//         description: err.response?.data?.message || "Failed to update puja.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <Card className="max-w-7xl mx-auto shadow-xl rounded-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left: Image */}
//           <div className="md:w-1/3 flex-shrink-0 p-4 flex flex-col items-center">
//             {form.image && !(form.image instanceof File) ? (
//               <img
//                 src={`${apiUrl}${form.image}`}
//                 alt="Puja"
//                 className="w-full h-64 object-cover rounded-xl shadow-md mb-4"
//               />
//             ) : form.image instanceof File ? (
//               <img
//                 src={URL.createObjectURL(form.image)}
//                 alt="Puja"
//                 className="w-full h-64 object-cover rounded-xl shadow-md mb-4"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 mb-4">
//                 No Image
//               </div>
//             )}
//             <Input type="file" onChange={handleFileChange} />
//           </div>

//           {/* Right: Form */}
//           <div className="md:flex-1 p-6 space-y-4 overflow-auto">
//             <CardHeader className="p-0">
//               <CardTitle className="text-3xl font-extrabold text-indigo-600 mb-4">
//                 Edit Puja
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="p-0 space-y-4">
//               {/* Basic fields */}
//               <div>
//                 <Label>Title</Label>
//                 <Input
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <Label>Description</Label>
//                 <Textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <Label>Date</Label>
//                 <Input
//                   type="date"
//                   name="date"
//                   value={form.date}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <Label>Category</Label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Significance</Label>
//                 <Textarea
//                   name="significance"
//                   value={form.significance}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <Label>Process</Label>
//                 <Textarea
//                   name="process"
//                   value={form.process}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Benefits */}
//               <div>
//                 <Label>Benefits</Label>
//                 {form.benefits.map((b: any, i: number) => (
//                   <div key={i} className="flex gap-2 mb-2">
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
//                     />
//                     <Button
//                       variant="outline"
//                       onClick={() => removeArrayItem("benefits", i)}
//                     >
//                       ✕
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("benefits", { title: "", detail: "" })
//                   }
//                 >
//                   + Add Benefit
//                 </Button>
//               </div>

//               {/* FAQs */}
//               <div>
//                 <Label>FAQs</Label>
//                 {form.faqs.map((f: any, i: number) => (
//                   <div key={i} className="mb-2">
//                     <Input
//                       placeholder="Question"
//                       value={f.question}
//                       onChange={(e) =>
//                         handleArrayChange("faqs", i, "question", e.target.value)
//                       }
//                     />
//                     <Textarea
//                       placeholder="Answer"
//                       value={f.answer}
//                       onChange={(e) =>
//                         handleArrayChange("faqs", i, "answer", e.target.value)
//                       }
//                     />
//                     <Button
//                       variant="outline"
//                       onClick={() => removeArrayItem("faqs", i)}
//                     >
//                       ✕
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("faqs", { question: "", answer: "" })
//                   }
//                 >
//                   + Add FAQ
//                 </Button>
//               </div>

//               {/* Reviews */}
//               <div>
//                 <Label>Reviews</Label>
//                 {form.reviews.map((r: any, i: number) => (
//                   <div key={i} className="mb-2">
//                     <Input
//                       placeholder="User"
//                       value={r.user}
//                       onChange={(e) =>
//                         handleArrayChange("reviews", i, "user", e.target.value)
//                       }
//                     />
//                     <Input
//                       placeholder="Rating"
//                       type="number"
//                       value={r.rating}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           "reviews",
//                           i,
//                           "rating",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <Textarea
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
//                     <Button
//                       variant="outline"
//                       onClick={() => removeArrayItem("reviews", i)}
//                     >
//                       ✕
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("reviews", {
//                       user: "",
//                       rating: "",
//                       comment: "",
//                     })
//                   }
//                 >
//                   + Add Review
//                 </Button>
//               </div>

//               {/* Submit */}
//               <div className="flex gap-4 mt-6">
//                 <Button onClick={handleSubmit} disabled={loading}>
//                   {loading ? "Updating..." : "Update Puja"}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate(`/pujas/view/${id}`)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
