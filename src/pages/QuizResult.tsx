import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  Share2,
  Award } from
'lucide-react';
import { Link } from 'react-router-dom';
import { sampleQuestions } from '../data/mock';
export function QuizResult() {
  // Mock results
  const totalQuestions = sampleQuestions.length;
  const correctAnswers = 2;
  const score = Math.round(correctAnswers / totalQuestions * 100);
  const timeTaken = '8m 45s';
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Score Header */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-100 rounded-full mb-4">
            <Award className="h-12 w-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Great Job!</h1>
          <p className="text-slate-500 text-lg">
            You completed the React Fundamentals quiz.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-teal-600 text-white border-none">
            <CardContent className="p-6 text-center">
              <p className="text-teal-100 font-medium mb-1">Your Score</p>
              <div className="text-5xl font-bold mb-2">{score}%</div>
              <p className="text-sm text-teal-200">You passed!</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="flex items-center gap-8 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 mx-auto mb-2">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="block text-2xl font-bold text-slate-900">
                    {correctAnswers}
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">
                    Correct
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 mx-auto mb-2">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <span className="block text-2xl font-bold text-slate-900">
                    {totalQuestions - correctAnswers}
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">
                    Incorrect
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <Clock className="h-8 w-8 text-slate-400 mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {timeTaken}
              </div>
              <p className="text-sm text-slate-500">Time Taken</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quiz/q1">
            <Button className="w-full sm:w-auto gap-2">
              <RotateCcw className="h-4 w-4" /> Retry Quiz
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <Button variant="secondary" className="w-full sm:w-auto gap-2">
            <Share2 className="h-4 w-4" /> Share Result
          </Button>
        </div>

        {/* Review Section */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Review Answers</h2>
          <div className="space-y-4">
            {sampleQuestions.map((q, idx) =>
            <Card key={q.id} className="overflow-hidden">
                <CardHeader className="bg-slate-50 py-4 border-b border-slate-100">
                  <CardTitle className="text-base font-medium flex items-start gap-3">
                    <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded">
                      Q{idx + 1}
                    </span>
                    {q.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctAnswer;
                  const isSelected = idx === 0 && opt.id === 'b'; // Mock selection
                  let style = 'border-slate-200';
                  let icon = null;
                  if (isCorrect) {
                    style = 'bg-green-50 border-green-200 text-green-800';
                    icon =
                    <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />;

                  } else if (isSelected && !isCorrect) {
                    style = 'bg-red-50 border-red-200 text-red-800';
                    icon =
                    <XCircle className="h-4 w-4 text-red-600 ml-auto" />;

                  }
                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center p-3 rounded-lg border ${style}`}>

                        <span className="text-sm font-medium">{opt.text}</span>
                        {icon}
                      </div>);

                })}
                  <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-lg">
                    <strong>Explanation:</strong> This is a placeholder
                    explanation for the correct answer. It helps the user
                    understand why the answer is correct.
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>);

}