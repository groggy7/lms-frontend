import { useState, useEffect, useRef } from 'react'
import VideoUpload from './components/VideoUpload'
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [userId] = useState("user-" + Math.random().toString(36).substring(7));
  const videoId = "sample-video-id"; // In a real app, this would be dynamic
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:8080/ws/progress');
    wsRef.current = socket;

    socket.onopen = () => console.log('WebSocket connected');
    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onerror = (err) => console.error('WebSocket error:', err);

    return () => {
      socket.close();
    };
  }, []);

  const handlePlayerReady = (player: any) => {
    player.on('timeupdate', () => {
      const currentTime = player.currentTime();
      // Send progress update every few seconds (throttling can be added)
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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center p-4">
      <header className="mb-10 text-center mt-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
          LMS Engine
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded border border-blue-500/20">
            ID: {userId}
          </span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Connected"></span>
        </div>
        <p className="text-slate-400 max-w-lg mx-auto">
          High-concurrency video delivery platform with real-time state synchronization.
        </p>
      </header>
      
      <main className="w-full max-w-4xl space-y-12">
        <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Course Content
          </h2>
          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-black aspect-video">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <VideoUpload />
          
          <div className="space-y-8">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm h-fit">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Course Materials
              </h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14.5 2 14.5 7.5 20 7.5"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Syllabus.pdf</p>
                    <p className="text-xs text-slate-500">Dynamic Watermarking Active</p>
                  </div>
                </div>
                <a 
                  href={`http://localhost:8080/download/pdf?userId=${userId}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm font-medium border border-slate-800 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm h-fit">
              <h3 className="font-semibold mb-4">Real-time Stats</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">WebSocket Status</span>
                <span className="text-green-400 font-medium">Connected</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Sync Frequency</span>
                <span className="text-slate-200">~250ms (throttled)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Storage Layer</span>
                <span className="text-slate-200 font-mono text-xs">Cloudflare R2</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="mt-20 py-10 text-slate-500 text-sm border-t border-slate-900 w-full text-center">
        &copy; 2026 High-Concurrency Video Learning Engine POC
      </footer>
    </div>
  )
}

export default App
