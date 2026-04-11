import React from 'react';
import { Link } from '@remix-run/react';

export default function Courses() {
  const courses = [
    { title: 'The Complete Salesforce Classic Certification', author: 'Kevin Martin', lessons: 22, duration: '1 hr 17 min', price: '$45.00', img: 'course1.png' },
    { title: 'Foundation Course to Understand Softwere', author: 'Gus Atkinson', lessons: 22, duration: '1 hr 17 min', price: '$45.00', img: 'course2.png' },
    { title: 'Introduction to Web Development with React', author: 'Jessica Brown', lessons: 22, duration: '1 hr 17 min', price: '$45.00', img: 'course3.png' },
    { title: 'Mastering Go Concurrency Patterns', author: 'Serhat Kilbas', lessons: 15, duration: '2 hr 30 min', price: '$55.00', img: 'course4.png' },
    { title: 'Advanced Docker & Kubernetes for DevOps', author: 'David Smith', lessons: 30, duration: '4 hr 10 min', price: '$65.00', img: 'course5.png' },
    { title: 'Full Stack Development with Gin & React', author: 'Emily Davis', lessons: 25, duration: '3 hr 45 min', price: '$50.00', img: 'course6.png' },
  ];

  return (
    <div className="course-area pt-100 pb-100 bg-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-50">
              <div className="flex items-center justify-center mb-4">
                <div className="section-title-shape mr-2">
                  <img src="/lumina-assets/images/resource/section-shape.png" alt="" />
                </div>
                <div className="section-sub-title mb-0">
                  <h4 className="mb-0 text-blue-600">Our Courses</h4>
                </div>
              </div>
              <div className="section-main-title">
                <h2 className="text-slate-900">Explore Professional Courses</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {courses.map((course, i) => (
            <div key={i} className="col-lg-4 col-md-6 mb-30">
              <div className="course-single-box shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden border border-slate-100">
                <div className="course-thumb">
                  <img src={`/lumina-assets/images/course/${course.img}`} alt={course.title} onError={(e) => {
                    (e.target as HTMLImageElement).src = '/lumina-assets/images/course/course1.png';
                  }} />
                  <div className="course-icon">
                    <i className="bi bi-heart"></i>
                  </div>
                  <div className="course-rating">
                    <div className="course-admin">
                      <div className="course-shape-title">
                        <h4 className="text-white">{course.author}</h4>
                      </div>
                    </div>
                    <div className="course-star">
                      <i className="bi bi-star-fill text-yellow-400"></i>
                      <i className="bi bi-star-fill text-yellow-400"></i>
                      <i className="bi bi-star-fill text-yellow-400"></i>
                      <i className="bi bi-star-fill text-yellow-400"></i>
                      <i className="bi bi-star-fill text-yellow-400"></i>
                    </div>
                  </div>
                </div>
                <div className="course-content p-6">
                  <div className="course-meta flex items-center gap-4 text-slate-500 text-sm mb-3">
                    <span className="flex items-center gap-1"><i className="bi bi-book text-blue-600"></i> {course.lessons} Lesson</span>
                    <span className="flex items-center gap-1"><i className="bi bi-clock text-blue-600"></i> {course.duration}</span>
                  </div>
                  <div className="course-title">
                    <h4 className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors mb-4">
                      <Link to="/learning">{course.title}</Link>
                    </h4>
                  </div>
                  <div className="course-bottom flex items-center justify-between border-t border-slate-50 pt-4">
                    <div className="course-price text-2xl font-bold text-blue-600">
                      <span>{course.price}</span>
                    </div>
                    <div className="course-cart">
                      <Link to="/learning" className="text-slate-700 font-semibold hover:text-blue-600 flex items-center gap-1 text-sm">
                        <i className="bi bi-play-fill"></i> Start Learning
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
