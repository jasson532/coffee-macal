import HeroSection from 'modules/landing/components/organisms/HeroSection';
import AboutSection from 'modules/landing/components/organisms/AboutSection';
import ProductSection from 'modules/landing/components/organisms/ProductSection';
import ContactSection from 'modules/landing/components/organisms/ContactSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ContactSection />
    </main>
  );
}
