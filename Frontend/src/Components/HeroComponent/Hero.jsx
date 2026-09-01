import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="ve-hero">

      <div className="ve-hero-left">
        <span className="ve-hero-badge">Trusted Since 2012 &nbsp;·&nbsp; 50,000+ Clients</span>
        <h1>We Pack <span className="ve-highlight">We Move</span><br /> <span>We Deliver</span></h1>
        <p>Experience smooth and affordable relocation services backed by trained professionals and modern transport solutions.</p>
        <div className="ve-hero-btns">
          <Link to="/services" className="ve-btn-primary">Explore Services</Link>
          <Link to="/about" className="ve-btn-ghost">Learn More</Link>
        </div>

        <div className="ve-hero-stats">
          <div className="ve-stat">
            <strong>4.2L+</strong>
            <span>Items Moved</span>
          </div>
          <div className="ve-stat-divider"></div>
          <div className="ve-stat">
            <strong>97%</strong>
            <span>Client Satisfaction</span>
          </div>
          <div className="ve-stat-divider"></div>
          <div className="ve-stat">
            <strong>12+</strong>
            <span>Years Experience</span>
          </div>
        </div>
      </div>

      {/* Video — autoPlay aur playsInline camelCase mein */}
      <div className="ve-hero-right">
        <video autoPlay muted loop playsInline className="ve-hero-video">
          <source src="./assets/video/1.mp4" type="video/mp4" />
        </video>
      </div>

    </section>
  );
}

export default Hero;