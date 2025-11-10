"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar added
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, Save, ArrowLeft } from "lucide-react";
import TiptapEditor from "@/components/dashboard/TipTapEditor";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function EditBlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    existingImage: "",
    authorType: "user",
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch Blog Data
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/blogs/${id}`);
        const blog = res.data.data.blog;

        setFormData({
          title: blog.title || "",
          content: blog.content || "",
          image: null,
          existingImage: blog.image || "",
          authorType: blog.authorType || "user",
        });
      } catch (err) {
        toast.error("Failed to load blog details");
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("authorType", formData.authorType);
    if (formData.image) data.append("image", formData.image);

    try {
      setIsLoading(true);
      await axios.put(`${apiUrl}/api/blogs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Blog updated successfully!");
      navigate("/dashboard/manage-blogs");
    } catch (err) {
      toast.error("Failed to update blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* ✅ Sidebar Section */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-blogs")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              🪶 Edit Blog
            </h1>
          </div>

          {/* Blog Form */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Update Blog Details
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label>Blog Title</Label>
                  <Input
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <Separator className="my-6" />

                {/* Author Type */}
                <div className="space-y-2">
                  <Label>Author Type</Label>
                  <Select
                    value={formData.authorType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, authorType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Author Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-6" />

                {/* TipTap Editor */}
                <div className="space-y-2">
                  <Label>Blog Content</Label>
                  <TiptapEditor
                    key={id}
                    value={formData.content}
                    onChange={(val) =>
                      setFormData({ ...formData, content: val })
                    }
                  />
                </div>

                <Separator className="my-6" />

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Blog Image</Label>
                  <div className="border border-dashed border-orange-300 p-4 rounded-md flex flex-col items-center justify-center text-center">
                    <Upload className="w-6 h-6 text-orange-500 mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: e.target.files ? e.target.files[0] : null,
                        })
                      }
                      className="block text-sm text-muted-foreground"
                    />

                    {/* Image Preview */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                      {formData.image ? (
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="New Preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      ) : formData.existingImage ? (
                        <img
                          src={`${apiUrl}${formData.existingImage}`}
                          alt="Existing"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No image selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Updating..." : "Update Blog"}
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
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Upload, Save } from "lucide-react";
// import TiptapEditor from "@/components/dashboard/TipTapEditor";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// export default function EditBlogForm() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null as File | null,
//     existingImage: "",
//     authorType: "user",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Fetch Blog Data
//   useEffect(() => {
//     if (!id) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/blogs/${id}`);
//         const blog = res.data.data.blog;
//         // console.log(blog.content);

//         setFormData({
//           title: blog.title || "",
//           content: blog.content || "",
//           image: null,
//           existingImage: blog.image || "",
//           authorType: blog.authorType || "user",
//         });
//       } catch (err) {
//         toast.error("Failed to load blog details");
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   // ✅ Handle Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.title || !formData.content) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("content", formData.content);
//     data.append("authorType", formData.authorType);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       setIsLoading(true);
//       await axios.put(`${apiUrl}/api/blogs/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("✅ Blog updated successfully!");
//       navigate("/dashboard/manage-blogs");
//     } catch (err) {
//       toast.error("Failed to update blog. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
//               🪶 Edit Blog
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <Label>Blog Title</Label>
//                 <Input
//                   placeholder="Enter blog title"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                 />
//               </div>

//               <Separator className="my-6" />

//               {/* Author Type */}
//               <div className="space-y-2">
//                 <Label>Author Type</Label>
//                 <Select
//                   value={formData.authorType}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, authorType: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Author Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="admin">Admin</SelectItem>
//                     <SelectItem value="user">User</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Separator className="my-6" />

//               {/* TipTap Editor */}
//               <div className="space-y-2">
//                 <Label>Blog Content</Label>
//                 <TiptapEditor
//                   key={id} // ✅ Ensures reset when switching blogs
//                   value={formData.content}
//                   onChange={(val) => setFormData({ ...formData, content: val })}
//                 />
//               </div>

//               <Separator className="my-6" />

//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <Label>Upload Blog Image</Label>
//                 <div className="border border-dashed border-orange-300 p-4 rounded-md flex flex-col items-center justify-center text-center">
//                   <Upload className="w-6 h-6 text-orange-500 mb-2" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         image: e.target.files ? e.target.files[0] : null,
//                       })
//                     }
//                     className="block text-sm text-muted-foreground"
//                   />

//                   {/* Image Preview */}
//                   <div className="mt-4 flex flex-col items-center gap-2">
//                     {formData.image ? (
//                       <img
//                         src={URL.createObjectURL(formData.image)}
//                         alt="New Preview"
//                         className="w-32 h-32 object-cover rounded-md border"
//                       />
//                     ) : formData.existingImage ? (
//                       <img
//                         src={`${apiUrl}${formData.existingImage}`}
//                         alt="Existing"
//                         className="w-32 h-32 object-cover rounded-md border"
//                       />
//                     ) : (
//                       <span className="text-muted-foreground text-sm">
//                         No image selected
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6 flex justify-end">
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   {isLoading ? "Updating..." : "Update Blog"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import TiptapEditor from "@/components/dashboard/TipTapEditor";
// import { Upload, Save } from "lucide-react";

// // ✅ Import ShadCN Select
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// export default function EditBlogForm() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const blogId = params?.id;

//   const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null as File | null,
//     existingImage: "",
//     authorType: "user", // default value
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch existing blog
//   useEffect(() => {
//     if (!blogId) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/blogs/${blogId}`);
//         const blog = res.data.data.blog;
//         setFormData({
//           title: blog.title || "",
//           content: blog.content || "",
//           image: null,
//           existingImage: blog.image || "",
//           authorType: blog.authorType || "user",
//         });
//       } catch (err) {
//         toast.error("Failed to load blog details");
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   // Handle Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.title || !formData.content) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("content", formData.content);
//     data.append("authorType", formData.authorType);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       setIsLoading(true);
//       await axios.put(`${apiUrl}/api/blogs/${blogId}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("✅ Blog updated successfully!");
//       navigate("/dashboard/manage-blogs");
//     } catch (err) {
//       toast.error("Failed to update blog. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
//               🪶 Edit Blog
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <Label>Blog Title</Label>
//                 <Input
//                   placeholder="Enter blog title"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
//                 />
//               </div>

//               <Separator className="my-6" />

//               {/* Author Type */}
//               <div className="space-y-2">
//                 <Label>Author Type</Label>
//                 <Select
//                   value={formData.authorType}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, authorType: value })
//                   }
//                 >
//                   <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-200">
//                     <SelectValue placeholder="Select Author Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="admin">Admin</SelectItem>
//                     <SelectItem value="user">User</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Separator className="my-6" />

//               {/* Content */}
//               <div className="space-y-2">
//                 <Label>Blog Content</Label>
//                 <TiptapEditor
//                   value={formData.content}
//                   onChange={(val) => setFormData({ ...formData, content: val })}
//                 />
//               </div>

//               <Separator className="my-6" />

//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <Label>Upload Blog Image</Label>
//                 <div className="border border-dashed border-orange-300 p-4 rounded-md flex flex-col items-center justify-center text-center">
//                   <Upload className="w-6 h-6 text-orange-500 mb-2" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         image: e.target.files ? e.target.files[0] : null,
//                       })
//                     }
//                     className="block text-sm text-muted-foreground"
//                   />

//                   {/* Image Preview */}
//                   <div className="mt-4 flex flex-col items-center gap-2">
//                     {formData.image ? (
//                       <img
//                         src={URL.createObjectURL(formData.image)}
//                         alt="New Preview"
//                         className="w-32 h-32 object-cover rounded-md border"
//                       />
//                     ) : formData.existingImage ? (
//                       <img
//                         src={`${apiUrl}${formData.existingImage}`} // ✅ Prefix API URL
//                         alt="Existing"
//                         className="w-32 h-32 object-cover rounded-md border"
//                       />
//                     ) : (
//                       <span className="text-muted-foreground text-sm">
//                         No image selected
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="pt-6 flex justify-end">
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   {isLoading ? "Updating..." : "Update Blog"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
