import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavbarComponent/Navbar";
import Footer from "../FooterComponent/Footer";
function ServicesC() {
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
      <section className="ve-page-hero" style={{ backgroundImage: `url(./assets/img/bg-img/20.jpg)` }}>
        <div className="ve-page-hero-overlay"></div>
        <div className="container ve-page-hero-content">
          <span className="ve-section-tag">What We Offer</span>
          <h1>Comprehensive <span>Moving & Packing Services</span></h1>
          <nav aria-label="breadcrumb">
            <ol className="ve-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li className="active">Services</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Services Grid */}
      <section className="ve-section">
        <div className="container">
          <div className="ve-section-header text-center">
            <span className="ve-section-tag">Our Expertise</span>
            <h2>Solutions for Every <span>Moving Need</span></h2>
            <p>Whether you're shifting locally or relocating across the country, we have a service designed to make your move seamless and stress-free.</p>
          </div>
          <div className="ve-services-grid">
            <div className="ve-service-card wow fadeInUp" data-wow-delay="100ms">
              <div className="ve-service-icon"><i className="icon-profits"></i></div>
              <h4>Home Relocation</h4>
              <p>We handle your entire household move with care — from packing your belongings safely to delivering them intact at your new home.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
            <div className="ve-service-card wow fadeInUp" data-wow-delay="200ms">
              <div className="ve-service-icon"><i className="icon-money-1"></i></div>
              <h4>Office Relocation</h4>
              <p>Minimize downtime with our efficient office moving solutions — we relocate your workspace swiftly while keeping everything organized.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
            <div className="ve-service-card wow fadeInUp" data-wow-delay="300ms">
              <div className="ve-service-icon"><i className="icon-coin"></i></div>
              <h4>Packing & Unpacking</h4>
              <p>Our trained packers use premium materials to securely wrap and box all your items, and unpack them neatly at your destination.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
            <div className="ve-service-card wow fadeInUp" data-wow-delay="400ms">
              <div className="ve-service-icon"><i className="icon-smartphone-1"></i></div>
              <h4>Loading & Unloading</h4>
              <p>Our skilled crew handles heavy lifting with professional equipment, ensuring zero damage during loading and unloading of your goods.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
            <div className="ve-service-card wow fadeInUp" data-wow-delay="500ms">
              <div className="ve-service-icon"><i className="icon-diamond"></i></div>
              <h4>Interstate Moving</h4>
              <p>Relocating to another state? We manage long-distance moves end-to-end with GPS-tracked vehicles and timely delivery guarantees.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
            <div className="ve-service-card wow fadeInUp" data-wow-delay="600ms">
              <div className="ve-service-icon"><i className="icon-piggy-bank"></i></div>
              <h4>Warehouse & Storage</h4>
              <p>Need temporary storage? Our secure, climate-controlled warehouses keep your belongings safe for as long as you need.</p>
              <Link to="#" className="ve-card-link">Learn more <i className="fa fa-long-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="ve-process-section">
        <div className="container">
          <div className="ve-section-header text-center">
            <span className="ve-section-tag">How It Works</span>
            <h2>Booking Your Move is <span>Simple</span></h2>
          </div>
          <div className="ve-process-grid">
            <div className="ve-process-step wow fadeInUp" data-wow-delay="100ms">
              <div className="ve-process-num">01</div>
              <h5>Request a Quote</h5>
              <p>Share your move details with us and get a free, transparent estimate within hours.</p>
            </div>
            <div className="ve-process-arrow"><i className="fa fa-long-arrow-right"></i></div>
            <div className="ve-process-step wow fadeInUp" data-wow-delay="250ms">
              <div className="ve-process-num">02</div>
              <h5>Pre-Move Survey</h5>
              <p>Our team assesses your inventory, special requirements, and logistics to plan the perfect move.</p>
            </div>
            <div className="ve-process-arrow"><i className="fa fa-long-arrow-right"></i></div>
            <div className="ve-process-step wow fadeInUp" data-wow-delay="400ms">
              <div className="ve-process-num">03</div>
              <h5>Packing & Moving Day</h5>
              <p>Our crew arrives on time, packs everything professionally, and loads your goods with care.</p>
            </div>
            <div className="ve-process-arrow"><i className="fa fa-long-arrow-right"></i></div>
            <div className="ve-process-step wow fadeInUp" data-wow-delay="550ms">
              <div className="ve-process-num">04</div>
              <h5>Safe Delivery</h5>
              <p>We deliver and unpack your belongings at your new location, ensuring everything is in perfect condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ve-section ve-faq-section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-lg-5 wow fadeInLeft" data-wow-delay="100ms">
              <span className="ve-section-tag">Common Questions</span>
              <h2>Frequently Asked <span>Questions</span></h2>
              <p>Can't find what you're looking for? <Link to="/contact" style={{ color: 'var(--ve-gold)' }}>Reach out to us</Link> and we'll respond within 24 hours.</p>
              <Link to="/contact" className="ve-btn-primary mt-30">Contact Our Team</Link>
            </div>
            <div className="col-12 col-lg-7 wow fadeInRight" data-wow-delay="200ms">
              <div className="ve-faq-list">
                <div className="ve-faq-item open">
                  <div className="ve-faq-q"><span>How do I book a move?</span><i className="fa fa-plus"></i></div>
                  <div className="ve-faq-a">Simply request a free quote via our contact page or call us directly. Our team will get back to you within one business day to confirm your booking.</div>
                </div>
                <div className="ve-faq-item">
                  <div className="ve-faq-q"><span>How far in advance should I book?</span><i className="fa fa-plus"></i></div>
                  <div className="ve-faq-a">We recommend booking at least 7–14 days in advance, especially during peak moving seasons. However, we also accommodate last-minute requests based on availability.</div>
                </div>
                <div className="ve-faq-item">
                  <div className="ve-faq-q"><span>Are my belongings insured during the move?</span><i className="fa fa-plus"></i></div>
                  <div className="ve-faq-a">Yes. All shipments are covered under our transit insurance policy. We take full responsibility for your goods from pickup to delivery.</div>
                </div>
                <div className="ve-faq-item">
                  <div className="ve-faq-q"><span>How are your charges calculated?</span><i className="fa fa-plus"></i></div>
                  <div className="ve-faq-a">Our pricing is transparent and based on distance, volume of goods, and services required. There are no hidden charges — what we quote is what you pay.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="ve-cta-banner bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/6.jpg)` }}>
        <div className="ve-cta-overlay"></div>
        <div className="container ve-cta-content">
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <h2>Ready to Plan Your <span>Stress-Free Move?</span></h2>
              <p>Get a free moving estimate from our experts today — no obligations, just honest advice.</p>
            </div>
            <div className="col-12 col-lg-4 text-lg-right">
              <Link to="/contact" className="ve-btn-white">Get Free Estimate</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default ServicesC;