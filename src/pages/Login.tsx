import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { normalizeRegistrationNumber, validateRegistrationNumber } from '@/lib/registrationValidation';
import logo from '@/assets/logo.jpg';

export default function Login() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const normalizedRegNumber = normalizeRegistrationNumber(registrationNumber);
      
      // Validate registration number format
      const validation = validateRegistrationNumber(normalizedRegNumber);
      if (!validation.valid) {
        setError(validation.error || 'Invalid registration number');
        setIsLoading(false);
        return;
      }

      // Look up email by registration number
      const { data: studentData, error: lookupError } = await supabase
        .from('registered_students')
        .select('email')
        .eq('registration_number', normalizedRegNumber)
        .maybeSingle();

      if (lookupError) {
        setError('Error looking up registration. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!studentData || !studentData.email) {
        setError('Registration number not found. Please register first.');
        setIsLoading(false);
        return;
      }

      // Sign in with the found email
      const { error: signInError } = await signIn(studentData.email, password);
      
      if (signInError) {
        setError('Invalid password. Please try again.');
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials. Please check your password.',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-cream flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-secondary/20 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mx-auto">
                <img
                  src={logo}
                  alt="ITM Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-serif text-primary">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in with your registration number
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  type="text"
                  placeholder="e.g., UNITM210001"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                  required
                  className="border-secondary/30 focus:border-primary uppercase"
                />
                <p className="text-xs text-muted-foreground">
                  Format: UNITM21XXXX (e.g., UNITM210001 for Batch 2021-2024)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-secondary/30 focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </motion.div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
