import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/productDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { Flower } from "lucide-react";
import {
  Gem,
  Flower,
  ShoppingBag,
  TrendingUp,
  Plus,
  List,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import heroImage from "@/assets/puja-dashboard-hero.jpg";
import axios from "axios";

// ---------------------- Count-up Hook ----------------------
const useCountUp = (
  end: number,
  duration: number = 1500,
  format?: (val: number) => string
) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
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

// ---------------------- ProductDashboard ----------------------
const ProductDashboard = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  const [totalRudraksha, setTotalRudraksha] = useState(0);
  const [totalBracelet, setTotalBracelet] = useState(0);
  const [totalGemstone, setTotalGemstone] = useState(0);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/product/rudraksha`)
      .then((res) =>
        setTotalRudraksha(res.data.data?.rudraksha?.length || 0)
      )
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/product/bracelet`)
      .then((res) =>
        setTotalBracelet(res.data.data?.bracelets?.length || 0)
      )
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/product/gemstone`)
      .then((res) =>
        setTotalGemstone(res.data.data?.gemstones?.length || 0)
      )
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/orders`)
      .then((res) => {
        setTotalOrders(res.data.data?.orders?.length || 0);
        setRecentProducts(res.data.data?.orders?.slice(0, 5) || []);
      })
      .catch(console.error);

    axios
      .get(`${apiUrl}/api/orders/revenue/total`)
      .then((res) => setTotalRevenue(res.data.totalRevenue || 0))
      .catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${apiUrl}/api/product/${id}`);
      setRecentProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <DashboardLayout activeSection="product-dashboard" onSectionChange={() => {}}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-spiritual shadow-spiritual">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Product Dashboard Hero"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Product Management Dashboard
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Manage Rudraksha, Bracelets, and Gemstones — monitor inventory,
              sales, and orders effortlessly.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
                onClick={() => navigate("/dashboard/add-rudraksha")}
              >
                <Plus className="w-4 h-4 mr-2" /> Add New Rudraksha
              </Button>
              <Button
                className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
                onClick={() => navigate("/dashboard/add-bracelet")}
              >
                <Plus className="w-4 h-4 mr-2" /> Add New Bracelet
              </Button>
              {/* <Button
                className="flex-1 sm:flex-none bg-white text-saffron hover:bg-white/90 shadow-lg"
                onClick={() => navigate("/dashboard/add-gemstone")}
              >
                <Plus className="w-4 h-4 mr-2" /> Add New Gemstone
              </Button> */}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/manage-rudraksha">  
          <StatsCard title="Total Rudraksha" value={totalRudraksha} icon={Flower} />
          </Link>
          <Link to="/dashboard/manage-bracelets"> 
          <StatsCard title="Total Bracelets" value={totalBracelet} icon={ShoppingBag} />
          </Link>
          {/* temporary */}
          {/* <Link to="/dashboard/manage-gemstones"> 
          <StatsCard title="Total Gemstones" value={totalGemstone} icon={Gem} />
          </Link> */}
          <Link to="/dashboard/manage-product-orders"> 
          <StatsCard title="Total Orders" value={totalOrders} icon={List} />
          </Link>
          <Link to="/dashboard/total-product-revenue"> 
          <StatsCard
            title="Total Product Revenue"
            value={totalRevenue}
            icon={TrendingUp}
            isCurrency
          />
          </Link>
        </div>

        {/* Quick Actions + Recent Products */}
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
                onClick={() => navigate("/dashboard/add-rudraksha")}
              >
                <Plus className="w-4 h-4" /> Add Rudraksha
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/add-bracelet")}
              >
                <Plus className="w-4 h-4" /> Add Bracelet
              </Button>
              {/* temporary */}
              {/* <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/add-gemstone")}
              >
                <Plus className="w-4 h-4" /> Add Gemstone
              </Button> */}
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/manage-rudraksha")}
              >
                <List className="w-4 h-4" /> Manage Rudraksha
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/manage-bracelets")}
              >
                <List className="w-4 h-4" /> Manage Bracelets
              </Button>
              {/* temporary */}
              {/* <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/manage-gemstones")}
              >
                <List className="w-4 h-4" /> Manage Gemstones
              </Button> */}
            </CardContent>
          </Card>

          {/* Recent Orders / Products */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Recent Product Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProducts.length > 0 ? (
                recentProducts.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-border"
                  >
                    <div>
                      <h4 className="font-medium text-foreground">
                        {order.user?.fullname || "Unknown Buyer"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {order.product?.name || "N/A"}
                      </p>
                      <p className="text-sm font-medium text-saffron">
                        ₹{order.amount?.toLocaleString("en-IN") || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/orders/view/${order._id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(order._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No recent product orders found.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
