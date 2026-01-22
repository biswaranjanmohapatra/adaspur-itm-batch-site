import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TeachersSection from '@/components/TeachersSection';
import BiswaCard from '@/components/BiswaCard';
import BatchSection from '@/components/BatchSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, studentInfo, isLoading } = useAuth();
  
  // Check if user is logged in with valid batch
  const isAuthenticated = user && studentInfo && studentInfo.batch_id;

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TeachersSection />
      <BiswaCard />
      {/* BatchSection only visible to logged-in users with valid batch */}
      {isAuthenticated && <BatchSection />}
      <Footer />
    </div>
  );
};

export default Index;
