"use client";

import { Sidebar } from "@/components/layout/updatedSidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, Save } from "lucide-react";
import TiptapEditor from "@/components/dashboard/TipTapEditor";

export default function AddBlogForm() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // ---------------- Submit Handler ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    try {
      setIsLoading(true);
      await axios.post(`${apiUrl}/api/blogs`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🪶 Blog added successfully!");
      navigate("/dashboard/manage-blogs");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add blog. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ---------------- JSX ----------------
  return (
    <>
      {/* ✅ Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                <Upload className="w-6 h-6 text-orange-500" /> Add New Blog
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Write your blog post with rich formatting using TipTap editor.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Blog Title */}
                <div className="space-y-2">
                  <Label>Blog Title *</Label>
                  <Input
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                  />
                </div>

                <Separator className="bg-orange-200 my-6" />

                {/* Blog Content */}
                <div className="space-y-2">
                  <Label>Blog Content *</Label>
                  <TiptapEditor
                    value={formData.content}
                    onChange={(val) =>
                      setFormData({ ...formData, content: val })
                    }
                    placeholder="Write your blog content here..."
                  />
                </div>

                <Separator className="bg-orange-200 my-6" />

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Blog Image</Label>
                  <div className="border border-dashed border-orange-300 p-6 rounded-md flex flex-col items-center justify-center text-center bg-orange-50/30 hover:bg-orange-50 transition">
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

                    {/* Preview */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                      {formData.image ? (
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md border border-orange-200"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No image selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard/manage-blogs")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Adding..." : "Add Blog"}
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import TiptapEditor from "@/components/dashboard/TipTapEditor";
// import { Upload, Save } from "lucide-react";

// export default function AddBlogForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: null,
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const apiUrl = import.meta.env.VITE_BASE_API_URL;
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("content", formData.content);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       setIsLoading(true);
//       await axios.post(`${apiUrl}/api/blogs`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("🪶 Blog added successfully!");
//       navigate("/dashboard/manage-blogs");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add blog. Please try again.");
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
//               🪶 Add New Blog
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
//                         alt="Preview"
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
//                   {isLoading ? "Adding..." : "Add Blog"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
