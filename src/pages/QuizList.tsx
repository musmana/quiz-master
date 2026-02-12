import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Search, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizzes, categories } from '../data/mock';
export function QuizList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch = q.title.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ?
    q.category === selectedCategory :
    true;
    return matchesSearch && matchesCategory;
  });
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Explore Quizzes</h1>
          <p className="text-slate-500">
            Challenge yourself with our collection of quizzes across various
            topics. Test your knowledge and climb the leaderboard.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search for a topic..."
              className="pl-9 border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />

          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}>

              All
            </Button>
            {categories.map((cat) =>
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap">

                {cat.name}
              </Button>
            )}
          </div>
        </div>

        {/* Categories Grid (Visual) */}
        {!selectedCategory && !searchQuery &&
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) =>
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`${cat.color} p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity h-24`}>

                <cat.icon className="h-6 w-6" />
                <span className="font-medium text-sm">{cat.name}</span>
              </button>
          )}
          </div>
        }

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.length > 0 ?
          filteredQuizzes.map((quiz) =>
          <Card
            key={quiz.id}
            className="overflow-hidden hover:shadow-lg transition-all group flex flex-col">

                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                src={quiz.image}
                alt={quiz.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                      {categories.find((c) => c.id === quiz.category)?.name}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 flex-1">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {quiz.timeLimit} mins
                    </div>
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-1.5" />
                      {quiz.plays} plays
                    </div>
                  </div>

                  <Link to={`/quiz/${quiz.id}`} className="mt-auto">
                    <Button className="w-full group-hover:bg-teal-700">
                      Start Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
          ) :

          <div className="col-span-full text-center py-12">
              <div className="mx-auto h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">
                No quizzes found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filters.
              </p>
            </div>
          }
        </div>
      </div>
    </Layout>);

}