// pages/RevenueCalendar.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const localizer = momentLocalizer(moment);

interface Booking {
  _id: string;
  puja: { _id: string; title: string; description: string };
  name: string;
  amount: number;
  bookingDate: string;
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
  resource: Booking;
}

export function RevenueCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dayRevenue, setDayRevenue] = useState<number>(0);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    axios
      .get<Booking[]>(`${apiUrl}/api/bookings`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);

        const today = new Date();
        filterByDate(today, res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  const filterByDate = (date: Date, data: Booking[]) => {
    const filtered = data.filter(
      (b) => new Date(b.createdAt).toDateString() === date.toDateString()
    );
    setDayBookings(filtered);

    const revenue = filtered
      .filter((b) => b.paymentStatus === "paid")
      .reduce((acc, b) => acc + b.amount, 0);
    setDayRevenue(revenue);
  };

  useEffect(() => {
    if (selectedDate) {
      filterByDate(selectedDate, bookings);
    }
  }, [selectedDate, bookings]);

  const events: RevenueEvent[] = bookings.map((b) => ({
    id: b._id,
    title: `${b.name} (${b.paymentStatus})`,
    start: new Date(b.createdAt),
    end: new Date(b.createdAt),
    resource: b,
  }));

  const handleDateSelect = (slotInfo: any) => {
    const clickedDate = new Date(slotInfo.start);
    setSelectedDate(clickedDate);
  };

  const handleEventClick = (event: RevenueEvent) => {
    const booking = event.resource;
    alert(
      `Booking: ${booking.name}\nPuja: ${booking.puja?.title}\nAmount: ₹${
        booking.amount
      }\nStatus: ${booking.status}\nPayment: ${
        booking.paymentStatus
      }\nDate: ${format(new Date(booking.createdAt), "PPP p")}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-medium text-gray-700">
          Loading revenue data...
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
              Revenue Calendar
            </CardTitle>
            <p className="text-sm text-gray-500">
              Track daily & monthly puja revenue at a glance.
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
                    ? "#22C55E" // green-500
                    : "#F97316"; // orange-500
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
            {dayBookings.length > 0 ? (
              <ul className="space-y-4">
                {dayBookings.map((b) => (
                  <li
                    key={b._id}
                    className={`p-4 border border-gray-200 rounded-xl shadow-sm transition ${
                      b.paymentStatus === "paid"
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">Puja:</span>{" "}
                      {b.puja?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">Name:</span>{" "}
                      {b.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Amount:
                      </span>{" "}
                      ₹{b.amount}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Payment:
                      </span>{" "}
                      <span
                        className={
                          b.paymentStatus === "paid"
                            ? "text-green-600 font-semibold"
                            : "text-orange-600 font-semibold"
                        }
                      >
                        {b.paymentStatus}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="font-semibold">Booked On:</span>{" "}
                      {format(new Date(b.createdAt), "PPP p")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-400">
                <p>No bookings on this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
