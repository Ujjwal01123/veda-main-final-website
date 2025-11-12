"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Tag,
  Sparkles,
  HelpCircle,
  IndianRupee,
  Globe,
  Info,
} from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

// ✅ Simple sanitizer
function sanitizeHTML(html: string) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.innerHTML;
}

interface Puja {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: { name: string };
  significance: string;
  process: string;
  image?: string;
  price?: number;
  benefits?: Array<{ _id: string; detail: string }>;
  faqs?: Array<{ _id: string; answer: string }>;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export function ViewPuja() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [puja, setPuja] = useState<Puja | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => setPuja(res.data));
  }, [id]);

  if (!puja) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-temple">
        <p className="text-lg text-muted-foreground animate-pulse">
          Loading Puja details...
        </p>
      </div>
    );
  }

  //
  {
    /* Helper: normalize keywords to an array */
  }
  const normalizeKeywords = (kws: string | string[] | undefined | null) => {
    if (!kws) return [];
    if (Array.isArray(kws))
      return kws.map((x) => String(x).trim()).filter(Boolean);
    // it's a string
    return String(kws)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-temple">
      {/* Sidebar */}
      <Sidebar className="hidden lg:block w-64 fixed top-0 left-0 h-full" />

      {/* Main Content */}
      <div className="flex-1 w-full lg:ml-64">
        {/* Hero Section */}
        <div className="relative bg-gradient-sunrise overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative container mx-auto px-4 py-8 sm:py-12">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/manage")}
              className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to manage pujas
            </Button>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {puja.image && (
                <div className="w-full lg:w-1/3">
                  <div className="relative group">
                    <img
                      src={`${apiUrl}${puja.image}`}
                      alt={puja.title}
                      className={`w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
                        imageLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </div>
                </div>
              )}

              <div className="flex-1 text-center lg:text-left space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  {puja.title}
                </h1>

                {/* ✅ Price */}
                <div className="flex justify-center lg:justify-start items-center gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-4 py-2">
                    <IndianRupee className="mr-1 h-4 w-4" />
                    {puja.price
                      ? `${puja.price.toLocaleString("en-IN")}`
                      : "N/A"}
                  </Badge>
                </div>

                {/* ✅ Short Description */}
                {puja.shortDescription && (
                  <p className="text-white/90 italic max-w-2xl mx-auto lg:mx-0">
                    {puja.shortDescription}
                  </p>
                )}

                {/* ✅ Main Description */}
                {/* <div
                  className="prose prose-sm sm:prose-lg text-white/90 max-w-full lg:max-w-2xl mx-auto lg:mx-0"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(puja.description),
                  }}
                /> */}

                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Tag className="mr-1 h-3 w-3" />
                    {puja.category?.name || "-"}
                  </Badge>
                </div>

                <Button
                  onClick={() => navigate(`/pujas/edit/${puja._id}`)}
                  className="bg-white text-warm-primary hover:bg-white/90 shadow-lg hover:scale-105 transition-all"
                  size="lg"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Puja
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
          {/* description */}
          <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warm-primary">
                <Sparkles className="h-5 w-5" /> About the Puja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm sm:prose-base prose-neutral"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(puja.description),
                }}
              />
            </CardContent>
          </Card>

          {/* Significance & Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warm-primary">
                  <Sparkles className="h-5 w-5" /> Significance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm sm:prose-base prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(puja.significance),
                  }}
                />
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warm-primary">
                  <Sparkles className="h-5 w-5" /> Sacred Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm sm:prose-base prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(puja.process),
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Price Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warm-primary">
                <IndianRupee className="h-5 w-5" /> Price Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-warm-primary">
                {puja.price
                  ? `₹ ${puja.price.toLocaleString("en-IN")}`
                  : "Price not available"}
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          {puja.benefits && puja.benefits.length > 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warm-primary">
                  <Sparkles className="h-5 w-5" /> Divine Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm sm:prose-base prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(puja.benefits[0].detail),
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* FAQs */}
          {puja.faqs && puja.faqs.length > 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warm-primary">
                  <HelpCircle className="h-5 w-5" /> FAQs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm sm:prose-base prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(puja.faqs[0].answer),
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* ✅ SEO Details */}
          {(puja.metaTitle || puja.metaDescription || puja.metaKeywords) && (
            <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warm-primary">
                  <Globe className="h-5 w-5" /> SEO Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {puja.metaTitle && (
                  <p>
                    <strong className="text-warm-primary">Meta Title:</strong>{" "}
                    {puja.metaTitle}
                  </p>
                )}
                {puja.metaDescription && (
                  <p>
                    <strong className="text-warm-primary">
                      Meta Description:
                    </strong>{" "}
                    {puja.metaDescription}
                  </p>
                )}
                {puja.metaKeywords && (
                  <div className="mt-2">
                    <strong className="text-warm-primary">
                      Meta Keywords:
                    </strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {normalizeKeywords(puja.metaKeywords).map(
                        (keyword, i) => (
                          <span
                            key={i}
                            className="inline-block bg-yellow-100/80 text-yellow-900 px-2 py-1 rounded-full text-sm shadow-sm"
                          >
                            {keyword}
                          </span>
                        )
                      )}
                      {normalizeKeywords(puja.metaKeywords).length === 0 && (
                        <span className="text-muted-foreground">
                          No keywords
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   IndianRupee,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar";

// // Simple sanitizer
// function sanitizeHTML(html: string) {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.innerHTML;
// }

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   // date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   price?: number;
//   benefits?: Array<{ _id: string; detail: string }>;
//   faqs?: Array<{ _id: string; answer: string }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => setPuja(res.data));
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-temple">
//         <p className="text-lg text-muted-foreground animate-pulse">
//           Loading Puja details...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-temple">
//       {/* Sidebar */}
//       <Sidebar className="hidden lg:block w-64 fixed top-0 left-0 h-full" />

//       {/* Main Content */}
//       <div className="flex-1 w-full lg:ml-64">
//         {/* Hero Section */}
//         <div className="relative bg-gradient-sunrise overflow-hidden">
//           <div className="absolute inset-0 bg-black/10" />
//           <div className="relative container mx-auto px-4 py-8 sm:py-12">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/dashboard/manage")}
//               className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back to manage pujas
//             </Button>

//             <div className="flex flex-col lg:flex-row gap-8 items-center">
//               {puja.image && (
//                 <div className="w-full lg:w-1/3">
//                   <div className="relative group">
//                     <img
//                       src={`${apiUrl}${puja.image}`}
//                       alt={puja.title}
//                       className={`w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                         imageLoaded
//                           ? "opacity-100 scale-100"
//                           : "opacity-0 scale-95"
//                       }`}
//                       onLoad={() => setImageLoaded(true)}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
//                   </div>
//                 </div>
//               )}

//               <div className="flex-1 text-center lg:text-left space-y-4">
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                   {puja.title}
//                 </h1>

//                 {/* ✅ Price Display */}
//                 <div className="flex justify-center lg:justify-start items-center gap-2">
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-4 py-2">
//                     <IndianRupee className="mr-1 h-4 w-4" />
//                     {puja.price
//                       ? `${puja.price.toLocaleString("en-IN")}`
//                       : "N/A"}
//                   </Badge>
//                 </div>

//                 <div
//                   className="prose prose-sm sm:prose-lg text-white/90 max-w-full lg:max-w-2xl mx-auto lg:mx-0"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.description),
//                   }}
//                 />

//                 <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
//                   {/* <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Calendar className="mr-1 h-3 w-3" />
//                     {new Date(puja.date).toLocaleDateString()}
//                   </Badge> */}
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Tag className="mr-1 h-3 w-3" />
//                     {puja.category?.name || "-"}
//                   </Badge>
//                 </div>

//                 <Button
//                   onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                   className="bg-white text-warm-primary hover:bg-white/90 shadow-lg hover:scale-105 transition-all"
//                   size="lg"
//                 >
//                   <Edit className="mr-2 h-4 w-4" /> Edit Puja
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
//           {/* Significance & Process */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Significance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.significance),
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Sacred Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.process),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* ✅ Price Details Section */}
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <IndianRupee className="h-5 w-5" /> Price Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-lg font-semibold text-warm-primary">
//                 {puja.price
//                   ? `₹ ${puja.price.toLocaleString("en-IN")}`
//                   : "Price not available"}
//               </p>
//             </CardContent>
//           </Card>

//           {/* Benefits */}
//           {puja.benefits && puja.benefits.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Divine Benefits
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.benefits[0].detail),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* FAQs */}
//           {puja.faqs && puja.faqs.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <HelpCircle className="h-5 w-5" /> FAQs
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.faqs[0].answer),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   Star,
//   User,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar";

