import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { batches } from '@/data/students';
import StudentCard from '@/components/StudentCard';
import DashboardNavbar from '@/components/DashboardNavbar';
import BatchMemoriesGallery from '@/components/BatchMemoriesGallery';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  GraduationCap,
  Bell
} from 'lucide-react';

interface BatchMessage {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, studentInfo, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [batchMessages, setBatchMessages] = useState<BatchMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (studentInfo?.batch_id || isAdmin) {
      fetchBatchMessages();
    }
  }, [studentInfo, isAdmin]);

  const fetchBatchMessages = async () => {
    setLoadingMessages(true);
    const { data, error } = await supabase
      .from('batch_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBatchMessages(data);
    }
    setLoadingMessages(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-cream flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <GraduationCap className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  // Get batch data for the student
  const currentBatch = batches.find(b => b.id === studentInfo?.batch_id);
  const batchStudents = currentBatch?.students || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-cream">
      {/* Navbar - Only shown on dashboard */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                    Welcome, {studentInfo?.student_name || 'Student'}! 👋
                  </h2>
                  <p className="text-muted-foreground">
                    Registration: <span className="font-medium text-foreground">{studentInfo?.registration_number}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 border border-secondary/20">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Batch: {currentBatch?.years || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="border-secondary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{batchStudents.length}</p>
                <p className="text-sm text-muted-foreground">Batch Mates</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{batchMessages.length}</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{currentBatch?.name || 'ITM'}</p>
                <p className="text-sm text-muted-foreground">Your Batch</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Batch Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Batch Messages & Notices
              </CardTitle>
              <CardDescription>
                Important updates for your batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading messages...
                </div>
              ) : batchMessages.length > 0 ? (
                <div className="space-y-4">
                  {batchMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-cream to-white rounded-lg border border-secondary/10"
                    >
                      <h4 className="font-medium text-foreground mb-1">{message.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No messages yet for your batch</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Batch Mates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Your Batch Mates
              </CardTitle>
              <CardDescription>
                Students from {currentBatch?.years || 'your batch'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {batchStudents.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {batchStudents.map((student, index) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      index={index}
                      batchYears={currentBatch?.years}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No student data available for your batch yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Batch Memories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BatchMemoriesGallery 
            batchId={studentInfo?.batch_id || ''} 
            batchYears={currentBatch?.years || ''} 
          />
        </motion.div>
      </main>
    </div>
  );
}
