import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { categories as initialCategories } from '../../data/mock';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Code,
  Globe,
  Brain,
  Calculator,
  BookOpen,
  Trophy,
  Music,
  Camera,
  Palette,
  Briefcase } from
'lucide-react';
import { cn } from '../../lib/utils';
// Icon mapping for selection
const iconMap: Record<string, React.ElementType> = {
  Code,
  Globe,
  Brain,
  Calculator,
  BookOpen,
  Trophy,
  Music,
  Camera,
  Palette,
  Briefcase
};
const colorOptions = [
{
  name: 'Blue',
  class: 'bg-blue-100 text-blue-600'
},
{
  name: 'Green',
  class: 'bg-green-100 text-green-600'
},
{
  name: 'Purple',
  class: 'bg-purple-100 text-purple-600'
},
{
  name: 'Orange',
  class: 'bg-orange-100 text-orange-600'
},
{
  name: 'Amber',
  class: 'bg-amber-100 text-amber-600'
},
{
  name: 'Red',
  class: 'bg-red-100 text-red-600'
},
{
  name: 'Pink',
  class: 'bg-pink-100 text-pink-600'
},
{
  name: 'Indigo',
  class: 'bg-indigo-100 text-indigo-600'
}];

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}
export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    iconName: 'Code',
    colorClass: 'bg-blue-100 text-blue-600'
  });
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message
    });
    setTimeout(() => setNotification(null), 3000);
  };
  const handleOpenModal = (category?: Category) => {
    if (category) {
      setCurrentCategory(category);
      // Find icon name from component (simplified for this demo)
      setFormData({
        name: category.name,
        iconName: 'Code',
        colorClass: category.color
      });
    } else {
      setCurrentCategory(null);
      setFormData({
        name: '',
        iconName: 'Code',
        colorClass: 'bg-blue-100 text-blue-600'
      });
    }
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!formData.name) {
      showNotification('error', 'Category name is required');
      return;
    }
    const IconComponent = iconMap[formData.iconName];
    if (currentCategory) {
      setCategories(
        categories.map((c) =>
        c.id === currentCategory.id ?
        {
          ...c,
          name: formData.name,
          icon: IconComponent,
          color: formData.colorClass
        } :
        c
        )
      );
      showNotification('success', 'Category updated successfully');
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        icon: IconComponent,
        color: formData.colorClass
      };
      setCategories([...categories, newCategory]);
      showNotification('success', 'New category added successfully');
    }
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if (currentCategory) {
      setCategories(categories.filter((c) => c.id !== currentCategory.id));
      showNotification('success', 'Category deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentCategory(null);
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-8 relative">
        {notification &&
        <div
          className={cn(
            'fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium animate-in slide-in-from-top-2',
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          )}>

            {notification.message}
          </div>
        }

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
            <p className="text-slate-500">Manage quiz categories and topics.</p>
          </div>
          <Button className="gap-2" onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) =>
          <Card
            key={cat.id}
            className="group hover:border-teal-200 transition-colors relative overflow-hidden">

              <CardContent className="p-6 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${cat.color} bg-opacity-20`}>
                    <cat.icon
                    className={`h-6 w-6 ${cat.color.replace('bg-', 'text-').split(' ')[1] || 'text-current'}`} />

                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {Math.floor(Math.random() * 20) + 5} Quizzes •{' '}
                      {Math.floor(Math.random() * 500) + 100} Questions
                    </p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                  <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-teal-600"
                  onClick={() => handleOpenModal(cat)}>

                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-600"
                  onClick={() => {
                    setCurrentCategory(cat);
                    setIsDeleteModalOpen(true);
                  }}>

                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add New Card Placeholder */}
          <button
            onClick={() => handleOpenModal()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-teal-400 hover:text-teal-600 transition-colors h-full min-h-[120px]">

            <Plus className="h-8 w-8 mb-2" />
            <span className="font-medium">Add New Category</span>
          </button>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)} />

            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {currentCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Category Name
                  </label>
                  <Input
                  placeholder="e.g. Data Science"
                  value={formData.name}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                  } />

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(iconMap).map((iconName) => {
                    const Icon = iconMap[iconName];
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() =>
                        setFormData({
                          ...formData,
                          iconName
                        })
                        }
                        className={cn(
                          'p-2 rounded-lg border flex items-center justify-center hover:bg-slate-50 transition-colors',
                          formData.iconName === iconName ?
                          'border-teal-600 bg-teal-50 text-teal-600' :
                          'border-slate-200 text-slate-500'
                        )}>

                          <Icon className="h-5 w-5" />
                        </button>);

                  })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) =>
                  <button
                    key={color.name}
                    type="button"
                    onClick={() =>
                    setFormData({
                      ...formData,
                      colorClass: color.class
                    })
                    }
                    className={cn(
                      'h-8 rounded-md border flex items-center justify-center text-xs font-medium transition-all',
                      color.class,
                      formData.colorClass === color.class ?
                      'ring-2 ring-offset-2 ring-slate-400' :
                      'opacity-70 hover:opacity-100'
                    )}>

                        {color.name}
                      </button>
                  )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Category</Button>
              </div>
            </div>
          </div>
        }

        {/* Delete Modal */}
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
                  Delete Category?
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Are you sure you want to delete this category? All associated
                  quizzes will be archived.
                </p>
                {currentCategory &&
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 w-full text-left border border-slate-200 flex items-center gap-3">
                    <div className={`p-2 rounded-md ${currentCategory.color}`}>
                      <currentCategory.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{currentCategory.name}</span>
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