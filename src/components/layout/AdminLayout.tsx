import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  ListChecks,
  Tags,
  BarChart3,
  LogOut,
  Menu,
  X,
  Trophy,
  Settings } from
'lucide-react';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { cn } from '../../lib/utils';
interface AdminLayoutProps {
  children: React.ReactNode;
}
export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleLogout = () => {
    // Clear auth tokens here if implemented
    navigate('/login');
  };
  const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Questions',
    href: '/admin/questions',
    icon: FileQuestion
  },
  {
    name: 'Quizzes',
    href: '/admin/quizzes',
    icon: ListChecks
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: Tags
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: BarChart3
  }];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">QuizMaster</span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
            Admin Panel
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ?
                  'bg-teal-600 text-white' :
                  'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}>

                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>);

          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-9 w-9 border border-slate-700">
              <AvatarFallback className="bg-slate-800 text-teal-400">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-500 truncate">
                admin@quizmaster.com
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-600"
            onClick={handleLogout}>

            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen &&
      <div
        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
        onClick={() => setIsSidebarOpen(false)} />

      }

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>

        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">QuizMaster</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-400 hover:text-white">

            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) =>
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setIsSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              location.pathname === item.href ?
              'bg-teal-600 text-white' :
              'text-slate-400 hover:bg-slate-800 hover:text-white'
            )}>

              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )}
        </div>
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
            onClick={() => {
              setIsSidebarOpen(false);
              handleLogout();
            }}>

            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsSidebarOpen(true)}>

            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <Link to="/admin/settings">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-500 hover:text-teal-600">

                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/admin/profile">
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-teal-500 transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>);

}