import HeroSection from '@/components/HeroSection';
import TeachersSection from '@/components/TeachersSection';
import BiswaCard from '@/components/BiswaCard';
import BatchBoxes from '@/components/BatchBoxes';
import Footer from '@/components/Footer';

const Index = () => {
  // Main page: No navbar, show Biswa Card + Batch boxes only
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TeachersSection />
      <BiswaCard />
      <BatchBoxes />
      <Footer />
    </div>
  );
};

export default Index;
