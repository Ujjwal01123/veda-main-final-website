"use client";

import { Sidebar } from "@/components/layout/productSidebar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Percent, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export function RudrakshaOfferForm() {
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [rudrakshaList, setRudrakshaList] = useState<
    { _id: string; productName: string; mukhi: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    rudraksha: [],
    offerTitle: "",
    offerDescription: "",
    discountPercent: "",
    startDate: new Date(),
    endDate: new Date(),
    isActive: false,
  });

  const [offers, setOffers] = useState<any[]>([]);

  // Fetch Rudraksha directly
  useEffect(() => {
    const fetchRudraksha = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/product/rudraksha`);
        if (!res.ok) throw new Error("Failed to fetch rudraksha");

        const data = await res.json();
        console.log(data.data.rudraksha);
        setRudrakshaList(
          Array.isArray(data.data.rudraksha) ? data.data.rudraksha : []
        );
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchRudraksha();
  }, []);

  // Fetch existing rudraksha offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/rudraksha/offer/all`);
        const data = await res.json();

        setOffers(Array.isArray(data.offers) ? data.offers : []);
      } catch (err: any) {
        toast({
          title: "Error fetching offers",
          description: err.message,
          variant: "destructive",
        });
      }
    };

    fetchOffers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingOfferId
        ? `${apiUrl}/api/rudraksha/offer/update/${editingOfferId}`
        : `${apiUrl}/api/rudraksha/offer/create`;

      const method = editingOfferId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save offer");

      toast({
        title: editingOfferId
          ? "Offer Updated Successfully"
          : "Offer Created Successfully",
      });

      // Refresh list
      const re = await fetch(`${apiUrl}/api/rudraksha/offer/all`);
      const dt = await re.json();
      setOffers(dt.offers || []);

      // Reset
      setFormData({
        rudraksha: [],
        offerTitle: "",
        offerDescription: "",
        discountPercent: "",
        startDate: new Date(),
        endDate: new Date(),
        isActive: false,
      });

      setEditingOfferId(null);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (offer: any) => {
    setFormData({
      offerTitle: offer.offerTitle,
      offerDescription: offer.offerDescription,
      discountPercent: offer.discountPercent,
      startDate: new Date(offer.startDate),
      endDate: new Date(offer.endDate),
      rudraksha: offer.rudraksha.map((r: any) => r._id),
      isActive: offer.isActive,
    });

    setEditingOfferId(offer._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this offer?")) return;

    try {
      const res = await fetch(`${apiUrl}/api/rudraksha/offer/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setOffers((prev) => prev.filter((x) => x._id !== id));

      toast({
        title: "Offer Deleted",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await fetch(`${apiUrl}/api/rudraksha/offer/toggle/${id}`, {
        method: "PATCH",
      });
      toast({ title: "Offer status updated" });
      window.location.reload();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-h-screen p-4 ml-3">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Percent className="w-6 h-6" />
                Rudraksha Offers
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Offer Basics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Offer Title *</Label>
                    <Input
                      value={formData.offerTitle}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          offerTitle: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Discount (%) *</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discountPercent}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          discountPercent: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Input
                      value={formData.offerDescription}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          offerDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Rudraksha Selection */}
                <div>
                  <Label>Select Rudraksha *</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full justify-between"
                        variant="outline"
                      >
                        {formData.rudraksha.length
                          ? `${formData.rudraksha.length} selected`
                          : "Select Rudraksha"}
                        <span>▼</span>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[300px] max-h-[300px] overflow-y-auto">
                      {rudrakshaList.map((r) => {
                        const selected = formData.rudraksha.includes(r._id);

                        return (
                          <div
                            key={r._id}
                            className={cn(
                              "flex items-center gap-2 p-2 cursor-pointer hover:bg-accent",
                              selected && "bg-accent"
                            )}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                rudraksha: selected
                                  ? prev.rudraksha.filter((id) => id !== r._id)
                                  : [...prev.rudraksha, r._id],
                              }));
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              readOnly
                            />
                            <span>{r.productName}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarDays className="mr-2" />
                          {format(formData.startDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(d) =>
                            setFormData((p) => ({ ...p, startDate: d! }))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarDays className="mr-2" />
                          {format(formData.endDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(d) =>
                            setFormData((p) => ({ ...p, endDate: d! }))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3"
                >
                  <Save className="mr-2" />
                  {editingOfferId ? "Update Offer" : "Create Offer"}
                </Button>
              </form>

              {/* Offer Table */}
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-3">
                  All Rudraksha Offers
                </h3>

                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Title</th>
                      <th className="p-2">Discount</th>
                      <th className="p-2">Start</th>
                      <th className="p-2">End</th>
                      <th className="p-2">Active</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {offers.map((off, i) => (
                      <tr key={off._id} className="border-b">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{off.offerTitle}</td>
                        <td className="p-2">{off.discountPercent}%</td>
                        <td className="p-2">
                          {format(new Date(off.startDate), "PPP")}
                        </td>
                        <td className="p-2">
                          {format(new Date(off.endDate), "PPP")}
                        </td>

                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={off.isActive}
                            onChange={() => handleToggleActive(off._id)}
                          />
                        </td>

                        <td className="p-2 flex gap-2">
                          <button
                            className="text-yellow-600"
                            onClick={() => handleEdit(off)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600"
                            onClick={() => handleDelete(off._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
