import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Flower,
  Calendar,
  Users,
  TrendingUp,
  Plus,
  List,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import heroImage from "@/assets/puja-dashboard-hero.jpg";
import axios from "axios";

// ---------------------- Count-up hook ----------------------
const useCountUp = (
  end: number,
  duration: number = 1500,
  format?: (val: number) => string
) => {
  const [count, setCount] = useState(0);

  //
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return format ? format(count) : count;
};

// ---------------------- StatsCard ----------------------
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  isCurrency?: boolean;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  isCurrency,
}: StatsCardProps) => {
  const isNumber = typeof value === "number";

  const animatedValue = isNumber
    ? useCountUp(value as number, 1500, (val) =>
        isCurrency
          ? `₹${val.toLocaleString("en-IN")}`
          : val.toLocaleString("en-IN")
      )
    : value;

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1">
            {animatedValue}
          </h3>
        </div>
        <Icon className="w-8 h-8 text-saffron" />
      </CardContent>
    </Card>
  );
};

// ---------------------- Dashboard Sections ----------------------
import { ManagePujas } from "@/components/dashboard/ManagePujas";
import { ManageCategories } from "@/components/dashboard/ManageCategories";
import { PujaForm } from "@/components/dashboard/PujaForm";
import { CategoryForm } from "@/components/dashboard/CategoryForm";
import { ManageBookings } from "@/components/dashboard/ManageBookings";
import { ManageActiveBookings } from "@/components/dashboard/ActiveBookings";
import { ManageCancelBookings } from "@/components/dashboard/CancelBookings";
import { ManageUpcomingPujas } from "@/components/dashboard/ManageUpcomingPujas";
import { UploadData } from "@/components/dashboard/UploadData";
import AddRudraksha from "@/components/dashboard/RudrakshaForm";
import AddBracelet from "@/components/dashboard/BraceletForm";
import { ManageRudraksha } from "@/components/dashboard/ManageRudraksha";
import { ManageOrders } from "@/components/dashboard/ManageOrders";
import { ManageBracelets } from "@/components/dashboard/ManageBracelets";
import AddBlogForm from "@/components/dashboard/BlogForm";
import { ManageBlogs } from "@/components/dashboard/ManageBlogs";
import ManagePujaForms from "@/components/dashboard/manageParticipateBooking";

