import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TeachersSection from '@/components/TeachersSection';
import BatchSection from '@/components/BatchSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TeachersSection />
      <BatchSection />
      <Footer />
    </div>
  );
};

export default Index;
