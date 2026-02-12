import { BookOpen, Code, Trophy, Brain, Globe, Calculator } from 'lucide-react';

export const categories = [
{
  id: 'tech',
  name: 'Technology',
  icon: Code,
  color: 'bg-blue-100 text-blue-600'
},
{
  id: 'gk',
  name: 'General Knowledge',
  icon: Globe,
  color: 'bg-green-100 text-green-600'
},
{
  id: 'science',
  name: 'Science',
  icon: Brain,
  color: 'bg-purple-100 text-purple-600'
},
{
  id: 'math',
  name: 'Mathematics',
  icon: Calculator,
  color: 'bg-orange-100 text-orange-600'
},
{
  id: 'history',
  name: 'History',
  icon: BookOpen,
  color: 'bg-amber-100 text-amber-600'
},
{
  id: 'sports',
  name: 'Sports',
  icon: Trophy,
  color: 'bg-red-100 text-red-600'
}];


export const quizzes = [
{
  id: 'q1',
  title: 'React Fundamentals',
  description:
  'Test your knowledge of React hooks, components, and lifecycle.',
  category: 'tech',
  difficulty: 'Medium',
  questionsCount: 10,
  timeLimit: 15, // minutes
  plays: 1250,
  image:
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
},
{
  id: 'q2',
  title: 'World Geography',
  description:
  'How well do you know the capitals and countries of the world?',
  category: 'gk',
  difficulty: 'Easy',
  questionsCount: 15,
  timeLimit: 10,
  plays: 3400,
  image:
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
},
{
  id: 'q3',
  title: 'JavaScript Advanced',
  description: 'Closures, prototypes, and async programming.',
  category: 'tech',
  difficulty: 'Hard',
  questionsCount: 20,
  timeLimit: 25,
  plays: 890,
  image:
  'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
},
{
  id: 'q4',
  title: 'Modern History',
  description: 'Key events from the 20th century.',
  category: 'history',
  difficulty: 'Medium',
  questionsCount: 12,
  timeLimit: 15,
  plays: 1100,
  image:
  'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
}];


export const recentAttempts = [
{
  id: 'a1',
  quizId: 'q1',
  quizTitle: 'React Fundamentals',
  score: 8,
  total: 10,
  date: '2 hours ago',
  status: 'Completed'
},
{
  id: 'a2',
  quizId: 'q2',
  quizTitle: 'World Geography',
  score: 12,
  total: 15,
  date: 'Yesterday',
  status: 'Completed'
}];


export const leaderboard = [
{ rank: 1, name: 'Alex Johnson', points: 2450, avatar: 'AJ' },
{ rank: 2, name: 'Sarah Smith', points: 2300, avatar: 'SS' },
{ rank: 3, name: 'Mike Brown', points: 2150, avatar: 'MB' },
{ rank: 4, name: 'Emily Davis', points: 1900, avatar: 'ED' },
{ rank: 5, name: 'Chris Wilson', points: 1850, avatar: 'CW' }];


export const sampleQuestions = [
{
  id: 1,
  text: 'What is the primary purpose of the useEffect hook in React?',
  options: [
  { id: 'a', text: 'To manage local state' },
  { id: 'b', text: 'To handle side effects' },
  { id: 'c', text: 'To optimize performance' },
  { id: 'd', text: 'To create context' }],

  correctAnswer: 'b'
},
{
  id: 2,
  text: 'Which of the following is NOT a valid dependency for useEffect?',
  options: [
  { id: 'a', text: 'Props' },
  { id: 'b', text: 'State variables' },
  { id: 'c', text: 'A ref.current value' },
  { id: 'd', text: 'Context values' }],

  correctAnswer: 'c'
},
{
  id: 3,
  text: "What does the 'key' prop help React identify?",
  options: [
  { id: 'a', text: 'Which items have changed, are added, or are removed' },
  { id: 'b', text: 'The data type of the component' },
  { id: 'c', text: 'The parent component' },
  { id: 'd', text: 'The CSS class to apply' }],

  correctAnswer: 'a'
}];


export const adminStats = {
  totalUsers: 1250,
  totalQuizzes: 45,
  totalAttempts: 15420,
  avgScore: 76,
  activeNow: 128
};

