import { useState, useEffect, useRef } from 'react'
import VideoUpload from './components/VideoUpload'
import VideoPlayer from './components/VideoPlayer'
import LessonList from './components/LessonList'
import { BookOpen, LayoutDashboard, Settings, LogOut, ChevronRight, FileText, Download, Activity } from 'lucide-react'

function App() {
  const [userId] = useState("user-" + Math.random().toString(36).substring(7));
  const [activeTab, setActiveTab] = useState('learning');
  const [currentLesson, setCurrentLesson] = useState('lesson-1');
  
  const videoId = "sample-video-id";
  const wsRef = useRef<WebSocket | null>(null);

  const lessons = [
    { id: 'lesson-1', title: '01. Introduction to Go Concurrency', duration: '12:45', isCompleted: true, isLocked: false, isActive: currentLesson === 'lesson-1' },
    { id: 'lesson-2', title: '02. Understanding Channels and Select', duration: '18:20', isCompleted: false, isLocked: false, isActive: currentLesson === 'lesson-2' },
    { id: 'lesson-3', title: '03. Advanced Worker Pool Patterns', duration: '24:15', isCompleted: false, isLocked: false, isActive: currentLesson === 'lesson-3' },
    { id: 'lesson-4', title: '04. Real-time Systems with WebSockets', duration: '32:10', isCompleted: false, isLocked: true, isActive: currentLesson === 'lesson-4' },
    { id: 'lesson-5', title: '05. PDF Manipulation at Scale', duration: '15:50', isCompleted: false, isLocked: true, isActive: currentLesson === 'lesson-5' },
  ];

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws/progress');
    wsRef.current = socket;
    socket.onopen = () => console.log('WebSocket connected');
    return () => socket.close();
  }, []);

  const handlePlayerReady = (player: any) => {
    player.on('timeupdate', () => {
      const currentTime = player.currentTime();
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          userId: userId,
          videoId: videoId,
          progress: currentTime
        }));
      }
    });
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              L
            </div>
            <span className="font-bold text-xl tracking-tight">LMS <span className="text-blue-500">Engine</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('learning')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'learning' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Learning</span>
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Upload Admin</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative">
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Courses</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-200">Go Backend Engineering POC</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-slate-400">WS Connected</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-800"></div>
          </div>
        </header>

        {activeTab === 'learning' ? (
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
            {/* Video & Info Section */}
            <div className="flex-1 p-8 lg:border-r border-slate-900">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl aspect-video ring-1 ring-white/5">
                  <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Introduction to Go Concurrency</h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                        In Progress
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">
                    Welcome to the first module of our high-concurrency learning series. In this session, we'll explore Go's runtime scheduler, the M:P:N model, and how to effectively manage goroutines at scale.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-400">
                      <FileText className="w-5 h-5" />
                      Lesson Materials
                    </h3>
                    <div className="space-y-3">
                      <a 
                        href={`http://localhost:8080/download/pdf?userId=${userId}`}
                        className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl group hover:border-blue-500/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                            <Download className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">Concurrency-Handout.pdf</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-indigo-400">
                      <Activity className="w-5 h-5" />
                      Live Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2">
                        <span className="text-slate-500 font-medium">User ID</span>
                        <span className="text-slate-300 font-mono text-xs">{userId.substring(0, 12)}...</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Session Sync</span>
                        <span className="text-slate-300">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sidebar (Right on desktop) */}
            <div className="w-full lg:w-96 p-8 bg-slate-950/50 shrink-0 h-fit lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:sticky lg:top-16">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-lg">Course Content</h3>
                <span className="text-xs font-mono text-blue-500">20% Complete</span>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Module 01: The Basics</p>
                  <LessonList lessons={lessons} onLessonSelect={(l) => setCurrentLesson(l.id)} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 max-w-4xl mx-auto space-y-12">
            <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-2">Upload Administration</h2>
              <p className="text-slate-400 mb-6">Internal dashboard for managing video uploads and transcoding queues.</p>
              <VideoUpload />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-slate-500 text-sm font-medium mb-1">Queue Size</h4>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-slate-500 text-sm font-medium mb-1">Active Transcodes</h4>
                <p className="text-3xl font-bold text-blue-500">Idle</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-slate-500 text-sm font-medium mb-1">Storage Usage</h4>
                <p className="text-3xl font-bold text-indigo-500">4.2 GB</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
