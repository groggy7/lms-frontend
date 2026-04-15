import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Video,
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
  Settings,
  Loader2,
  Trash2,
  Globe,
  Archive
} from 'lucide-react';
import { Link, useNavigate } from '@remix-run/react';
import { getApiUrl } from '../lib/config';

interface ManagedCourse {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
}

export default function ConsoleIndex() {
  const [courses, setCourses] = useState<ManagedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('lumina_user');
    if (!userStr) {
      navigate('/auth');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'instructor') {
        navigate('/courses');
        return;
      }
    } catch (e) {
      navigate('/auth');
      return;
    }

    fetchManagedCourses();
  }, [navigate]);

  async function fetchManagedCourses() {
    try {
      setIsLoading(true);
      const response = await fetch(`${getApiUrl()}/courses`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to synchronize with management nodes');
      const data = await response.json();
      setCourses(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this course node? This action is permanent.')) return;

    setIsProcessing(id);
    try {
      const res = await fetch(`${getApiUrl()}/courses/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete node');
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(null);
    }
  };

  const toggleStatus = async (course: ManagedCourse) => {
    const newStatus = course.status === 'published' ? 'draft' : 'published';
    setIsProcessing(course.id);
    try {
      const res = await fetch(`${getApiUrl()}/courses/${course.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...course, status: newStatus }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update node status');
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, status: newStatus } : c));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 overflow-x-hidden">
      {/* Console Header */}
      <div className="bg-[#000a12] pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  Enterprise Management
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">
                  Instructor <span className="text-blue-500">Console.</span>
                </h1>
              </div>
              <Link
                to="/console/create-course"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 no-underline"
              >
                <Plus className="w-4 h-4" />
                Create New Course
              </Link>
            </div>

            {/* Quick Stats Overlay */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                { label: 'Total Students', value: '2,096', icon: <Users /> },
                { label: 'Avg. Completion', value: '84%', icon: <CheckCircle2 /> },
                { label: 'Stream Time', value: '142h', icon: <Clock /> },
                { label: 'Infrastructure', value: 'Optimal', icon: <BarChart3 /> },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 text-blue-400">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      {React.cloneElement(stat.icon as React.ReactElement, { size: 16 })}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                  </div>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Management Area */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

            {/* Toolbar */}
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Courses</h2>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter courses..."
                  className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Course List */}
            <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-300">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Nodes...</p>
                </div>
              ) : error ? (
                <div className="p-20 text-center">
                  <p className="text-red-500 font-bold text-sm italic">{error}</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-300">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
                    <Plus size={32} className="opacity-20" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">No active courses found</p>
                </div>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className={`p-8 hover:bg-slate-50/80 transition-colors group ${isProcessing === course.id ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6 flex-1">
                        <div className={`w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}>
                          <Video size={24} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Users size={12} className="text-slate-300" />
                              Dynamic Learners
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="flex items-center gap-1.5 text-blue-500">
                              Revision: {new Date(course.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                          <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${course.status === 'published' ? 'text-green-500' : 'text-orange-400'
                            }`}>
                            {course.status}
                          </p>
                          <div className="flex gap-1 justify-end">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className={`w-3 h-1 rounded-full ${i <= 4 ? 'bg-blue-600' : 'bg-slate-100'}`} />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStatus(course)}
                            title={course.status === 'published' ? 'Revert to Draft' : 'Publish Course'}
                            className="p-3 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-blue-600 transition-all"
                          >
                            {course.status === 'published' ? <Archive size={18} /> : <Globe size={18} />}
                          </button>
                          <Link to={`/console/edit-course/${course.id}`} className="p-3 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                            <Settings size={18} />
                          </Link>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="p-3 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-red-600 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Empty State / Footer with Save Action */}
            <div className="p-10 bg-slate-50/30 flex flex-col items-center gap-6 border-t border-slate-50">
              <button
                onClick={() => alert('Infrastructure state synchronized successfully.')}
                className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save System State
              </button>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                End of Infrastructure Index
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
