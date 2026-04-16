import React from 'react';
import { Link } from '@remix-run/react';
import Logo from '../Logo';

const Footer: React.FC = () => {
  return (
    <div className="footer-area pb-20">
      <div className="container">
        <div className="footer-shape1 bounce-animate-slow">
          <img src="/lumina-assets/images/footer/footer-shape-1.png" alt="" />
        </div>
        <div className="footer-shape2 bounce-animate-slow">
          <img src="/lumina-assets/images/footer/footer-shape-2.png" alt="" />
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-wiget">
              <div className="footer-wiget-logo">
                <Link to="/" className="no-underline">
                  <Logo textColor="text-white" />
                </Link>
              </div>
              <div className="footer-wiget-text">
                <h4>Empowering students worldwide through our high-concurrency video delivery infrastructure.</h4>
              </div>
              <div className="footer-socilal-title">
                <h4>Follow us on</h4>
              </div>
              <div className="footer-social">
                <ul>
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-vimeo-v"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-wiget">
              <div className="footer-wiget-title">
                <h4>Quick Links</h4>
              </div>
              <div className="footer-wiget-menu">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/courses">Courses</Link></li>
                  <li><Link to="/course/go-concurrency">Learning Platform</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-wiget">
              <div className="footer-wiget-title">
                <h4>Get In Touch</h4>
              </div>
              <div className="footer-wiget-touch">
                <ul>
                  <li>
                    <div className="icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="title">
                      <h6>Address</h6>
                    </div>
                    <div className="adress">
                      <a href="#">244, First Floor, Los Angeles</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="bi bi-telephone-plus-fill"></i>
                    </div>
                    <div className="title">
                      <h6>Phone</h6>
                    </div>
                    <div className="adress">
                      <a href="#">(+01) 123 456 7890</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="title">
                      <h6>Email</h6>
                    </div>
                    <div className="adress">
                      <a href="#">info@lumina-learning.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-wiget">
              <div className="footer-wiget-title">
                <h4>Stay Updated</h4>
              </div>
              <div className="footer-newsletter-text mb-4">
                <p className="text-white/60 text-sm">Subscribe to receive technical bulletins and new course alerts.</p>
              </div>
              <div className="footer-newsletter-form relative">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90">
          <div className="col-lg-6 col-md-12">
            <div className="copyright-text">
              <p>© 2026 | All rights reserved by <Link to="/">Lumina Learning</Link></p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="footer-privacy-menu">
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
