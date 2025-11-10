import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/layout/updatedSidebar";

export function ViewBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/bookings/${id}`)
      .then((res) => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        setLoading(false);
      });
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return "text-green-600";
      case "cancelled":
      case "failed":
        return "text-red-600";
      case "pending":
      default:
        return "text-yellow-600";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}{" "}
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 ml-64">
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 ml-64">
          <p>Booking not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* Fixed Sidebar */}{" "}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto ml-64">
        <Card className="w-full max-w-lg shadow-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Booking Details
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              A comprehensive overview of your booking information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Booking Information */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Booking Information</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Item</p>
                  <p className="font-semibold text-base">
                    {booking.item?.title ||
                      booking.item?.name ||
                      booking.item?.productName ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Item Type</p>
                  <p className="font-semibold text-base">
                    {booking.itemType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Booking ID
                  </p>
                  <p className="font-semibold text-base">{booking._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Overall Status
                  </p>
                  <p
                    className={`font-semibold text-base ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Payment Status
                  </p>
                  <p
                    className={`font-semibold text-base ${getStatusColor(
                      booking.paymentStatus
                    )}`}
                  >
                    {booking.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="font-semibold text-base">
                    ₹{booking.amount || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Booking Date
                  </p>
                  <p className="font-semibold text-base">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Customer Information</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="font-semibold text-base">{booking.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gotra</p>
                  <p className="font-semibold text-base">
                    {booking.gotra || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-semibold text-base">{booking.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rashi</p>
                  <p className="font-semibold text-base">
                    {booking.rashi || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="font-semibold text-base">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nakshatra</p>
                  <p className="font-semibold text-base">
                    {booking.nakshatra || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {(booking.paymentId || booking.orderId) && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Payment Details</h3>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {booking.orderId && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Order ID
                      </p>
                      <p className="font-semibold text-base break-all">
                        {booking.orderId}
                      </p>
                    </div>
                  )}
                  {booking.paymentId && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Payment ID
                      </p>
                      <p className="font-semibold text-base break-all">
                        {booking.paymentId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export function ViewBooking() {
//   const { id } = useParams();
//   const [booking, setBooking] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/bookings/${id}`)
//       .then((res) => {
//         setBooking(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching booking details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//       case "paid":
//         return "text-green-600";
//       case "cancelled":
//       case "failed":
//         return "text-red-600";
//       case "pending":
//       default:
//         return "text-yellow-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading booking details...</p>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Booking not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center p-6">
//       <Card className="w-full max-w-lg shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             Booking Details
//           </CardTitle>
//           <CardDescription className="text-center text-muted-foreground">
//             A comprehensive overview of your booking information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Booking Information */}
//           <div className="space-y-2">
//             <h3 className="font-semibold text-lg">Booking Information</h3>
//             <Separator />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Item</p>
//                 <p className="font-semibold text-base">
//                   {booking.item?.title ||
//                     booking.item?.name ||
//                     booking.item?.productName ||
//                     "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Item Type</p>
//                 <p className="font-semibold text-base">
//                   {booking.itemType || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Booking ID</p>
//                 <p className="font-semibold text-base">{booking._id}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Overall Status
//                 </p>
//                 <p
//                   className={`font-semibold text-base ${getStatusColor(
//                     booking.status
//                   )}`}
//                 >
//                   {booking.status}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Payment Status
//                 </p>
//                 <p
//                   className={`font-semibold text-base ${getStatusColor(
//                     booking.paymentStatus
//                   )}`}
//                 >
//                   {booking.paymentStatus}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Amount</p>
//                 <p className="font-semibold text-base">
//                   ₹{booking.amount || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Booking Date
//                 </p>
//                 <p className="font-semibold text-base">
//                   {new Date(booking.bookingDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Customer Information */}
//           <div className="space-y-2">
//             <h3 className="font-semibold text-lg">Customer Information</h3>
//             <Separator />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Name</p>
//                 <p className="font-semibold text-base">{booking.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Gotra</p>
//                 <p className="font-semibold text-base">
//                   {booking.gotra || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="font-semibold text-base">{booking.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Rashi</p>
//                 <p className="font-semibold text-base">
//                   {booking.rashi || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Phone</p>
//                 <p className="font-semibold text-base">{booking.phone}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Nakshatra</p>
//                 <p className="font-semibold text-base">
//                   {booking.nakshatra || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           {(booking.paymentId || booking.orderId) && (
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Payment Details</h3>
//               <Separator />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 {booking.orderId && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Order ID
//                     </p>
//                     <p className="font-semibold text-base break-all">
//                       {booking.orderId}
//                     </p>
//                   </div>
//                 )}
//                 {booking.paymentId && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Payment ID
//                     </p>
//                     <p className="font-semibold text-base break-all">
//                       {booking.paymentId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export function ViewBooking() {
//   const { id } = useParams();
//   const [booking, setBooking] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/bookings/${id}`)
//       .then((res) => {
//         setBooking(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching booking details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//       case "paid":
//         return "text-green-600";
//       case "cancelled":
//       case "failed":
//         return "text-red-600";
//       case "pending":
//       default:
//         return "text-yellow-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading booking details...</p>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Booking not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center p-6">
//       <Card className="w-full max-w-lg shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             Booking Details
//           </CardTitle>
//           <CardDescription className="text-center text-muted-foreground">
//             A comprehensive overview of your booking information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Booking Information */}
//           <div className="space-y-2">
//             <h3 className="font-semibold text-lg">Booking Information</h3>
//             <Separator />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Puja</p>
//                 <p className="font-semibold text-base">
//                   {booking.puja?.title || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Booking ID</p>
//                 <p className="font-semibold text-base">{booking._id}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Overall Status
//                 </p>
//                 <p
//                   className={`font-semibold text-base ${getStatusColor(
//                     booking.status
//                   )}`}
//                 >
//                   {booking.status}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Payment Status
//                 </p>
//                 <p
//                   className={`font-semibold text-base ${getStatusColor(
//                     booking.paymentStatus
//                   )}`}
//                 >
//                   {booking.paymentStatus}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Amount</p>
//                 <p className="font-semibold text-base">
//                   ₹{booking.amount || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Booking Date
//                 </p>
//                 <p className="font-semibold text-base">
//                   {new Date(booking.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Customer Information */}
//           <div className="space-y-2">
//             <h3 className="font-semibold text-lg">Customer Information</h3>
//             <Separator />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Name</p>
//                 <p className="font-semibold text-base">{booking.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Gotra</p>
//                 <p className="font-semibold text-base">
//                   {booking.gotra || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="font-semibold text-base">{booking.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Rashi</p>
//                 <p className="font-semibold text-base">
//                   {booking.rashi || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Phone</p>
//                 <p className="font-semibold text-base">{booking.phone}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Nakshatra</p>
//                 <p className="font-semibold text-base">
//                   {booking.nakshatra || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           {(booking.paymentId || booking.orderId) && (
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Payment Details</h3>
//               <Separator />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 {booking.orderId && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Order ID
//                     </p>
//                     <p className="font-semibold text-base break-all">
//                       {booking.orderId}
//                     </p>
//                   </div>
//                 )}
//                 {booking.paymentId && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Payment ID
//                     </p>
//                     <p className="font-semibold text-base break-all">
//                       {booking.paymentId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
