import React from 'react';

export default function Contact() {
  return (
    <div className="contact-area pb-100 bg-white min-h-screen">
      <div className="container pt-16">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-50">
              <div className="flex items-center justify-center mb-4">
                <div className="section-title-shape mr-2">
                  <img src="/lumina-assets/images/resource/section-shape.png" alt="" />
                </div>
                <div className="section-sub-title mb-0">
                  <h4 className="mb-0">Contact Us</h4>
                </div>
              </div>
              <div className="section-main-title">
                <h2>Get In Touch With Us</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="contact-thumb">
              <img src="/lumina-assets/images/resource/contact.png" alt="" onError={(e) => {
                (e.target as HTMLImageElement).src = '/lumina-assets/images/resource/about.png';
              }} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-form-box">
              <form action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="from-box">
                      <input type="text" placeholder="Your Name" required />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="from-box">
                      <input type="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="from-box">
                      <input type="text" placeholder="Subject" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="from-box">
                      <textarea name="message" placeholder="Message" required></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-btn">
                      <button type="submit" className="nest-btn">
                        <span className="nest-btn__shape"></span>
                        <span className="nest-btn__shape"></span>
                        <span className="nest-btn__shape"></span>
                        <span className="nest-btn__shape"></span>
                        <span className="nest-btn__text">Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
