import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Database, 
  Shield,
  Save,
  Upload
} from "lucide-react";

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    booking: true,
    reports: false,
    marketing: false
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  defaultValue="Pandit"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  defaultValue="Sharma"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="pandit.sharma@temple.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                defaultValue="+91 98765 43210"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="temple" className="text-sm font-medium text-foreground">
                Temple/Organization
              </Label>
              <Input
                id="temple"
                defaultValue="Shri Hanuman Mandir"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your spiritual practice..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="avatar" className="text-sm font-medium text-foreground">
                Profile Picture
              </Label>
              <div className="mt-1 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Email Notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive important updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Booking Notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when someone books a puja
                </p>
              </div>
              <Switch
                checked={notifications.booking}
                onCheckedChange={(checked) => handleNotificationChange('booking', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Weekly Reports
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive weekly analytics reports
                </p>
              </div>
              <Switch
                checked={notifications.reports}
                onCheckedChange={(checked) => handleNotificationChange('reports', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Marketing Updates
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get updates about new features and tips
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Database className="w-5 h-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiUrl" className="text-sm font-medium text-foreground">
                API Base URL
              </Label>
              <Input
                id="apiUrl"
                placeholder="https://api.yourtemple.com/v1"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="apiKey" className="text-sm font-medium text-foreground">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your API key for data synchronization"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="webhookUrl" className="text-sm font-medium text-foreground">
                Webhook URL
              </Label>
              <Input
                id="webhookUrl"
                placeholder="https://yoursite.com/webhook"
                className="mt-1"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    API Integration Status
                  </p>
                  <p className="text-xs text-blue-700">
                    Connected and syncing data every 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-foreground">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-foreground">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="mt-1"
              />
            </div>

            <Button variant="outline" className="w-full">
              Update Password
            </Button>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Data Export</h4>
              <p className="text-xs text-muted-foreground">
                Download your data for backup or migration purposes
              </p>
              <Button variant="outline" size="sm">
                Export All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="spiritual" onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}