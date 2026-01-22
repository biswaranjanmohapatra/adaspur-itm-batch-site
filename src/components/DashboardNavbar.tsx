import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, User, Home, GraduationCap } from 'lucide-react';
import logo from '@/assets/logo.jpg';

export default function DashboardNavbar() {
  const { user, studentInfo, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-secondary/20 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
            <img
              src={logo}
              alt="ITM Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif font-bold text-primary">ITM Batch Portal</h1>
            <p className="text-xs text-muted-foreground">
              {studentInfo ? `Batch ${studentInfo.batch_id.replace('-', ' - ')}` : 'Welcome'}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin')}
              className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{studentInfo?.student_name || user?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
