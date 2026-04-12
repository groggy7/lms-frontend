import React from 'react';
import { Link } from '@remix-run/react';
import AboutIllustration from '../components/AboutIllustration';
import { CheckCircle2, PlayCircle, Sparkles, ArrowRight, Zap, Database, Globe, Lock, Cpu } from 'lucide-react';

export default function Home() {
  const tracks = [
    { 
      title: 'Cloud Infrastructure', 
      desc: 'Architecting global-scale distributed systems and high-availability cloud networks for modern enterprise demands.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    },
    { 
      title: 'System Engineering', 
      desc: 'Advanced architectural patterns, high-performance concurrency, and industrial-grade software design principles.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    },
    { 
      title: 'AI Intelligence', 
      desc: 'Next-generation neural networks, predictive modeling, and scalable machine learning data pipelines.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    },
    { 
      title: 'Global Security', 
      desc: 'Enterprise-grade defensive infrastructure, offensive security tactics, and AES-256 encryption standards.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      {/* Modern High-Impact Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-48 pb-24 overflow-hidden bg-[#000a12]">
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Zap className="absolute top-[20%] left-[10%] w-12 h-12 text-blue-400 animate-bounce-slow" />
          <Database className="absolute top-[60%] left-[15%] w-10 h-10 text-indigo-400 animate-pulse" />
          <Globe className="absolute top-[15%] right-[15%] w-14 h-14 text-purple-400 animate-bounce-slow" style={{ animationDelay: '1s' }} />
          <Lock className="absolute bottom-[20%] right-[20%] w-12 h-12 text-blue-500 animate-pulse" />
          <Cpu className="absolute top-[40%] right-[10%] w-10 h-10 text-indigo-500 animate-bounce-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-blue-400 text-sm font-black tracking-[0.2em] uppercase backdrop-blur-sm mx-auto">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise Learning Architecture</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.9] tracking-tighter">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">High-Performance</span><br />
              Lumina Platform.
            </h1>
            
            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium opacity-90">
              Deploy a world-class education ecosystem powered by industrial-grade infrastructure, real-time sync, and adaptive 4K streaming.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link 
                to="/auth" 
                className="w-full sm:w-auto px-12 py-4 bg-blue-600 text-white rounded-[32px] font-black text-xl hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 group"
              >
                Join Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/courses" 
                className="w-full sm:w-auto px-12 py-4 bg-white/5 text-white border border-white/10 rounded-[32px] font-black text-xl hover:bg-white/10 hover:text-white transition-all backdrop-blur-md flex items-center justify-center gap-3"
              >
                <PlayCircle className="w-7 h-7 text-blue-400" />
                Explore Courses
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto">
              {[
                { label: 'Network Latency', value: '< 50ms', color: 'text-green-400' },
                { label: 'Video Quality', value: 'Ultra-HD HLS', color: 'text-blue-400' },
                { label: 'Data Privacy', value: 'AES-256 Grade', color: 'text-purple-400' },
                { label: 'System Uptime', value: '99.9% SLA', color: 'text-orange-400' }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-sm group hover:bg-white/10 transition-all">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW FROM SCRATCH: Global Learning Specializations */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest">
              Curated Expertise
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Global Learning <br />
              <span className="text-blue-600">Specializations.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Diversify your expertise with world-class tracks designed for modern architectural scale.
            </p>
            <div className="pt-4">
              <Link to="/courses" className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white hover:text-white font-black rounded-3xl hover:bg-blue-600 transition-all shadow-2xl">
                View Full Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {tracks.map((track, i) => (
              <div key={i} className="group flex flex-col h-full bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 hover:shadow-blue-600/10 transition-all duration-500 hover:-translate-y-3 isolate">
                {/* Fixed Height Background Image */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Fixed Height Content Area */}
                <div className="flex-1 p-10 flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-6">
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
                    <h3 className="text-3xl font-black text-slate-900 leading-[1.1]">
                      {track.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-4">
                      {track.desc}
                    </p>
                  </div>

                  <div className="pt-8 mt-auto flex items-center justify-between border-t border-slate-50">
                    <Link 
                      to="/courses" 
                      className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2"
                    >
                      Explore Track <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[64px] -rotate-3" />
              <div className="relative z-10">
                <AboutIllustration />
              </div>
            </div>
            
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <p className="text-blue-600 font-black text-sm uppercase tracking-[0.3em]">The Lumina Advantage</p>
                <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  The Gold Standard in Digital Education
                </h2>
                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                  Lumina provides an elite architectural framework for real-time video delivery, precision state management, and high-performance learning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Adaptive HLS', desc: 'Auto bitrate switching' },
                  { title: 'Low-Latency Sync', desc: 'Instant state persistence' },
                  { title: 'Secure Assets', desc: 'Dynamic watermarking' },
                  { title: 'High Availability', desc: 'Redundant architecture' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link to="/auth" className="px-10 py-3.5 bg-slate-900 text-white rounded-[24px] font-bold hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 inline-block">
                  Discover the Technology
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Area */}
      <div className="counter-area py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="row">
            {[
              { count: '150', label: 'Global Partners', icon: 'flaticon-graduation-cap' },
              { count: '850', label: 'Active Curriculums', icon: 'flaticon-book' },
              { count: '250k', label: 'Certified Alumni', icon: 'flaticon-user' },
              { count: '100', label: 'Satisfaction Rate', icon: 'flaticon-star' },
            ].map((stat, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-8 mb-lg-0">
                <div className="counter-single-box text-center">
                  <div className="counter-icon mb-4">
                    <i className={`${stat.icon} text-blue-600 text-5xl`}></i>
                  </div>
                  <div className="counter-content text-slate-800">
                    <h3 className="counter text-5xl font-extrabold inline-block">{stat.count}</h3>
                    <span className="text-4xl font-bold ml-1 text-blue-600">+</span>
                    <p className="text-slate-500 mt-2 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
