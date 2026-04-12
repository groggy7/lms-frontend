import { useState } from 'react';
import {
  Video,
  FileText,
  AlignLeft,
  ArrowRight,
  ArrowLeft,
  CloudUpload,
  CheckCircle2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
} from 'lucide-react';
import { Link } from '@remix-run/react';

type ContentType = 'video' | 'document' | 'text';

interface Lesson {
  id: string;
  title: string;
  type: ContentType;
}

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');

  // Lessons State
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<ContentType>('video');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadingIndex, setCurrentUploadingIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const addLesson = () => {
    if (!newLessonTitle) return;
    const newLesson: Lesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: newLessonTitle,
      type: newLessonType
    };
    setLessons([...lessons, newLesson]);
    setNewLessonTitle('');
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const simulateUpload = () => {
    if (lessons.length === 0) return;
    setIsUploading(true);
    let currentLesson = 0;

    const uploadNext = () => {
      if (currentLesson >= lessons.length) {
        setIsUploading(false);
        setIsComplete(true);
        return;
      }

      setCurrentUploadingIndex(currentLesson);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          currentLesson++;
          setTimeout(uploadNext, 400);
        }
      }, 100);
    };

    uploadNext();
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
    <div className="min-h-screen bg-white pb-20">
      {/* Refined Header */}
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

          {/* Compact Progress Steps */}
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

          <div className="bg-slate-50 rounded-[32px] p-8 lg:p-10 border border-slate-100 min-h-[450px] flex flex-col shadow-sm">

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

            {/* Step 2: Dynamic Content Builder */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Course Content</h2>
                  <p className="text-slate-500 text-xs font-medium">Add multiple lessons, documents, or texts.</p>
                </div>

                {/* Add Lesson Form */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      placeholder="Lesson title..."
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold"
                    />
                    <div className="flex gap-2 flex-1 sm:flex-initial">
                      <div className="relative flex-1 sm:w-32">
                        <select
                          value={newLessonType}
                          onChange={(e) => setNewLessonType(e.target.value as ContentType)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer pr-8 hover:border-blue-300 transition-colors"
                        >
                          <option value="video">Video</option>
                          <option value="document">Doc</option>
                          <option value="text">Text</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                      <button
                        onClick={addLesson}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>

                  </div>
                </div>

                {/* Lesson List */}
                <div className="flex-1 space-y-3 min-h-[200px] max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {lessons.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-2 border-2 border-dashed border-slate-100 rounded-2xl">
                      <Plus className="w-8 h-8 opacity-20" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">No content added yet</p>
                    </div>
                  ) : (
                    lessons.map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 group hover:border-blue-200 transition-all">
                        <GripVertical className="w-4 h-4 text-slate-200" />
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          {lesson.type === 'video' && <Video className="w-4 h-4" />}
                          {lesson.type === 'document' && <FileText className="w-4 h-4" />}
                          {lesson.type === 'text' && <AlignLeft className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">{lesson.title}</p>
                          <p className="text-[9px] font-black uppercase text-blue-500 tracking-tighter opacity-70">
                            Module {String(idx + 1).padStart(2, '0')} • {lesson.type}
                          </p>
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
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 disabled:opacity-30 transition-all flex items-center gap-2 group"
                  >
                    Review & Deploy
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Sequential Mock Upload */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500 flex-1 flex flex-col justify-center">

                {!isComplete ? (
                  <>
                    <div className="space-y-1 text-center">
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">System Deployment</h2>
                      <p className="text-slate-500 text-xs font-medium">Processing {lessons.length} course assets.</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center py-10">
                      {isUploading ? (
                        <div className="w-full max-w-sm space-y-6">
                          <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-600/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white animate-pulse">
                              {lessons[currentUploadingIndex].type === 'video' && <Video className="w-5 h-5" />}
                              {lessons[currentUploadingIndex].type === 'document' && <FileText className="w-5 h-5" />}
                              {lessons[currentUploadingIndex].type === 'text' && <AlignLeft className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                                Uploading {currentUploadingIndex + 1} of {lessons.length}
                              </p>
                              <p className="text-xs font-bold text-slate-900 line-clamp-1">
                                {lessons[currentUploadingIndex].title}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-black text-blue-600 tabular-nums">
                                {Math.round(uploadProgress)}%
                              </span>
                            </div>
                          </div>

                          <div className="overflow-hidden h-1.5 w-full flex rounded-full bg-blue-100">
                            <div
                              style={{ width: `${uploadProgress}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="w-full max-w-sm p-10 border-2 border-dashed border-slate-200 rounded-[32px] bg-white flex flex-col items-center gap-4 group hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                          onClick={simulateUpload}
                        >
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-all">
                            <CloudUpload className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="font-black text-sm text-slate-900 uppercase tracking-widest">Deploy to Nodes</p>
                            <p className="text-slate-400 text-[10px] font-medium italic">Execute secure multi-asset transmission</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isUploading && (
                      <div className="pt-4 flex justify-start border-t border-slate-100">
                        <button onClick={handleBack} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Deployment Complete</h2>
                      <p className="text-slate-500 text-xs font-medium max-w-[200px] mx-auto italic">
                        {lessons.length} assets successfully distributed to global nodes.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        New Course
                      </button>
                      <Link
                        to="/courses"
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 no-underline"
                      >
                        Catalog
                        <ArrowRight className="w-3.5 h-3.5" />
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
