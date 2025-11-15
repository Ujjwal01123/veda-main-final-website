import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface PujaType {
  _id: string;
  name: string;
}

interface Puja {
  _id: string;
  title: string;
}

interface Offer {
  _id: string;
  offerTitle: string;
  offerDescription?: string;
  discountPercent: number;
  pujaTypes?: PujaType[];
  pujaIds?: Puja[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const OfferViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; // ✅ Use Vite env variable
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "Invalid Offer ID",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const fetchOffer = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/offer/${id}`);
        if (!res.ok) throw new Error("Failed to fetch offer");
        const data = await res.json();
        console.log("Fetched offer data:", data);
        if (!data.success || !data.offer) throw new Error("Offer not found");
        setOffer(data.offer);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id, apiUrl]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading offer...</div>
    );

  if (!offer)
    return (
      <div className="p-10 text-center text-gray-500">Offer not found.</div>
    );

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {offer.offerTitle}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Offer ID: {offer._id}</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin/offers")}>
            ← Back
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {offer.offerDescription || "No description available"}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Discount</h3>
              <p className="text-xl font-bold text-orange-600">
                {offer.discountPercent}%
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Status</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  offer.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {offer.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Start Date</h3>
              <p>{format(new Date(offer.startDate), "PPP")}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">End Date</h3>
              <p>{format(new Date(offer.endDate), "PPP")}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Linked Pujas</h3>
            {offer.pujaIds?.length ? (
              <ul className="list-disc list-inside space-y-1">
                {offer.pujaIds.map((p) => (
                  <li key={p._id} className="text-gray-700">
                    {p.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No Pujas linked</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Puja Types</h3>
            {offer.pujaTypes?.length ? (
              <div className="flex flex-wrap gap-2">
                {offer.pujaTypes.map((t) => (
                  <span
                    key={t._id}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No Puja types added</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfferViewPage;
