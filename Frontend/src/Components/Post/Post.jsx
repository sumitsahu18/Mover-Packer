import { useEffect } from "react";
import { Link } from "react-router-dom";


function Post() {
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
      

      {/* Page Hero */}
      <section className="ve-page-hero" style={{ backgroundImage: `url(./assets/img/bg-img/24.jpg)` }}>
        <div className="ve-page-hero-overlay"></div>
        <div className="container ve-page-hero-content">
          <span className="ve-section-tag">Moving Tips & Guides</span>
          <h1>Moving <span>Insights &amp; Expert Tips</span></h1>
          <nav aria-label="breadcrumb">
            <ol className="ve-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li className="active">Insights</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Posts + Sidebar */}
      <section className="ve-section">
        <div className="container">
          <div className="row">

            {/* Posts Grid */}
            <div className="col-12 col-lg-8">
              <div className="row">
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/10.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Home Moving</span>
                      <h5><Link to="/post/1">10 Essential Tips for a Stress-Free Home Relocation</Link></h5>
                      <p>Discover the top strategies our expert packers use to make every home move smooth and damage-free.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> April 26</span>
                        <Link to="/post/1">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/11.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Packing</span>
                      <h5><Link to="/post/2">How to Pack Fragile Items Like a Professional</Link></h5>
                      <p>Learn the right materials and techniques to protect your valuables during transit.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> April 20</span>
                        <Link to="/post/2">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/12.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Office Moving</span>
                      <h5><Link to="/post/3">Office Relocation Checklist — A Complete Guide</Link></h5>
                      <p>The step-by-step checklist that helps businesses relocate with zero productivity loss.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> April 14</span>
                        <Link to="/post/3">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/23.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Interstate Moving</span>
                      <h5><Link to="/post/4">What to Expect During a Long-Distance Move</Link></h5>
                      <p>A practical roadmap for interstate relocation — from booking to final delivery.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> April 8</span>
                        <Link to="/post/4">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="500ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/25.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Storage</span>
                      <h5><Link to="/post/5">When Do You Need Warehouse Storage During a Move?</Link></h5>
                      <p>Find out when temporary storage is the smartest solution for your relocation plan.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> March 30</span>
                        <Link to="/post/5">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 wow fadeInUp" data-wow-delay="600ms">
                  <div className="ve-insight-card">
                    <div className="ve-insight-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/26.jpg)` }}></div>
                    <div className="ve-insight-body">
                      <span className="ve-insight-cat">Vehicle Transport</span>
                      <h5><Link to="/post/6">How to Safely Transport Your Car During Relocation</Link></h5>
                      <p>Expert advice on choosing the right vehicle transportation service for your move.</p>
                      <div className="ve-insight-meta">
                        <span><i className="fa fa-calendar"></i> March 22</span>
                        <Link to="/post/6">Read More <i className="fa fa-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="ve-pagination">
                <Link to="#" className="active">1</Link>
                <Link to="#">2</Link>
                <Link to="#">3</Link>
                <Link to="#"><i className="fa fa-chevron-right"></i></Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-4">
              <div className="ve-sidebar">
                <div className="ve-sidebar-widget">
                  <h5 className="ve-sidebar-title">Search</h5>
                  <div className="ve-search-box">
                    <input type="text" placeholder="Search articles..." />
                    <button><i className="fa fa-search"></i></button>
                  </div>
                </div>
                <div className="ve-sidebar-widget">
                  <h5 className="ve-sidebar-title">Categories</h5>
                  <ul className="ve-cat-list">
                    <li><Link to="#">Home Relocation <span>12</span></Link></li>
                    <li><Link to="#">Office Moving <span>8</span></Link></li>
                    <li><Link to="#">Packing Tips <span>6</span></Link></li>
                    <li><Link to="#">Interstate Moving <span>9</span></Link></li>
                    <li><Link to="#">Storage Solutions <span>5</span></Link></li>
                    <li><Link to="#">Vehicle Transport <span>7</span></Link></li>
                  </ul>
                </div>
                <div className="ve-sidebar-widget">
                  <h5 className="ve-sidebar-title">Recent Posts</h5>
                  <div className="ve-recent-post">
                    <div className="ve-rp-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/10.jpg)` }}></div>
                    <div>
                      <Link to="/post/1">10 Tips for a Stress-Free Home Relocation</Link>
                      <span><i className="fa fa-calendar"></i> April 26</span>
                    </div>
                  </div>
                  <div className="ve-recent-post">
                    <div className="ve-rp-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/11.jpg)` }}></div>
                    <div>
                      <Link to="/post/2">How to Pack Fragile Items Like a Pro</Link>
                      <span><i className="fa fa-calendar"></i> April 20</span>
                    </div>
                  </div>
                  <div className="ve-recent-post">
                    <div className="ve-rp-img bg-img" style={{ backgroundImage: `url(./assets/img/bg-img/12.jpg)` }}></div>
                    <div>
                      <Link to="/post/3">Office Relocation Checklist</Link>
                      <span><i className="fa fa-calendar"></i> April 14</span>
                    </div>
                  </div>
                </div>
                <div className="ve-sidebar-widget">
                  <h5 className="ve-sidebar-title">Popular Tags</h5>
                  <div className="ve-tags">
                    <Link to="#">Packing</Link>
                    <Link to="#">Relocation</Link>
                    <Link to="#">Home Moving</Link>
                    <Link to="#">Storage</Link>
                    <Link to="#">Movers</Link>
                    <Link to="#">Office Shift</Link>
                    <Link to="#">Local Move</Link>
                    <Link to="#">Interstate</Link>
                    <Link to="#">Unpacking</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="ve-newsletter-section">
        <div className="container">
          <div className="ve-newsletter-wrap">
            <div className="ve-nl-left">
              <i className="fa fa-envelope-o"></i>
              <div>
                <h3>Get Moving Tips Delivered to You</h3>
                <p>Weekly packing & relocation guides — straight to your inbox.</p>
              </div>
            </div>
            <div className="ve-nl-right">
              <form className="ve-nl-form" action="#" method="post">
                <input type="email" placeholder="Enter your email address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Post;