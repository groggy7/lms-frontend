import { useState, useEffect } from 'react';
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
  FileUp,
  Type
} from 'lucide-react';
import { Link } from '@remix-run/react';

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

  const simulateUpload = async () => {
    if (lessons.length === 0 || !courseName) return;
    setIsUploading(true);

    try {
      const courseRes = await fetch('http://localhost:8080/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseName,
          description: courseDesc,
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

        const lessonRes = await fetch(`http://localhost:8080/courses/${createdCourse.id}/lessons`, {
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
      setStep(2); // Go back to fix issues
    }
  };

  const resetForm = () => {
    setStep(1);
    setCourseName('');
    setCourseDesc('');
    setLessons([]);
    setIsUploading(false);
    setUploadProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#000a12] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
              Create <span className="text-blue-500">Course.</span>
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
        <div className="max-w-2xl mx-auto">

          {/* Progress Steps */}
          <div className="mb-8 px-12 flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-px bg-blue-600 -translate-y-1/2 transition-all duration-500 z-0"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-500 ${step >= i ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-slate-200 text-slate-300'
                  }`}
              >
                {step > i || (i === 3 && isComplete) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="font-black text-[10px]">{i}</span>}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-[32px] p-8 lg:p-10 border border-slate-100 min-h-[500px] flex flex-col shadow-sm">

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Course Meta</h2>
                  <p className="text-slate-500 text-xs font-medium">Foundational course identity.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Name</label>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Enter name..."
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-bold text-sm text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Brief Abstract</label>
                    <textarea
                      rows={3}
                      value={courseDesc}
                      onChange={(e) => setCourseDesc(e.target.value)}
                      placeholder="High-level objectives..."
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium text-xs text-slate-700 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    disabled={!courseName}
                    onClick={handleNext}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all flex items-center gap-2 group"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Content Configurator */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Course Architect</h2>
                  <p className="text-slate-500 text-xs font-medium">Add and configure individual course modules.</p>
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
                        placeholder="e.g. Introduction to HLS"
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

                  {/* Contextual Input */}
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {newLessonType === 'text' ? 'Interactive Content' : 'Asset Upload'}
                    </label>

                    {newLessonType === 'text' ? (
                      <textarea
                        value={newLessonText}
                        onChange={(e) => setNewLessonText(e.target.value)}
                        placeholder="Write your module content here..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium min-h-[100px] resize-none"
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
                          className={`w-full flex items-center gap-4 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all ${selectedFile ? 'border-blue-400 bg-blue-50' : ''
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedFile ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}`}>
                            {newLessonType === 'video' ? <Video className="w-4 h-4" /> : <FileUp className="w-4 h-4" />}
                          </div>
                          <span className={`text-[10px] font-bold ${selectedFile ? 'text-blue-600' : 'text-slate-400'}`}>
                            {selectedFile ? selectedFile.name : `Select ${newLessonType === 'video' ? 'Video File' : 'Document'}`}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={addLesson}
                    disabled={!newLessonTitle || (newLessonType === 'text' ? !newLessonText : !selectedFile)}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append to Course
                  </button>
                </div>

                {/* Module List */}
                <div className="flex-1 space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {lessons.length === 0 ? (
                    <div className="h-24 flex flex-col items-center justify-center text-slate-300 gap-2 border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em]">Course Empty</p>
                    </div>
                  ) : (
                    lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 group hover:border-blue-200 transition-all shadow-sm">
                        <GripVertical className="w-4 h-4 text-slate-200" />
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          {lesson.type === 'video' && <Video className="w-4 h-4" />}
                          {lesson.type === 'document' && <FileText className="w-4 h-4" />}
                          {lesson.type === 'text' && <AlignLeft className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">{lesson.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-black uppercase text-blue-500 tracking-tighter">
                              M-{String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] text-slate-300">•</span>
                            <span className="text-[8px] font-medium text-slate-400 truncate max-w-[150px]">
                              {lesson.type === 'text' ? 'Content Drafted' : `Asset: ${lesson.content}`}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeLesson(lesson.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <button onClick={handleBack} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    disabled={lessons.length === 0}
                    onClick={handleNext}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all flex items-center gap-2 group shadow-xl shadow-slate-900/10"
                  >
                    Review & Deploy
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Deployment (Auto-start) */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col justify-center">
                {!isComplete ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-12 py-10">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">
                        {isUploading ? 'Executing Global Deployment' : 'Initializing Transmission...'}
                      </h2>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Syncing {lessons.length} course modules to infrastructure
                      </p>
                    </div>

                    <div className="w-full max-w-sm space-y-8">
                      {isUploading && (
                        <div className="p-6 bg-white rounded-3xl border border-blue-100 shadow-2xl shadow-blue-600/5 flex items-center gap-5 scale-105 transition-all">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                            {lessons[currentUploadingIndex]?.type === 'video' && <Video size={24} />}
                            {lessons[currentUploadingIndex]?.type === 'document' && <FileText size={24} />}
                            {lessons[currentUploadingIndex]?.type === 'text' && <Type size={24} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">
                              Processing Node {currentUploadingIndex + 1}
                            </p>
                            <p className="text-sm font-black text-slate-900 truncate">
                              {lessons[currentUploadingIndex]?.title}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-blue-600 tabular-nums">
                              {Math.round(uploadProgress)}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="overflow-hidden h-2 w-full flex rounded-full bg-blue-100 shadow-inner">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                          <span>Connection: Secure</span>
                          <span>Infrastructure: Optimal</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 font-medium italic animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs">Distributing assets to edge clusters...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-500 text-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-green-500/30">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Transmission Verified</h2>
                      <p className="text-slate-500 text-sm font-medium max-w-[250px] mx-auto italic">
                        {lessons.length} course modules successfully integrated into the Lumina ecosystem.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={resetForm}
                        className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        New Course
                      </button>
                      <Link
                        to="/console"
                        className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 no-underline"
                      >
                        Go to Console
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
