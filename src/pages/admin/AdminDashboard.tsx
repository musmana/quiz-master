import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  FileQuestion,
  PlayCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight } from
'lucide-react';
import { adminStats, recentAttempts } from '../../data/mock';
export function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Welcome back, Admin! Here's what's happening today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Download Report</Button>
            <Button>+ Create New Quiz</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value={adminStats.totalUsers.toLocaleString()}
            icon={Users}
            trend="+12%"
            trendUp={true}
            color="bg-blue-500" />

          <StatsCard
            title="Total Quizzes"
            value={adminStats.totalQuizzes.toString()}
            icon={FileQuestion}
            trend="+3"
            trendUp={true}
            color="bg-teal-500" />

          <StatsCard
            title="Total Attempts"
            value={adminStats.totalAttempts.toLocaleString()}
            icon={PlayCircle}
            trend="+8.5%"
            trendUp={true}
            color="bg-emerald-500" />

          <StatsCard
            title="Avg. Score"
            value={`${adminStats.avgScore}%`}
            icon={TrendingUp}
            trend="-2%"
            trendUp={false}
            color="bg-amber-500" />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Quiz Attempts</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttempts.map((attempt, i) =>
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">

                    <div className="flex items-center gap-4">
                      <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${attempt.score / attempt.total >= 0.8 ? 'bg-emerald-500' : attempt.score / attempt.total >= 0.5 ? 'bg-amber-500' : 'bg-red-500'}`}>

                        {Math.round(attempt.score / attempt.total * 100)}%
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {attempt.quizTitle}
                        </p>
                        <p className="text-sm text-slate-500">
                          by User #{Math.floor(Math.random() * 1000)} •{' '}
                          {attempt.date}
                        </p>
                      </div>
                    </div>
                    <Badge
                    variant={
                    attempt.status === 'Completed' ? 'success' : 'secondary'
                    }>

                      {attempt.status}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / System Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Server Load
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    Normal (12%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{
                      width: '12%'
                    }}>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-slate-600">
                    Active Users
                  </span>
                  <span className="text-sm font-bold text-teal-600">
                    {adminStats.activeNow}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{
                      width: '45%'
                    }}>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-600 text-white border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Adding images to your quiz questions increases engagement by
                  40%. Try updating your old quizzes!
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Update Quizzes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>);

}
function StatsCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <div
            className={`flex items-center text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>

            {trend}
            {trendUp ?
            <ArrowUpRight className="h-3 w-3 ml-1" /> :

            <ArrowDownRight className="h-3 w-3 ml-1" />
            }
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <p className="text-sm text-slate-500">{title}</p>
      </CardContent>
    </Card>);

}