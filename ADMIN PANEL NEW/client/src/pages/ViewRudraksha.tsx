import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Star, Package, CircleCheck } from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

interface Rudraksha {
  _id: string;
  productName: string;
  stock: number;
  productPrice: number;
  productDiscount: number;
  productImage: string[];
  productPath: string[];
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
  shopifyLink?: string;
  youtubeLink?: string;
  createdAt: string;
  updatedAt: string;
}

const PriceDisplay = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  const discountedPrice = price * (1 - discount / 100);
  return (
    <div className="flex items-baseline gap-2">
      {" "}
      <span className="text-3xl font-extrabold text-primary">
        ₹{discountedPrice.toFixed(2)}{" "}
      </span>
      {discount > 0 && (
        <>
          {" "}
          <span className="text-lg text-muted-foreground line-through">
            ₹{price.toFixed(2)}{" "}
          </span>{" "}
          <Badge variant="destructive" className="text-sm font-semibold">
            {discount}% OFF{" "}
          </Badge>
        </>
      )}{" "}
    </div>
  );
};

export function ViewRudraksha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rudraksha, setRudraksha] = useState<Rudraksha | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/rudraksha/${id}`)
      .then((res) => {
        const data = res.data.data.rudraksha;
        setRudraksha(data);
        if (data.productImage?.length > 0) setMainImage(data.productImage[0]);
      })
      .catch(console.error);
  }, [id]);

  if (!rudraksha) {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar{" "} */}
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <p className="text-xl text-muted-foreground animate-pulse">
            Loading Rudraksha details...
          </p>
        </div>
      </div>
    );
  }

  const parseHTML = (data: string[] | undefined): string => {
    if (!data || data.length === 0) return "";
    try {
      const parsed = JSON.parse(data[0]);
      if (Array.isArray(parsed)) return parsed.join(" ");
      if (typeof parsed === "string") return parsed;
    } catch {
      return data[0];
    }
    return "";
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 px-4 py-12 max-w-7xl mx-auto space-y-8 bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/manage-rudraksha")}
            className="text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to manage rudraksha
          </Button>
          <Button
            onClick={() => navigate(`/rudraksha/edit/${rudraksha._id}`)}
            className="bg-primary hover:bg-primary/90 shadow-md transition-all duration-300"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Rudraksha
          </Button>
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white dark:bg-card rounded-xl shadow-lg">
          {/* Images */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-inner border border-border">
              <img
                src={mainImage || rudraksha.productImage[0]}
                alt={rudraksha.productName}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto p-1">
              {rudraksha.productImage.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 flex-shrink-0 rounded-md border-2 p-0.5 transition-all duration-200 ${
                    mainImage === img
                      ? "border-primary shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${rudraksha.productName} ${idx + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white border-b pb-3 border-border">
              {rudraksha.productName}
            </h1>

            <PriceDisplay
              price={rudraksha.productPrice}
              discount={rudraksha.productDiscount}
            />

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-secondary-foreground" />
                <p>
                  Stock:{" "}
                  <span className="font-medium text-lg text-primary">
                    {rudraksha.stock}
                  </span>
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Options */}
            {rudraksha.options.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-secondary-foreground">
                  Available Options
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {rudraksha.options.map((opt) => (
                    <Badge
                      key={opt._id}
                      variant="secondary"
                      className="py-1 px-3 text-sm border border-dashed border-primary/50 text-primary hover:bg-primary/10"
                    >
                      {opt.title}: ₹{opt.price}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Links */}
        {(rudraksha.shopifyLink || rudraksha.youtubeLink) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {rudraksha.shopifyLink && (
              <a
                href={rudraksha.shopifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
                <div className="flex items-center gap-4 z-10">
                  <div className="p-3 bg-blue-500 text-white rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h18v18H3V3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                      Shopify Store
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {rudraksha.shopifyLink}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}

            {rudraksha.youtubeLink && (
              <a
                href={rudraksha.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
                <div className="flex items-center gap-4 z-10">
                  <div className="p-3 bg-red-500 text-white rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 15l5.19-3L10 9v6z" />
                      <path d="M21.8 8s-.2-1.42-.82-2.05c-.78-.82-1.65-.82-2.05-.86C16.03 5 12 5 12 5h0s-4.03 0-6.93.09c-.4.04-1.27.04-2.05.86C2.4 6.58 2.2 8 2.2 8S2 9.58 2 11.16v1.68C2 16.42 2.2 18 2.2 18s.2 1.42.82 2.05c.78.82 1.8.8 2.26.89C7.97 21 12 21 12 21s4.03 0 6.93-.09c.46-.09 1.48-.07 2.26-.89.62-.63.82-2.05.82-2.05s.2-1.58.2-3.16v-1.68C22 9.58 21.8 8 21.8 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                      Watch Video
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {rudraksha.youtubeLink}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Details */}
        <div className="space-y-6">
          {[
            {
              title: "About Product",
              html: parseHTML(rudraksha.productAbout),
              icon: CircleCheck,
            },
            {
              title: "Key Features",
              html: parseHTML(rudraksha.productFeatures),
              icon: Star,
            },
            {
              title: "Benefits",
              html: parseHTML(rudraksha.productBenefits),
              icon: Star,
            },
            {
              title: "FAQs",
              html: parseHTML(rudraksha.productFaqs),
              icon: Star,
            },
            {
              title: "Shipping Information",
              html: parseHTML(rudraksha.productShipping),
              icon: Package,
            },
          ].map(
            (section) =>
              section.html && (
                <Card
                  key={section.title}
                  className="bg-white dark:bg-card border-l-4 border-primary shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="py-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
                      <section.icon className="h-6 w-6" /> {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 px-6">
                    <div
                      className="prose prose-gray max-w-none text-gray-800 [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  </CardContent>
                </Card>
              )
          )}

          {/* Energization */}
          {rudraksha.energization.length > 0 && (
            <Card className="bg-white dark:bg-card border-l-4 border-secondary shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="py-4 border-b">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-secondary">
                  <Star className="h-6 w-6" /> Energization Options
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-wrap gap-4">
                {rudraksha.energization.map((e) => (
                  <div
                    key={e._id}
                    className="p-4 bg-secondary/10 rounded-lg border-2 border-secondary/50 text-sm shadow-sm hover:bg-secondary/20 min-w-[200px]"
                  >
                    <h4 className="font-bold text-lg text-secondary mb-1">
                      {e.title}
                    </h4>
                    <p className="text-base text-secondary-foreground">
                      Price: <span className="font-semibold">₹{e.price}</span>
                    </p>
                    {e.isHaveForm && (
                      <Badge
                        variant="outline"
                        className="mt-2 text-xs border-dashed border-red-500 text-red-600"
                      >
                        Required Form/Details
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// // ViewRudraksha.tsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Edit, Star, Package, CircleCheck } from "lucide-react";

// interface Rudraksha {
//   _id: string;
//   productName: string;
//   stock: number;
//   productPrice: number;
//   productDiscount: number;
//   productImage: string[];
//   productPath: string[];
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
//   shopifyLink?: string;
//   youtubeLink?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const PriceDisplay = ({
//   price,
//   discount,
// }: {
//   price: number;
//   discount: number;
// }) => {
//   const discountedPrice = price * (1 - discount / 100);
//   return (
//     <div className="flex items-baseline gap-2">
//       <span className="text-3xl font-extrabold text-primary">
//         ₹{discountedPrice.toFixed(2)}
//       </span>
//       {discount > 0 && (
//         <>
//           <span className="text-lg text-muted-foreground line-through">
//             ₹{price.toFixed(2)}
//           </span>
//           <Badge variant="destructive" className="text-sm font-semibold">
//             {discount}% OFF
//           </Badge>
//         </>
//       )}
//     </div>
//   );
// };

// export function ViewRudraksha() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [rudraksha, setRudraksha] = useState<Rudraksha | null>(null);
//   const [mainImage, setMainImage] = useState<string | null>(null);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/rudraksha/${id}`)
//       .then((res) => {
//         const data = res.data.data.rudraksha;
//         setRudraksha(data);
//         if (data.productImage?.length > 0) setMainImage(data.productImage[0]);
//       })
//       .catch(console.error);
//   }, [id]);

