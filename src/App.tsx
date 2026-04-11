import VideoUpload from './components/VideoUpload'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          LMS Engine
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          High-concurrency video delivery platform with real-time state synchronization.
        </p>
      </header>
      
      <main className="w-full">
        <VideoUpload />
      </main>
      
      <footer className="mt-20 text-slate-500 text-sm">
        &copy; 2026 High-Concurrency Video Learning Engine POC
      </footer>
    </div>
  )
}

export default App
