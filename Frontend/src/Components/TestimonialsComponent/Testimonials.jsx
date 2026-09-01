// import react from 'react';

function Testimonials(){
    return (
          <section class="ve-section ve-testimonials-section">
        <div class="container">
            <div class="ve-section-header text-center">
                <span class="ve-section-tag">Client Stories</span>
                <h2>What Our Clients <span>Say</span></h2>
            </div>
            <div class="ve-testi-grid">
                <div class="ve-testi-card wow fadeInUp" data-wow-delay="100ms">
                    <div class="ve-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p>The team handled our home shifting with great care. Everything arrived safely and on time. Highly recommended</p>
                    <div class="ve-testi-author">
                        <div class="ve-testi-avatar bg-img" style={{ backgroundImage: "url(img/bg-img/32.jpg)" }}></div>
                        <div><strong>Alex Morgan</strong></div>
                    </div>
                </div>
                <div class="ve-testi-card wow fadeInUp" data-wow-delay="250ms">
                    <div class="ve-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p>Our office relocation was completed smoothly without any disruption. Professional staff and excellent service.</p>
                    <div class="ve-testi-author">
                        <div class="ve-testi-avatar bg-img"style={{ backgroundImage: "url(img/bg-img/33.jpg)" }}></div>
                        <div><strong>Sarah Patel</strong></div>
                    </div>
                </div>
                <div class="ve-testi-card wow fadeInUp" data-wow-delay="400ms">
                    <div class="ve-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p>From packing to delivery, the entire process was stress-free. The staff was polite and very careful with our belongings.</p>
                    <div class="ve-testi-author">
                        <div class="ve-testi-avatar bg-img" style={{backgroundImage: "url(img/bg-img/14.jpg)"}}></div>
                        <div><strong>James Liu</strong></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default Testimonials;