//   if (!rudraksha) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <p className="text-xl text-muted-foreground animate-pulse">
//           Loading Rudraksha details...
//         </p>
//       </div>
//     );
//   }

//   // ✅ Parse rich-text or plain strings into clean HTML
//   const parseHTML = (data: string[] | undefined): string => {
//     if (!data || data.length === 0) return "";
//     try {
//       const parsed = JSON.parse(data[0]);
//       if (Array.isArray(parsed)) return parsed.join(" ");
//       if (typeof parsed === "string") return parsed;
//     } catch {
//       return data[0];
//     }
//     return "";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-12 space-y-8 max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/dashboard")}
//             className="text-primary hover:bg-primary/10"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>
//           <Button
//             onClick={() => navigate(`/rudraksha/edit/${rudraksha._id}`)}
//             className="bg-primary hover:bg-primary/90 shadow-md transition-all duration-300"
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Edit Rudraksha
//           </Button>
//         </div>

//         {/* Product Overview */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white dark:bg-card rounded-xl shadow-lg">
//           {/* Images */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-inner border border-border">
//               <img
//                 src={mainImage || rudraksha.productImage[0]}
//                 alt={rudraksha.productName}
//                 className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//             <div className="flex gap-2 overflow-x-auto p-1">
//               {rudraksha.productImage.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setMainImage(img)}
//                   className={`w-16 h-16 flex-shrink-0 rounded-md border-2 p-0.5 transition-all duration-200 ${
//                     mainImage === img
//                       ? "border-primary shadow-md"
//                       : "border-transparent opacity-70 hover:opacity-100"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${rudraksha.productName} ${idx + 1}`}
//                     className="w-full h-full object-cover rounded-sm"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info */}
//           <div className="lg:col-span-2 space-y-4">
//             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white border-b pb-3 border-border">
//               {rudraksha.productName}
//             </h1>

