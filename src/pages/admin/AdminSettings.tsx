import { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Bell, Lock, User, Mail, Shield, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
export function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: 'Settings saved successfully'
      });
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto relative">
        {notification &&
        <div
          className={cn(
            'fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium animate-in slide-in-from-top-2',
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          )}>

            {notification.message}
          </div>
        }

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-slate-100">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-lg bg-teal-100 text-teal-700">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-slate-500">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input defaultValue="Admin" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input defaultValue="User" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      defaultValue="admin@quizmaster.com"
                      className="pl-9" />

                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      defaultValue="Super Admin"
                      disabled
                      className="pl-9 bg-slate-50" />

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-9" />

                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9" />

                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9" />

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-md">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-900">
                      New User Registrations
                    </p>
                    <p className="text-xs text-slate-500">
                      Get notified when a new user signs up
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-600" />

              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-md">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-900">
                      Quiz Completion Reports
                    </p>
                    <p className="text-xs text-slate-500">
                      Daily summary of quiz attempts
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-600" />

              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={handleSave}
              isLoading={isLoading}
              className="gap-2">

              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>);

}