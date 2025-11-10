"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  ArrowLeft,
  Sparkles,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";

export function BraceletBanner() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [altTexts, setAltTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ✅ Handle image selection (up to 6)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) {
      alert("⚠️ Please select between 1 and 6 images!");
      return;
    }
    if (files.length > 6) {
      alert("⚠️ You can upload a maximum of 6 images!");
      e.target.value = "";
      return;
    }

    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    setAltTexts(new Array(files.length).fill(""));
  };

  const handleAltTextChange = (index: number, value: string) => {
    const updatedAltTexts = [...altTexts];
    updatedAltTexts[index] = value;
    setAltTexts(updatedAltTexts);
  };

  // ✅ Upload images to backend
  const handleUpload = async () => {
    if (images.length === 0) return alert("⚠️ Please select at least 1 image!");
    if (images.length > 6)
      return alert("⚠️ You can upload a maximum of 6 images!");
    if (altTexts.some((txt) => !txt.trim()))
      return alert("⚠️ Please provide alt text for all images!");

    try {
      setLoading(true);
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));
      altTexts.forEach((txt) => formData.append("altText", txt));
      formData.append("sectionName", "bracelet");

      const res = await axios.post(`${apiUrl}/api/banners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Bracelet banners uploaded successfully!");
        setImages([]);
        setPreviews([]);
        setAltTexts([]);
        navigate("/banners/view/bracelet");
      } else {
        alert("❌ Failed to upload banners. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-background to-accent/5">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>

          {/* Upload Section */}
          <Card className="bg-gradient-card border-border/50 shadow-card p-6">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Upload Bracelet Banners (Up to 6 Images)
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              {/* Preview Area */}
              {previews.length > 0 ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}
                >
                  {previews.map((src, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 border rounded-xl p-3 shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="rounded-lg shadow-md border w-full h-40 object-cover"
                      />
                      <Input
                        type="text"
                        placeholder={`Alt text ${index + 1}`}
                        value={altTexts[index]}
                        onChange={(e) =>
                          handleAltTextChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
                  <p>No images selected yet</p>
                </div>
              )}

              {/* Choose Images */}
              <div className="flex flex-col mt-4">
                <Label>Select Up to 6 Banner Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can upload <strong>1 to 6 images</strong>. Recommended
                  size: <strong>1920x600 px</strong>
                </p>
              </div>

              {/* Upload Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="spiritual"
                  onClick={handleUpload}
                  disabled={loading}
                  className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" /> Upload Banners
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>
              Highlight your bracelet collection with stunning banners ✨
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar added
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Gem,
//   Upload,
//   ArrowLeft,
//   Sparkles,
//   Loader2,
//   Image as ImageIcon,
// } from "lucide-react";
// import axios from "axios";

// export function BraceletBanner() {
//   const navigate = useNavigate();
//   const [images, setImages] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [altTexts, setAltTexts] = useState<string[]>(["", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const apiUrl =
//     import.meta.env.VITE_API_URL ||
//     "[http://localhost:5000](http://localhost:5000)";

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     if (files.length !== 3) {
//       alert("⚠️ Please select exactly 3 images!");
//       e.target.value = "";
//       setImages([]);
//       setPreviews([]);
//       return;
//     }
//     setImages(files);
//     setPreviews(files.map((file) => URL.createObjectURL(file)));
//   };

//   const handleAltTextChange = (index: number, value: string) => {
//     const updatedAltTexts = [...altTexts];
//     updatedAltTexts[index] = value;
//     setAltTexts(updatedAltTexts);
//   };

//   const handleUpload = async () => {
//     if (images.length !== 3)
//       return alert("⚠️ You must upload exactly 3 images!");
//     if (altTexts.some((txt) => !txt.trim()))
//       return alert("⚠️ Provide alt text for all 3 images!");

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       images.forEach((img) => formData.append("images", img));
//       altTexts.forEach((txt) => formData.append("altText", txt));
//       formData.append("sectionName", "bracelet");

//       const res = await axios.post(`${apiUrl}/api/banners`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         alert("✅ Bracelet banners uploaded successfully!");
//         setImages([]);
//         setPreviews([]);
//         setAltTexts(["", "", ""]);
//         navigate("/banners/view/bracelet");
//       } else {
//         alert("❌ Failed to upload banners. Please try again.");
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert(error.response?.data?.message || "❌ Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-background to-accent/5">
//       {/* ✅ Sidebar */}{" "}
//       <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md">
//         <Sidebar />
//       </div>
//       {/* ✅ Main content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Back Button */}
//           <Button
//             variant="ghost"
//             onClick={() => navigate(-1)}
//             className="text-muted-foreground"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back
//           </Button>

//           {/* Upload Section */}
//           <Card className="bg-gradient-card border-border/50 shadow-card p-6">
//             <CardHeader>
//               <CardTitle className="text-center text-xl font-semibold">
//                 Upload 3 Bracelet Banners
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-6">
//               {/* Preview Area */}
//               {previews.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {previews.map((src, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col items-center gap-3 border rounded-xl p-3 shadow-sm"
//                     >
//                       <img
//                         src={src}
//                         alt={`Preview ${index + 1}`}
//                         className="rounded-lg shadow-md border w-full h-40 object-cover"
//                       />
//                       <Input
//                         type="text"
//                         placeholder={`Alt text ${index + 1}`}
//                         value={altTexts[index]}
//                         onChange={(e) =>
//                           handleAltTextChange(index, e.target.value)
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
//                   <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
//                   <p>No images selected yet</p>
//                 </div>
//               )}

//               {/* Choose Images */}
//               <div className="flex flex-col mt-4">
//                 <Label>Select 3 Banner Images</Label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleFileChange}
//                   className="mt-2"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   You must select <strong>exactly 3 images</strong>. Recommended
//                   size: <strong>1920x600 px</strong>
//                 </p>
//               </div>

//               {/* Upload Button */}
//               <div className="mt-8 flex justify-center">
//                 <Button
//                   variant="spiritual"
//                   onClick={handleUpload}
//                   disabled={loading}
//                   className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-5 h-5" /> Upload 3 Banners
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Footer */}
//           <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
//             <Sparkles className="w-4 h-4" />
//             <span>
//               Highlight your bracelet collection with stunning banners ✨
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Gem,
//   Upload,
//   ArrowLeft,
//   Sparkles,
//   Loader2,
//   Image as ImageIcon,
// } from "lucide-react";
// import axios from "axios";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";

// export function BraceletBanner() {
//   const navigate = useNavigate();

//   // 🖼️ Handle exactly 3 images
//   const [images, setImages] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [altTexts, setAltTexts] = useState<string[]>(["", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   // 📤 Handle file input (3 images exactly)
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     if (files.length !== 3) {
//       alert("⚠️ Please select exactly 3 images!");
//       e.target.value = "";
//       setImages([]);
//       setPreviews([]);
//       return;
//     }
//     setImages(files);
//     setPreviews(files.map((file) => URL.createObjectURL(file)));
//   };

//   // 🧾 Handle alt text input
//   const handleAltTextChange = (index: number, value: string) => {
//     const updatedAltTexts = [...altTexts];
//     updatedAltTexts[index] = value;
//     setAltTexts(updatedAltTexts);
//   };

//   // 🚀 Upload handler
//   const handleUpload = async () => {
//     if (images.length !== 3)
//       return alert("⚠️ You must upload exactly 3 images!");
//     if (altTexts.some((txt) => !txt.trim()))
//       return alert("⚠️ Please provide alt text for all 3 images!");

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       images.forEach((img) => formData.append("images", img));
//       altTexts.forEach((txt) => formData.append("altText", txt));
//       formData.append("sectionName", "bracelet");

//       const res = await axios.post(`${apiUrl}/api/banners`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         alert("✅ Bracelet banners uploaded successfully!");
//         setImages([]);
//         setPreviews([]);
//         setAltTexts(["", "", ""]);
//         navigate("/banners/view/bracelet");
//       } else {
//         alert("❌ Failed to upload banners. Please try again.");
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert(error.response?.data?.message || "❌ Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout activeSection="banners">
//       <div className="min-h-screen bg-gradient-to-br from-pink-100 via-background to-accent/5 p-6">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Back Button */}
//           <Button
//             variant="ghost"
//             onClick={() => navigate(-1)}
//             className="text-muted-foreground"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back
//           </Button>

//           {/* Header */}
//           <div className="text-center space-y-2">
//             <div className="flex justify-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//                 <Gem className="w-6 h-6 text-spiritual-foreground" />
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//                 Bracelet Banner Settings
//               </h1>
//             </div>
//             <p className="text-muted-foreground max-w-lg mx-auto">
//               Upload <strong>exactly 3 banners</strong> for the Bracelet
//               section, each with unique alt text and preview.
//             </p>
//           </div>

//           {/* Upload Section */}
//           <Card className="bg-gradient-card border-border/50 shadow-card p-6">
//             <CardHeader>
//               <CardTitle className="text-center text-xl font-semibold">
//                 Upload 3 Bracelet Banners
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="flex flex-col gap-6">
//               {/* Preview Area */}
//               {previews.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {previews.map((src, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col items-center gap-3 border rounded-xl p-3 shadow-sm"
//                     >
//                       <img
//                         src={src}
//                         alt={`Preview ${index + 1}`}
//                         className="rounded-lg shadow-md border w-full h-40 object-cover"
//                       />
//                       <Input
//                         type="text"
//                         placeholder={`Alt text ${index + 1}`}
//                         value={altTexts[index]}
//                         onChange={(e) =>
//                           handleAltTextChange(index, e.target.value)
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
//                   <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
//                   <p>No images selected yet</p>
//                 </div>
//               )}

//               {/* Choose Images */}
//               <div className="flex flex-col mt-4">
//                 <Label>Select 3 Banner Images</Label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleFileChange}
//                   className="mt-2"
//                 />
//                 <p className="text-xs text-muted-foreground mt-1">
//                   You must select <strong>exactly 3 images</strong>. Recommended
//                   size: <strong>1920x600 px</strong>
//                 </p>
//               </div>

//               {/* Upload Button */}
//               <div className="mt-8 flex justify-center">
//                 <Button
//                   variant="spiritual"
//                   onClick={handleUpload}
//                   disabled={loading}
//                   className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-5 h-5" /> Upload 3 Banners
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Footer */}
//           <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
//             <Sparkles className="w-4 h-4" />
//             <span>
//               Highlight your bracelet collection with stunning banners ✨
//             </span>
//             <Sparkles className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Gem,
//   Upload,
//   ArrowLeft,
//   Sparkles,
//   Loader2,
//   Image as ImageIcon,
// } from "lucide-react";
// import axios from "axios";

// export function BraceletBanner() {
//   const navigate = useNavigate();

//   // 🖼️ Handle exactly 3 images
//   const [images, setImages] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [altTexts, setAltTexts] = useState<string[]>(["", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   // 📤 Handle file input (3 images exactly)
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     if (files.length !== 3) {
//       alert("⚠️ Please select exactly 3 images!");
//       e.target.value = "";
//       setImages([]);
//       setPreviews([]);
//       return;
//     }
//     setImages(files);
//     setPreviews(files.map((file) => URL.createObjectURL(file)));
//   };

//   // 🧾 Handle alt text input
//   const handleAltTextChange = (index: number, value: string) => {
//     const updatedAltTexts = [...altTexts];
//     updatedAltTexts[index] = value;
//     setAltTexts(updatedAltTexts);
//   };

//   // 🚀 Upload handler
//   const handleUpload = async () => {
//     if (images.length !== 3)
//       return alert("⚠️ You must upload exactly 3 images!");
//     if (altTexts.some((txt) => !txt.trim()))
//       return alert("⚠️ Please provide alt text for all 3 images!");

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       images.forEach((img) => formData.append("images", img));
//       altTexts.forEach((txt) => formData.append("altText", txt));
//       formData.append("sectionName", "bracelet");

//       const res = await axios.post(`${apiUrl}/api/banners`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         alert("✅ Bracelet banners uploaded successfully!");
//         setImages([]);
//         setPreviews([]);
//         setAltTexts(["", "", ""]);
//         navigate("/banners/view/bracelet");
//       } else {
//         alert("❌ Failed to upload banners. Please try again.");
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert(error.response?.data?.message || "❌ Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 via-background to-accent/5 p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           onClick={() => navigate(-1)}
//           className="text-muted-foreground"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Back
//         </Button>

//         {/* Header */}
//         <div className="text-center space-y-2">
//           <div className="flex justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
//               <Gem className="w-6 h-6 text-spiritual-foreground" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
//               Bracelet Banner Settings
//             </h1>
//           </div>
//           <p className="text-muted-foreground max-w-lg mx-auto">
//             Upload <strong>exactly 3 banners</strong> for the Bracelet section,
//             each with unique alt text and preview.
//           </p>
//         </div>

//         {/* Upload Section */}
//         <Card className="bg-gradient-card border-border/50 shadow-card p-6">
//           <CardHeader>
//             <CardTitle className="text-center text-xl font-semibold">
//               Upload 3 Bracelet Banners
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="flex flex-col gap-6">
//             {/* Preview Area */}
//             {previews.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {previews.map((src, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col items-center gap-3 border rounded-xl p-3 shadow-sm"
//                   >
//                     <img
//                       src={src}
//                       alt={`Preview ${index + 1}`}
//                       className="rounded-lg shadow-md border w-full h-40 object-cover"
//                     />
//                     <Input
//                       type="text"
//                       placeholder={`Alt text ${index + 1}`}
//                       value={altTexts[index]}
//                       onChange={(e) =>
//                         handleAltTextChange(index, e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
//                 <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
//                 <p>No images selected yet</p>
//               </div>
//             )}

//             {/* Choose Images */}
//             <div className="flex flex-col mt-4">
//               <Label>Select 3 Banner Images</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleFileChange}
//                 className="mt-2"
//               />
//               <p className="text-xs text-muted-foreground mt-1">
//                 You must select <strong>exactly 3 images</strong>. Recommended
//                 size: <strong>1920x600 px</strong>
//               </p>
//             </div>

//             {/* Upload Button */}
//             <div className="mt-8 flex justify-center">
//               <Button
//                 variant="spiritual"
//                 onClick={handleUpload}
//                 disabled={loading}
//                 className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="w-5 h-5" /> Upload 3 Banners
//                   </>
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
//           <Sparkles className="w-4 h-4" />
//           <span>
//             Highlight your bracelet collection with stunning banners ✨
//           </span>
//           <Sparkles className="w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Gem,
// //   Upload,
// //   ArrowLeft,
// //   Sparkles,
// //   Loader2,
// //   Image as ImageIcon,
// // } from "lucide-react";
// // import axios from "axios";

// // export function BraceletBanner() {
// //   const navigate = useNavigate();
// //   const [image, setImage] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [altText, setAltText] = useState<string>("");
// //   const [loading, setLoading] = useState(false);

// //   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const handleUpload = async () => {
// //     if (!image) return alert("⚠️ Please select a banner image first!");
// //     if (!altText.trim()) return alert("⚠️ Please provide alt text!");

// //     try {
// //       setLoading(true);
// //       const formData = new FormData();
// //       formData.append("image", image);
// //       formData.append("sectionName", "bracelet");
// //       formData.append("altText", altText);

// //       const res = await axios.post(`${apiUrl}/api/banners`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       if (res.data.success) {
// //         alert("✅ Bracelet banner uploaded successfully!");
// //         setImage(null);
// //         setPreview(null);
// //         setAltText("");
// //         navigate("/banners/view"); // <-- navigate to view banners page
// //       } else {
// //         alert("❌ Failed to upload banner. Please try again.");
// //       }
// //     } catch (error: any) {
// //       console.error(error);
// //       alert(error.response?.data?.message || "❌ Something went wrong.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-pink-100 via-background to-accent/5 p-6">
// //       <div className="max-w-3xl mx-auto space-y-8">
// //         {/* Back Button */}
// //         <Button
// //           variant="ghost"
// //           onClick={() => navigate(-1)}
// //           className="text-muted-foreground"
// //         >
// //           <ArrowLeft className="w-5 h-5 mr-2" /> Back
// //         </Button>

// //         {/* Header */}
// //         <div className="text-center space-y-2">
// //           <div className="flex justify-center gap-3 mb-4">
// //             <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
// //               <Gem className="w-6 h-6 text-spiritual-foreground" />
// //             </div>
// //             <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
// //               Bracelet Banner Settings
// //             </h1>
// //           </div>
// //           <p className="text-muted-foreground max-w-lg mx-auto">
// //             Upload and preview the Bracelet section banner with custom alt text
// //             for SEO.
// //           </p>
// //         </div>

// //         {/* Upload Section */}
// //         <Card className="bg-gradient-card border-border/50 shadow-card p-6">
// //           <CardHeader>
// //             <CardTitle className="text-center text-xl font-semibold">
// //               Upload Bracelet Banner
// //             </CardTitle>
// //           </CardHeader>

// //           <CardContent className="flex flex-col gap-6">
// //             {/* Preview Area */}
// //             {preview ? (
// //               <img
// //                 src={preview}
// //                 alt={altText || "Bracelet Banner Preview"}
// //                 className="rounded-xl shadow-lg border w-full max-h-80 object-cover"
// //               />
// //             ) : (
// //               <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
// //                 <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
// //                 <p>No banner selected yet</p>
// //               </div>
// //             )}

// //             {/* Input Fields */}
// //             <div className="flex flex-col gap-5 mt-2">
// //               {/* Choose Image */}
// //               <div>
// //                 <Label>Select Banner Image</Label>
// //                 <Input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleFileChange}
// //                   className="mt-2"
// //                 />
// //                 <p className="text-xs text-muted-foreground mt-1">
// //                   Recommended Size: <strong>1920x600</strong> px
// //                 </p>
// //               </div>

// //               {/* Alt Text Input */}
// //               <div>
// //                 <Label htmlFor="altText">Alt Text (SEO & Accessibility)</Label>
// //                 <Input
// //                   id="altText"
// //                   type="text"
// //                   placeholder="e.g. Bracelet collection banner with vibrant gemstones"
// //                   value={altText}
// //                   onChange={(e) => setAltText(e.target.value)}
// //                   className="mt-2"
// //                 />
// //               </div>
// //             </div>

// //             {/* Upload Button */}
// //             <div className="mt-8 flex justify-center">
// //               <Button
// //                 variant="spiritual"
// //                 onClick={handleUpload}
// //                 disabled={loading}
// //                 className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Upload className="w-5 h-5" /> Upload Banner
// //                   </>
// //                 )}
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Footer */}
// //         <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
// //           <Sparkles className="w-4 h-4" />
// //           <span>
// //             Highlight your bracelet collection with a stunning banner ✨
// //           </span>
// //           <Sparkles className="w-4 h-4" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
