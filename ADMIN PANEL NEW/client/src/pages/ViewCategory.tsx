import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit } from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/categories/${id}`)
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 ml-64 text-amber-500 font-semibold">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 
           0 12h4zm2 5.291A7.962 7.962 0 
           014 12H0c0 3.042 1.135 5.824 
           3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading category details...
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 ml-64 text-amber-700 font-semibold">
          Category not found.
        </div>
      </div>
    );
  }

  const formattedDate = category.createdAt
    ? new Date(category.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Fixed Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 flex justify-center items-start pt-16 font-inter">
        <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-none bg-amber-50/70 backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard/manage-categories")}
                className="gap-2 text-amber-700 hover:bg-amber-200/50 hover:text-amber-800 transition-colors rounded-xl p-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/categories/edit/${category._id}`)}
                className="gap-2 bg-amber-500 text-white border-amber-600 hover:bg-amber-600 hover:text-white transition-colors rounded-xl shadow-md hover:shadow-lg"
              >
                <Edit className="w-4 h-4" /> Edit
              </Button>
            </div>

            <CardTitle className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-amber-900 leading-tight">
              {category.name}
            </CardTitle>

            <CardDescription className="text-center text-amber-700 text-lg mt-2">
              Category details overview
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-8 pt-0">
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-amber-800">Description</h3>
              <Separator className="bg-amber-300 h-[2px] w-1/3 rounded-full" />
              <p className="text-stone-700 leading-relaxed pt-2 text-base">
                {category.description || "No description provided."}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xl text-amber-800">Created On</h3>
              <Separator className="bg-amber-300 h-[2px] w-1/3 rounded-full" />
              <p className="text-stone-600 font-medium pt-2 text-base">
                <span className="text-amber-600">Date: </span>
                {formattedDate}
              </p>
            </div>
          </CardContent>
        </Card>
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
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Edit } from "lucide-react";

// export function ViewCategory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/categories/${id}`)
//       .then((res) => {
//         setCategory(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching category:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-amber-500 bg-amber-50 font-semibold">
//         <svg
//           className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373
//             0 12h4zm2 5.291A7.962 7.962 0
//             014 12H0c0 3.042 1.135 5.824
//             3 7.938l3-2.647z"
//           ></path>
//         </svg>
//         Loading category details...
//       </div>
//     );
//   }

//   if (!category) {
//     return (
//       <div className="flex justify-center items-center h-screen text-amber-700 bg-amber-50 font-semibold">
//         Category not found.
//       </div>
//     );
//   }

//   const formattedDate = category.createdAt
//     ? new Date(category.createdAt).toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "N/A";

//   return (
//     // Warm background
//     <div className="min-h-screen bg-stone-100 p-6 flex justify-center items-start pt-16 font-inter">
//       <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-none bg-amber-50/70 backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
//         {/* Header */}
//         <CardHeader className="p-8">
//           <div className="flex justify-between items-center mb-6">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => navigate("/dashboard")}
//               className="gap-2 text-amber-700 hover:bg-amber-200/50 hover:text-amber-800 transition-colors rounded-xl p-2"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => navigate(`/categories/edit/${category._id}`)}
//               className="gap-2 bg-amber-500 text-white border-amber-600 hover:bg-amber-600 hover:text-white transition-colors rounded-xl shadow-md hover:shadow-lg"
//             >
//               <Edit className="w-4 h-4" /> Edit
//             </Button>
//           </div>

//           <CardTitle className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-amber-900 leading-tight">
//             {category.name}
//           </CardTitle>

//           <CardDescription className="text-center text-amber-700 text-lg mt-2">
//             Category details overview
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-8 p-8 pt-0">
//           {/* Description */}
//           <div className="space-y-3">
//             <h3 className="font-bold text-xl text-amber-800">Description</h3>
//             <Separator className="bg-amber-300 h-[2px] w-1/3 rounded-full" />
//             <p className="text-stone-700 leading-relaxed pt-2 text-base">
//               {category.description || "No description provided."}
//             </p>
//           </div>

//           {/* Created On */}
//           <div className="space-y-3">
//             <h3 className="font-bold text-xl text-amber-800">Created On</h3>
//             <Separator className="bg-amber-300 h-[2px] w-1/3 rounded-full" />
//             <p className="text-stone-600 font-medium pt-2 text-base">
//               <span className="text-amber-600">Date: </span>
//               {formattedDate}
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
