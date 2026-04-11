import React from 'react';
import { Link } from '@remix-run/react';
import AboutIllustration from '../components/AboutIllustration';

export default function Home() {
  return (
    <>
      {/* Start Banner Area */}
      <div className="banner-area">
        <div className="slider_list">
          <div className="slider-area d-flex align-items-center" style={{ backgroundColor: '#001a33', minHeight: '550px' }}>
            <div className="slider-shape-area">
              <div className="baner-shape1 bounce-animate">
                <img src="/lumina-assets/images/slider/slider-shape.png" alt="" />
              </div>
              <div className="baner-shape2 bounce-animate">
                <img src="/lumina-assets/images/slider/slider-shape2.png" alt="" />
              </div>
            </div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="slider-content">
                    <div className="slider-sub-title">
                      <h4 className="text-blue-400">100% Satisfaction Guarantee</h4>
                    </div>
                    <div className="slider-main-title">
                      <h1 className="text-white">Learn Skills From Our Top Instructors</h1>
                    </div>
                    <div className="main-btn slider1 mt-4">
                      <Link to="/auth" className="nest-btn slider1">
                        <span className="nest-btn__shape slider"></span>
                        <span className="nest-btn__shape slider"></span>
                        <span className="nest-btn__shape slider"></span>
                        <span className="nest-btn__shape slider"></span>
                        <span className="nest-btn__text">Get Started</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="slider-thumb">
                    <img src="/lumina-assets/images/slider/slider-thumb.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Area */}
      <div className="catagories-area pt-100 pb-100 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="flex items-center mb-4">
                  <div className="section-title-shape mr-2">
                    <img src="/lumina-assets/images/resource/section-shape.png" alt="" />
                  </div>
                  <div className="section-sub-title mb-0">
                    <h4 className="mb-0 text-blue-600">Browse Categories</h4>
                  </div>
                </div>
                <div className="section-main-title">
                  <h2 className="text-slate-900">Top Courses Categories</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {[
              { title: 'Online Course', img: 'catagories1.png' },
              { title: 'Web Design', img: 'catagories2.png' },
              { title: 'Graphic Design', img: 'catagories3.png' },
              { title: 'Art & Humanities', img: 'catagories4.png' },
              { title: 'Mobile Application', img: 'catagories5.png' },
              { title: 'Development', img: 'catagories6.png' },
            ].map((cat, i) => (
              <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                <div className="catagories-single-box">
                  <div className="catagories-thumb">
                    <img src={`/lumina-assets/images/catagories/${cat.img}`} alt={cat.title} />
                    <div className="catagories-text">
                      <h4>Visit</h4>
                    </div>
                  </div>
                  <div className="catagories-title">
                    <h4><Link to="/courses" className="text-slate-800 hover:text-blue-600">{cat.title}</Link></h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Area */}
      <div className="about-area pt-100 pb-100 bg-slate-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-thumb relative">
                <AboutIllustration />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content pl-lg-10">
                <div className="section-title">
                  <div className="flex items-center mb-4">
                    <div className="section-title-shape mr-2">
                      <img src="/lumina-assets/images/resource/section-shape.png" alt="" />
                    </div>
                    <div className="section-sub-title mb-0">
                      <h4 className="mb-0 text-blue-600">About Lumina</h4>
                    </div>
                  </div>
                  <div className="section-main-title">
                    <h2 className="text-slate-900 leading-tight">We Are Expert In Education Learning & LMS</h2>
                  </div>
                </div>
                <div className="about-text mt-6">
                  <p className="text-slate-600 text-lg">Lumina leverages cutting-edge technology including Go, FFmpeg, and WebSockets to deliver a high-concurrency, real-time learning experience.</p>
                </div>
                <div className="about-list mt-8">
                  <ul className="space-y-4">
                    <li className="text-slate-700 flex items-center gap-3"><i className="bi bi-check-circle-fill text-blue-600 text-xl"></i> <span>Professional & Experienced Instructors</span></li>
                    <li className="text-slate-700 flex items-center gap-3"><i className="bi bi-check-circle-fill text-blue-600 text-xl"></i> <span>Real-time Video Progress Sync</span></li>
                    <li className="text-slate-700 flex items-center gap-3"><i className="bi bi-check-circle-fill text-blue-600 text-xl"></i> <span>Dynamic PDF Watermarking System</span></li>
                    <li className="text-slate-700 flex items-center gap-3"><i className="bi bi-check-circle-fill text-blue-600 text-xl"></i> <span>Adaptive HLS Video Streaming</span></li>
                  </ul>
                </div>
                <div className="main-btn mt-10">
                  <Link to="/auth" className="nest-btn px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-semibold text-center inline-block">
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area */}
      <div className="counter-area py-20 bg-white">
        <div className="container">
          <div className="row">
            {[
              { count: '30', label: 'Expert Instructors', icon: 'flaticon-graduation-cap' },
              { count: '120', label: 'Online Courses', icon: 'flaticon-book' },
              { count: '250', label: 'Students Learning', icon: 'flaticon-user' },
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
    </>
  );
}