export const reportsData = {
  dailyActivity: [
  { name: 'Mon', attempts: 120, newUsers: 15 },
  { name: 'Tue', attempts: 150, newUsers: 22 },
  { name: 'Wed', attempts: 180, newUsers: 18 },
  { name: 'Thu', attempts: 140, newUsers: 12 },
  { name: 'Fri', attempts: 210, newUsers: 30 },
  { name: 'Sat', attempts: 250, newUsers: 45 },
  { name: 'Sun', attempts: 230, newUsers: 40 }],

  categoryPerformance: [
  { name: 'Tech', score: 82 },
  { name: 'GK', score: 65 },
  { name: 'Science', score: 74 },
  { name: 'Math', score: 68 },
  { name: 'History', score: 71 },
  { name: 'Sports', score: 88 }],

  userDistribution: [
  { name: 'Beginner', value: 400 },
  { name: 'Intermediate', value: 600 },
  { name: 'Expert', value: 250 }]

};

export const usersList = [
{
  id: 1,
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'User',
  status: 'Active',
  joined: '2023-01-15'
},
{
  id: 2,
  name: 'Sarah Smith',
  email: 'sarah@example.com',
  role: 'Admin',
  status: 'Active',
  joined: '2023-02-20'
},
{
  id: 3,
  name: 'Mike Brown',
  email: 'mike@example.com',
  role: 'User',
  status: 'Inactive',
  joined: '2023-03-10'
},
{
  id: 4,
  name: 'Emily Davis',
  email: 'emily@example.com',
  role: 'User',
  status: 'Active',
  joined: '2023-04-05'
},
{
  id: 5,
  name: 'Chris Wilson',
  email: 'chris@example.com',
  role: 'User',
  status: 'Active',
  joined: '2023-05-12'
}];


export const achievements = [
{
  id: 'first-quiz',
  name: 'First Steps',
  description: 'Complete your first quiz',
  icon: 'Rocket',
  color: 'bg-blue-100 text-blue-600',
  earned: true
},
{
  id: 'perfect-score',
  name: 'Perfect Score',
  description: 'Score 100% on any quiz',
  icon: 'Star',
  color: 'bg-yellow-100 text-yellow-600',
  earned: true
},
{
  id: 'speed-demon',
  name: 'Speed Demon',
  description: 'Finish a quiz in under 2 minutes',
  icon: 'Zap',
  color: 'bg-amber-100 text-amber-600',
  earned: true
},
{
  id: 'quiz-master',
  name: 'Quiz Master',
  description: 'Complete 50 quizzes',
  icon: 'Crown',
  color: 'bg-purple-100 text-purple-600',
  earned: false
},
{
  id: 'streak-king',
  name: 'Streak King',
  description: 'Maintain a 7-day streak',
  icon: 'Flame',
  color: 'bg-orange-100 text-orange-600',
  earned: true
},
{
  id: 'top-10',
  name: 'Top 10',
  description: 'Reach the top 10 on the leaderboard',
  icon: 'Trophy',
  color: 'bg-emerald-100 text-emerald-600',
  earned: true
},
{
  id: 'category-expert',
  name: 'Category Expert',
  description: 'Score 90%+ in all quizzes of one category',
  icon: 'Award',
  color: 'bg-teal-100 text-teal-600',
  earned: false
},
{
  id: 'social-butterfly',
  name: 'Social Butterfly',
  description: 'Share 10 quiz results',
  icon: 'Share2',
  color: 'bg-pink-100 text-pink-600',
  earned: false
}];


export const leaderboardWithBadges = [
{
  rank: 1,
  name: 'Alex Johnson',
  points: 2450,
  avatar: 'AJ',
  badges: ['Perfect Score', 'Streak King', 'Top 10'],
  quizzesTaken: 42,
  avgScore: 92
},
{
  rank: 2,
  name: 'Sarah Smith',
  points: 2300,
  avatar: 'SS',
  badges: ['Speed Demon', 'Top 10'],
  quizzesTaken: 38,
  avgScore: 88
},
{
  rank: 3,
  name: 'Mike Brown',
  points: 2150,
  avatar: 'MB',
  badges: ['First Steps', 'Top 10'],
  quizzesTaken: 35,
  avgScore: 85
},
{
  rank: 4,
  name: 'Emily Davis',
  points: 1900,
  avatar: 'ED',
  badges: ['Perfect Score'],
  quizzesTaken: 30,
  avgScore: 82
},
{
  rank: 5,
  name: 'Chris Wilson',
  points: 1850,
  avatar: 'CW',
  badges: ['Streak King'],
  quizzesTaken: 28,
  avgScore: 80
}];