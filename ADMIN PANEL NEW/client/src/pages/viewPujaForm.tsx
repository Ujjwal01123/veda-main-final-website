"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ScrollText, Users, Package, Calendar } from "lucide-react";
import { Sidebar } from "@/components/layout/updatedSidebar";

export default function ViewPujaForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/participate/bookings/${id}`)
      .then((res) => setForm(res.data.data))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load puja form details",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, [id, toast]);

  if (loading)
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}{" "}
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          {" "}
          <Sidebar />{" "}
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
          <div className="space-y-4 w-full max-w-2xl">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );

  if (!form)
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}{" "}
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          {" "}
          <Sidebar />{" "}
        </div>
        <div className="flex-1 ml-64 flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 p-6">
          <ScrollText className="w-10 h-10 text-amber-600 mb-4" />
          <h2 className="text-xl font-semibold text-foreground">
            Form not found
          </h2>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => navigate("/dashboard/manage-puja-forms")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Forms
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 w-full py-10 px-6 bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <ScrollText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Puja Form Details
              </h1>
            </div>
            <p className="text-muted-foreground">
              Review the details of this sacred puja submission
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => navigate("/dashboard/manage-puja-forms")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Forms
            </Button>
          </div>

          {/* Devotee Info */}
          <Card className="bg-white/90 shadow-md border-border/40">
            <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
              <Users className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-foreground">
                Devotee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {form.fullName && (
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">{form.fullName}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Gotra</p>
                <p className="font-medium text-foreground">
                  {form.dontKnowGotra ? "Not Known" : form.gotra}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp Number</p>
                <p className="font-medium text-foreground">
                  {form.whatsappNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Form Type</p>
                <p className="font-medium text-foreground">{form.formType}</p>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          {form.participants && form.participants.length > 0 && (
            <Card className="bg-white/90 shadow-md border-border/40">
              <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
                <Users className="w-5 h-5 text-amber-600" />
                <CardTitle className="text-foreground">Participants</CardTitle>
              </CardHeader>
              <CardContent className="mt-4 space-y-4">
                {form.participants.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-border/30 bg-gradient-to-r from-amber-50 to-orange-50"
                  >
                    <h3 className="font-semibold text-amber-700 mb-2">
                      Participant {i + 1}
                    </h3>
                    <p className="font-medium text-foreground">{p.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Prasad Info */}
          {form.prasadDelivery && (
            <Card className="bg-white/90 shadow-md border-border/40">
              <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
                <Package className="w-5 h-5 text-amber-600" />
                <CardTitle className="text-foreground">
                  Prasad Information
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Prasad Type</p>
                  <p className="font-medium text-foreground">
                    {form.prasadType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivery Price
                  </p>
                  <p className="font-medium text-foreground">₹{form.price}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Delivery Address
                  </p>
                  <p className="font-medium text-foreground">
                    {form.fullAddress}, {form.city} - {form.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meta Info */}
          <Card className="bg-white/90 shadow-md border-border/40">
            <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
              <Calendar className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-foreground">Submission Info</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Form ID</p>
                <p className="font-medium text-foreground">{form._id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted On</p>
                <p className="font-medium text-foreground">
                  {new Date(form.createdAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/components/ui/use-toast";
// import { ArrowLeft, ScrollText, Users, Package, Calendar } from "lucide-react";

// export default function ViewPujaForm() {
//   const { id } = useParams();
//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/participate/bookings/${id}`)
//       .then((res) => setForm(res.data.data))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load puja form details",
//           variant: "destructive",
//         })
//       )
//       .finally(() => setLoading(false));
//   }, [id, toast]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
//         <div className="space-y-4 w-full max-w-2xl">
//           <Skeleton className="h-10 w-1/3 mx-auto" />
//           <Skeleton className="h-48 w-full rounded-lg" />
//           <Skeleton className="h-48 w-full rounded-lg" />
//         </div>
//       </div>
//     );

//   if (!form)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
//         <ScrollText className="w-10 h-10 text-amber-600 mb-4" />
//         <h2 className="text-xl font-semibold text-foreground">
//           Form not found
//         </h2>
//         <Button
//           variant="outline"
//           className="mt-6"
//           onClick={() => navigate("/dashboard/manage-puja-forms")}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Forms
//         </Button>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 py-10 px-6">
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
//               <ScrollText className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
//               Puja Form Details
//             </h1>
//           </div>
//           <p className="text-muted-foreground">
//             Review the details of this sacred puja submission
//           </p>
//           <Button
//             variant="outline"
//             className="mt-2"
//             onClick={() => navigate("/dashboard/manage-puja-forms")}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Forms
//           </Button>
//         </div>

//         {/* Devotee Info */}
//         <Card className="bg-white/90 shadow-md border-border/40">
//           <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
//             <Users className="w-5 h-5 text-amber-600" />
//             <CardTitle className="text-foreground">
//               Devotee Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
//             {form.fullName && (
//               <div>
//                 <p className="text-sm text-muted-foreground">Full Name</p>
//                 <p className="font-medium text-foreground">{form.fullName}</p>
//               </div>
//             )}

//             <div>
//               <p className="text-sm text-muted-foreground">Gotra</p>
//               <p className="font-medium text-foreground">
//                 {form.dontKnowGotra ? "Not Known" : form.gotra}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">WhatsApp Number</p>
//               <p className="font-medium text-foreground">
//                 {form.whatsappNumber}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Form Type</p>
//               <p className="font-medium text-foreground">{form.formType}</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Participants */}
//         {form.participants && form.participants.length > 0 && (
//           <Card className="bg-white/90 shadow-md border-border/40">
//             <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
//               <Users className="w-5 h-5 text-amber-600" />
//               <CardTitle className="text-foreground">Participants</CardTitle>
//             </CardHeader>
//             <CardContent className="mt-4 space-y-4">
//               {form.participants.map((p, i) => (
//                 <div
//                   key={i}
//                   className="p-4 rounded-lg border border-border/30 bg-gradient-to-r from-amber-50 to-orange-50"
//                 >
//                   <h3 className="font-semibold text-amber-700 mb-2">
//                     Participant {i + 1}
//                   </h3>
//                   <p className="font-medium text-foreground">{p.name}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* Prasad Info */}
//         {form.prasadDelivery && (
//           <Card className="bg-white/90 shadow-md border-border/40">
//             <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
//               <Package className="w-5 h-5 text-amber-600" />
//               <CardTitle className="text-foreground">
//                 Prasad Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-muted-foreground">Prasad Type</p>
//                 <p className="font-medium text-foreground">{form.prasadType}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Delivery Price</p>
//                 <p className="font-medium text-foreground">₹{form.price}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <p className="text-sm text-muted-foreground">
//                   Delivery Address
//                 </p>
//                 <p className="font-medium text-foreground">
//                   {form.fullAddress}, {form.city} - {form.pincode}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Meta Info */}
//         <Card className="bg-white/90 shadow-md border-border/40">
//           <CardHeader className="flex items-center gap-2 border-b border-border/30 pb-3">
//             <Calendar className="w-5 h-5 text-amber-600" />
//             <CardTitle className="text-foreground">Submission Info</CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
//             <div>
//               <p className="text-sm text-muted-foreground">Form ID</p>
//               <p className="font-medium text-foreground">{form._id}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Submitted On</p>
//               <p className="font-medium text-foreground">
//                 {new Date(form.createdAt).toLocaleString()}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