//             <PriceDisplay
//               price={rudraksha.productPrice}
//               discount={rudraksha.productDiscount}
//             />

//             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Package className="h-4 w-4 text-secondary-foreground" />
//                 <p>
//                   Stock:{" "}
//                   <span className="font-medium text-lg text-primary">
//                     {rudraksha.stock}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <Separator className="my-4" />

//             {/* Options */}
//             {rudraksha.options.length > 0 && (
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold text-secondary-foreground">
//                   Available Options
//                 </h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {rudraksha.options.map((opt) => (
//                     <Badge
//                       key={opt._id}
//                       variant="secondary"
//                       className="py-1 px-3 text-sm border border-dashed border-primary/50 text-primary hover:bg-primary/10"
//                     >
//                       {opt.title}: ₹{opt.price}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Premium Links */}
//         {(rudraksha.shopifyLink || rudraksha.youtubeLink) && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {rudraksha.shopifyLink && (
//               <a
//                 href={rudraksha.shopifyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
//                 <div className="flex items-center gap-4 z-10">
//                   <div className="p-3 bg-blue-500 text-white rounded-full shadow-md">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 3h18v18H3V3z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
//                       Shopify Store
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
//                       {rudraksha.shopifyLink}
//                     </p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </a>
//             )}

//             {rudraksha.youtubeLink && (
//               <a
//                 href={rudraksha.youtubeLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
//                 <div className="flex items-center gap-4 z-10">
//                   <div className="p-3 bg-red-500 text-white rounded-full shadow-md">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M10 15l5.19-3L10 9v6z" />
//                       <path d="M21.8 8s-.2-1.42-.82-2.05c-.78-.82-1.65-.82-2.05-.86C16.03 5 12 5 12 5h0s-4.03 0-6.93.09c-.4.04-1.27.04-2.05.86C2.4 6.58 2.2 8 2.2 8S2 9.58 2 11.16v1.68C2 16.42 2.2 18 2.2 18s.2 1.42.82 2.05c.78.82 1.8.8 2.26.89C7.97 21 12 21 12 21s4.03 0 6.93-.09c.46-.09 1.48-.07 2.26-.89.62-.63.82-2.05.82-2.05s.2-1.58.2-3.16v-1.68C22 9.58 21.8 8 21.8 8z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
//                       Watch Video
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
//                       {rudraksha.youtubeLink}
//                     </p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </a>
//             )}
//           </div>
//         )}

