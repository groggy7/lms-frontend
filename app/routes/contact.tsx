import React from 'react';
import { Send, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen pb-32 overflow-x-hidden">
      {/* Simplified Page Header */}
      <section className="relative pt-32 pb-16 bg-[#000a12] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <MessageSquare className="w-3 h-3" />
            <span>Support & Feedback</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">help?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium opacity-80">
            Have a question about a course or want to share your feedback? Our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Centered Simplified Form - More Compact */}
      <div className="container mx-auto px-4 mt-12 relative z-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-medium text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-medium text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Subject</label>
                <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-[10px] uppercase tracking-widest appearance-none cursor-pointer">
                  <option>General Question</option>
                  <option>Course Feedback</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-medium text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col items-center gap-6">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  <span>Secure AES-256 Encrypted Submission</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
