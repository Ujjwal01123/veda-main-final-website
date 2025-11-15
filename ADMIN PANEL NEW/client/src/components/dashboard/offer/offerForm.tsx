"use client";

import { Sidebar } from "@/components/layout/updatedSidebar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Percent, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Arrow } from "@radix-ui/react-tooltip";

export function OfferForm() {
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  // console.log("API URL:", apiUrl);

  const [pujaList, setPujaList] = useState<
    { _id: string; title: string; category: string }[]
  >([]);

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    pujaTypes: [], // <-- now an array
    pujaIds: [],
    offerTitle: "",
    offerDescription: "",
    discountPercent: "",
    startDate: new Date(),
    endDate: new Date(),
    isActive: false,
  });

  // Fetch available pujas
  // useEffect(() => {
  //   const fetchPujas = async () => {
  //     try {
  //       const res = await fetch(`${apiUrl}/api/pujas/all`);
  //       if (!res.ok) throw new Error("Failed to fetch pujas");
  //       const data = await res.json();

  //       // Ensure pujaList is always an array
  //       setPujaList(Array.isArray(data) ? data : [data]);
  //     } catch (error: any) {
  //       toast({
  //         title: "Error fetching Pujas",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //     }
  //   };
  //   fetchPujas();
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/categories/all`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error: any) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    fetchCategories();
  }, []);

  const [offers, setOffers] = useState<any[]>([]);

  // Fetch current offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/offer/all`);
        if (!res.ok) throw new Error("Failed to fetch offers");

        const data = await res.json();
        // console.log("Fetched Offers:", data.offers); // 👀 Optional: check in console

        // ✅ Properly set offers array from response
        setOffers(Array.isArray(data.offers) ? data.offers : []);
      } catch (error: any) {
        toast({
          title: "Error fetching offers",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchOffers();
  }, [apiUrl, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Determine URL and method based on edit mode
      const url = editingOfferId
        ? `${apiUrl}/api/offer/update/${editingOfferId}` // your update endpoint
        : `${apiUrl}/api/offer/create`;
      const method = editingOfferId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save offer");
      }

      toast({
        title: editingOfferId
          ? "✅ Offer Updated Successfully"
          : "🎉 Offer Added Successfully",
        description: editingOfferId
          ? "Your offer has been updated successfully."
          : "Your offer has been created successfully.",
      });

      // ✅ Refresh offer list
      const res = await fetch(`${apiUrl}/api/offer/all`);
      const data = await res.json();
      setOffers(Array.isArray(data.offers) ? data.offers : []);

      // ✅ Reset form and editing ID
      setFormData({
        pujaTypes: [],
        pujaIds: [],
        offerTitle: "",
        offerDescription: "",
        discountPercent: "",
        startDate: new Date(),
        endDate: new Date(),
        isActive: false,
      });
      // console.log()
      setEditingOfferId(null);
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  //   new
  // ✅ Toggle Active (only one true at a time)
  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/offer/toggle/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to toggle active status");

      toast({
        title: "✅ Offer Status Updated",
        description: "Only one offer can be active at a time.",
      });

      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // ✅ View Offer (for now, just show in toast or console)
  const handleView = (offer: any) => {
    // console.log("View Offer:", offer);
    toast({
      title: offer.offerTitle,
      description: offer.offerDescription || "No description available.",
    });
  };

  // ✅ Edit Offer (prefill form)
  const handleEdit = (offer: any) => {
    setFormData({
      offerTitle: offer.offerTitle,
      offerDescription: offer.offerDescription,
      discountPercent: offer.discountPercent,
      startDate: new Date(offer.startDate),
      endDate: new Date(offer.endDate),
      pujaIds: offer.pujaIds.map((p: any) => p._id),
      pujaTypes: offer.pujaTypes.map((p: any) => p._id),
      isActive: offer.isActive,
    });

    setEditingOfferId(offer._id); // ✅ Important
  };

  // ✅ Delete Offer
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    try {
      const res = await fetch(`${apiUrl}/api/offer/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete offer");

      toast({
        title: "🗑️ Offer Deleted",
        description: "The offer has been removed successfully.",
      });

      setOffers((prev) => prev.filter((o) => o._id !== id));
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // 🔥 Fetch Pujas whenever pujaTypes (category IDs) change
  useEffect(() => {
    const fetchMultiplePujaByCategories = async () => {
      if (!formData.pujaTypes || formData.pujaTypes.length === 0) {
        setPujaList([]); // clear pujas when no category selected
        return;
      }

      try {
        const res = await fetch(
          `${apiUrl}/api/pujas/getPujaByCategory/multiple`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              categories: formData.pujaTypes,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error fetching pujas");

        // data.pujas should be an array
        setPujaList(data.pujas || []);
      } catch (error: any) {
        console.error("Fetch pujas error:", error);

        toast({
          title: "Error fetching Pujas",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchMultiplePujaByCategories();
    // console.log("hello");
  }, [formData.pujaTypes]);

  // const handleLoadPujas = () => {
  //   console.log(formData.pujaTypes);
  // };
  // console.log(pujaList);
  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 p-4 ml-3">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
            <CardHeader id="start" className="pb-6">
              <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-semibold">
                <div className="p-2 rounded-lg bg-gradient-spiritual text-spiritual-foreground shadow-spiritual">
                  <Percent className="w-6 h-6" />
                </div>
                Create/Update Offer for Puja
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Manage discounts and offers of Pujas.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Offer Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                    Offer Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
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
                        placeholder="Festival Special Discount"
                      />
                    </div>

                    <div className="space-y-2">
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
                        placeholder="Enter discount percentage"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Offer Description</Label>
                      <Input
                        value={formData.offerDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            offerDescription: e.target.value,
                          }))
                        }
                        placeholder="Describe the offer details (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Puja Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                    Select Puja Type
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Puja Type */}
                    {/* Puja Type Multi-Select */}
                    <div className="space-y-2">
                      <Label>Puja Categories *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal"
                          >
                            {formData.pujaTypes?.length
                              ? `${formData.pujaTypes.length} category(s) selected`
                              : "Select Puja Categories"}
                            <span className="ml-2 text-gray-500">▼</span>
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] max-h-[250px] overflow-y-auto">
                          {categories.length > 0 ? (
                            categories.map((cat) => {
                              const isSelected = formData.pujaTypes.includes(
                                cat._id
                              );
                              return (
                                <div
                                  key={cat._id}
                                  className={cn(
                                    "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-accent",
                                    isSelected
                                  )}
                                  onClick={() => {
                                    setFormData((prev) => {
                                      const already = prev.pujaTypes.includes(
                                        cat._id
                                      );
                                      return {
                                        ...prev,
                                        pujaTypes: already
                                          ? prev.pujaTypes.filter(
                                              (id) => id !== cat._id
                                            )
                                          : [...prev.pujaTypes, cat._id],
                                      };
                                    });
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="accent-orange-500"
                                  />
                                  <span className="capitalize">{cat.name}</span>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-muted-foreground text-sm px-2">
                              No categories found
                            </p>
                          )}
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Puja Name */}
                    {/* Puja Selection (Multi-select) */}
                    <div className="space-y-2">
                      <Label>Select Pujas *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal"
                          >
                            {formData.pujaIds?.length
                              ? `${formData.pujaIds.length} puja(s) selected`
                              : "Select Pujas"}
                            <span className="ml-2 text-gray-500">▼</span>
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] max-h-[300px] overflow-y-auto">
                          {/* Select All / Clear All */}
                          {Array.isArray(pujaList) && pujaList.length > 0 && (
                            <div
                              className="flex items-center justify-between px-2 py-1 mb-2 border-b cursor-pointer hover:bg-accent rounded"
                              onClick={() => {
                                const allIds = pujaList.map((p) => p._id);
                                const allSelected = allIds.every((id) =>
                                  formData.pujaIds.includes(id)
                                );

                                setFormData((prev) => ({
                                  ...prev,
                                  pujaIds: allSelected ? [] : allIds,
                                }));
                              }}
                            >
                              <span className="font-medium">
                                {pujaList.every((p) =>
                                  formData.pujaIds.includes(p._id)
                                )
                                  ? "Deselect All"
                                  : "Select All"}
                              </span>

                              <input
                                type="checkbox"
                                readOnly
                                className="accent-orange-600"
                                checked={pujaList.every((p) =>
                                  formData.pujaIds.includes(p._id)
                                )}
                              />
                            </div>
                          )}

                          {/* No Pujas Found Message */}
                          {Array.isArray(pujaList) && pujaList.length === 0 && (
                            <p className="text-center py-4 text-gray-500">
                              No puja found
                            </p>
                          )}

                          {/* Puja List */}
                          {Array.isArray(pujaList) &&
                            pujaList.length > 0 &&
                            pujaList.map((puja) => {
                              const isSelected = formData.pujaIds.includes(
                                puja._id
                              );

                              return (
                                <div
                                  key={puja._id}
                                  className={cn(
                                    "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-accent",
                                    isSelected
                                  )}
                                  onClick={() => {
                                    setFormData((prev) => {
                                      const alreadySelected =
                                        prev.pujaIds.includes(puja._id);

                                      return {
                                        ...prev,
                                        pujaIds: alreadySelected
                                          ? prev.pujaIds.filter(
                                              (id) => id !== puja._id
                                            )
                                          : [...prev.pujaIds, puja._id],
                                      };
                                    });
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="accent-orange-500"
                                  />
                                  <span>{puja.title}</span>
                                </div>
                              );
                            })}
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                    Offer Duration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {formData.startDate
                              ? format(formData.startDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) =>
                              setFormData((p) => ({ ...p, startDate: date! }))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <Label>End Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {formData.endDate
                              ? format(formData.endDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) =>
                              setFormData((p) => ({ ...p, endDate: date! }))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-spiritual text-spiritual-foreground py-4 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading
                      ? "Saving..."
                      : editingOfferId
                      ? "Update Offer"
                      : "Publish Offer"}
                  </Button>
                </div>
              </form>

              {/* current offer */}
              <div className="mt-10 border-t pt-8">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-spiritual"></div>
                  All Offers
                </h3>

                {loading ? (
                  <p className="text-muted-foreground">Loading offers...</p>
                ) : offers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 bg-white text-sm shadow-sm rounded-lg">
                      <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                          <th className="p-3 text-left">#</th>
                          <th className="p-3 text-left">Offer Title</th>
                          <th className="p-3 text-left">Discount</th>
                          <th className="p-3 text-left">Start Date</th>
                          <th className="p-3 text-left">End Date</th>
                          <th className="p-3 text-left">Active</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {offers.map((offer, index) => (
                          <tr
                            key={offer._id}
                            className="border-b last:border-none hover:bg-gray-50 transition"
                          >
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 font-medium">
                              {offer.offerTitle}
                            </td>
                            <td className="p-3 text-orange-600 font-semibold">
                              {offer.discountPercent}%
                            </td>
                            <td className="p-3">
                              {offer.startDate
                                ? format(new Date(offer.startDate), "PPP")
                                : "N/A"}
                            </td>
                            <td className="p-3">
                              {offer.endDate
                                ? format(new Date(offer.endDate), "PPP")
                                : "N/A"}
                            </td>

                            {/* ✅ Toggle for isActive */}
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={offer.isActive}
                                onChange={() => handleToggleActive(offer._id)}
                                className="w-5 h-5 accent-green-600 cursor-pointer"
                              />
                            </td>

                            {/* ✅ Actions */}
                            <td className="p-3 flex gap-2">
                              <button
                                onClick={() => handleEdit(offer)}
                                className="px-2 py-1 text-yellow-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(offer._id)}
                                className="px-2 py-1 text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No offers created yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
function setEditingOfferId(_id: any) {
  throw new Error("Function not implemented.");
}
