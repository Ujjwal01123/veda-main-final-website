"use client";

import logo from "@/assets/logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ added

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null); // ✅ added
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  // const siteKey = import.meta.env.VITE_SITE_KEY; // ✅ from .env

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // if (!captchaToken) {
    //   toast.error("⚠️ Please complete the CAPTCHA verification.");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const res = await axios.post(
        `${apiUrl}/api/users/login`,
        {
          email,
          password,
          // captchaToken, // ✅ send to backend for verification
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login successful 🎉");
        setTimeout(() => navigate("/dashboard/dashboard"), 1000);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-primary/20 mb-4 overflow-hidden transition-transform hover:scale-105">
              <img
                src={logo}
                alt="Veda Structure Logo"
                className="object-contain w-full h-full p-2"
              />
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Veda Structure Dashboard Access
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-elevated border-none">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vedastructure.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {/*  reCAPTCHA Section
              <div className="flex justify-center pt-2">
                <ReCAPTCHA
                  sitekey="6LeygvYrAAAAAIH_a3494AMLVQpUMwRIJzkCe9EE"
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div> */}

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    Secure Admin Access
                  </p>
                  <p>
                    This portal is restricted to authorized administrators only.
                    All access attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help accessing your account?{" "}
          <button className="text-primary hover:underline font-medium">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