// // Simple sanitizer (if needed)
// function sanitizeHTML(html: string) {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.innerHTML;
// }

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   benefits?: Array<{ _id: string; detail: string }>;
//   faqs?: Array<{ _id: string; answer: string }>;
//   reviews?: Array<{
//     _id: string;
//     user: string;
//     rating: number;
//     comment: string;
//   }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => setPuja(res.data));
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-temple">
//         <p className="text-lg text-muted-foreground animate-pulse">
//           Loading Puja details...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-temple">
//       {/* Sidebar */}
//       <Sidebar className="hidden lg:block w-64 fixed top-0 left-0 h-full" />

//       {/* Main Content */}
//       <div className="flex-1 w-full lg:ml-64">
//         {/* Hero Section */}
//         <div className="relative bg-gradient-sunrise overflow-hidden">
//           <div className="absolute inset-0 bg-black/10" />
//           <div className="relative container mx-auto px-4 py-8 sm:py-12">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/dashboard")}
//               className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
//             </Button>

//             <div className="flex flex-col lg:flex-row gap-8 items-center">
//               {puja.image && (
//                 <div className="w-full lg:w-1/3">
//                   <div className="relative group">
//                     <img
//                       src={`${apiUrl}${puja.image}`}
//                       alt={puja.title}
//                       className={`w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                         imageLoaded
//                           ? "opacity-100 scale-100"
//                           : "opacity-0 scale-95"
//                       }`}
//                       onLoad={() => setImageLoaded(true)}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
//                   </div>
//                 </div>
//               )}

