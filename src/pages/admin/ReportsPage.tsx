import { AdminLayout } from "../../components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";
import { reportsData, adminStats, usersList, quizzes } from "../../data/mock";
import {
  Download,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from "recharts";

const dropOffData = [
  { question: "Q1", completed: 100 },
  { question: "Q2", completed: 98 },
  { question: "Q3", completed: 95 },
  { question: "Q4", completed: 85 },
  { question: "Q5", completed: 78 },
  { question: "Q6", completed: 72 },
  { question: "Q7", completed: 68 },
  { question: "Q8", completed: 65 },
  { question: "Q9", completed: 60 },
  { question: "Q10", completed: 55 },
];

export function ReportsPage() {
  const mostAttemptedQuiz = [...quizzes].sort(
    (a, b) => b.plays - a.plays
  )[0];

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Analytics & Reports
            </h1>
            <p className="text-slate-500">
              Quiz performance and user engagement insights.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" /> Last 30 Days
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Average Score</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">
                  {adminStats.avgScore}%
                </span>
                <span className="text-xs text-emerald-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2.5%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Total Attempts</p>
              <span className="text-2xl font-bold">
                {adminStats.totalAttempts.toLocaleString()}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Active Users</p>
              <span className="text-2xl font-bold">
                {adminStats.activeNow}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Most Popular Quiz</p>
              <div className="font-semibold truncate">
                {mostAttemptedQuiz.title}
              </div>
              <p className="text-xs text-slate-500">
                {mostAttemptedQuiz.plays.toLocaleString()} plays
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
            <CardDescription>
              Quiz attempts & new users
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportsData.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="attempts"
                  stroke="#0D9488"
                  fill="#0D9488"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Drop-off */}
        <Card>
          <CardHeader>
            <CardTitle>Drop-off Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dropOffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="completed">
                  {dropOffData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index > 6 ? "#EF4444" : "#F59E0B"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </td>

                    <td className="px-6 py-4">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge>
                        {user.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right font-medium">
                      {85 + (user.id % 10)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
