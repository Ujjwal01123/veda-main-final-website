"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ Sidebar added
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  ScrollText,
  Save,
  Users,
  Package,
  Loader2,
} from "lucide-react";

export default function EditPujaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/participate/bookings/${id}`)
      .then((res) => setForm(res.data.data))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load puja form details.",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleParticipantChange = (index, value) => {
    const updated = [...form.participants];
    updated[index].name = value;
    setForm((prev) => ({ ...prev, participants: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${apiUrl}/api/participate/bookings/${id}`, form);
      toast({
        title: "Success",
        description: "Form updated successfully ✅",
      });
      navigate(`/puja/forms/view/${id}`);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update puja form.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background/60">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
      </div>
    );

  if (!form)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-background via-accent/10 to-background/60">
        <ScrollText className="w-10 h-10 text-orange-600 mb-4" />
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
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/10 to-background/60">
      {/* ✅ Sidebar Section */}
      <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* ✅ Main Content Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate(`/puja/forms/view/${id}`)}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              🪶 Edit Puja Form
            </h1>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white/90 rounded-xl p-6 shadow-md backdrop-blur-sm border border-border/30"
          >
            {/* Basic Info */}
            <Card className="shadow-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-lg font-semibold">
                  <Users className="w-5 h-5 text-amber-600" /> Devotee
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {form.fullName && (
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <Label>Gotra</Label>
                  <Input
                    value={form.gotra}
                    onChange={(e) => handleChange("gotra", e.target.value)}
                  />
                </div>
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={form.whatsappNumber}
                    onChange={(e) =>
                      handleChange("whatsappNumber", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Form Type</Label>
                  <Input
                    value={form.formType}
                    onChange={(e) => handleChange("formType", e.target.value)}
                    disabled
                  />
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card className="shadow-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-lg font-semibold">
                  <Users className="w-5 h-5 text-amber-600" /> Participants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.participants.map((p, i) => (
                  <div key={i}>
                    <Label>Participant {i + 1} Name</Label>
                    <Input
                      value={p.name}
                      onChange={(e) =>
                        handleParticipantChange(i, e.target.value)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Prasad Info */}
            <Card className="shadow-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-lg font-semibold">
                  <Package className="w-5 h-5 text-amber-600" /> Prasad Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label>Want Prasad?</Label>
                  <Switch
                    checked={form.prasadDelivery}
                    onCheckedChange={(v) => handleChange("prasadDelivery", v)}
                  />
                </div>

                {form.prasadDelivery && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <Label>Prasad Type</Label>
                      <Input
                        value={form.prasadType}
                        onChange={(e) =>
                          handleChange("prasadType", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        value={form.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Full Address</Label>
                      <Input
                        value={form.fullAddress}
                        onChange={(e) =>
                          handleChange("fullAddress", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Pincode</Label>
                      <Input
                        value={form.pincode}
                        onChange={(e) =>
                          handleChange("pincode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:opacity-90 transition"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   ArrowLeft,
//   ScrollText,
//   Save,
//   Users,
//   Package,
//   Loader2,
// } from "lucide-react";

// export default function EditPujaForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/participate/bookings/${id}`)
//       .then((res) => setForm(res.data.data))
//       .catch(() =>
//         toast({
//           title: "Error",
//           description: "Failed to load puja form details.",
//           variant: "destructive",
//         })
//       )
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleParticipantChange = (index, value) => {
//     const updated = [...form.participants];
//     updated[index].name = value;
//     setForm((prev) => ({ ...prev, participants: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await axios.put(`${apiUrl}/api/participate/bookings/${id}`, form);
//       toast({
//         title: "Success",
//         description: "Form updated successfully ✅",
//       });
//       navigate(`/puja/forms/view/${id}`);
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to update puja form.",
//         variant: "destructive",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
//         <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
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
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-3">
//           <div className="flex justify-center gap-3 items-center mb-3">
//             <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
//               <ScrollText className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-tr from-amber-600 to-orange-600 bg-clip-text text-transparent">
//               Edit Puja Form
//             </h1>
//           </div>
//           <Button
//             variant="outline"
//             onClick={() => navigate(`/puja/forms/view/${id}`)}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to View
//           </Button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-8 bg-white/90 rounded-lg p-6 shadow-md"
//         >
//           {/* Basic Info */}
//           <Card className="shadow-sm border-border/40">
//             <CardHeader>
//               <CardTitle className="flex gap-2 items-center">
//                 <Users className="w-5 h-5 text-amber-600" /> Devotee Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {form.fullName && (
//                 <div>
//                   <Label>Full Name</Label>
//                   <Input
//                     value={form.fullName}
//                     onChange={(e) => handleChange("fullName", e.target.value)}
//                   />
//                 </div>
//               )}
//               <div>
//                 <Label>Gotra</Label>
//                 <Input
//                   value={form.gotra}
//                   onChange={(e) => handleChange("gotra", e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label>WhatsApp Number</Label>
//                 <Input
//                   value={form.whatsappNumber}
//                   onChange={(e) =>
//                     handleChange("whatsappNumber", e.target.value)
//                   }
//                 />
//               </div>
//               <div>
//                 <Label>Form Type</Label>
//                 <Input
//                   value={form.formType}
//                   onChange={(e) => handleChange("formType", e.target.value)}
//                   disabled
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Participants */}
//           <Card className="shadow-sm border-border/40">
//             <CardHeader>
//               <CardTitle className="flex gap-2 items-center">
//                 <Users className="w-5 h-5 text-amber-600" /> Participants
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {form.participants.map((p, i) => (
//                 <div key={i}>
//                   <Label>Participant {i + 1} Name</Label>
//                   <Input
//                     value={p.name}
//                     onChange={(e) => handleParticipantChange(i, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Prasad Info */}
//           <Card className="shadow-sm border-border/40">
//             <CardHeader>
//               <CardTitle className="flex gap-2 items-center">
//                 <Package className="w-5 h-5 text-amber-600" /> Prasad Delivery
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <Label>Want Prasad?</Label>
//                 <Switch
//                   checked={form.prasadDelivery}
//                   onCheckedChange={(v) => handleChange("prasadDelivery", v)}
//                 />
//               </div>

//               {form.prasadDelivery && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
//                   <div>
//                     <Label>Prasad Type</Label>
//                     <Input
//                       value={form.prasadType}
//                       onChange={(e) =>
//                         handleChange("prasadType", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label>Price</Label>
//                     <Input
//                       type="number"
//                       value={form.price}
//                       onChange={(e) => handleChange("price", e.target.value)}
//                     />
//                   </div>
//                   <div className="sm:col-span-2">
//                     <Label>Full Address</Label>
//                     <Input
//                       value={form.fullAddress}
//                       onChange={(e) =>
//                         handleChange("fullAddress", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label>City</Label>
//                     <Input
//                       value={form.city}
//                       onChange={(e) => handleChange("city", e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <Label>Pincode</Label>
//                     <Input
//                       value={form.pincode}
//                       onChange={(e) => handleChange("pincode", e.target.value)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-gradient-to-tr from-amber-500 to-orange-500 text-white"
//               disabled={saving}
//             >
//               {saving ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4 mr-2" /> Save Changes
//                 </>
//               )}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
