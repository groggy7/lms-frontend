import { useState, useEffect } from 'react'
import { useParams, Link } from '@remix-run/react'
import VideoPlayer from '../components/VideoPlayer'
import LessonList from '../components/LessonList'
import { FileText, Download, Activity, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react'
import { useMounted } from '../hooks/use-mounted'
import { marked } from 'marked'

interface CourseContent {
  id: string;
  title: string;
  type: string;
  contentUrl?: string;
  contentBody?: string;
  orderIndex: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  contents: CourseContent[];
}

export default function CourseDetails() {
  const { id } = useParams();
  const isMounted = useMounted();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await fetch(`http://localhost:8080/courses/${id}`, {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to access course node');
        const data = await response.json();
        setCourse(data);
        if (data.contents && data.contents.length > 0) {
          setCurrentLessonId(data.contents[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourseDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#001a33] flex flex-col items-center justify-center gap-4 text-blue-400">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-black text-xs uppercase tracking-[0.3em]">Synchronizing Secure Stream...</p>
      </div>
    );
  }

  if (!course) return <div className="p-20 text-center font-black">Course Node Not Found</div>;

  const lessons = (course.contents || []).map(c => ({
    id: c.id,
    title: c.title,
    duration: c.type === 'video' ? 'Dynamic' : 'Doc',
    isCompleted: false,
    isLocked: false,
    isActive: currentLessonId === c.id,
    video: c.contentUrl || '',
    type: c.type,
    body: c.contentBody
  }));

  const activeLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  const getVideoType = (url: string) => {
    if (!url) return 'video/mp4';
    try {
      const pureUrl = new URL(url).pathname;
      if (pureUrl.endsWith('.m3u8')) return 'application/x-mpegURL';
    } catch (e) {
      if (url.includes('.m3u8')) return 'application/x-mpegURL';
    }
    return 'video/mp4';
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: activeLesson?.video || '',
      type: getVideoType(activeLesson?.video || '')
    }]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900">
      {/* Course Top Header */}
      <div className="bg-[#001a33] text-white pt-16 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />

        <div className="container relative z-10">
          <div className="flex flex-col gap-6">
            <Link to="/courses" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors w-fit font-semibold no-underline">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Catalog Index</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                    Infrastructure Node
                  </span>
                  <span className="text-slate-500 font-bold">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Verified Cluster</span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  {course.title}
                </h1>
                <p className="text-slate-300 text-xl leading-relaxed max-w-3xl font-medium opacity-90">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Video & Info */}
          <div className="flex-1 space-y-10">
            <div className="bg-black rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-slate-200 h-[500px] flex items-center justify-center relative">
              {activeLesson?.type === 'video' ? (
                isMounted && activeLesson.video ? (
                  <div className="w-full max-w-[888px]">
                    <VideoPlayer key={activeLesson.id} options={videoJsOptions} />
                  </div>
                ) : (
                  <div className="text-slate-500 italic text-sm">Initializing Stream...</div>
                )
              ) : activeLesson?.type === 'text' ? (
                <div className="w-full h-full bg-white p-12 overflow-y-auto prose max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-hr:border-slate-100">
                  <h2 className="text-3xl font-black mb-6">{activeLesson.title}</h2>
                  <div className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: marked.parse(activeLesson.body || '') }} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-white p-20 text-center">
                  <FileText className="w-20 h-20 text-blue-500 opacity-20" />
                  <div className="space-y-2">
                    <p className="font-black text-xl">Technical Document Attached</p>
                    <p className="text-slate-500 text-sm italic">Download resource from the sidebar to view content.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                <button className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1">Architecture Overview</button>
                <button className="text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors">Resources</button>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Module: {activeLesson?.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  This module is part of the integrated {course.title} course, served via our high-performance global edge network.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lessons & Stats */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-xl text-slate-900">Course Index</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">LIVE NODE</span>
              </div>
              <LessonList lessons={lessons} onLessonSelect={(l) => setCurrentLessonId(l.id)} />
            </div>

            {activeLesson?.type === 'document' && (
              <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Asset Download
                </h3>
                <a
                  href={activeLesson.video}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-500/30 transition-all text-slate-900 flex items-center justify-between no-underline"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Secure Resource</p>
                      <p className="text-[10px] text-slate-500 font-medium">Lumina Encrypted PDF</p>
                    </div>
                  </div>
                </a>
              </div>
            )}

            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-blue-200" />
                <h3 className="font-extrabold text-xl">System Metrics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                  <span className="text-blue-100 opacity-80">Stream Status</span>
                  <span className="flex items-center gap-2 font-mono">
                    Operational <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-100 opacity-80">Sync Fidelity</span>
                  <span className="font-mono text-[10px]">High (Real-time)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
