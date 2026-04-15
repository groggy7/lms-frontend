import React, { useState, useEffect } from 'react';
import {
  Video,
  FileText,
  AlignLeft,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  X,
  FileUp,
  Type,
  Image as ImageIcon
} from 'lucide-react';
import { Link, useNavigate } from '@remix-run/react';
import { getApiUrl } from '../lib/config';

import RichTextEditor from '../components/RichTextEditor';

type ContentType = 'video' | 'document' | 'text';

interface Lesson {
  id: string;
  title: string;
  type: ContentType;
  content?: string; // Text content or file name
  file?: File;
}

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
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
      }
    } catch (e) {
      navigate('/auth');
    }
  }, [navigate]);

  // Lessons State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<ContentType>('video');
  const [newLessonText, setNewLessonText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadingIndex, setCurrentUploadingIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [showStockSelector, setShowStockSelector] = useState(false);

  // High-quality stock images for the catalog
  const stockThumbnails = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop", // Stock 6
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop", // Stock 7
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop"
  ];

  // Auto-start upload when reaching step 3
  useEffect(() => {
    if (step === 3 && !isUploading && !isComplete) {
      simulateUpload();
    }
  }, [step]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const addLesson = () => {
    if (!newLessonTitle) return;
    const newLesson: Lesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLessonTitle,
      type: newLessonType,
      content: newLessonType === 'text' ? newLessonText : selectedFile?.name,
      file: selectedFile || undefined
    };
    setLessons([...lessons, newLesson]);
    setNewLessonTitle('');
    setNewLessonText('');
    setSelectedFile(null);
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const handleCustomThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate resizing/minimizing before upload (In real app, use canvas or backend)
    // For now, we upload it directly to R2 via a dedicated endpoint or reuse lesson flow
    const formData = new FormData();
    formData.append('document', file); // Reuse the generic upload endpoint for now

    try {
      const res = await fetch(`${getApiUrl()}/upload/document`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to upload custom thumbnail');
      const data = await res.json();
      setThumbnailUrl(data.location);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const simulateUpload = async () => {
    if (lessons.length === 0 || !courseName) return;
    setIsUploading(true);

    try {
      const courseRes = await fetch(`${getApiUrl()}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseName,
          description: courseDesc,
          thumbnailUrl: thumbnailUrl,
          status: 'draft'
        }),
        credentials: 'include',
      });

      if (!courseRes.ok) throw new Error('Failed to initialize course on server');
      const createdCourse = await courseRes.json();

      for (let i = 0; i < lessons.length; i++) {
        setCurrentUploadingIndex(i);
        setUploadProgress(0);

        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 5, 95));
        }, 150);

        const formData = new FormData();
        formData.append('title', lessons[i].title);
        formData.append('type', lessons[i].type);
        formData.append('orderIndex', i.toString());

        if (lessons[i].type === 'text') {
          formData.append('contentBody', lessons[i].content || '');
        } else if (lessons[i].file) {
          formData.append('asset', lessons[i].file);
        }

        const lessonRes = await fetch(`${getApiUrl()}/courses/${createdCourse.id}/lessons`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!lessonRes.ok) throw new Error(`Failed to deploy: ${lessons[i].title}`);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      setIsUploading(false);
      setIsComplete(true);
    } catch (err: any) {
      alert(err.message || 'Deployment failed');
      setIsUploading(false);
      setStep(2);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCourseName('');
    setCourseDesc('');
    setThumbnailUrl('');
    setLessons([]);
    setIsUploading(false);
    setUploadProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#000a12] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
              Create <span className="text-blue-500">Course.</span>
            </h1>
            <Link
              to="/console"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all flex items-center gap-2 font-black text-sm uppercase tracking-widest no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">

          {/* Progress Steps */}
          <div className="mb-10 px-16 flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 z-0"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-500 ${step >= i ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white border-slate-200 text-slate-300'
                  }`}
              >
                {step > i || (i === 3 && isComplete) ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-black text-sm">{i}</span>}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-[48px] p-8 lg:p-12 border border-slate-100 min-h-[550px] flex flex-col shadow-2xl shadow-slate-200/40">

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Course Meta</h2>
                  <p className="text-slate-500 text-lg font-medium opacity-90">Define the foundational identity of your curriculum.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="space-y-3">
                        <label className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Name</label>
                        <input
                          type="text"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                          placeholder="e.g. Advanced System Architecture"
                          className="w-full px-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-black text-2xl text-slate-900 shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Brief Abstract</label>
                        <textarea
                          rows={3}
                          value={courseDesc}
                          onChange={(e) => setCourseDesc(e.target.value)}
                          placeholder="Specify high-level architectural objectives..."
                          className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-bold text-lg text-slate-700 resize-none shadow-sm"
                        ></textarea>
                      </div>
                    </div>

                    {/* Thumbnail Selection */}
                    <div className="lg:col-span-4 space-y-4">
                      <label className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Cover</label>
                      <div
                        className="group aspect-video rounded-3xl bg-white border-2 border-dashed border-slate-200 overflow-hidden relative flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all shadow-sm"
                        onClick={() => setShowStockSelector(true)}
                      >
                        {thumbnailUrl ? (
                          <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors mb-2" />
                            <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-600 transition-colors">Select Visual</span>
                          </>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Image</span>
                        </div>
                      </div>

                      <div className="relative">
                        <input type="file" id="custom-thumb" className="hidden" accept="image/*" onChange={handleCustomThumbnail} />
                        <label htmlFor="custom-thumb" className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all">
                          <FileUp className="w-3.5 h-3.5" /> Upload Custom
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    disabled={!courseName || !thumbnailUrl}
                    onClick={handleNext}
                    className="px-12 py-4 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all flex items-center gap-3 group shadow-xl"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Content Configurator */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Course Architect</h2>
                  <p className="text-slate-500 text-lg font-medium opacity-90">Add and configure individual course modules.</p>
                </div>

                {/* Drafting Area */}
                <div className="p-8 bg-white rounded-[40px] border border-slate-200 space-y-8 shadow-xl shadow-slate-200/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Title</label>
                      <input
                        type="text"
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                        placeholder="e.g. Introduction to HLS"
                        className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-base font-black shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">Module Format</label>
                      <div className="relative">
                        <select
                          value={newLessonType}
                          onChange={(e) => setNewLessonType(e.target.value as ContentType)}
                          className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs font-black uppercase tracking-widest appearance-none cursor-pointer pr-12 shadow-inner"
                        >
                          <option value="video">Video Stream</option>
                          <option value="document">Technical Doc</option>
                          <option value="text">Interactive Text</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Contextual Input */}
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <label className="text-[13px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {newLessonType === 'text' ? 'Interactive Content' : 'Asset Upload'}
                    </label>

                    {newLessonType === 'text' ? (
                      <RichTextEditor
                        value={newLessonText}
                        onChange={setNewLessonText}
                        placeholder="Architect your interactive module content here..."
                      />
                    ) : (
                      <div className="relative group">
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          accept={newLessonType === 'video' ? 'video/*' : '.pdf,.docx'}
                        />
                        <label
                          htmlFor="file-upload"
                          className={`w-full flex items-center gap-6 px-8 py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all ${selectedFile ? 'border-blue-400 bg-blue-50' : ''
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedFile ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                            {newLessonType === 'video' ? <Video className="w-5 h-5" /> : <FileUp className="w-5 h-5" />}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className={`text-sm font-black uppercase tracking-widest ${selectedFile ? 'text-blue-600' : 'text-slate-400'}`}>
                              {selectedFile ? selectedFile.name : `Select ${newLessonType === 'video' ? 'Video File' : 'Technical Document'}`}
                            </span>
                            {!selectedFile && <span className="text-[10px] text-slate-400 font-medium">Enterprise limit: 2GB per node</span>}
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={addLesson}
                    disabled={!newLessonTitle || (newLessonType === 'text' ? !newLessonText : !selectedFile)}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/10"
                  >
                    <Plus className="w-5 h-5" /> Append to Course Node
                  </button>
                </div>

                {/* Module List */}
                <div className="flex-1 space-y-3 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                  {lessons.length === 0 ? (
                    <div className="h-24 flex flex-col items-center justify-center text-slate-300 gap-3 border-2 border-dashed border-slate-100 rounded-[32px]">
                      <p className="text-xs font-black uppercase tracking-[0.3em]">Infrastructure Index Empty</p>
                    </div>
                  ) : (
                    lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center gap-6 p-5 bg-white rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all shadow-md">
                        <GripVertical className="w-5 h-5 text-slate-200" />
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                          {lesson.type === 'video' && <Video className="w-5 h-5" />}
                          {lesson.type === 'document' && <FileText className="w-5 h-5" />}
                          {lesson.type === 'text' && <AlignLeft className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-black text-slate-900 line-clamp-1 text-left">{lesson.title}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">
                              Node-{String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase truncate">
                              Format: {lesson.type}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeLesson(lesson.id)}
                          className="p-3 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-xl"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-6 flex justify-between items-center border-t border-slate-100">
                  <button onClick={handleBack} className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    disabled={lessons.length === 0}
                    onClick={handleNext}
                    className="px-12 py-4 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all flex items-center gap-3 group shadow-2xl"
                  >
                    Review & Deploy
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Deployment */}
            {step === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col justify-center">
                {!isComplete ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-12 py-10">
                    <div className="space-y-3 text-center">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">
                        {isUploading ? 'Executing Global Deployment' : 'Initializing Transmission...'}
                      </h2>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                        Syncing {lessons.length} course modules to infrastructure
                      </p>
                    </div>

                    <div className="w-full max-w-md space-y-8">
                      {isUploading && (
                        <div className="p-8 bg-white rounded-[40px] border border-blue-100 shadow-2xl shadow-blue-600/5 flex items-center gap-6 scale-105 transition-all">
                          <div className="w-16 h-16 rounded-[20px] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                            {lessons[currentUploadingIndex]?.type === 'video' && <Video size={32} />}
                            {lessons[currentUploadingIndex]?.type === 'document' && <FileText size={32} />}
                            {lessons[currentUploadingIndex]?.type === 'text' && <Type size={32} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1 text-left">
                              Processing Node {currentUploadingIndex + 1}
                            </p>
                            <p className="text-lg font-black text-slate-900 truncate text-left">
                              {lessons[currentUploadingIndex]?.title}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-blue-600 tabular-nums">
                              {Math.round(uploadProgress)}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="overflow-hidden h-3 w-full flex rounded-full bg-blue-100 shadow-inner">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                          <span>Connection: Secure</span>
                          <span>Infrastructure: Optimal</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 font-bold italic animate-pulse">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <span className="text-sm uppercase tracking-widest">Distributing assets to edge clusters...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-10 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-green-500/30">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Transmission Verified</h2>
                      <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto italic leading-relaxed">
                        {lessons.length} course modules successfully integrated into the Lumina global delivery network.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                      <button
                        onClick={resetForm}
                        className="px-10 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl"
                      >
                        <Plus className="w-5 h-5" />
                        New Course
                      </button>
                      <Link
                        to="/console"
                        className="px-10 py-3.5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 no-underline"
                      >
                        Infrastructure Console
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Stock Thumbnail Selector Modal */}
      {showStockSelector && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#000a12]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[48px] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight text-left">Visual Asset Catalog</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-left">Select a verified infrastructure visual</p>
              </div>
              <button onClick={() => setShowStockSelector(false)} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {stockThumbnails.map((url, i) => (
                  <div
                    key={i}
                    className={`group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${thumbnailUrl === url ? 'border-blue-600 scale-[0.98]' : 'border-transparent hover:border-slate-200'
                      }`}
                    onClick={() => {
                      setThumbnailUrl(url);
                      setShowStockSelector(false);
                    }}
                  >
                    <img src={url} alt={`Stock ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Enterprise High-Resolution Catalog</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
