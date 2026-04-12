import { useState, useEffect } from 'react'
import { useParams } from '@remix-run/react'
import VideoPlayer from '../components/VideoPlayer'
import LessonList from '../components/LessonList'
import { FileText, Download, Activity, CheckCircle2, ChevronLeft, LayoutDashboard } from 'lucide-react'
import { useMounted } from '../hooks/use-mounted'
import { Link } from '@remix-run/react'

export default function CourseDetails() {
  const { id } = useParams();
  const isMounted = useMounted();
  const [user, setUser] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState('lesson-1');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('lumina_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const userId = user?.id || "guest";
  const userRole = user?.role || "student";

  const lessons = [
    { id: 'lesson-1', title: '01. Advanced System Concurrency', duration: '12:45', isCompleted: true, isLocked: false, isActive: currentLesson === 'lesson-1', video: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
    { id: 'lesson-2', title: '02. Scalable Data Architectures', duration: '18:20', isCompleted: false, isLocked: false, isActive: currentLesson === 'lesson-2', video: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8' },
    { id: 'lesson-3', title: '03. Distributed Resource Management', duration: '24:15', isCompleted: false, isLocked: false, isActive: currentLesson === 'lesson-3', video: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' },
    { id: 'lesson-4', title: '04. Real-time Event Orchestration', duration: '32:10', isCompleted: false, isLocked: true, isActive: currentLesson === 'lesson-4', video: '' },
    { id: 'lesson-5', title: '05. High-Volume Asset Processing', duration: '15:50', isCompleted: false, isLocked: true, isActive: currentLesson === 'lesson-5', video: '' },
  ];

  const activeLesson = lessons.find(l => l.id === currentLesson) || lessons[0];

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: activeLesson.video,
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900">
      {/* Course Top Header - Enhanced Contrast */}
      <div className="bg-[#001a33] text-white pt-16 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="flex flex-col gap-6">
            <Link to="/courses" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors w-fit font-semibold">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Explore all courses</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                    Enterprise
                  </span>
                  <span className="text-slate-500 font-bold">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Lumina Verified</span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  Modern System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Concurrency</span> Architectures
                </h1>
                <p className="text-slate-300 text-xl leading-relaxed max-w-3xl font-medium opacity-90">
                  Build highly scalable, industrial-grade systems using advanced synchronization architectures and distributed patterns.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Video & Info */}
          <div className="flex-1 space-y-10">
            <div className="bg-black rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-slate-200 aspect-video">
              {isMounted ? (
                <VideoPlayer key={currentLesson} options={videoJsOptions} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 italic">
                  Initializing secure player...
                </div>
              )}
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                <button className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1">Overview</button>
                <button className="text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors">Resources</button>
                <button className="text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors">Q&A</button>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Current Lesson: {activeLesson.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  The video content is served via adaptive Ultra-HD streaming, with progress synchronized in real-time via Lumina Sync to our high-performance global infrastructure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    'Master CSP & primitive sync',
                    'Industrial Scalability Patterns',
                    'High-Throughput Architectures',
                    'State Management at Scale',
                    'Real-time Network Synchronization',
                    'Memory-safe Resource Handling'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lessons & Stats */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-xl text-slate-900">Course Content</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">20% DONE</span>
              </div>
              <LessonList lessons={lessons} onLessonSelect={(l) => setCurrentLesson(l.id)} />
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Lesson Materials
              </h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-500/30 transition-all text-slate-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Concurrency-Guide.pdf</p>
                      <p className="text-[10px] text-slate-500 font-medium">Lumina Secure Document</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-blue-200" />
                <h3 className="font-extrabold text-xl">Lumina Engine</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                  <span className="text-blue-100 opacity-80">Network Status</span>
                  <span className="flex items-center gap-2 font-mono">
                    Operational <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-100 opacity-80">Sync Frequency</span>
                  <span className="font-mono text-[10px]">Real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
