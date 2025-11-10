import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flower, ArrowRight, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/puja-dashboard-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-spiritual rounded-lg flex items-center justify-center">
              <Flower className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Veda Structure Admin Panel
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-spiritual shadow-spiritual mb-12">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Spiritual Dashboard"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative p-12 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Manage Your Spiritual Offerings
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Veda Structure Dashboard Admin Panel — Manage pujas, devotees, and
              spiritual services seamlessly. Upload data, monitor bookings, and
              connect effortlessly with your spiritual community.
            </p>
            <Link to="/dashboard">
              <Button variant="spiritual" size="lg">
                <ArrowRight className="w-5 h-5 mr-2" />
                Enter Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - Vedic Module Management */}
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-spiritual transition-smooth">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Vedic Module Management
              </h3>
              <p className="text-muted-foreground">
                Create, update, and organize spiritual modules including Pujas,
                Yajnas, Havans, and Vedic rituals — all structured within the
                sacred Veda framework.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 - Insight & Harmony Reports */}
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-spiritual transition-smooth">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Insight & Harmony Reports
              </h3>
              <p className="text-muted-foreground">
                Access divine insights with analytics on rituals, devotee
                participation, and spiritual growth metrics presented through
                detailed dashboards.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 - Community & Devotee Network */}
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-spiritual transition-smooth">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Community & Devotee Network
              </h3>
              <p className="text-muted-foreground">
                Manage devotee profiles, seva participation, and connect
                spiritual communities through a unified, Veda-inspired
                management system.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Begin organizing your Vedic services and nurturing connections with
            devotees today.
          </p>
          <Link to="/dashboard">
            <Button variant="spiritual" size="lg">
              Access Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
