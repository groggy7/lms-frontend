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
import * as dndCore from '@dnd-kit/core';
import * as dndSortable from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } = dndCore;
const { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } = dndSortable;

type DragEndEvent = dndCore.DragEndEvent;

import RichTextEditor from '../components/RichTextEditor';

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

// Sortable Item Component
interface SortableItemProps {
  lesson: Lesson;
  idx: number;
  editingLessonId: string | null;
  editingText: string;
  setEditingText: (text: string) => void;
  setEditingLessonId: (id: string | null) => void;
  saveTextLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;
}

function SortableLessonItem({ 
  lesson, 
  idx, 
  editingLessonId, 
  editingText, 
  setEditingText, 
  setEditingLessonId, 
  saveTextLesson, 
  deleteLesson 
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-[32px] p-6 border border-slate-100 flex flex-col gap-6 group hover:border-blue-200 transition-all shadow-md"
    >
      {editingLessonId === lesson.id ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase text-blue-600 tracking-widest">Editing Mode: {lesson.title}</span>
            <button onClick={() => setEditingLessonId(null)}><X size={18} className="text-slate-400 hover:text-slate-900 transition-colors" /></button>
          </div>
          <RichTextEditor 
            value={editingText}
            onChange={setEditingText}
          />
          <div className="flex justify-end gap-4">
            <button onClick={() => setEditingLessonId(null)} className="text-xs font-black uppercase text-slate-400 px-4 hover:text-slate-900 transition-colors">Cancel</button>
            <button 
              onClick={() => saveTextLesson(lesson)} 
              className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
            >
              Save Module
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <button 
            {...attributes} 
            {...listeners} 
            className="p-2 cursor-grab active:cursor-grabbing hover:bg-slate-50 rounded-lg transition-colors"
          >
            <GripVertical className="w-5 h-5 text-slate-300" />
          </button>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${lesson.type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
            {lesson.type === 'video' ? <Video size={20} /> : lesson.type === 'document' ? <FileText size={20} /> : <AlignLeft size={20} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-black text-slate-900 truncate text-left">{lesson.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">
                Node-{String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Format: {lesson.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lesson.type === 'text' && (
              <button 
                onClick={() => { 
                  setEditingLessonId(lesson.id); 
                  setEditingText(lesson.contentBody || ''); 
                }} 
                className="p-3 text-slate-300 hover:text-blue-600 transition-colors bg-slate-50 rounded-xl"
              >
                <Edit3 size={20} />
              </button>
            )}
            <button 
              onClick={() => deleteLesson(lesson.id)} 
              className="p-3 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-xl"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
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

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteLesson = async (lessonId: string) => {
    if (!confirm('Decommission this module?')) return;
    setIsProcessing(true);
    try {
      await fetch(`http://localhost:8080/courses/${id}/lessons/${lessonId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      await fetchCourse();
    } finally {
      setIsProcessing(false);
    }
  };

  const saveTextLesson = async (lesson: Lesson) => {
    setIsProcessing(true);
    try {
      await fetch(`http://localhost:8080/courses/${id}/lessons/${lesson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lesson, contentBody: editingText }),
        credentials: 'include'
      });
      setEditingLessonId(null);
      await fetchCourse();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !course) return;

    const oldIndex = course.contents.findIndex(l => l.id === active.id);
    const newIndex = course.contents.findIndex(l => l.id === over.id);

    const newContents = arrayMove(course.contents, oldIndex, newIndex);
    setCourse({ ...course, contents: newContents });

    // Sync new order to backend via BULK reorder
    setIsProcessing(true);
    try {
      const res = await fetch(`http://localhost:8080/courses/${id}/lessons/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonIds: newContents.map(l => l.id) }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to synchronize curriculum order');
    } catch (err: any) {
      console.error('Failed to sync order:', err);
      alert(err.message);
      // Revert UI on failure
      setCourse(course); 
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-blue-600 font-black animate-pulse uppercase tracking-[0.3em] text-xs">
        Accessing Node Infrastructure...
      </div>
    );
  }

  if (!course) return <div className="p-20 text-center font-black">Course Node Not Found</div>;

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#000a12] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
                Edit <span className="text-blue-500">Course.</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Deployment ID: {course.id}</p>
            </div>
            <Link 
              to="/console" 
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Section 1: Meta */}
          <div className={`${isProcessing ? 'opacity-50 pointer-events-none' : ''} bg-slate-50 rounded-[48px] p-10 lg:p-12 border border-slate-100 space-y-8 transition-opacity shadow-2xl shadow-slate-200/40`}>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" /> Meta Configuration
              </h2>
              <p className="text-slate-500 text-sm font-medium opacity-80">Update the foundational identity of your infrastructure node.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Title</label>
                <input 
                  type="text" 
                  value={course.title}
                  onChange={(e) => setCourse({ ...course, title: e.target.value })}
                  className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-black text-2xl text-slate-900 shadow-sm" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                <textarea 
                  rows={3}
                  value={course.description}
                  onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-base text-slate-700 resize-none shadow-sm"
                ></textarea>
              </div>
              <div className="pt-2">
                <button 
                  onClick={handleUpdateMeta}
                  className="px-10 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10"
                >
                  <Save className="w-4 h-4" /> Synchronize Meta
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Course Architect */}
          <div className={`${isProcessing ? 'opacity-50 pointer-events-none' : ''} bg-slate-50 rounded-[48px] p-10 lg:p-12 border border-slate-100 space-y-10 transition-opacity shadow-2xl shadow-slate-200/40`}>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Course Architect</h2>
              <p className="text-slate-500 text-sm font-medium opacity-80">Append new modules or manage the existing curriculum hierarchy.</p>
            </div>

            {/* Drafting Area */}
            <div className="p-10 bg-white rounded-[40px] border border-slate-200 space-y-10 shadow-xl shadow-slate-200/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Title</label>
                  <input 
                    type="text" 
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="New Module Title..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-base font-black shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Format</label>
                  <div className="relative">
                    <select 
                      value={newLessonType}
                      onChange={(e) => setNewLessonType(e.target.value as ContentType)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs font-black uppercase tracking-widest appearance-none cursor-pointer pr-12 shadow-inner"
                    >
                      <option value="video">Video Stream</option>
                      <option value="document">Technical Doc</option>
                      <option value="text">Interactive Text</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {newLessonType === 'text' ? (
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Interactive Content</label>
                  <RichTextEditor 
                    value={newLessonText}
                    onChange={setNewLessonText}
                    placeholder="Architect your interactive module content here..."
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Source</label>
                  <div className="relative">
                    <input type="file" id="file-edit" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <label htmlFor="file-edit" className={`w-full flex items-center gap-6 px-8 py-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all ${selectedFile ? 'border-blue-400 bg-blue-50' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedFile ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                        {newLessonType === 'video' ? <Video className="w-6 h-6" /> : <FileUp className="w-6 h-6" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className={`text-sm font-black uppercase tracking-widest ${selectedFile ? 'text-blue-600' : 'text-slate-400'}`}>
                          {selectedFile ? selectedFile.name : `Select ${newLessonType === 'video' ? 'Video File' : 'Technical Document'}`}
                        </span>
                        {!selectedFile && <span className="text-[10px] text-slate-400 font-medium italic uppercase tracking-wider">Secure Transmission Active</span>}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button 
                  onClick={addLesson}
                  disabled={isProcessing || !newLessonTitle || (newLessonType === 'text' ? !newLessonText : !selectedFile)}
                  className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
                >
                  <Plus className="w-5 h-5" /> Append to Course Node
                </button>
              </div>
            </div>

            {/* Sortable List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Deployed Modules</span>
                <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">Live Index</span>
              </div>
              
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={course.contents.map(l => l.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {course.contents.map((lesson, idx) => (
                      <SortableLessonItem 
                        key={lesson.id} 
                        lesson={lesson} 
                        idx={idx}
                        editingLessonId={editingLessonId}
                        editingText={editingText}
                        setEditingText={setEditingText}
                        setEditingLessonId={setEditingLessonId}
                        saveTextLesson={saveTextLesson}
                        deleteLesson={deleteLesson}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Save System State Button */}
            <div className="pt-10 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => navigate('/console')}
                className="px-12 py-4 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
