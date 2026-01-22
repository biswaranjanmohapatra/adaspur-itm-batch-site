import MainNavbar from '@/components/MainNavbar';
import HeroSection from '@/components/HeroSection';
import TeachersSection from '@/components/TeachersSection';
import BiswaCardSmall from '@/components/BiswaCardSmall';
import BatchBoxes from '@/components/BatchBoxes';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <MainNavbar />
      {/* Add top padding for fixed navbar */}
      <div className="pt-14 md:pt-16">
        <HeroSection />
        <TeachersSection />
        <BiswaCardSmall />
        <BatchBoxes />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
