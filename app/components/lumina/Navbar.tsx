import React from 'react';
import { Link } from '@remix-run/react';
import Logo from '../Logo';

const Navbar: React.FC = () => {
  return (
    <>
      <header className="header-area" id="sticky-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="logo">
                <Link to="/" className="no-underline border-none">
                  <Logo />
                </Link>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="header-menu">
                <ul>
                  <li><Link to="/">Home <i className="bi bi-plus"></i></Link>
                    <div className="sub-menu">
                      <ul>
                        <li><Link to="/">Home </Link></li>
                        <li><Link to="/learning">Learning Platform</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="/courses">Courses <i className="bi bi-plus"></i></Link>
                    <div className="sub-menu">
                      <ul>
                        <li><Link to="/courses">Courses</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><a href="#">Team <i className="bi bi-plus"></i></a>
                    <div className="sub-menu">
                      <ul>
                        <li><Link to="/">Our Team</Link></li>
                        <li><Link to="/">Team Details</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><a href="#">Pages <i className="bi bi-plus"></i></a>
                    <div className="sub-menu">
                      <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/learning">Learning Engine</Link></li>
                        <li><Link to="/learning?tab=dashboard">Admin Dashboard</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><a href="#">Blog <i className="bi bi-plus"></i></a>
                    <div className="sub-menu">
                      <ul>
                        <li><Link to="/">Latest Blog</Link></li>
                        <li><Link to="/">Blog Details</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="/contact">Contacts</Link></li>
                  <li><Link className="handbag" to="#"><i className="bi bi-cart-fill"></i></Link></li>
                  <li><Link className="user" to="/learning?tab=dashboard"><i className="bi bi-person-fill"></i></Link></li>
                </ul>
                <div className="main-btn">
                  <Link to="/learning" className="nest-btn">
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__shape"></span>
                    <span className="nest-btn__text">Get Started</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Lumina Mobile Menu Area */}
      <div className="mobile-menu-area sticky-menu" id="navbar">
        <div className="mobile-menu">
          <div className="mobile-logo">
            <Link to="/" className="no-underline">
              <Logo size={32} />
            </Link>
          </div>
          <div className="side-menu-info">
            <div className="sidebar-menu">
              <a className="navSidebar-button" href="#"><i className="bi bi-justify-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
