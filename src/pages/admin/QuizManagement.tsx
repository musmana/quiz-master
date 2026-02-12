import { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { quizzes, categories } from '../../data/mock';
import {
  Plus,
  Search,
  Clock,
  Users,
  Edit,
  Trash,
  PlayCircle,
  PauseCircle,
  X,
  AlertCircle } from
'lucide-react';
import { cn } from '../../lib/utils';
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questionsCount: number;
  timeLimit: number;
  plays: number;
  image: string;
  status: 'Published' | 'Draft';
}
export function QuizManagement() {
  const [quizList, setQuizList] = useState<Quiz[]>(
    quizzes.map((q) => ({
      ...q,
      status: q.id === 'q1' ? 'Published' : 'Draft' // Mock status
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  // Form State
  const [formData, setFormData] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    category: 'tech',
    difficulty: 'Easy',
    timeLimit: 10,
    image: '',
    status: 'Draft'
  });
  // Filter Logic
  const filteredQuizzes = quizList.filter((q) => {
    const matchesSearch = q.title.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesStatus =
    selectedStatus === 'All' || q.status === selectedStatus;
    const matchesCategory =
    selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message
    });
    setTimeout(() => setNotification(null), 3000);
  };
  const handleOpenModal = (quiz?: Quiz) => {
    if (quiz) {
      setCurrentQuiz(quiz);
      setFormData(quiz);
    } else {
      setCurrentQuiz(null);
      setFormData({
        title: '',
        description: '',
        category: 'tech',
        difficulty: 'Easy',
        timeLimit: 10,
        image: '',
        status: 'Draft'
      });
    }
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!formData.title || !formData.description) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }
    if (currentQuiz) {
      setQuizList(
        quizList.map((q) =>
        q.id === currentQuiz.id ?
        {
          ...formData,
          id: q.id
        } as Quiz :
        q
        )
      );
      showNotification('success', 'Quiz updated successfully');
    } else {
      const newId = `q${quizList.length + 1}`;
      setQuizList([
      ...quizList,
      {
        ...formData,
        id: newId,
        questionsCount: 0,
        plays: 0
      } as Quiz]
      );
      showNotification('success', 'New quiz created successfully');
    }
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if (currentQuiz) {
      setQuizList(quizList.filter((q) => q.id !== currentQuiz.id));
      showNotification('success', 'Quiz deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentQuiz(null);
    }
  };
  const toggleStatus = (id: string) => {
    setQuizList(
      quizList.map((q) => {
        if (q.id === id) {
          const newStatus = q.status === 'Published' ? 'Draft' : 'Published';
          showNotification(
            'success',
            `Quiz ${newStatus === 'Published' ? 'published' : 'unpublished'} successfully`
          );
          return {
            ...q,
            status: newStatus
          };
        }
        return q;
      })
    );
  };
  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        {notification &&
        <div
          className={cn(
            'fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium animate-in slide-in-from-top-2',
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          )}>

            {notification.message}
          </div>
        }

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Quiz Management
            </h1>
            <p className="text-slate-500">Create, edit, and publish quizzes.</p>
          </div>
          <Button className="gap-2" onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4" /> Create New Quiz
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search quizzes..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}>

              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <select
              className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>

              <option value="All">All Categories</option>
              {categories.map((c) =>
              <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredQuizzes.map((quiz) =>
          <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="h-24 w-24 md:h-20 md:w-32 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="h-full w-full object-cover"
                  onError={(e) =>
                  e.currentTarget.src = 'https://via.placeholder.com/150'
                  } />

                  <div className="absolute top-1 right-1">
                    <Badge
                    className={
                    quiz.status === 'Published' ?
                    'bg-emerald-500 hover:bg-emerald-600' :
                    'bg-slate-500 hover:bg-slate-600'
                    }>

                      {quiz.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 truncate">
                      {quiz.title}
                    </h3>
                    <Badge variant="secondary" className="capitalize">
                      {quiz.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-1">
                    {quiz.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {quiz.timeLimit} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {quiz.plays} plays
                    </span>
                    <span className="flex items-center gap-1">
                      Questions: {quiz.questionsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      Difficulty: {quiz.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0">
                  <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 flex-1 md:flex-none"
                  onClick={() => handleOpenModal(quiz)}>

                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'transition-colors',
                    quiz.status === 'Published' ?
                    'text-emerald-600 hover:text-emerald-700 bg-emerald-50' :
                    'text-slate-400 hover:text-teal-600 hover:bg-teal-50'
                  )}
                  title={
                  quiz.status === 'Published' ? 'Unpublish' : 'Publish'
                  }
                  onClick={() => toggleStatus(quiz.id)}>

                    {quiz.status === 'Published' ?
                  <PauseCircle className="h-5 w-5" /> :

                  <PlayCircle className="h-5 w-5" />
                  }
                  </Button>
                  <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setCurrentQuiz(quiz);
                    setIsDeleteModalOpen(true);
                  }}>

                    <Trash className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Create/Edit Modal (Slide-over) */}
        {isModalOpen &&
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)} />

            <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-900">
                  {currentQuiz ? 'Edit Quiz' : 'Create New Quiz'}
                </h2>
                <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600">

                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Quiz Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                  placeholder="e.g. Advanced React Patterns"
                  value={formData.title}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value
                  })
                  } />

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                  className="w-full min-h-[100px] rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Describe what this quiz covers..."
                  value={formData.description}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                  } />

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Category
                    </label>
                    <select
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    value={formData.category}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value
                    })
                    }>

                      {categories.map((c) =>
                    <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                    )}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Difficulty
                    </label>
                    <select
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    value={formData.difficulty}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value
                    })
                    }>

                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Time Limit (minutes)
                  </label>
                  <Input
                  type="number"
                  min="1"
                  value={formData.timeLimit}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeLimit: parseInt(e.target.value) || 0
                  })
                  } />

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Cover Image URL
                  </label>
                  <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value
                  })
                  } />

                  {formData.image &&
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-40 bg-slate-50 flex items-center justify-center">
                      <img
                    src={formData.image}
                    alt="Preview"
                    className="h-full object-cover w-full"
                    onError={(e) =>
                    e.currentTarget.src =
                    'https://via.placeholder.com/400x200?text=Invalid+Image+URL'
                    } />

                    </div>
                }
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <span className="block text-sm font-medium text-slate-900">
                      Publish Immediately
                    </span>
                    <span className="block text-xs text-slate-500">
                      Make this quiz visible to all users
                    </span>
                  </div>
                  <button
                  onClick={() =>
                  setFormData({
                    ...formData,
                    status:
                    formData.status === 'Published' ?
                    'Draft' :
                    'Published'
                  })
                  }
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2',
                    formData.status === 'Published' ?
                    'bg-teal-600' :
                    'bg-slate-200'
                  )}>

                    <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      formData.status === 'Published' ?
                      'translate-x-6' :
                      'translate-x-1'
                    )} />

                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 sticky bottom-0 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Quiz</Button>
              </div>
            </div>
          </div>
        }

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)} />

            <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Delete Quiz?
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Are you sure you want to delete this quiz? This action cannot
                  be undone.
                </p>
                {currentQuiz &&
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 w-full text-left border border-slate-200">
                    <span className="font-medium">Quiz:</span>{' '}
                    {currentQuiz.title}
                  </div>
              }
              </div>
              <div className="flex gap-3">
                <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDeleteModalOpen(false)}>

                  Cancel
                </Button>
                <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}>

                  Delete
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </AdminLayout>);

}