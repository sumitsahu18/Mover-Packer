// import react from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer class="ve-footer">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4 mb-50">
            <div class="ve-footer-brand">
              <Link to="./index.html" class="ve-footer-logo">
                <img
                  src="./assets/img/core-img/mp2.png"
                  alt="VaultEdge Logo"
                  class="ve-logo-icon"
                />
                <span class="ve-logo-text">
                  Mover<strong>&Packer</strong>
                </span>
              </Link>
              <p>
                Empowering individuals and businesses with intelligent financial
                strategies since 2012.
              </p>
              <div class="ve-social">
                <Link to="#">
                  <i class="fa fa-facebook"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-twitter"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-linkedin"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-lg-2 mb-50">
            <h5 class="ve-footer-title">Quick Links</h5>
            <ul class="ve-footer-links">
              <li>
                <Link to="./index.html">Home</Link>
              </li>
              <li>
                <Link to="./about.html">About Us</Link>
              </li>
              <li>
                <Link to="./services.html">Services</Link>
              </li>
              <li>
                <Link to="./post.html">Insights</Link>
              </li>
              <li>
                <Link to="./contact.html">Contact</Link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-sm-6 col-lg-3 mb-50">
            <h5 class="ve-footer-title">Our Services</h5>
            <ul class="ve-footer-links">
              <li>
                <Link to="#">Home Relocation</Link>
              </li>
              <li>
                <Link to="#">Office Relocation</Link>
              </li>
              <li>
                <Link to="#">Packeing Service</Link>
              </li>
              <li>
                <Link to="#">Vehicle Transportation</Link>
              </li>
              <li>
                <Link to="#">Interstate Moving</Link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-sm-6 col-lg-3 mb-50">
            <h5 class="ve-footer-title">Get In Touch</h5>
            <ul class="ve-footer-contact">
              <li>
                <i class="fa fa-map-marker"></i> Near Collector,Indore,India
              </li>
              <li>
                <i class="fa fa-phone"></i> +91 353212233
              </li>
              <li>
                <i class="fa fa-envelope"></i> hello@gmail.com
              </li>
              <li>
                <i class="fa fa-clock-o"></i> Mon–sat, 9am – 6pm
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="ve-footer-bottom">
        <div class="container">
          <div class="ve-footer-bottom-inner">
            Copyright &copy; {new Date().getFullYear()} VaultEdge. All Rights
            Reserved{" "}
            <Link
              to="https://github.com/Rabina-Vishwakarma/"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            ></Link>
            <ul>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms of Use</Link>
              </li>
              <li>
                <Link to="#">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