export type DashboardSection =
  | "dashboard"
  | "add-puja"
  | "add-blog"
  | "add-rudraksha"
  | "add-bracelet"
  | "add-category"
  | "manage"
  | "manage-categories"
  | "manage-blogs"
  | "manage-puja-forms"
  | "manage-bookings"
  | "manage-bracelets"
  | "manage-rudraksha"
  | "manage-orders"
  | "manage-puja-forms"
  | "upload"
  | "settings"
  | "active"
  | "cancel"
  | "manage-upcoming"
  | "reminder"
  | "product-dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active section from URL
  const getSectionFromPath = (): DashboardSection => {
    const path = location.pathname.split("/")[2];
    return (path || "dashboard") as DashboardSection;
  };

  const [activeSection, setActiveSection] = useState<DashboardSection>(
    getSectionFromPath()
  );

  // Sync section with URL changes (back/forward)
  useEffect(() => {
    setActiveSection(getSectionFromPath());
  }, [location.pathname]);

  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
    navigate(`/dashboard/${section}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "add-puja":
        return <PujaForm />;
      case "add-blog":
        return <AddBlogForm />;
      case "add-category":
        return <CategoryForm />;
      case "add-rudraksha":
        return <AddRudraksha />;
      case "add-bracelet":
        return <AddBracelet />;
      case "manage":
        return <ManagePujas />;
      case "manage-rudraksha":
        return <ManageRudraksha />;
      case "manage-categories":
        return <ManageCategories />;
      case "manage-puja-forms":
        return <ManagePujaForms />;
      case "manage-blogs":
        return <ManageBlogs />;
      case "manage-bookings":
        return <ManageBookings />;
      case "manage-bracelets":
        return <ManageBracelets />;
      case "manage-orders":
        return <ManageOrders />;
      case "active":
        return <ManageActiveBookings />;
      case "cancel":
        return <ManageCancelBookings />;
      case "manage-upcoming":
        return <ManageUpcomingPujas />;
      case "upload":
        return <UploadData />;
      default:
        return <DashboardHome onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

// ---------------------- Dashboard Home ----------------------
interface DashboardHomeProps {
  onSectionChange: (section: DashboardSection) => void;
}

const DashboardHome = ({ onSectionChange }: DashboardHomeProps) => {
  const navigate = useNavigate();

  const [totalPujas, setTotalPujas] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalRudraksha, setTotalRudraksha] = useState(0);
  // const [totalCategories, setTotalCategories] = useState(0);
  const [activeBookings, setactiveBookings] = useState(0);
  const [cancelBookings, setcancelBookings] = useState(0);
  const [upcomingPujas, setupcomingPujas] = useState(0);
  const [totalDevotee, settotalDevotee] = useState(0);
  const [monthRevenue, setmonthRevenue] = useState(0);
  const [recentPuja, setrecentPuja] = useState<any[]>([]);
  const [recentUpcoming, setupcoming] = useState<any[]>([]); // 🆕 Added
  const [TotalBracelet, setTotalBracelet] = useState(0); // 🆕 Added
  const [TotalOrders, setTotalOrders] = useState(0); // 🆕 Added
  const [TotalBlogs, setTotalBlogs] = useState(0); // 🆕 Added
  const [TotalParticipationPujas, setTotalParticipationPujas] = useState(0); // 🆕 Added

  //
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/pujas/all`)
      .then((res) => setTotalPujas(res.data.length))
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/participate/bookings`)
      .then((res) => {
        console.log(res.data.data.length);
        setTotalParticipationPujas(res.data?.data?.length);
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/categories/all`)
      .then((res) => setTotalCategories(res.data.length))
      .catch(console.error);
    axios
      .get(`${apiUrl}/api/blogs`)
      .then((res) => {
        // console.log();
        setTotalBlogs(res.data.data.blogs.length);
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/bookings/status/active`)
      .then((res) => setactiveBookings(res.data.length))
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/bookings/status/cancel`)
      .then((res) => setcancelBookings(res.data.length))
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/pujas/all`)
      .then((res) => {
        // Filter pujas where category name = "Upcoming Festival Puja"
        const upcoming = res.data.filter(
          (puja) => puja.category?.name === "Upcoming Festival Puja"
        );

        // console.log(upcoming); // shows filtered pujas
        setupcomingPujas(upcoming.length); // count of matching pujas
      })
      .catch((err) => {
        console.error("Error fetching pujas:", err);
      });

    axios
      .get(`${apiUrl}/api/bookings/totaldevotees`)
      .then((res) => settotalDevotee(res.data.uniqueDevotees.length))
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/bookings/revenue/total`)
      .then((res) => {
        console.log(res.data.totalRevenue);
        setmonthRevenue(res.data.totalRevenue);
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/pujas/all`)
      .then((res) => {
        const sorted = res.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setrecentPuja(sorted.slice(0, 5));
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/product/rudraksha`)
      .then((res) => setTotalRudraksha(res.data.data.rudraksha.length))
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/orders`)
      .then((res) => {
        // console.log(res.data.data.orders.length);
        setTotalOrders(res.data.data.orders.length);
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/product/bracelet`)
      .then((res) => setTotalBracelet(res.data.data.bracelets.length))
      .catch(console.error);
    // axios
    //   .get("http://localhost:5000/api/bookings/status/active")
    //   .then((res) => setactiveBookings(res.data.length))
    //   .catch(console.error);

    // 🆕 Fetch Recent Orders
    axios
      .get(`${apiUrl}/api/orders`)
      .then((res) => {
        const sortedOrders = res.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setupcoming(sortedOrders.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this puja?")) return;
    try {
      await axios.delete(`${apiUrl}/api/pujas/${id}`);
      setrecentPuja((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete puja");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-spiritual shadow-spiritual">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Puja Dashboard Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Veda Structure Dashboard
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Veda Structure Dashboard Admin Panel — Manage pujas, devotees, and
            spiritual services seamlessly. Upload data, monitor bookings, and
            connect effortlessly with your spiritual community.
          </p>

          {/* Responsive Button Container */}
          <div className="flex flex-wrap gap-3">
            <Button
              className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
              onClick={() => onSectionChange("add-puja")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Puja
            </Button>

            <Button
              className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
              onClick={() => onSectionChange("add-category")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Puja Categories
            </Button>

            {/* <Button
              className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
              onClick={() => onSectionChange("add-rudraksha")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Rudraksha
            </Button> */}

            {/* <Button
              className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
              onClick={() => onSectionChange("add-blog")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Blog
            </Button> */}

            {/* <Button
              className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
              onClick={() => onSectionChange("add-bracelet")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Bracelets
            </Button> */}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => onSectionChange("manage")}
          className="cursor-pointer"
        >
          <StatsCard title="Total Pujas" value={totalPujas} icon={Flower} />
        </div>
        <div
          onClick={() => onSectionChange("active")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Active Bookings"
            value={activeBookings}
            icon={Calendar}
          />
        </div>
        <div
          onClick={() => onSectionChange("manage-categories")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Categories"
            value={totalCategories}
            icon={Flower}
          />
        </div>
        <div
          onClick={() => onSectionChange("manage-upcoming")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Upcoming Pujas"
            value={upcomingPujas}
            icon={Calendar}
          />
        </div>
        <div
          onClick={() => onSectionChange("total-devotees" as DashboardSection)}
          className="cursor-pointer"
        >
          <StatsCard title="Total Devotees" value={totalDevotee} icon={Users} />
        </div>
        <div
          onClick={() => onSectionChange("total-revenue" as DashboardSection)}
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Revenue"
            value={monthRevenue}
            icon={TrendingUp}
            isCurrency
          />
        </div>
        <div
          onClick={() => onSectionChange("cancel")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Cancelled Bookings"
            value={cancelBookings}
            icon={X}
          />
        </div>
        {/*  */}
        {/* <div
          onClick={() => onSectionChange("manage-rudraksha")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Rudraksha"
            value={totalRudraksha}
            icon={Flower}
          />
        </div> */}
        <div
          onClick={() => onSectionChange("manage-blogs")}
          className="cursor-pointer"
        >
          <StatsCard title="Total Blogs" value={TotalBlogs} icon={Flower} />
        </div>
        {/* <div
          onClick={() => onSectionChange("manage-bracelets")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Bracelets"
            value={TotalBracelet}
            icon={Flower}
          />
        </div> */}
        {/* <div
          onClick={() => onSectionChange("manage-orders")}
          className="cursor-pointer"
        >
          <StatsCard title="Total orders" value={TotalOrders} icon={Flower} />
        </div> */}
        <div
          onClick={() => onSectionChange("manage-puja-forms")}
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Participation Pujas"
            value={TotalParticipationPujas}
            icon={Flower}
          />
        </div>
      </div>

      {/* Quick Actions + Recent Pujas + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="spiritual"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("add-puja")}
            >
              <Plus className="w-4 h-4" /> Add New Puja
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("add-category")}
            >
              <Plus className="w-4 h-4" /> Add New Categories
            </Button>
            {/* new */}
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("add-rudraksha")}
            >
              <Plus className="w-4 h-4" /> Add New Rudraksha
            </Button> */}
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("add-bracelet")}
            >
              <Plus className="w-4 h-4" /> Add New Bracelet
            </Button> */}
            {/* new line end */}
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage-bookings")}
            >
              <List className="w-4 h-4" /> Manage Bookings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage")}
            >
              <List className="w-4 h-4" /> Manage Pujas
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage-categories")}
            >
              <List className="w-4 h-4" /> Manage Categories
            </Button>
            {/* new */}
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage-orders")}
            >
              <List className="w-4 h-4" /> Manage Orders
            </Button> */}
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage-rudraksha")}
            >
              <List className="w-4 h-4" /> Manage Rudraksha
            </Button> */}
            {/* <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("manage-bracelets")}
            >
              <List className="w-4 h-4" /> Manage Bracelets
            </Button> */}
            {/* new line end */}
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange("calender" as DashboardSection)}
            >
              <Calendar className="w-5 h-5" /> View bookings on calendar
            </Button>
          </CardContent>
        </Card>

        {/* Recent Pujas */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Newly Added Pujas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPuja.map((puja) => {
              // const today = new Date();
              // const pujaDate = new Date(puja.date);
              // const status = pujaDate >= today ? "Upcoming" : "Completed";
              // const statusClass =
              //   status === "Upcoming"
              //     ? "bg-green-100 text-green-700"
              //     : "bg-gray-100 text-gray-700";

              return (
                <div
                  key={puja._id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-border"
                >
                  <div>
                    <h4 className="font-medium text-foreground">
                      {puja.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {puja.category?.name}
                    </p>
                    {/* <p className="text-sm font-medium text-saffron">
                      {pujaDate.toLocaleDateString()}
                    </p> */}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <span
                      className={`px-2 py-1 text-xs rounded-full ${statusClass}`}
                    >
                      {status}
                    </span> */}
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/pujas/view/${puja._id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/pujas/edit/${puja._id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(puja._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 🆕 Recent Orders */}
        {/* <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Recent Upcoming Pujas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUpcoming.length > 0 ? (
              recentUpcoming.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-border"
                >
                  <div>
                    <h4 className="font-medium text-foreground">
                      {order.user?.name || "Unknown Devotee"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {order.puja?.title || "N/A"}
                    </p>
                    <p className="text-sm font-medium text-saffron">
                      ₹{order.amount?.toLocaleString("en-IN") || 0}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Upcoming pujas
              </p>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
