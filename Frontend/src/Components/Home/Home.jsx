import CTABanner from "../CTAbannerComponent/CTABanner";
import Footer from "../FooterComponent/Footer";

import Hero from "../HeroComponent/Hero";
import Navbar from "../NavbarComponent/Navbar";
import Services from "../ServiceComponent/Services";
import Testimonials from "../TestimonialsComponent/Testimonials";
import Trustbar from "../TrustbarComponent/Trustbar";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trustbar />
      <Services />
      <Testimonials />
      <CTABanner />
      <Footer />
      
    </>
  );
}
 export default Home
