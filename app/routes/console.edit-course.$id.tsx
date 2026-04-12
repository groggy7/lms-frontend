import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  AlignLeft, 
  ArrowRight, 
  ArrowLeft, 
  CloudUpload, 
  CheckCircle2, 
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  X,
  FileUp,
  Save,
  Edit3,
  Settings
} from 'lucide-react';
import { Link, useParams, useNavigate } from '@remix-run/react';

type ContentType = 'video' | 'document' | 'text';

interface Lesson {
  id: string;
  title: string;
  type: ContentType;
  contentUrl?: string;
  contentBody?: string;
  orderIndex: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  contents: Lesson[];
}

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // New Lesson Drafting
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<ContentType>('video');
  const [newLessonText, setNewLessonText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Edit State
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch course');
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMeta = async () => {
    if (!course) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`http://localhost:8080/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: course.title, description: course.description }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update metadata');
      alert('Infrastructure metadata synchronized.');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const addLesson = async () => {
    if (!newLessonTitle || !course) return;
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('title', newLessonTitle);
      formData.append('type', newLessonType);
      formData.append('orderIndex', (course.contents?.length || 0).toString());
      
      if (newLessonType === 'text') {
        formData.append('contentBody', newLessonText);
      } else if (selectedFile) {
        formData.append('asset', selectedFile);
      }

      const res = await fetch(`http://localhost:8080/courses/${id}/lessons`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (res.ok) {
        setNewLessonTitle('');
        setNewLessonText('');
        setSelectedFile(null);
        await fetchCourse();
      } else {
        throw new Error('Deployment failed');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteLesson = async (lessonId: string) => {
    if (!confirm('Decommission this module? This action is permanent.')) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`http://localhost:8080/courses/${id}/lessons/${lessonId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to remove module from node');
      await fetchCourse();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveTextLesson = async (lesson: Lesson) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`http://localhost:8080/courses/${id}/lessons/${lesson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: lesson.title, 
          contentBody: editingText,
          orderIndex: lesson.orderIndex,
          type: lesson.type
        }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to synchronize text module');
      setEditingLessonId(null);
      await fetchCourse();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-black text-xs uppercase tracking-widest">Accessing Node...</p>
      </div>
    );
  }

  if (!course) return <div className="p-20 text-center font-black">Course Node Not Found</div>;

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#000a12] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
              Edit <span className="text-blue-500">Course.</span>
            </h1>
            <Link 
              to="/console" 
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 relative z-20">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Section 1: Meta */}
          <div className={`${isProcessing ? 'opacity-50 pointer-events-none' : ''} bg-slate-50 rounded-[32px] p-8 border border-slate-100 space-y-6 transition-opacity`}>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" /> Meta Configuration
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Title</label>
                <input 
                  type="text" 
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                  className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                <textarea 
                  rows={2}
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium text-slate-700 resize-none"
                ></textarea>
              </div>
              <button 
                onClick={handleUpdateMeta}
                className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
              >
                <Save className="w-3.5 h-3.5" /> Synchronize Meta
              </button>
            </div>
          </div>

          {/* Section 2: Course Architect */}
          <div className={`${isProcessing ? 'opacity-50 pointer-events-none' : ''} bg-slate-50 rounded-[32px] p-8 border border-slate-100 space-y-8 transition-opacity`}>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Course Architect</h2>
              <p className="text-slate-500 text-xs font-medium">Add or manage course modules.</p>
            </div>

            {/* Drafting Area */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Title</label>
                  <input 
                    type="text" 
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="New Module Title..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Format</label>
                  <div className="relative">
                    <select 
                      value={newLessonType}
                      onChange={(e) => setNewLessonType(e.target.value as ContentType)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer pr-8"
                    >
                      <option value="video">Video Stream</option>
                      <option value="document">Technical Doc</option>
                      <option value="text">Interactive Text</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  </div>
                </div>
              </div>

              {newLessonType === 'text' ? (
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Text Content</label>
                  <textarea 
                    value={newLessonText}
                    onChange={(e) => setNewLessonText(e.target.value)}
                    placeholder="Enter module content..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium min-h-[100px] resize-none"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Source</label>
                  <div className="relative">
                    <input type="file" id="file-edit" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <label htmlFor="file-edit" className="w-full flex items-center gap-4 px-4 py-2.5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all">
                      <FileUp className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 truncate">{selectedFile ? selectedFile.name : `Select ${newLessonType}`}</span>
                    </label>
                  </div>
                </div>
              )}

              <button 
                onClick={addLesson}
                disabled={isProcessing || !newLessonTitle || (newLessonType === 'text' ? !newLessonText : !selectedFile)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10"
              >
                <Plus className="w-3.5 h-3.5" /> Append to Course
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {course.contents?.map((lesson, idx) => (
                <div key={lesson.id} className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col gap-4 group hover:border-blue-200 transition-all shadow-sm">
                  {editingLessonId === lesson.id ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-blue-600">Editing Mode</span>
                        <button onClick={() => setEditingLessonId(null)}><X size={14} className="text-slate-400" /></button>
                      </div>
                      <textarea 
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium min-h-[150px] resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingLessonId(null)} className="text-[10px] font-black uppercase text-slate-400 px-3">Cancel</button>
                        <button onClick={() => saveTextLesson(lesson)} className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-4 h-4 text-slate-200" />
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        {lesson.type === 'video' ? <Video size={16} /> : lesson.type === 'document' ? <FileText size={16} /> : <AlignLeft size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{lesson.title}</p>
                        <p className="text-[8px] font-black uppercase text-blue-500 tracking-tighter">M-{String(idx + 1).padStart(2, '0')} • {lesson.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {lesson.type === 'text' && (
                          <button onClick={() => { setEditingLessonId(lesson.id); setEditingText(lesson.contentBody || ''); }} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                            <Edit3 size={16} />
                          </button>
                        )}
                        <button onClick={() => deleteLesson(lesson.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Save System State Button for better UX */}
            <div className="pt-6 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => navigate('/console')}
                className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save System State
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
