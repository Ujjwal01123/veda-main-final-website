// pages/TotalDevotees.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TotalDevotees() {
  const [uniqueDevotees, setUniqueDevotees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevotee, setSelectedDevotee] = useState(null);
  const [topCustomer, setTopCustomer] = useState(null);
  const [mostDemandedPuja, setMostDemandedPuja] = useState(null);

  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    const fetchDevotees = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/bookings/totaldevotees`);
        const devotees = res.data.uniqueDevotees;
        setUniqueDevotees(devotees);
        if (devotees.length > 0) setSelectedDevotee(devotees[0]);

        // Determine top customer
        const top = devotees.reduce(
          (max, devotee) =>
            (devotee.bookingCount || 0) > (max.bookingCount || 0)
              ? devotee
              : max,
          devotees[0]
        );
        setTopCustomer(top);

        // Calculate most demanded puja overall
        const pujaCountMap = new Map();
        devotees.forEach((devotee) => {
          devotee.bookings.forEach((b) => {
            pujaCountMap.set(
              b.pujaTitle,
              (pujaCountMap.get(b.pujaTitle) || 0) + 1
            );
          });
        });

        if (pujaCountMap.size > 0) {
          const mostDemanded = Array.from(pujaCountMap.entries()).reduce(
            (max, curr) => (curr[1] > max[1] ? curr : max),
            ["", 0]
          );
          setMostDemandedPuja({
            title: mostDemanded[0],
            count: mostDemanded[1],
          });
        }
      } catch (error) {
        console.error("Error fetching unique devotees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevotees();
  }, []);

  return (
    <div className="p-6 bg-[#FFF6EB] min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">
        Total Devotees
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading devotees...</p>
      ) : uniqueDevotees.length === 0 ? (
        <p className="text-gray-600 text-center">No devotees found.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4 bg-white rounded-2xl shadow-lg p-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Devotees
            </h2>
            <ul>
              {uniqueDevotees.map((devotee, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-3 rounded-lg mb-2 transition-colors duration-200 ${
                    selectedDevotee?.email === devotee.email
                      ? "bg-orange-100 font-semibold"
                      : "hover:bg-orange-50"
                  }`}
                  onClick={() => setSelectedDevotee(devotee)}
                >
                  {devotee.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            {/* User Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-200 p-4 rounded-full">
                  <Users className="w-10 h-10 text-orange-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedDevotee.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 font-medium">Email</p>
                  <p className="text-gray-800">{selectedDevotee.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-800">{selectedDevotee.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Bookings</p>
                  <p className="text-orange-700 font-semibold">
                    {selectedDevotee.bookingCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Right: Analytics + Top Customer + Most Demanded Puja */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Analytics Graph */}
              <div className="md:w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                  {selectedDevotee.name}'s Bookings
                </h3>
                {selectedDevotee.bookings &&
                selectedDevotee.bookings.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={selectedDevotee.bookings.map((b) => ({
                        name: b.pujaTitle,
                        amount: b.amount,
                      }))}
                      margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                    >
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `₹${value}`}
                        labelFormatter={(label) => `Puja: ${label}`}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#F97316"
                        barSize={40}
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-600 text-center">No bookings data</p>
                )}
              </div>

              {/* Right Panel */}
              <div className="md:w-full lg:w-1/2 flex flex-col gap-6">
                {/* Top Customer */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Top Customer
                  </h3>
                  {topCustomer ? (
                    <div className="text-center">
                      <div className="bg-orange-200 p-4 rounded-full inline-block mb-4">
                        <Users className="w-10 h-10 text-orange-700" />
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {topCustomer.name}
                      </p>
                      <p className="text-orange-700 font-semibold">
                        {topCustomer.bookingCount} Bookings
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center">No top customer</p>
                  )}
                </div>

                {/* Most Demanded Puja */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Most Demanded Puja
                  </h3>
                  {mostDemandedPuja ? (
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-center">
                      <p className="font-medium text-gray-800">
                        {mostDemandedPuja.title}
                      </p>
                      <p className="text-orange-700 font-semibold">
                        {mostDemandedPuja.count} Bookings
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center">No bookings</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
