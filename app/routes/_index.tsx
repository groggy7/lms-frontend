import React, { useEffect } from 'react';
import { Link } from '@remix-run/react';

export default function Home() {
  useEffect(() => {
    // Initialize any jQuery/Carousel plugins here if needed
  }, []);

  return (
    <>
      {/* Start Banner Area */}
      <div className="slider_list">
        <div className="slider-area d-flex align-items-center">
          <div className="slider-shape-area">
            <div className="baner-shape1 bounce-animate">
              <img src="/estudy-assets/images/slider/slider-shape.png" alt="" />
            </div>
            <div className="baner-shape2 bounce-animate">
              <img src="/estudy-assets/images/slider/slider-shape2.png" alt="" />
            </div>
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="slider-content">
                  <div className="slider-sub-title">
                    <h4>100% Satisfaction Guarantee</h4>
                  </div>
                  <div className="slider-main-title">
                    <h1>Learn Skills From Our Top Instructors</h1>
                  </div>
                  <div className="main-btn slider1">
                    <Link to="/courses" className="nest-btn slider1">
                      <span className="nest-btn__shape slider"></span>
                      <span className="nest-btn__shape slider"></span>
                      <span className="nest-btn__shape slider"></span>
                      <span className="nest-btn__shape slider"></span>
                      <span className="nest-btn__text">Our Courses</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="slider-thumb">
                  <img src="/estudy-assets/images/slider/slider-thumb.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Area */}
      <div className="catagories-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="section-title-shape">
                  <img src="/estudy-assets/images/resource/section-shape.png" alt="" />
                </div>
                <div className="section-sub-title">
                  <h4>Browse Categories</h4>
                </div>
                <div className="section-main-title">
                  <h2>Top Courses Categories</h2>
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
                    <img src={`/estudy-assets/images/catagories/${cat.img}`} alt={cat.title} />
                    <div className="catagories-text">
                      <h4>Visit</h4>
                    </div>
                  </div>
                  <div className="catagories-title">
                    <h4><Link to="/courses">{cat.title}</Link></h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="about-area pt-100 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-thumb">
                <img src="/estudy-assets/images/resource/about.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <div className="section-sub-title">
                    <h4>About Our Engine</h4>
                  </div>
                  <div className="section-main-title">
                    <h2>Modern Video Delivery Infrastructure</h2>
                  </div>
                </div>
                <div className="about-text">
                  <p>Our LMS Engine is built for scale, using Go and WebSockets for real-time state management and FFmpeg for adaptive bitrate streaming.</p>
                </div>
                <div className="about-list">
                  <ul>
                    <li><i className="bi bi-check-circle-fill"></i> Chunked Video Uploads</li>
                    <li><i className="bi bi-check-circle-fill"></i> Adaptive HLS Streaming</li>
                    <li><i className="bi bi-check-circle-fill"></i> Real-time Progress Tracking</li>
                    <li><i className="bi bi-check-circle-fill"></i> Dynamic PDF Watermarking</li>
                  </ul>
                </div>
                <div className="main-btn">
                  <Link to="/learning" className="nest-btn">
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__text">Try Learning Engine</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
