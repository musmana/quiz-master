import { Layout } from '../components/layout/Layout';
import { Card, CardContent} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Play, Clock, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { recentAttempts, quizzes, leaderboard } from '../data/mock';
import { cn } from '../lib/utils';
export function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-slate-500 mt-1">
              You've completed 80% of your weekly goal.
            </p>
          </div>
          <Link to="/quizzes">
            <Button className="gap-2">
              <Play className="h-4 w-4" /> Start New Quiz
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-teal-100 text-teal-600 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Points
                </p>
                <h3 className="text-2xl font-bold text-slate-900">2,450</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Accuracy</p>
                <h3 className="text-2xl font-bold text-slate-900">85%</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Time Spent</p>
                <h3 className="text-2xl font-bold text-slate-900">12h 30m</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                <Play className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Quizzes Taken
                </p>
                <h3 className="text-2xl font-bold text-slate-900">42</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Activity
              </h2>
              <Link
                to="/history"
                className="text-sm text-teal-600 hover:underline">

                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentAttempts.map((attempt) =>
              <Card
                key={attempt.id}
                className="hover:shadow-md transition-shadow">

                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                        {Math.round(attempt.score / attempt.total * 100)}%
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {attempt.quizTitle}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {attempt.date} • {attempt.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-slate-900">
                        {attempt.score}/{attempt.total} Correct
                      </span>
                      <div className="w-24 mt-1">
                        <Progress
                        value={attempt.score / attempt.total * 100}
                        className="h-1.5" />

                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex items-center justify-between mt-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Recommended for You
              </h2>
              <Link
                to="/quizzes"
                className="text-sm text-teal-600 hover:underline">

                Browse all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.slice(0, 2).map((quiz) =>
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">

                  <div className="h-32 bg-slate-200 relative">
                    <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="w-full h-full object-cover" />

                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white">
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {quiz.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {quiz.timeLimit}m
                      </span>
                      <span>{quiz.questionsCount} Questions</span>
                    </div>
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button className="w-full mt-4" variant="secondary">
                        Start Quiz
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Top Learners
              </h2>
              <Link
                to="/leaderboard"
                className="text-sm text-teal-600 hover:underline">

                View full
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                {leaderboard.map((user, index) =>
                <div
                  key={user.rank}
                  className={cn(
                    'flex items-center justify-between p-4 border-b border-slate-100 last:border-0',
                    index === 0 && 'bg-yellow-50/50'
                  )}>

                    <div className="flex items-center space-x-3">
                      <div
                      className={cn(
                        'w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold',
                        index === 0 ?
                        'bg-yellow-100 text-yellow-700' :
                        index === 1 ?
                        'bg-slate-100 text-slate-700' :
                        index === 2 ?
                        'bg-orange-100 text-orange-700' :
                        'text-slate-500'
                      )}>

                        {user.rank}
                      </div>
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                        {user.avatar}
                      </div>
                      <span className="font-medium text-sm text-slate-900">
                        {user.name}
                      </span>
                    </div>
                    <span className="font-bold text-sm text-teal-600">
                      {user.points} pts
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Challenge Card */}
            <Card className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white border-none">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-2">
                      Daily Challenge
                    </Badge>
                    <h3 className="text-lg font-bold">JavaScript Mastery</h3>
                    <p className="text-teal-100 text-sm mt-1">
                      Complete today's challenge to earn 2x points!
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-300" />
                </div>
                <Button className="w-full mt-4 bg-white text-teal-600 hover:bg-teal-50 border-none">
                  Accept Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>);

}