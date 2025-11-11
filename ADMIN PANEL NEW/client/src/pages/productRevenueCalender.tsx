// pages/ProductRevenueCalendar.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const localizer = momentLocalizer(moment);

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Order {
  _id: string;
  user: { fullname: string; email: string };
  products: { product: Product; quantity: number }[];
  totalAmount: number;
  paymentStatus: "pending" | "paid";
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RevenueEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Order;
}

export function ProductRevenueCalendar() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dayRevenue, setDayRevenue] = useState<number>(0);
  const [dayOrders, setDayOrders] = useState<Order[]>([]);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    axios
      .get<Order[]>(`${apiUrl}/api/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);

        const today = new Date();
        filterByDate(today, res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const filterByDate = (date: Date, data: Order[]) => {
    const filtered = data.filter(
      (o) => new Date(o.createdAt).toDateString() === date.toDateString()
    );
    setDayOrders(filtered);

    const revenue = filtered
      .filter((o) => o.paymentStatus === "paid")
      .reduce((acc, o) => acc + o.totalAmount, 0);
    setDayRevenue(revenue);
  };

  useEffect(() => {
    if (selectedDate) {
      filterByDate(selectedDate, orders);
    }
  }, [selectedDate, orders]);

  const events: RevenueEvent[] = orders.map((o) => ({
    id: o._id,
    title: `${o.user.fullname} (${o.paymentStatus})`,
    start: new Date(o.createdAt),
    end: new Date(o.createdAt),
    resource: o,
  }));

  const handleDateSelect = (slotInfo: any) => {
    const clickedDate = new Date(slotInfo.start);
    setSelectedDate(clickedDate);
  };

  const handleEventClick = (event: RevenueEvent) => {
    const order = event.resource;
    const productNames = order.products
      .map((p) => `${p.product.name} ×${p.quantity}`)
      .join(", ");

    alert(
      `Customer: ${order.user.fullname}\nProducts: ${productNames}\nTotal: ₹${order.totalAmount}\nStatus: ${order.status}\nPayment: ${order.paymentStatus}\nDate: ${format(new Date(order.createdAt), "PPP p")}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-medium text-gray-700">
          Loading product revenue data...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-10 bg-gray-50 min-h-screen font-sans">
      {/* Calendar Section */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg rounded-2xl overflow-hidden bg-white border border-gray-200 h-full">
          <CardHeader className="bg-gray-100 px-6 py-4">
            <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
              Product Revenue Calendar
            </CardTitle>
            <p className="text-sm text-gray-500">
              Track daily & monthly product sales at a glance.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, fontFamily: "inherit" }}
              selectable
              onSelectSlot={handleDateSelect}
              onSelectEvent={handleEventClick}
              eventPropGetter={(event) => {
                let bgColor =
                  event.resource.paymentStatus === "paid"
                    ? "#22C55E"
                    : "#F97316";
                return {
                  style: {
                    backgroundColor: bgColor,
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontWeight: "500",
                  },
                };
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Side Panel Section */}
      <div>
        <Card className="shadow-lg rounded-2xl bg-white border border-gray-200 sticky top-10 h-[calc(100vh-80px)] overflow-y-auto">
          <CardHeader className="bg-gray-100 px-6 py-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              {selectedDate
                ? `Revenue on ${format(selectedDate, "PPP")}`
                : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Total Revenue:{" "}
              <span className="text-green-600">₹{dayRevenue}</span>
            </p>

            {dayOrders.length > 0 ? (
              <ul className="space-y-4">
                {dayOrders.map((o) => (
                  <li
                    key={o._id}
                    className={`p-4 border border-gray-200 rounded-xl shadow-sm transition ${
                      o.paymentStatus === "paid"
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Customer:
                      </span>{" "}
                      {o.user.fullname}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Products:
                      </span>{" "}
                      {o.products.map((p) => p.product.name).join(", ")}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Total:
                      </span>{" "}
                      ₹{o.totalAmount}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Payment:
                      </span>{" "}
                      <span
                        className={
                          o.paymentStatus === "paid"
                            ? "text-green-600 font-semibold"
                            : "text-orange-600 font-semibold"
                        }
                      >
                        {o.paymentStatus}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="font-semibold">Ordered On:</span>{" "}
                      {format(new Date(o.createdAt), "PPP p")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-400">
                <p>No orders on this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