//               <div className="flex-1 text-center lg:text-left space-y-4">
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                   {puja.title}
//                 </h1>

//                 <div
//                   className="prose prose-sm sm:prose-lg text-white/90 max-w-full lg:max-w-2xl mx-auto lg:mx-0"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.description),
//                   }}
//                 />

//                 <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Calendar className="mr-1 h-3 w-3" />
//                     {new Date(puja.date).toLocaleDateString()}
//                   </Badge>
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Tag className="mr-1 h-3 w-3" />
//                     {puja.category?.name || "-"}
//                   </Badge>
//                 </div>

//                 <Button
//                   onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                   className="bg-white text-warm-primary hover:bg-white/90 shadow-lg hover:scale-105 transition-all"
//                   size="lg"
//                 >
//                   <Edit className="mr-2 h-4 w-4" /> Edit Puja
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
//           {/* Significance & Process */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Significance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.significance),
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Sacred Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.process),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Benefits */}
//           {puja.benefits && puja.benefits.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Divine Benefits
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.benefits[0].detail),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* FAQs */}
//           {puja.faqs && puja.faqs.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <HelpCircle className="h-5 w-5" /> FAQs
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.faqs[0].answer),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* Reviews
//           {puja.reviews && puja.reviews.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Star className="h-5 w-5" /> Reviews
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {puja.reviews.map((r) => (
//                   <div
//                     key={r._id}
//                     className="p-4 bg-warm-surface/30 rounded-lg hover:bg-warm-surface/50 transition-colors"
//                   >
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                       <div>
//                         <h5 className="font-semibold">{r.user}</h5>
//                         <div className="flex items-center gap-1">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < r.rating
//                                   ? "text-warm-accent fill-warm-accent"
//                                   : "text-muted-foreground"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <p>{r.comment}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   Star,
//   User,
//   Menu,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar";

// // Optional sanitization helper
// function sanitizeHTML(html: string) {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.innerHTML;
// }

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   benefits?: Array<{ _id: string; title: string; detail: string }>;
//   faqs?: Array<{ _id: string; question: string; answer: string }>;
//   reviews?: Array<{
//     _id: string;
//     user: string;
//     rating: number;
//     comment: string;
//   }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => {
//       setPuja(res.data);
//     });
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="flex min-h-screen flex-col lg:flex-row">
//         {/* Sidebar */}{" "}
//         <Sidebar
//           open={sidebarOpen}
//           setOpen={setSidebarOpen}
//           className="hidden lg:block w-64 fixed top-0 left-0 h-full"
//         />
//         <div className="flex-1 flex items-center justify-center p-6 lg:ml-64 bg-gradient-temple">
//           <div className="text-center space-y-4">
//             <div className="w-16 h-16 mx-auto bg-gradient-sunrise rounded-full animate-pulse" />
//             <p className="text-xl text-muted-foreground animate-pulse">
//               Loading sacred details...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-temple">
//       {/* Sidebar */}
//       <div
//         className={`fixed z-40 transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:static w-64`}
//       >
//         {" "}
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />{" "}
//       </div>

//       {/* Main content */}
//       <div className="flex-1 w-full lg:ml-64">
//         {/* Mobile toggle
//         <div className="lg:hidden p-4 flex justify-between items-center bg-gradient-temple">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//           <h2 className="text-lg font-semibold text-white">Puja Details</h2>
//         </div> */}
//         {/* Hero Section */}
//         <div className="relative bg-gradient-sunrise overflow-hidden">
//           <div className="absolute inset-0 bg-black/10" />
//           <div className="relative container mx-auto px-4 py-8 sm:py-12">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/dashboard")}
//               className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Dashboard
//             </Button>

//             <div className="flex flex-col lg:flex-row gap-8 items-center">
//               {/* Image */}
//               {puja.image && (
//                 <div className="w-full lg:w-1/3">
//                   <div className="relative group">
//                     <img
//                       src={`${apiUrl}${puja.image}`}
//                       alt={puja.title}
//                       className={`w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                         imageLoaded
//                           ? "opacity-100 scale-100"
//                           : "opacity-0 scale-95"
//                       }`}
//                       onLoad={() => setImageLoaded(true)}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300" />
//                   </div>
//                 </div>
//               )}

//               {/* Title + Info */}
//               <div className="flex-1 text-center lg:text-left space-y-4">
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                   {puja.title}
//                 </h1>

//                 <div
//                   className="prose prose-sm sm:prose-lg text-white/90 max-w-full lg:max-w-2xl mx-auto lg:mx-0"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.description),
//                   }}
//                 />

//                 <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Calendar className="mr-1 h-3 w-3" />
//                     {new Date(puja.date).toLocaleDateString()}
//                   </Badge>
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Tag className="mr-1 h-3 w-3" />
//                     {puja.category?.name || "-"}
//                   </Badge>
//                 </div>

//                 <Button
//                   onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                   className="bg-white text-warm-primary hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
//                   size="lg"
//                 >
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Puja
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Details Section */}
//         <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8">
//           {/* Significance & Process */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Significance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral leading-relaxed"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.significance),
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Sacred Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-sm sm:prose-base prose-neutral leading-relaxed"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.process),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Benefits */}
//           {puja.benefits && puja.benefits.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Divine Benefits
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {puja.benefits.map((b) => (
//                   <div
//                     key={b._id}
//                     className="p-4 bg-warm-surface/50 rounded-lg border-l-4 border-warm-accent hover:bg-warm-surface/70 transition-colors duration-300"
//                   >
//                     <h4 className="font-semibold text-warm-primary mb-2">
//                       {b.title}
//                     </h4>
//                     <p className="text-card-foreground">{b.detail}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* FAQs */}
//           {puja.faqs && puja.faqs.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <HelpCircle className="h-5 w-5" /> FAQs
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {puja.faqs.map((f, i) => (
//                   <div key={f._id} className="space-y-3">
//                     {i > 0 && <Separator className="bg-warm-accent/20" />}
//                     <div className="space-y-2">
//                       <h4 className="font-semibold text-warm-primary flex gap-2">
//                         <span className="bg-warm-accent/20 px-2 py-1 rounded text-sm font-bold">
//                           Q
//                         </span>
//                         {f.question}
//                       </h4>
//                       <p className="text-card-foreground pl-8 leading-relaxed">
//                         {f.answer}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Reviews */}
//           {puja.reviews && puja.reviews.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Star className="h-5 w-5" /> Reviews
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {puja.reviews.map((r) => (
//                   <div
//                     key={r._id}
//                     className="p-4 bg-warm-surface/30 rounded-lg hover:bg-warm-surface/50 transition-colors duration-300"
//                   >
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
//                       <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h5 className="font-semibold text-card-foreground">
//                           {r.user}
//                         </h5>
//                         <div className="flex items-center gap-1 mt-1 sm:mt-0">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < r.rating
//                                   ? "text-warm-accent fill-warm-accent"
//                                   : "text-muted-foreground"
//                               }`}
//                             />
//                           ))}
//                           <span className="text-sm text-muted-foreground ml-1">
//                             ({r.rating}/5)
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-card-foreground leading-relaxed">
//                       {r.comment}
//                     </p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   Star,
//   User,
// } from "lucide-react";
// import { Sidebar } from "@/components/layout/updatedSidebar";

// // Optional sanitization helper
// function sanitizeHTML(html: string) {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.innerHTML;
// }

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   benefits?: Array<{ _id: string; title: string; detail: string }>;
//   faqs?: Array<{ _id: string; question: string; answer: string }>;
//   reviews?: Array<{
//     _id: string;
//     user: string;
//     rating: number;
//     comment: string;
//   }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => {
//       setPuja(res.data);
//     });
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
//           <Sidebar />
//         </div>
//         <div className="flex-1 flex items-center justify-center p-6 ml-64 bg-gradient-temple">
//           <div className="text-center space-y-4">
//             <div className="w-16 h-16 mx-auto bg-gradient-sunrise rounded-full animate-pulse" />{" "}
//             <p className="text-xl text-muted-foreground animate-pulse">
//               Loading sacred details...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-temple">
//       {/* Sidebar */}{" "}
//       <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
//         {" "}
//         <Sidebar />{" "}
//       </div>
//       {/* Main content */}
//       <div className="flex-1 ml-64 w-full">
//         {/* Hero Section */}
//         <div className="relative bg-gradient-sunrise overflow-hidden">
//           <div className="absolute inset-0 bg-black/10" />
//           <div className="relative container mx-auto px-4 py-12">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/dashboard")}
//               className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Dashboard
//             </Button>

//             <div className="flex flex-col lg:flex-row gap-8 items-center">
//               {/* Image */}
//               {puja.image && (
//                 <div className="lg:w-1/3 w-full">
//                   <div className="relative group">
//                     <img
//                       src={`${apiUrl}${puja.image}`}
//                       alt={puja.title}
//                       className={`w-full h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                         imageLoaded
//                           ? "opacity-100 scale-100"
//                           : "opacity-0 scale-95"
//                       }`}
//                       onLoad={() => setImageLoaded(true)}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300" />
//                   </div>
//                 </div>
//               )}

//               {/* Title + Info */}
//               <div className="lg:flex-1 text-center lg:text-left space-y-4">
//                 <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                   {puja.title}
//                 </h1>

//                 <div
//                   className="prose prose-lg text-white/90 max-w-2xl mx-auto lg:mx-0"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.description),
//                   }}
//                 />

//                 <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Calendar className="mr-1 h-3 w-3" />
//                     {new Date(puja.date).toLocaleDateString()}
//                   </Badge>
//                   <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                     <Tag className="mr-1 h-3 w-3" />
//                     {puja.category?.name || "-"}
//                   </Badge>
//                 </div>

//                 <Button
//                   onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                   className="bg-white text-warm-primary hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105"
//                   size="lg"
//                 >
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Puja
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="container mx-auto px-4 py-12 space-y-8">
//           {/* Significance & Process */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Significance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-neutral leading-relaxed"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.significance),
//                   }}
//                 />
//               </CardContent>
//             </Card>

//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Sacred Process
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div
//                   className="prose prose-neutral leading-relaxed"
//                   dangerouslySetInnerHTML={{
//                     __html: sanitizeHTML(puja.process),
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Benefits */}
//           {puja.benefits && puja.benefits.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Sparkles className="h-5 w-5" /> Divine Benefits
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {puja.benefits.map((b) => (
//                   <div
//                     key={b._id}
//                     className="p-4 bg-warm-surface/50 rounded-lg border-l-4 border-warm-accent hover:bg-warm-surface/70 transition-colors duration-300"
//                   >
//                     <h4 className="font-semibold text-warm-primary mb-2">
//                       {b.title}
//                     </h4>
//                     <p className="text-card-foreground">{b.detail}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* FAQs */}
//           {puja.faqs && puja.faqs.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <HelpCircle className="h-5 w-5" /> FAQs
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {puja.faqs.map((f, i) => (
//                   <div key={f._id} className="space-y-3">
//                     {i > 0 && <Separator className="bg-warm-accent/20" />}
//                     <div className="space-y-2">
//                       <h4 className="font-semibold text-warm-primary flex gap-2">
//                         <span className="bg-warm-accent/20 px-2 py-1 rounded text-sm font-bold">
//                           Q
//                         </span>
//                         {f.question}
//                       </h4>
//                       <p className="text-card-foreground pl-8 leading-relaxed">
//                         {f.answer}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}

//           {/* Reviews */}
//           {puja.reviews && puja.reviews.length > 0 && (
//             <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-warm-primary">
//                   <Star className="h-5 w-5" /> Reviews
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {puja.reviews.map((r) => (
//                   <div
//                     key={r._id}
//                     className="p-4 bg-warm-surface/30 rounded-lg hover:bg-warm-surface/50 transition-colors duration-300"
//                   >
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h5 className="font-semibold text-card-foreground">
//                           {r.user}
//                         </h5>
//                         <div className="flex items-center gap-1">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 ${
//                                 i < r.rating
//                                   ? "text-warm-accent fill-warm-accent"
//                                   : "text-muted-foreground"
//                               }`}
//                             />
//                           ))}
//                           <span className="text-sm text-muted-foreground ml-1">
//                             ({r.rating}/5)
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-card-foreground leading-relaxed">
//                       {r.comment}
//                     </p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   Star,
//   User,
// } from "lucide-react";

// // Optional sanitization helper
// function sanitizeHTML(html: string) {
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   return temp.innerHTML;
// }

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   benefits?: Array<{ _id: string; title: string; detail: string }>;
//   faqs?: Array<{ _id: string; question: string; answer: string }>;
//   reviews?: Array<{
//     _id: string;
//     user: string;
//     rating: number;
//     comment: string;
//   }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => {
//       setPuja(res.data);
//     });
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="min-h-screen bg-gradient-temple flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 mx-auto bg-gradient-sunrise rounded-full animate-pulse" />
//           <p className="text-xl text-muted-foreground animate-pulse">
//             Loading sacred details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-temple">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-sunrise overflow-hidden">
//         <div className="absolute inset-0 bg-black/10" />
//         <div className="relative container mx-auto px-4 py-12">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/dashboard")}
//             className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>

//           <div className="flex flex-col lg:flex-row gap-8 items-center">
//             {/* Image */}
//             {puja.image && (
//               <div className="lg:w-1/3 w-full">
//                 <div className="relative group">
//                   <img
//                     src={`${apiUrl}${puja.image}`}
//                     alt={puja.title}
//                     className={`w-full h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                       imageLoaded
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-95"
//                     }`}
//                     onLoad={() => setImageLoaded(true)}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300" />
//                 </div>
//               </div>
//             )}

//             {/* Title + Info */}
//             <div className="lg:flex-1 text-center lg:text-left space-y-4">
//               <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                 {puja.title}
//               </h1>

//               {/* Description as HTML */}
//               <div
//                 className="prose prose-lg text-white/90 max-w-2xl mx-auto lg:mx-0"
//                 dangerouslySetInnerHTML={{
//                   __html: sanitizeHTML(puja.description),
//                 }}
//               />

//               <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                   <Calendar className="mr-1 h-3 w-3" />
//                   {new Date(puja.date).toLocaleDateString()}
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                   <Tag className="mr-1 h-3 w-3" />
//                   {puja.category?.name || "-"}
//                 </Badge>
//               </div>

//               <Button
//                 onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                 className="bg-white text-warm-primary hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105"
//                 size="lg"
//               >
//                 <Edit className="mr-2 h-4 w-4" />
//                 Edit Puja
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="container mx-auto px-4 py-12 space-y-8">
//         {/* Significance & Process */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Significance
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="prose prose-neutral leading-relaxed"
//                 dangerouslySetInnerHTML={{
//                   __html: sanitizeHTML(puja.significance),
//                 }}
//               />
//             </CardContent>
//           </Card>

//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Sacred Process
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="prose prose-neutral leading-relaxed"
//                 dangerouslySetInnerHTML={{
//                   __html: sanitizeHTML(puja.process),
//                 }}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Benefits */}
//         {puja.benefits && puja.benefits.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Divine Benefits
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {puja.benefits.map((b) => (
//                 <div
//                   key={b._id}
//                   className="p-4 bg-warm-surface/50 rounded-lg border-l-4 border-warm-accent hover:bg-warm-surface/70 transition-colors duration-300"
//                 >
//                   <h4 className="font-semibold text-warm-primary mb-2">
//                     {b.title}
//                   </h4>
//                   <p className="text-card-foreground">{b.detail}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* FAQs */}
//         {puja.faqs && puja.faqs.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <HelpCircle className="h-5 w-5" /> FAQs
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {puja.faqs.map((f, i) => (
//                 <div key={f._id} className="space-y-3">
//                   {i > 0 && <Separator className="bg-warm-accent/20" />}
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-warm-primary flex gap-2">
//                       <span className="bg-warm-accent/20 px-2 py-1 rounded text-sm font-bold">
//                         Q
//                       </span>
//                       {f.question}
//                     </h4>
//                     <p className="text-card-foreground pl-8 leading-relaxed">
//                       {f.answer}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* Reviews */}
//         {puja.reviews && puja.reviews.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Star className="h-5 w-5" /> Reviews
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {puja.reviews.map((r) => (
//                 <div
//                   key={r._id}
//                   className="p-4 bg-warm-surface/30 rounded-lg hover:bg-warm-surface/50 transition-colors duration-300"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
//                       <User className="h-5 w-5 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h5 className="font-semibold text-card-foreground">
//                         {r.user}
//                       </h5>
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-4 w-4 ${
//                               i < r.rating
//                                 ? "text-warm-accent fill-warm-accent"
//                                 : "text-muted-foreground"
//                             }`}
//                           />
//                         ))}
//                         <span className="text-sm text-muted-foreground ml-1">
//                           ({r.rating}/5)
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-card-foreground leading-relaxed">
//                     {r.comment}
//                   </p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   Tag,
//   Sparkles,
//   HelpCircle,
//   Star,
//   User,
// } from "lucide-react";

// interface Puja {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   category: { name: string };
//   significance: string;
//   process: string;
//   image?: string;
//   benefits?: Array<{ _id: string; title: string; detail: string }>;
//   faqs?: Array<{ _id: string; question: string; answer: string }>;
//   reviews?: Array<{
//     _id: string;
//     user: string;
//     rating: number;
//     comment: string;
//   }>;
// }

// export function ViewPuja() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [puja, setPuja] = useState<Puja | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios.get(`${apiUrl}/api/pujas/${id}`).then((res) => {
//       setPuja(res.data);
//     });
//   }, [id]);

//   if (!puja) {
//     return (
//       <div className="min-h-screen bg-gradient-temple flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 mx-auto bg-gradient-sunrise rounded-full animate-pulse" />
//           <p className="text-xl text-muted-foreground animate-pulse">
//             Loading sacred details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-temple">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-sunrise overflow-hidden">
//         <div className="absolute inset-0 bg-black/10" />
//         <div className="relative container mx-auto px-4 py-12">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/dashboard")}
//             className="mb-6 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>

//           <div className="flex flex-col lg:flex-row gap-8 items-center">
//             {/* Image */}
//             {puja.image && (
//               <div className="lg:w-1/3 w-full">
//                 <div className="relative group">
//                   <img
//                     src={`${apiUrl}${puja.image}`}
//                     alt={puja.title}
//                     className={`w-full h-80 lg:h-96 object-cover rounded-2xl shadow-warm transition-all duration-700 ${
//                       imageLoaded
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-95"
//                     }`}
//                     onLoad={() => setImageLoaded(true)}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300" />
//                 </div>
//               </div>
//             )}

//             {/* Title + Info */}
//             <div className="lg:flex-1 text-center lg:text-left space-y-4">
//               <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
//                 {puja.title}
//               </h1>
//               <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
//                 {puja.description}
//               </p>

//               <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                   <Calendar className="mr-1 h-3 w-3" />
//                   {new Date(puja.date).toLocaleDateString()}
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
//                   <Tag className="mr-1 h-3 w-3" />
//                   {puja.category?.name || "-"}
//                 </Badge>
//               </div>

//               <Button
//                 onClick={() => navigate(`/pujas/edit/${puja._id}`)}
//                 className="bg-white text-warm-primary hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105"
//                 size="lg"
//               >
//                 <Edit className="mr-2 h-4 w-4" />
//                 Edit Puja
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="container mx-auto px-4 py-12 space-y-8">
//         {/* Significance & Process */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Significance
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-card-foreground leading-relaxed">
//                 {puja.significance}
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft hover:shadow-warm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Sacred Process
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-card-foreground leading-relaxed">
//                 {puja.process}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Benefits */}
//         {puja.benefits && puja.benefits.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Sparkles className="h-5 w-5" /> Divine Benefits
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {puja.benefits.map((b) => (
//                 <div
//                   key={b._id}
//                   className="p-4 bg-warm-surface/50 rounded-lg border-l-4 border-warm-accent hover:bg-warm-surface/70 transition-colors duration-300"
//                 >
//                   <h4 className="font-semibold text-warm-primary mb-2">
//                     {b.title}
//                   </h4>
//                   <p className="text-card-foreground">{b.detail}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* FAQs */}
//         {puja.faqs && puja.faqs.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <HelpCircle className="h-5 w-5" /> FAQs
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {puja.faqs.map((f, i) => (
//                 <div key={f._id} className="space-y-3">
//                   {i > 0 && <Separator className="bg-warm-accent/20" />}
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-warm-primary flex gap-2">
//                       <span className="bg-warm-accent/20 px-2 py-1 rounded text-sm font-bold">
//                         Q
//                       </span>
//                       {f.question}
//                     </h4>
//                     <p className="text-card-foreground pl-8 leading-relaxed">
//                       {f.answer}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* Reviews */}
//         {puja.reviews && puja.reviews.length > 0 && (
//           <Card className="bg-card/80 backdrop-blur-sm border-warm-accent/20 shadow-soft">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-warm-primary">
//                 <Star className="h-5 w-5" /> Reviews
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {puja.reviews.map((r) => (
//                 <div
//                   key={r._id}
//                   className="p-4 bg-warm-surface/30 rounded-lg hover:bg-warm-surface/50 transition-colors duration-300"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
//                       <User className="h-5 w-5 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h5 className="font-semibold text-card-foreground">
//                         {r.user}
//                       </h5>
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-4 w-4 ${
//                               i < r.rating
//                                 ? "text-warm-accent fill-warm-accent"
//                                 : "text-muted-foreground"
//                             }`}
//                           />
//                         ))}
//                         <span className="text-sm text-muted-foreground ml-1">
//                           ({r.rating}/5)
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-card-foreground leading-relaxed">
//                     {r.comment}
//                   </p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }
