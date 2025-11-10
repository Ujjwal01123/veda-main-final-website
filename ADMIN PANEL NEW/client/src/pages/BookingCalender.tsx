// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import { format } from "date-fns";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import moment from "moment";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Sidebar } from "@/components/layout/updatedSidebar"; // ✅ import Sidebar

// const localizer = momentLocalizer(moment);

// export function BookingCalendar() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [dayBookings, setDayBookings] = useState<any[]>([]);

//   const apiUrl = import.meta.env.VITE_BASE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/bookings`)
//       .then((res) => {
//         setBookings(res.data);
//         setLoading(false);

//         // Initialize with bookings for the current day
//         const today = new Date();
//         const filtered = res.data.filter(
//           (b: any) =>
//             new Date(b.createdAt).toDateString() === today.toDateString()
//         );
//         setDayBookings(filtered);
//       })
//       .catch((err) => {
//         console.error("Error fetching bookings:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Update day bookings whenever the selected date changes
//   useEffect(() => {
//     if (selectedDate) {
//       const filtered = bookings.filter(
//         (b) =>
//           new Date(b.createdAt).toDateString() === selectedDate.toDateString()
//       );
//       setDayBookings(filtered);
//     }
//   }, [selectedDate, bookings]);

//   // Convert bookings to calendar events
//   const events = bookings.map((b) => ({
//     id: b._id,
//     title: `${b.name}`,
//     start: new Date(b.createdAt),
//     end: new Date(b.createdAt),
//     resource: b,
//   }));

//   // When a slot (date) is clicked
//   const handleDateSelect = (slotInfo: any) => {
//     const clickedDate = new Date(slotInfo.start);
//     setSelectedDate(clickedDate);
//   };

//   // When an event (booking) is clicked
//   const handleEventClick = (event: any) => {
//     const booking = event.resource;
//     alert(
//       `Booking: ${booking.name}\nPuja: ${booking.puja?.title}\nStatus: ${
//         booking.status
//       }\nDate: ${format(new Date(booking.createdAt), "PPP p")}`
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <p className="text-xl font-medium text-gray-700">Loading bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-background to-amber-50">
//       {/* ✅ Sidebar on left */}
//       <div className="hidden lg:block w-64 border-r border-border/30 bg-white/90 backdrop-blur-md">
//         <Sidebar />
//       </div>

//       {/* ✅ Main content area */}
//       <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen font-sans">
//           {/* Calendar Section */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-lg rounded-2xl overflow-hidden bg-white border border-gray-200 h-full">
//               <CardHeader className="bg-gray-100 px-6 py-4">
//                 <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
//                   Booking Calendar
//                 </CardTitle>
//                 <p className="text-sm text-gray-500">
//                   View and manage all your puja bookings at a glance.
//                 </p>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <Calendar
//                   localizer={localizer}
//                   events={events}
//                   startAccessor="start"
//                   endAccessor="end"
//                   style={{ height: 500, fontFamily: "inherit" }}
//                   selectable
//                   onSelectSlot={handleDateSelect}
//                   onSelectEvent={handleEventClick}
//                   eventPropGetter={(event) => {
//                     let bgColor =
//                       event.resource.status === "confirmed"
//                         ? "#22C55E" // green-500
//                         : event.resource.status === "pending"
//                         ? "#F97316" // orange-500
//                         : "#EF4444"; // red-500
//                     return {
//                       style: {
//                         backgroundColor: bgColor,
//                         color: "white",
//                         borderRadius: "6px",
//                         border: "none",
//                         padding: "2px 8px",
//                         fontSize: "12px",
//                         fontWeight: "500",
//                       },
//                     };
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Side Panel Section */}
//           <div>
//             <Card className="shadow-lg rounded-2xl bg-white border border-gray-200 sticky top-10 h-[calc(100vh-80px)] overflow-y-auto">
//               <CardHeader className="bg-gray-100 px-6 py-4">
//                 <CardTitle className="text-xl font-bold text-gray-800">
//                   {selectedDate
//                     ? `Bookings on ${format(selectedDate, "PPP")}`
//                     : "Select a date"}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 {dayBookings.length > 0 ? (
//                   <ul className="space-y-4">
//                     {dayBookings.map((b) => (
//                       <li
//                         key={b._id}
//                         className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition"
//                       >
//                         <p className="text-sm text-gray-500">
//                           <span className="font-semibold text-gray-700">
//                             Puja:
//                           </span>{" "}
//                           {b.puja?.title}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           <span className="font-semibold text-gray-700">
//                             Name:
//                           </span>{" "}
//                           {b.name}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           <span className="font-semibold text-gray-700">
//                             Status:
//                           </span>{" "}
//                           <span
//                             className={`font-semibold ${
//                               b.status === "confirmed"
//                                 ? "text-green-600"
//                                 : b.status === "pending"
//                                 ? "text-yellow-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {b.status}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           <span className="font-semibold text-gray-700">
//                             Payment:
//                           </span>{" "}
//                           {b.paymentStatus}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2">
//                           <span className="font-semibold">Booked On:</span>{" "}
//                           {format(new Date(b.createdAt), "PPP p")}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-center text-gray-400">
//                     <p>No bookings on this date.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const localizer = momentLocalizer(moment);

export function BookingCalendar() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dayBookings, setDayBookings] = useState<any[]>([]);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/bookings`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
        // Initialize with bookings for the current day
        const today = new Date();
        const filtered = res.data.filter(
          (b: any) =>
            new Date(b.createdAt).toDateString() === today.toDateString()
        );
        setDayBookings(filtered);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  // Update day bookings whenever the selected date changes
  useEffect(() => {
    if (selectedDate) {
      const filtered = bookings.filter(
        (b) =>
          new Date(b.createdAt).toDateString() === selectedDate.toDateString()
      );
      setDayBookings(filtered);
    }
  }, [selectedDate, bookings]);

  // Convert bookings to calendar events
  const events = bookings.map((b) => ({
    id: b._id,
    title: `${b.name}`,
    start: new Date(b.createdAt),
    end: new Date(b.createdAt),
    resource: b,
  }));

  // When a slot (date) is clicked
  const handleDateSelect = (slotInfo: any) => {
    const clickedDate = new Date(slotInfo.start);
    setSelectedDate(clickedDate);
  };

  // When an event (booking) is clicked
  const handleEventClick = (event: any) => {
    const booking = event.resource;
    alert(
      `Booking: ${booking.name}\nPuja: ${booking.puja?.title}\nStatus: ${
        booking.status
      }\nDate: ${format(new Date(booking.createdAt), "PPP p")}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-medium text-gray-700">Loading bookings...</p>
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
              Booking Calendar
            </CardTitle>
            <p className="text-sm text-gray-500">
              View and manage all your puja bookings at a glance.
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
                  event.resource.status === "confirmed"
                    ? "#22C55E" // green-500
                    : event.resource.status === "pending"
                    ? "#F97316" // orange-500
                    : "#EF4444"; // red-500
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
                ? `Bookings on ${format(selectedDate, "PPP")}`
                : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {dayBookings.length > 0 ? (
              <ul className="space-y-4">
                {dayBookings.map((b) => (
                  <li
                    key={b._id}
                    className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition"
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
                        Status:
                      </span>{" "}
                      <span
                        className={`font-semibold ${
                          b.status === "confirmed"
                            ? "text-green-600"
                            : b.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold text-gray-700">
                        Payment:
                      </span>{" "}
                      {b.paymentStatus}
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
