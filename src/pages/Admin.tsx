import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { batches } from '@/data/students';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Users, 
  MessageSquare, 
  Plus,
  Trash2,
  Edit,
  GraduationCap,
  Shield,
  Send
} from 'lucide-react';
import logo from '@/assets/logo.jpg';

interface RegisteredStudent {
  id: string;
  registration_number: string;
  student_name: string;
  batch_id: string;
  user_id: string | null;
  created_at: string;
}

interface BatchMessage {
  id: string;
  batch_id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [messages, setMessages] = useState<BatchMessage[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // New message form
  const [newMessage, setNewMessage] = useState({
    batch_id: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
        });
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    
    // Fetch all students
    const { data: studentsData } = await supabase
      .from('registered_students')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentsData) {
      setStudents(studentsData);
    }

    // Fetch all messages
    const { data: messagesData } = await supabase
      .from('batch_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (messagesData) {
      setMessages(messagesData);
    }

    setLoadingData(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.batch_id || !newMessage.title || !newMessage.content) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill all fields',
      });
      return;
    }

    const { error } = await supabase
      .from('batch_messages')
      .insert({
        batch_id: newMessage.batch_id,
        title: newMessage.title,
        content: newMessage.content,
        created_by: user?.id,
      });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message',
      });
    } else {
      toast({
        title: 'Message Sent',
        description: 'Batch message has been posted successfully.',
      });
      setNewMessage({ batch_id: '', title: '', content: '' });
      fetchData();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('batch_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete message',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Message has been removed.',
      });
      fetchData();
    }
  };

  const handleDeleteStudent = async (id: string) => {
    const { error } = await supabase
      .from('registered_students')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete student',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Student record has been removed.',
      });
      fetchData();
    }
  };

  if (isLoading || loadingData) {
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

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-secondary/20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
              <img
                src={logo}
                alt="ITM Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-primary flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground">Manage students and messages</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            {/* New Message Form */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Post New Message
                </CardTitle>
                <CardDescription>
                  Send a message to a specific batch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Batch</Label>
                      <Select
                        value={newMessage.batch_id}
                        onValueChange={(value) => setNewMessage(prev => ({ ...prev, batch_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batches.map((batch) => (
                            <SelectItem key={batch.id} value={batch.id}>
                              {batch.years}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={newMessage.title}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Message title"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={newMessage.content}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your message here..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Messages List */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
                <CardDescription>
                  {messages.length} message(s) posted
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 bg-gradient-to-r from-cream to-white rounded-lg border border-secondary/10 flex justify-between items-start gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {message.batch_id}
                            </span>
                          </div>
                          <h4 className="font-medium text-foreground">{message.title}</h4>
                          <p className="text-sm text-muted-foreground">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No messages yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle>Registered Students</CardTitle>
                <CardDescription>
                  {students.length} student(s) registered
                </CardDescription>
              </CardHeader>
              <CardContent>
                {students.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Registration No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Batch</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-mono text-sm">
                              {student.registration_number}
                            </TableCell>
                            <TableCell>{student.student_name}</TableCell>
                            <TableCell>
                              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                                {student.batch_id}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {new Date(student.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteStudent(student.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No registered students yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
