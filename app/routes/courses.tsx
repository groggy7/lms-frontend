import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { PlayCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  instructorId: string;
  status: string;
  createdAt: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:8080/courses', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="course-area pb-100 bg-slate-50 min-h-screen">
      <div className="container pt-16">
        <div className="row">
          <div className="col-lg-12 text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Academic Catalog
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">
              Explore Our <span className="text-blue-600">Courses.</span>
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="font-bold text-sm uppercase tracking-widest">Accessing Infrastructure...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-[40px] border border-red-100 mx-4">
            <p className="text-red-600 font-black uppercase tracking-widest text-sm">Deployment Sync Error</p>
            <p className="text-red-400 mt-2">{error}</p>
          </div>
        ) : (
          <div className="row">
            {courses.length === 0 ? (
              <div className="col-lg-12 text-center py-20">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No courses deployed yet.</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="col-lg-4 col-md-6 mb-30 flex">
                  <Link
                    to={`/course/${course.id}`}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col w-full transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-600/10 isolate no-underline"
                  >
                    {/* Visual Header */}
                    <div className="h-48 bg-[#000a12] relative overflow-hidden">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute top-6 left-6 px-3 py-1 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-lg">
                        {course.status}
                      </div>
                      <div className="absolute bottom-6 right-6 text-white/40 group-hover:text-white transition-colors duration-500">
                        <PlayCircle className="w-12 h-12" />
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Lumina Verified Track</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                          {course.description || "Comprehensive enterprise course designed for high-concurrency systems and architectural scaling."}
                        </p>
                      </div>

                      <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Academic Status</span>
                          <span className="text-xs font-black text-blue-600 italic">Available Now</span>
                        </div>
                        <div className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10">
                          Explore Course
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
