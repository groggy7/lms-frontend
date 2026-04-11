import { useState, useEffect } from 'react'
import VideoUpload from '../components/VideoUpload'
import LessonList from '../components/LessonList'
import { BookOpen, LayoutDashboard, Settings, LogOut, ChevronRight, Activity } from 'lucide-react'
import { useMounted } from '../hooks/use-mounted'
import { Link, useNavigate } from '@remix-run/react'

export default function Learning() {
  const isMounted = useMounted();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('lumina_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // If no user, redirect to login in a real app
        // navigate('/auth');
      }
    }
  }, []);

  const userId = user?.id || "guest";
  const userRole = user?.role || "student";

  const lessons = [
    { id: 'lesson-1', title: '01. Introduction to Go Concurrency', duration: '12:45', isCompleted: true, isLocked: false },
    { id: 'lesson-2', title: '02. Understanding Channels and Select', duration: '18:20', isCompleted: false, isLocked: false },
  ];

  const handleLogOut = () => {
    localStorage.removeItem('lumina_user');
    localStorage.removeItem('lumina_token');
    navigate('/');
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 overflow-hidden font-sans min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-xs">
              L
            </div>
            <span className="font-bold text-xl tracking-tight">Lumina <span className="text-blue-500 text-sm">PROTOTYPE</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            to="/course/go-concurrency"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-slate-900"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Back to Course</span>
          </Link>
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Upload Admin</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-all opacity-50 cursor-not-allowed">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900">
          <button 
            onClick={handleLogOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative">
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-200">Video & Content Management</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Prototype Mode</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-800 flex items-center justify-center text-[10px] font-bold">
              {user?.fullName?.substring(0, 2).toUpperCase() || 'GU'}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-12">
          <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[32px]">
            <h2 className="text-2xl font-bold mb-2">Upload Administration</h2>
            <p className="text-slate-400 mb-8">This module simulates the chunked upload engine. In the final version, this component communicates with the Go backend to process multi-GB video files.</p>
            
            {/* Mocking the upload component to not call backend */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Engine Ready</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">The chunked upload system is a frontend-only demonstration in this prototype.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold opacity-50 cursor-not-allowed">
                Select Video File
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-slate-100">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Queue Size</h4>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Active Transcodes</h4>
              <p className="text-3xl font-bold text-blue-500">Idle</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Storage Usage</h4>
              <p className="text-3xl font-bold text-indigo-500">4.2 GB</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
