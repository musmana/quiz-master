import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Bell, Menu, Search, LogOut, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
const mockNotifications = [
{
  id: 1,
  text: 'You scored 80% on React Fundamentals!',
  time: '2 min ago',
  unread: true
},
{
  id: 2,
  text: 'New quiz available: TypeScript Basics',
  time: '1 hour ago',
  unread: true
},
{
  id: 3,
  text: 'Alex Johnson passed you on the leaderboard',
  time: '3 hours ago',
  unread: false
}];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const isLoggedIn = true;
  const unreadCount = mockNotifications.filter((n) => n.unread).length;
  const handleLogout = () => {
    navigate('/login');
  };
  const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    name: 'Quizzes',
    href: '/quizzes'
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard'
  }];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">QuizMaster</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-teal-600',
              location.pathname === link.href ?
              'text-teal-600' :
              'text-slate-600'
            )}>

              {link.name}
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />

          </div>

          {isLoggedIn ?
          <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <div className="relative">
                <button
                className="relative text-slate-500 hover:text-slate-700 p-1"
                onClick={() => setIsNotifOpen(!isNotifOpen)}>

                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 &&
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                }
                </button>

                {/* Notification Dropdown */}
                {isNotifOpen &&
              <>
                    <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotifOpen(false)} />

                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-semibold text-sm text-slate-900">
                          Notifications
                        </h3>
                        <span className="text-xs text-teal-600 font-medium cursor-pointer hover:underline">
                          Mark all read
                        </span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {mockNotifications.map((notif) =>
                    <div
                      key={notif.id}
                      className={cn(
                        'px-3 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer',
                        notif.unread && 'bg-teal-50/50'
                      )}>

                            <div className="flex items-start gap-2">
                              {notif.unread &&
                        <div className="h-2 w-2 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />
                        }
                              <div className={cn(!notif.unread && 'ml-4')}>
                                <p className="text-sm text-slate-700">
                                  {notif.text}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </div>
                    )}
                      </div>
                      <div className="p-2 border-t border-slate-100 text-center">
                        <button className="text-xs text-teal-600 font-medium hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
              }
              </div>

              {/* Profile */}
              <Link
              to="/profile"
              className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium hover:ring-2 hover:ring-teal-300 transition-all cursor-pointer">

                AJ
              </Link>

              {/* Logout */}
              <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              title="Logout">

                <LogOut className="h-4 w-4" />
              </button>
            </div> :

          <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          }
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>

          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen &&
      <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
            onClick={() => setIsMenuOpen(false)}>

                {link.name}
              </Link>
          )}
            <Link
            to="/profile"
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
            onClick={() => setIsMenuOpen(false)}>

              Profile
            </Link>
          </nav>
          <div className="pt-4 border-t border-slate-100">
            <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}>

              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      }
    </header>);

}