import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import {
  Trophy,
  Crown,
  Star,
  Zap,
  Flame,
  Award,
  Rocket,
  Share2,
  Lock } from
'lucide-react';
import { leaderboardWithBadges, achievements } from '../data/mock';
import { cn } from '../lib/utils';
const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Star,
  Zap,
  Crown,
  Flame,
  Trophy,
  Award,
  Share2
};
export function Leaderboard() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-500">
            See who's topping the charts this week!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12 h-64">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-4 border-slate-200 mb-2">
              <AvatarFallback className="bg-slate-100 text-slate-700 font-bold">
                SS
              </AvatarFallback>
            </Avatar>
            <div className="text-center mb-2">
              <div className="font-bold text-slate-900">Sarah</div>
              <div className="text-xs text-slate-500">2300 pts</div>
            </div>
            <div className="w-24 h-32 bg-slate-200 rounded-t-lg flex items-start justify-center pt-4">
              <span className="text-3xl font-bold text-slate-400">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center z-10">
            <Crown className="h-8 w-8 text-yellow-400 mb-2 animate-bounce" />
            <Avatar className="h-20 w-20 border-4 border-yellow-400 mb-2">
              <AvatarFallback className="bg-yellow-100 text-yellow-700 font-bold">
                AJ
              </AvatarFallback>
            </Avatar>
            <div className="text-center mb-2">
              <div className="font-bold text-slate-900">Alex</div>
              <div className="text-xs text-slate-500">2450 pts</div>
            </div>
            <div className="w-28 h-40 bg-yellow-400 rounded-t-lg flex items-start justify-center pt-4 shadow-lg">
              <span className="text-4xl font-bold text-yellow-100">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-4 border-orange-200 mb-2">
              <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                MB
              </AvatarFallback>
            </Avatar>
            <div className="text-center mb-2">
              <div className="font-bold text-slate-900">Mike</div>
              <div className="text-xs text-slate-500">2150 pts</div>
            </div>
            <div className="w-24 h-24 bg-orange-200 rounded-t-lg flex items-start justify-center pt-4">
              <span className="text-3xl font-bold text-orange-400">3</span>
            </div>
          </div>
        </div>

        {/* Rankings Table with Badges */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="weekly" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Rankings</CardTitle>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="all-time">All Time</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="weekly" className="mt-0">
                <div className="space-y-1">
                  {leaderboardWithBadges.map((user, index) =>
                  <div
                    key={user.rank}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-slate-50',
                      index < 3 ? 'bg-white' : ''
                    )}>

                      <div className="flex items-center space-x-4">
                        <div
                        className={cn(
                          'w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm',
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
                        <Avatar>
                          <AvatarFallback className="bg-teal-50 text-teal-600">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {user.badges.map((badge) =>
                          <span
                            key={badge}
                            className="inline-flex items-center gap-0.5 text-[10px] font-medium bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-full">

                                {badge}
                              </span>
                          )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="block font-bold text-teal-600">
                          {user.points}
                        </span>
                        <span className="text-xs text-slate-400">
                          {user.quizzesTaken} quizzes • {user.avgScore}% avg
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="all-time">
                <div className="p-8 text-center text-slate-500">
                  All time rankings loading...
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Badges & Achievements Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Badges & Achievements
            </h2>
            <p className="text-slate-500 mt-1">
              Earn badges by completing challenges and milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = iconMap[achievement.icon] || Trophy;
              return (
                <Card
                  key={achievement.id}
                  className={cn(
                    'relative overflow-hidden transition-all',
                    achievement.earned ?
                    'border-teal-200 hover:shadow-md' :
                    'opacity-60'
                  )}>

                  <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                    {!achievement.earned &&
                    <div className="absolute top-3 right-3">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                    }
                    <div
                      className={cn(
                        'h-14 w-14 rounded-full flex items-center justify-center',
                        achievement.earned ?
                        achievement.color :
                        'bg-slate-100 text-slate-400'
                      )}>

                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          'font-bold text-sm',
                          achievement.earned ?
                          'text-slate-900' :
                          'text-slate-400'
                        )}>

                        {achievement.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned ?
                    <Badge variant="success" className="text-[10px]">
                        Earned
                      </Badge> :

                    <Badge variant="secondary" className="text-[10px]">
                        Locked
                      </Badge>
                    }
                  </CardContent>
                </Card>);

            })}
          </div>
        </div>
      </div>
    </Layout>);

}