//         {/* Details */}
//         <div className="space-y-6">
//           {[
//             {
//               title: "About Product",
//               html: parseHTML(rudraksha.productAbout),
//               icon: CircleCheck,
//             },
//             {
//               title: "Key Features",
//               html: parseHTML(rudraksha.productFeatures),
//               icon: Star,
//             },
//             {
//               title: "Benefits",
//               html: parseHTML(rudraksha.productBenefits),
//               icon: Star,
//             },
//             {
//               title: "FAQs",
//               html: parseHTML(rudraksha.productFaqs),
//               icon: Star,
//             },
//             {
//               title: "Shipping Information",
//               html: parseHTML(rudraksha.productShipping),
//               icon: Package,
//             },
//           ].map(
//             (section) =>
//               section.html && (
//                 <Card
//                   key={section.title}
//                   className="bg-white dark:bg-card border-l-4 border-primary shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <CardHeader className="py-4 border-b">
//                     <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
//                       <section.icon className="h-6 w-6" /> {section.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-4 px-6">
//                     <div
//                       className="prose prose-gray max-w-none text-gray-800 [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5"
//                       dangerouslySetInnerHTML={{ __html: section.html }}
//                     />
//                   </CardContent>
//                 </Card>
//               )
//           )}

//           {/* Energization */}
//           {rudraksha.energization.length > 0 && (
//             <Card className="bg-white dark:bg-card border-l-4 border-secondary shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader className="py-4 border-b">
//                 <CardTitle className="flex items-center gap-2 text-xl font-bold text-secondary">
//                   <Star className="h-6 w-6" /> Energization Options
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-4 flex flex-wrap gap-4">
//                 {rudraksha.energization.map((e) => (
//                   <div
//                     key={e._id}
//                     className="p-4 bg-secondary/10 rounded-lg border-2 border-secondary/50 text-sm shadow-sm hover:bg-secondary/20 min-w-[200px]"
//                   >
//                     <h4 className="font-bold text-lg text-secondary mb-1">
//                       {e.title}
//                     </h4>
//                     <p className="text-base text-secondary-foreground">
//                       Price: <span className="font-semibold">₹{e.price}</span>
//                     </p>
//                     {e.isHaveForm && (
//                       <Badge
//                         variant="outline"
//                         className="mt-2 text-xs border-dashed border-red-500 text-red-600"
//                       >
//                         Required Form/Details
//                       </Badge>
//                     )}
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

// // ViewRudraksha.tsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Edit, Star, Package, CircleCheck, Tag } from "lucide-react";

// interface Rudraksha {
//   _id: string;
//   productName: string;
//   stock: number;
//   productPrice: number;
//   productDiscount: number;
//   productImage: string[];
//   productPath: string[];
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
//   shopifyLink?: string;
//   youtubeLink?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const PriceDisplay = ({
//   price,
//   discount,
// }: {
//   price: number;
//   discount: number;
// }) => {
//   const discountedPrice = price * (1 - discount / 100);
//   return (
//     <div className="flex items-baseline gap-2">
//       <span className="text-3xl font-extrabold text-primary">
//         ₹{discountedPrice.toFixed(2)}
//       </span>
//       {discount > 0 && (
//         <>
//           <span className="text-lg text-muted-foreground line-through">
//             ₹{price.toFixed(2)}
//           </span>
//           <Badge variant="destructive" className="text-sm font-semibold">
//             {discount}% OFF
//           </Badge>
//         </>
//       )}
//     </div>
//   );
// };

