import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar import added
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [booking, setBooking] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // ✅ Fetch initial booking details
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/bookings/${id}`)
      .then((res) => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load booking data. Booking may not exist.",
          variant: "destructive",
        });
      });
  }, [id, toast]);

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newStatus) {
      toast({
        title: "Error",
        description: "Please select a status before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (newStatus === booking.status) {
      toast({
        title: "Info",
        description: "Status is already up to date.",
      });
      return;
    }

    axios
      .put(`${apiUrl}/api/bookings/${id}`, { status: newStatus })
      .then(() => {
        toast({
          title: "Success",
          description: "Booking status updated successfully!",
        });
        navigate(`/bookings/view/${id}`);
      })
      .catch((err) => {
        console.error("Error updating booking status:", err);
        toast({
          title: "Error",
          description: "Failed to update booking status. Please try again.",
          variant: "destructive",
        });
      });
  };

  // ✅ Loading & Not Found UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* ✅ Sidebar Section */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate("/dashboard/manage-bookings")}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              ✨ Edit Booking Status
            </h1>
          </div>

          {/* Booking Card */}
          <Card className="w-full shadow-lg bg-gradient-card border-border/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Edit Booking Status
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Update the status of this booking.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4 mb-6">
                <p>
                  <strong>Puja:</strong> {booking.puja?.title || "N/A"}
                </p>
                <p>
                  <strong>Customer:</strong> {booking.name}
                </p>
                <p>
                  <strong>Current Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "confirmed"
                        ? "text-green-600"
                        : booking.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>

              <Separator />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="status-select">Update Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="status-select">
                      <SelectValue placeholder="Select a new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  {newStatus === "" && (
                    <p className="text-sm text-red-500">
                      ⚠ Please select a status
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={!newStatus}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
                  >
                    Update Status
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
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";

// export function EditBooking() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [booking, setBooking] = useState<any>(null);
//   const [newStatus, setNewStatus] = useState<string>(""); // start empty
//   const [loading, setLoading] = useState(true);

//   // Fetch initial booking details
//   const apiUrl = import.meta.env.VITE_BASE_API_URL;
//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/bookings/${id}`)
//       .then((res) => {
//         setBooking(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching booking:", err);
//         setLoading(false);
//         toast({
//           title: "Error",
//           description: "Failed to load booking data. Booking may not exist.",
//           variant: "destructive",
//         });
//       });
//   }, [id, toast]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!newStatus) {
//       toast({
//         title: "Error",
//         description: "Please select a status before submitting.",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (newStatus === booking.status) {
//       toast({
//         title: "Info",
//         description: "Status is already up to date.",
//       });
//       return;
//     }

//     axios
//       .put(`${apiUrl}/api/bookings/${id}`, {
//         status: newStatus,
//       })
//       .then(() => {
//         toast({
//           title: "Success",
//           description: "Booking status updated successfully!",
//         });
//         navigate(`/bookings/view/${id}`);
//         // Navigate back to the bookings list
//       })
//       .catch((err) => {
//         console.error("Error updating booking status:", err);
//         toast({
//           title: "Error",
//           description: "Failed to update booking status. Please try again.",
//           variant: "destructive",
//         });
//       });
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
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">
//             Edit Booking Status
//           </CardTitle>
//           <CardDescription>Update the status of this booking.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4 mb-6">
//             <p>
//               <strong>Puja:</strong> {booking.puja?.title || "N/A"}
//             </p>
//             <p>
//               <strong>Customer:</strong> {booking.name}
//             </p>
//             <p>
//               <strong>Current Status:</strong>{" "}
//               <span
//                 className={`font-semibold ${
//                   booking.status === "confirmed"
//                     ? "text-green-600"
//                     : booking.status === "pending"
//                     ? "text-yellow-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {booking.status}
//               </span>
//             </p>
//           </div>
//           <Separator />
//           <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//             <div className="space-y-2">
//               <Label htmlFor="status-select">Update Status</Label>
//               <Select value={newStatus} onValueChange={setNewStatus}>
//                 <SelectTrigger id="status-select">
//                   <SelectValue placeholder="Select a new status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//               {/* Show warning if nothing is selected */}
//               {newStatus === "" && (
//                 <p className="text-sm text-red-500">⚠ Please select a status</p>
//               )}
//             </div>
//             <Button type="submit" className="w-full" disabled={!newStatus}>
//               Update Status
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
