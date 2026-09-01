import { useEffect } from "react";
import { NavLink } from "react-router-dom";  // ← Link ki jagah NavLink

function Navbar() {
  useEffect(() => {
    const toggleBtn = document.getElementById('ve-toggle');
    const mobileMenu = document.getElementById('ve-mobile-menu');
    const handleToggle = () => mobileMenu.classList.toggle('open');
    if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);

    const header = document.getElementById('ve-sticky');
    const handleScroll = () => {
      header.classList.toggle('sticky', window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (toggleBtn) toggleBtn.removeEventListener('click', handleToggle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    const mobileMenu = document.getElementById('ve-mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  return (
    <header className="ve-header" id="ve-sticky">
      <div className="container-fluid ve-nav-wrap">
        <div className="ve-logo">
          <NavLink to="/">
            <img src="./assets/img/core-img/mp2.png" alt="Mover & Packer Logo" className="ve-logo-icon" />
            <span className="ve-logo-text">Mover<strong>&amp;Packer</strong></span>
          </NavLink>
        </div>

        <nav className="ve-nav">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
                Services
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/post" className={({ isActive }) => isActive ? "active" : ""}>
                Insights
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                Login
              </NavLink>
            </li>

              <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
                Register
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="ve-nav-cta">
          <NavLink to="/contact" className="ve-cta-btn">
            Get Started <i className="fa fa-arrow-right"></i>
          </NavLink>
        </div>

        <button className="ve-toggler" id="ve-toggle">
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="ve-mobile-menu" id="ve-mobile-menu">
        <ul>
          <li><NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMobileMenu}>About</NavLink></li>
          <li><NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink></li>
          <li><NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink></li>
          <li><NavLink to="/register" onClick={closeMobileMenu}>Register</NavLink></li>
        </ul>
      </div>
    </header>
  );
}
export default Navbar;