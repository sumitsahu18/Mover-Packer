import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavbarComponent/Navbar";
import Footer from "../FooterComponent/Footer";
function Contact() {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
    if (window.WOW) new window.WOW().init();
  }, []);

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="ve-page-hero" style={{ backgroundImage: `url(./assets/img/bg-img/22.jpg)` }}>
        <div className="ve-page-hero-overlay"></div>
        <div className="container ve-page-hero-content">
          <span className="ve-section-tag">Get In Touch</span>
          <h1>We'd Love to <span>Help You Move</span></h1>
          <nav aria-label="breadcrumb">
            <ol className="ve-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li className="active">Contact</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="ve-contact-cards-section">
        <div className="container">
          <div className="ve-contact-cards-grid">
            <div className="ve-contact-info-card wow fadeInUp" data-wow-delay="100ms">
              <div className="ve-ci-icon"><i className="fa fa-map-marker"></i></div>
              <h5>Our Office</h5>
              <p>Near Collector, Indore, India</p>
            </div>
            <div className="ve-contact-info-card wow fadeInUp" data-wow-delay="250ms">
              <div className="ve-ci-icon"><i className="fa fa-phone"></i></div>
              <h5>Call Us</h5>
              <p>+91 353212233<br /><small>Mon–Sat, 9am – 6pm</small></p>
            </div>
            <div className="ve-contact-info-card wow fadeInUp" data-wow-delay="400ms">
              <div className="ve-ci-icon"><i className="fa fa-envelope"></i></div>
              <h5>Email Us</h5>
              <p>hello@gmail.com<br /><small>We reply within 24 hours</small></p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Aside */}
      <section className="ve-section ve-contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7 wow fadeInLeft" data-wow-delay="100ms">
              <div className="ve-contact-form-wrap">
                <span className="ve-section-tag">Request a Quote</span>
                <h2>Book a <span>Free Moving Estimate</span></h2>
                <p>Fill in the form and one of our relocation experts will contact you within one business day.</p>
                <form className="ve-contact-form" action="#" method="post">
                  <div className="ve-form-row">
                    <div className="ve-form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="Your full name" required />
                    </div>
                    <div className="ve-form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  <div className="ve-form-row">
                    <div className="ve-form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="Your phone" />
                    </div>
                    <div className="ve-form-group">
                      <label>Service Interested In</label>
                      <select>
                        <option>Select a service</option>
                        <option>Home Relocation</option>
                        <option>Office Relocation</option>
                        <option>Packing &amp; Unpacking</option>
                        <option>Loading &amp; Unloading</option>
                        <option>Interstate Moving</option>
                        <option>Warehouse &amp; Storage</option>
                        <option>Vehicle Transportation</option>
                      </select>
                    </div>
                  </div>
                  <div className="ve-form-group">
                    <label>Your Message</label>
                    <textarea rows="5" placeholder="Tell us about your moving requirements, pickup location, destination, and preferred date..."></textarea>
                  </div>
                  <button type="submit" className="ve-btn-primary">
                    Send Message <i className="fa fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-5 wow fadeInRight" data-wow-delay="200ms">
              <div className="ve-contact-aside">
                <div className="ve-ca-box">
                  <h4>Why Customers Trust Us</h4>
                  <ul className="ve-ca-list">
                    <li><i className="fa fa-check-circle"></i> Free moving estimate — no obligations</li>
                    <li><i className="fa fa-check-circle"></i> Response within 24 hours</li>
                    <li><i className="fa fa-check-circle"></i> Transparent pricing, no hidden charges</li>
                    <li><i className="fa fa-check-circle"></i> Trained and verified packing professionals</li>
                    <li><i className="fa fa-check-circle"></i> GPS tracked vehicles for safe delivery</li>
                    <li><i className="fa fa-check-circle"></i> Full transit insurance coverage</li>
                  </ul>
                </div>
                <div className="ve-ca-hours">
                  <h5><i className="fa fa-clock-o"></i> Working Hours</h5>
                  <ul>
                    <li><span>Monday – Friday</span><strong>9:00 AM – 6:00 PM</strong></li>
                    <li><span>Saturday</span><strong>10:00 AM – 2:00 PM</strong></li>
                    <li><span>Sunday</span><strong>Closed</strong></li>
                  </ul>
                </div>
                <div className="ve-ca-social">
                  <h5>Connect With Us</h5>
                  <div className="ve-social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;