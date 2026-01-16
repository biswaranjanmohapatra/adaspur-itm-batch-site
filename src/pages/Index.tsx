import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TeachersSection from '@/components/TeachersSection';
import StudentsSection from '@/components/StudentsSection';
import MemoriesSection from '@/components/MemoriesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TeachersSection />
      <StudentsSection />
      <MemoriesSection />
      <Footer />
    </div>
  );
};

export default Index;