// export function ViewRudraksha() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [rudraksha, setRudraksha] = useState<Rudraksha | null>(null);
//   const [mainImage, setMainImage] = useState<string | null>(null);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/product/rudraksha/${id}`)
//       .then((res) => {
//         const data = res.data.data.rudraksha;
//         setRudraksha(data);
//         if (data.productImage?.length > 0) setMainImage(data.productImage[0]);
//       })
//       .catch(console.error);
//   }, [id]);

//   if (!rudraksha) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <p className="text-xl text-muted-foreground animate-pulse">
//           Loading Rudraksha details...
//         </p>
//       </div>
//     );
//   }

//   const parseDetails = (details: string[] | undefined): string[] => {
//     if (!details || details.length === 0) return [];
//     const flatten = (item: any): string[] => {
//       if (!item) return [];
//       if (typeof item === "string") {
//         try {
//           const parsed = JSON.parse(item);
//           return flatten(parsed);
//         } catch {
//           return [item];
//         }
//       }
//       if (Array.isArray(item)) return item.flatMap(flatten);
//       return [String(item)];
//     };
//     return details.flatMap(flatten);
//   };

//   const renderList = (items: string[]) => (
//     <ul className="list-disc list-inside space-y-1">
//       {items.map((item, idx) => (
//         <li key={idx}>{item}</li>
//       ))}
//     </ul>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-12 space-y-8 max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/dashboard")}
//             className="text-primary hover:bg-primary/10"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>
//           <Button
//             onClick={() => navigate(`/rudraksha/edit/${rudraksha._id}`)}
//             className="bg-primary hover:bg-primary/90 shadow-md transition-all duration-300"
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Edit Rudraksha
//           </Button>
//         </div>

//         {/* Product Overview */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-white dark:bg-card rounded-xl shadow-lg">
//           {/* Images */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-inner border border-border">
//               <img
//                 src={mainImage || rudraksha.productImage[0]}
//                 alt={rudraksha.productName}
//                 className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//             <div className="flex gap-2 overflow-x-auto p-1">
//               {rudraksha.productImage.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setMainImage(img)}
//                   className={`w-16 h-16 flex-shrink-0 rounded-md border-2 p-0.5 transition-all duration-200 ${
//                     mainImage === img
//                       ? "border-primary shadow-md"
//                       : "border-transparent opacity-70 hover:opacity-100"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${rudraksha.productName} ${idx + 1}`}
//                     className="w-full h-full object-cover rounded-sm"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info */}
//           <div className="lg:col-span-2 space-y-4">
//             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white border-b pb-3 border-border">
//               {rudraksha.productName}
//             </h1>

//             <PriceDisplay
//               price={rudraksha.productPrice}
//               discount={rudraksha.productDiscount}
//             />

//             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Package className="h-4 w-4 text-secondary-foreground" />
//                 <p>
//                   Stock:{" "}
//                   <span className="font-medium text-lg text-primary">
//                     {rudraksha.stock}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <Separator className="my-4" />

//             {/* Options */}
//             {rudraksha.options.length > 0 && (
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold text-secondary-foreground">
//                   Available Options
//                 </h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {rudraksha.options.map((opt) => (
//                     <Badge
//                       key={opt._id}
//                       variant="secondary"
//                       className="py-1 px-3 text-sm border border-dashed border-primary/50 text-primary hover:bg-primary/10"
//                     >
//                       {opt.title}: ₹{opt.price}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Premium Links */}
//         {(rudraksha.shopifyLink || rudraksha.youtubeLink) && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {rudraksha.shopifyLink && (
//               <a
//                 href={rudraksha.shopifyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
//                 <div className="flex items-center gap-4 z-10">
//                   <div className="p-3 bg-blue-500 text-white rounded-full shadow-md">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 3h18v18H3V3z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
//                       Shopify Store
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
//                       {rudraksha.shopifyLink}
//                     </p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </a>
//             )}

