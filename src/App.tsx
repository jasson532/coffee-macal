import Header from 'modules/shared/components/organisms/Header';
import Footer from 'modules/shared/components/organisms/Footer';
import WhatsAppButton from 'modules/shared/components/atoms/WhatsAppButton';
import { LandingPage } from 'modules/landing';

export default function App() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
