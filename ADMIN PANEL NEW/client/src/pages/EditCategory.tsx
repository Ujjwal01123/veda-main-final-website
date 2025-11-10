"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Added Sidebar
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";

export function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch Category Details
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/categories/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
          description: res.data.description,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load category",
          variant: "destructive",
        });
      });
  }, [id, toast]);

  // ✅ Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(`${apiUrl}/api/categories/${id}`, formData);
      toast({
        title: "Category Updated",
        description: `${res.data.name} updated successfully`,
      });
      navigate(`/categories/view/${id}`);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update category",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading category...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* ✅ Sidebar Section */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate(`/categories/view/${id}`)}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              🗂️ Edit Category
            </h1>
          </div>

          {/* Category Form */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Update Category Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Modify category name and description below.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter category description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                {/* Buttons */}
                <div className="pt-6 flex justify-end gap-3">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/categories/view/${id}`)}
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

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/components/ui/use-toast";
// import { ArrowLeft, Save } from "lucide-react";

// export function EditCategory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   // Fetch category details
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/categories/${id}`)
//       .then((res) => {
//         setFormData({
//           name: res.data.name,
//           description: res.data.description,
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//         toast({
//           title: "Error",
//           description: "Failed to load category",
//           variant: "destructive",
//         });
//       });
//   }, [id, toast]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const res = await axios.put(`${apiUrl}/api/categories/${id}`, formData);
//       toast({
//         title: "Category Updated",
//         description: `${res.data.name} updated successfully`,
//       });
//       navigate(`/categories/view/${id}`);
//     } catch (err: any) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: err.response?.data?.message || "Failed to update category",
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400">
//         Loading category...
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center p-6">
//       <Card className="w-full max-w-lg shadow-lg rounded-2xl">
//         <CardHeader>
//           <div className="flex justify-between items-center mb-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => navigate(`/categories/view/${id}`)}
//               className="gap-2"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Button>
//             <CardTitle className="text-4xl md:text-5xl font-extrabold text-center flex-1 tracking-tight">
//               Edit Category
//             </CardTitle>
//           </div>
//           <CardDescription className="text-center text-gray-500">
//             Update category details below
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Category Name */}
//             <div className="space-y-1">
//               <Label htmlFor="name">Category Name</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="space-y-1">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 rows={4}
//               />
//             </div>

//             <Separator />

//             {/* Buttons */}
//             <div className="flex justify-end gap-3">
//               <Button
//                 type="submit"
//                 variant="spiritual"
//                 disabled={saving}
//                 className="gap-2"
//               >
//                 <Save className="w-4 h-4" />{" "}
//                 {saving ? "Saving..." : "Save Changes"}
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => navigate(`/categories/view/${id}`)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