//             {rudraksha.youtubeLink && (
//               <a
//                 href={rudraksha.youtubeLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-10 blur-xl group-hover:opacity-25 transition-all duration-500 rounded-2xl"></div>
//                 <div className="flex items-center gap-4 z-10">
//                   <div className="p-3 bg-red-500 text-white rounded-full shadow-md">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M10 15l5.19-3L10 9v6z" />
//                       <path d="M21.8 8s-.2-1.42-.82-2.05c-.78-.82-1.65-.82-2.05-.86C16.03 5 12 5 12 5h0s-4.03 0-6.93.09c-.4.04-1.27.04-2.05.86C2.4 6.58 2.2 8 2.2 8S2 9.58 2 11.16v1.68C2 16.42 2.2 18 2.2 18s.2 1.42.82 2.05c.78.82 1.8.8 2.26.89C7.97 21 12 21 12 21s4.03 0 6.93-.09c.46-.09 1.48-.07 2.26-.89.62-.63.82-2.05.82-2.05s.2-1.58.2-3.16v-1.68C22 9.58 21.8 8 21.8 8z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
//                       Watch Video
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
//                       {rudraksha.youtubeLink}
//                     </p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 z-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </a>
//             )}
//           </div>
//         )}

//         {/* Details */}
//         <div className="space-y-6">
//           {[
//             {
//               title: "About Product",
//               data: parseDetails(rudraksha.productAbout),
//               icon: CircleCheck,
//             },
//             {
//               title: "Key Features",
//               data: parseDetails(rudraksha.productFeatures),
//               icon: Star,
//             },
//             {
//               title: "Benefits",
//               data: parseDetails(rudraksha.productBenefits),
//               icon: Star,
//             },
//             {
//               title: "FAQs",
//               data: parseDetails(rudraksha.productFaqs),
//               icon: Star,
//             },
//             {
//               title: "Shipping Information",
//               data: parseDetails(rudraksha.productShipping),
//               icon: Package,
//             },
//           ].map(
//             (section) =>
//               section.data.length > 0 && (
//                 <Card
//                   key={section.title}
//                   className="bg-white dark:bg-card border-l-4 border-primary shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <CardHeader className="py-4 border-b">
//                     <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
//                       <section.icon className="h-6 w-6" /> {section.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-4 px-6">
//                     {renderList(section.data)}
//                   </CardContent>
//                 </Card>
//               )
//           )}

//           {/* Energization */}
//           {rudraksha.energization.length > 0 && (
//             <Card className="bg-white dark:bg-card border-l-4 border-secondary shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader className="py-4 border-b">
//                 <CardTitle className="flex items-center gap-2 text-xl font-bold text-secondary">
//                   <Star className="h-6 w-6" /> Energization Options
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-4 flex flex-wrap gap-4">
//                 {rudraksha.energization.map((e) => (
//                   <div
//                     key={e._id}
//                     className="p-4 bg-secondary/10 rounded-lg border-2 border-secondary/50 text-sm shadow-sm hover:bg-secondary/20 min-w-[200px]"
//                   >
//                     <h4 className="font-bold text-lg text-secondary mb-1">
//                       {e.title}
//                     </h4>
//                     <p className="text-base text-secondary-foreground">
//                       Price: <span className="font-semibold">₹{e.price}</span>
//                     </p>
//                     {e.isHaveForm && (
//                       <Badge
//                         variant="outline"
//                         className="mt-2 text-xs border-dashed border-red-500 text-red-600"
//                       >
//                         Required Form/Details
//                       </Badge>
//                     )}
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
