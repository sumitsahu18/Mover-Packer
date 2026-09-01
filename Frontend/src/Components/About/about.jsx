import { useEffect } from "react";

import { Link } from "react-router-dom";
import Navbar from "../NavbarComponent/Navbar";
import Footer from "../FooterComponent/Footer";
function About() {
  useEffect(() => {
    // Preloader hide karo
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
    // WOW.js animations
    if (window.WOW) new window.WOW().init();
  }, []);

  return (
    <>
    <Navbar />
      <section
        className="ve-page-hero"
        style={{ backgroundImage: `url(./assets/img/bg-img/13.jpg)` }}
      >
        <div className="ve-page-hero-overlay"></div>
        <div className="container ve-page-hero-content">
          <span className="ve-section-tag">Our Story</span>
          <h1>
            Building Trust Since <span>2012</span>
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="ve-breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">About Us</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="ve-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-12 col-lg-6 wow fadeInLeft"
              data-wow-delay="100ms"
            >
              <div className="ve-about-img-stack">
                <div
                  className="ve-about-img-1 bg-img"
                  style={{
                    backgroundImage: `url(./assets/img/bg-img/mpa2.jpg)`,
                  }}
                ></div>
                <div
                  className="ve-about-img-2 bg-img"
                  style={{
                    backgroundImage: `url(./assets/img/bg-img/mpa.jpg)`,
                  }}
                ></div>
                <div className="ve-about-ribbon">
                  <strong>12+</strong>
                  <span>Years of Trust</span>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-lg-6 wow fadeInRight"
              data-wow-delay="200ms"
            >
              <div className="ve-about-text">
                <span className="ve-section-tag">Who We Are</span>
                <h2>
                  A Firm Built on <span>Integrity</span> &amp; Results
                </h2>
                <p className="ve-lead">
                  We are a dedicated team of experienced movers and packing
                  specialists committed to making every relocation smooth, safe,
                  and stress-free for individuals, families, and businesses.
                </p>
                <p>
                  Founded with a mission to provide reliable and affordable
                  moving services, we focus on delivering customer satisfaction
                  through careful handling, timely transportation, and
                  professional support.
                </p>
                <div className="ve-about-features">
                  <div className="ve-af-item">
                    <i className="fa fa-check"></i>
                    <span>Professional Packing & Unpacking Services</span>
                  </div>
                  <div className="ve-af-item">
                    <i className="fa fa-check"></i>
                    <span>Residential & Commercial Relocation</span>
                  </div>
                  <div className="ve-af-item">
                    <i className="fa fa-check"></i>
                    <span>Safe & Secure Transportation</span>
                  </div>
                  <div className="ve-af-item">
                    <i className="fa fa-check"></i>
                    <span>Trained and Experienced Moving Team</span>
                  </div>
                </div>
                <Link to="/services" className="ve-btn-primary mt-30">
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ve-mvv-section">
        <div className="container">
          <div className="ve-section-header text-center">
            <span className="ve-section-tag">Our Foundation</span>
            <h2>
              Mission, Vision &amp; <span>Values</span>
            </h2>
          </div>
          <div className="ve-mvv-grid">
            <div className="ve-mvv-card wow fadeInUp" data-wow-delay="100ms">
              <div className="ve-mvv-icon">
                <i className="fa fa-bullseye"></i>
              </div>
              <h4>Our Mission</h4>
              <p>
                To make every move safe, smooth, and worry-free by delivering
                trusted packing and moving solutions with professionalism, care,
                and customer satisfaction at the heart of everything we do.
              </p>
            </div>
            <div className="ve-mvv-card wow fadeInUp" data-wow-delay="250ms">
              <div className="ve-mvv-icon">
                <i className="fa fa-eye"></i>
              </div>
              <h4>Our Vision</h4>
              <p>
                To become the most trusted and preferred moving and packing
                company, recognized for delivering safe, reliable, and
                customer-focused relocation services with excellence and
                professionalism.
              </p>
            </div>
            <div className="ve-mvv-card wow fadeInUp" data-wow-delay="400ms">
              <div className="ve-mvv-icon">
                <i className="fa fa-heart"></i>
              </div>
              <h4>Our Values</h4>
              <p>
                We believe in honesty, reliability, and customer-first service.
                Every move is handled with care, professionalism, and
                transparency, ensuring that our clients receive safe, timely,
                and stress-free relocation solutions they can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ve-section ve-team-section">
        <div className="container">
          <div className="ve-section-header text-center">
            <span className="ve-section-tag">Meet the Experts</span>
            <h2>
              Our Leadership <span>Team</span>
            </h2>
            <p>
              Our leadership team brings years of experience in the moving and
              packing industry, guiding every project with professionalism,
              careful planning, and a commitment to customer satisfaction.
            </p>
          </div>
          <div className="row">
            <div
              className="col-12 col-sm-6 col-lg-3 wow fadeInUp"
              data-wow-delay="100ms"
            >
              <div className="ve-team-card">
                <div
                  className="ve-team-img bg-img"
                  style={{ backgroundImage: `url(./assets/img/bg-img/15.jpg)` }}
                ></div>
                <div className="ve-team-info">
                  <h5>Jordan Hayes</h5>
                  <span>Chief Executive Officer</span>
                  <div className="ve-team-social">
                    <Link to="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 wow fadeInUp"
              data-wow-delay="200ms"
            >
              <div className="ve-team-card">
                <div
                  className="ve-team-img bg-img"
                  style={{ backgroundImage: `url(./assets/img/bg-img/16.jpg)` }}
                ></div>
                <div className="ve-team-info">
                  <h5>Taylor Brooks</h5>
                  <span>Operations Manager</span>
                  <div className="ve-team-social">
                    <Link to="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="ve-team-card">
                <div
                  className="ve-team-img bg-img"
                  style={{ backgroundImage: `url(./assets/img/bg-img/17.jpg)` }}
                ></div>
                <div className="ve-team-info">
                  <h5>Morgan Lane</h5>
                  <span>Logistics Manager</span>
                  <div className="ve-team-social">
                    <Link to="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 wow fadeInUp"
              data-wow-delay="400ms"
            >
              <div className="ve-team-card">
                <div
                  className="ve-team-img bg-img"
                  style={{ backgroundImage: `url(./assets/img/bg-img/18.jpg)` }}
                ></div>
                <div className="ve-team-info">
                  <h5>Casey Rivera</h5>
                  <span>Relocation Specialist</span>
                  <div className="ve-team-social">
                    <Link to="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ve-newsletter-section">
        <div className="container">
          <div className="ve-newsletter-wrap">
            <div className="ve-nl-left">
              <i className="fa fa-envelope-o"></i>
              <div>
                <h3>Make Your Move Easy & Stress-Free</h3>
                <p>
                  Get expert packing tips, moving guides, and exclusive
                  discounts on our services.
                </p>
              </div>
            </div>
            <div className="ve-nl-right">
              <form className="ve-nl-form" action="#" method="post">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
     <Footer />
    </>
  );
}
export default About;
