import { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Camera, Mail, Calendar, Shield, Save } from 'lucide-react';
export function AdminProfilePage() {
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@quizmaster.com',
    bio: 'Platform administrator managing quizzes, users, and analytics for QuizMaster.'
  });
  const handleSave = () => {
    setNotification('Profile updated successfully');
    setTimeout(() => setNotification(null), 3000);
  };
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-8 relative">
        {notification &&
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium bg-emerald-500 animate-in slide-in-from-top-2">
            {notification}
          </div>
        }

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Profile</h1>
          <p className="text-slate-500">Manage your account information.</p>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-2xl bg-teal-100 text-teal-700">
                    AD
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-teal-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-slate-900">Admin User</h2>
                <p className="text-slate-500 text-sm">admin@quizmaster.com</p>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                    <Shield className="h-3 w-3 mr-1" /> Administrator
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-900">
                    admin@quizmaster.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Member Since</p>
                  <p className="text-sm font-medium text-slate-900">
                    January 2023
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Shield className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Role</p>
                  <p className="text-sm font-medium text-slate-900">
                    Super Admin
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Last Login</p>
                  <p className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              } />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
              } />

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bio</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={formData.bio}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value
                })
                } />

            </div>
            <div className="flex justify-end pt-2">
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>);

}