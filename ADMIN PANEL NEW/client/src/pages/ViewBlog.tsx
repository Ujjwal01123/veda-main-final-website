import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ViewBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const getBaseUrl = (url: string) => {
    if (!url) return "";
    return url.replace(/\/api\/?$/, "");
  };

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/blogs/${id}`);
        setBlog(res.data.data.blog);
      } catch (err) {
        console.error(err);
        alert("Failed to load blog details");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 ml-64">
          <p className="text-muted-foreground">Loading blog...</p>
        </div>
      </div>
    );
  }

  const baseUrl = getBaseUrl(apiUrl);
  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : `${baseUrl}${blog.image}`;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* Fixed Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/manage-blogs")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Button>

          {/* Blog Card */}
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent text-center">
                {blog.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {blog.image && (
                <div className="flex justify-center">
                  <img
                    src={imageUrl}
                    alt={blog.title}
                    className="w-full max-w-lg max-h-[500px] object-contain rounded-md border border-orange-200 shadow-md"
                  />
                </div>
              )}

              <Separator className="my-6 bg-orange-200" />

              <div
                className="prose prose-orange max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-h1:text-3xl prose-h2:text-2xl prose-p:my-2 prose-img:rounded-lg prose-a:text-orange-600 hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft } from "lucide-react";

// export function ViewBlog() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [blog, setBlog] = useState<any>(null);
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   // ✅ Helper: remove /api if present in apiUrl for images
//   const getBaseUrl = (url: string) => {
//     if (!url) return "";
//     return url.replace(/\/api\/?$/, "");
//   };

//   useEffect(() => {
//     if (!id) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/blogs/${id}`);
//         setBlog(res.data.data.blog);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load blog details");
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-muted-foreground">Loading blog...</p>
//       </div>
//     );
//   }

//   // ✅ Construct proper image URL
//   const baseUrl = getBaseUrl(apiUrl);
//   const imageUrl = blog.image?.startsWith("http")
//     ? blog.image
//     : `${baseUrl}${blog.image}`;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Back Button */}
//         <Button
//           variant="outline"
//           onClick={() => navigate("/dashboard/manage-blogs")}
//           className="mb-4 gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to Blogs
//         </Button>

//         {/* Blog Card */}
//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent text-center">
//               {blog.title}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Blog Image */}
//             {blog.image && (
//               <div className="flex justify-center">
//                 <img
//                   src={imageUrl}
//                   alt={blog.title}
//                   className="w-full max-w-lg max-h-[500px] object-contain rounded-md border border-orange-200 shadow-md"
//                 />
//               </div>
//             )}

//             <Separator className="my-6 bg-orange-200" />

//             {/* Blog Content */}
//             <div
//               className="prose prose-orange max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-h1:text-3xl prose-h2:text-2xl prose-p:my-2 prose-img:rounded-lg prose-a:text-orange-600 hover:prose-a:underline"
//               dangerouslySetInnerHTML={{ __html: blog.content }}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft } from "lucide-react";

// export function ViewBlog() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [blog, setBlog] = useState<any>(null);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     if (!id) return;
//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/blogs/${id}`);
//         console.log(res.data.data.blog.image);
//         setBlog(res.data.data.blog);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load blog details");
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-muted-foreground">Loading blog...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Button
//           variant="outline"
//           onClick={() => navigate("/dashboard/manage-blogs")}
//           className="mb-4 gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to Blogs
//         </Button>

//         <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
//               {blog.title}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {blog.image && (
//               <img
//                 src={`${apiUrl}${blog.image}`}
//                 alt={blog.title}
//                 className="w-full max-w-md max-h-96 object-contain rounded-md border mx-auto"
//               />
//             )}

//             <Separator className="my-4" />

//             <div
//               className="prose max-w-full"
//               dangerouslySetInnerHTML={{ __html: blog.content }}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
