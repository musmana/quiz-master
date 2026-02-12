import { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { sampleQuestions } from "../../data/mock";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export function QuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>(
    sampleQuestions.map((q) => ({
      ...q,
      category: "general",
      difficulty: "Easy",
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = questions.filter((q) =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newQuestion: Question = {
      id: questions.length
        ? Math.max(...questions.map((q) => q.id)) + 1
        : 1,
      text: "New Question",
      category: "general",
      difficulty: "Easy",
      options: [],
      correctAnswer: "",
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Question Bank</h1>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" /> Add Question
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search questions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Question</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Difficulty</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">{q.text}</td>
                    <td className="px-6 py-4">
                      <Badge>{q.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{q.difficulty}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(q.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
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
