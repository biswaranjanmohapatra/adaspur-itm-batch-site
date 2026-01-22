import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateRegistrationNumber, normalizeRegistrationNumber } from '@/lib/registrationValidation';
import logo from '@/assets/logo.jpg';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
    studentName: '',
    mobileNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-detect batch from registration number
  const detectedBatch = useMemo(() => {
    if (!formData.registrationNumber) return null;
    const normalized = normalizeRegistrationNumber(formData.registrationNumber);
    const validation = validateRegistrationNumber(normalized);
    return validation.valid ? validation.batch : null;
  }, [formData.registrationNumber]);

  const registrationValidation = useMemo(() => {
    if (!formData.registrationNumber) return null;
    const normalized = normalizeRegistrationNumber(formData.registrationNumber);
    return validateRegistrationNumber(normalized);
  }, [formData.registrationNumber]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    const normalized = normalizeRegistrationNumber(formData.registrationNumber);
    const validation = validateRegistrationNumber(normalized);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid registration number');
      return false;
    }
    if (!formData.studentName.trim()) {
      setError('Student name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const normalizedRegNumber = normalizeRegistrationNumber(formData.registrationNumber);
      const batchId = detectedBatch?.batchId || '';

      const { error } = await signUp(
        formData.email,
        formData.password,
        normalizedRegNumber,
        formData.studentName,
        batchId,
        formData.mobileNumber.trim()
      );

      if (error) {
        if (error.message?.includes('already registered')) {
          setError('This email is already registered. Please login instead.');
        } else if (error.message?.includes('registration_number')) {
          setError('This registration number is already in use.');
        } else {
          setError(error.message || 'Registration failed. Please try again.');
        }
      } else {
        toast({
          title: 'Registration Successful!',
          description: 'Welcome to the ITM Family. You can now access your batch portal.',
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-cream flex items-center justify-center p-4 py-8">
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
              <CardTitle className="text-2xl font-serif text-primary">Join ITM Family</CardTitle>
              <CardDescription className="text-muted-foreground">
                Register with your registration number to access your batch
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
                <Label htmlFor="studentName">Full Name *</Label>
                <Input
                  id="studentName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.studentName}
                  onChange={(e) => handleChange('studentName', e.target.value)}
                  required
                  className="border-secondary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  type="text"
                  placeholder="e.g., UNITM210001"
                  value={formData.registrationNumber}
                  onChange={(e) => handleChange('registrationNumber', e.target.value.toUpperCase())}
                  required
                  className={`border-secondary/30 focus:border-primary uppercase ${
                    registrationValidation?.valid 
                      ? 'border-green-500 focus:border-green-500' 
                      : formData.registrationNumber && !registrationValidation?.valid 
                        ? 'border-destructive focus:border-destructive' 
                        : ''
                  }`}
                />
                {formData.registrationNumber && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`flex items-center gap-2 text-xs ${
                      registrationValidation?.valid ? 'text-green-600' : 'text-destructive'
                    }`}
                  >
                    {registrationValidation?.valid ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        <span>Valid! Auto-assigned to {detectedBatch?.batchName}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>{registrationValidation?.error}</span>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="border-secondary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="mobileNumber"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    maxLength={10}
                    className="border-secondary/30 focus:border-primary pl-10"
                  />
                  {formData.mobileNumber.length === 10 && /^[6-9]\d{9}$/.test(formData.mobileNumber) && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
                {formData.mobileNumber && formData.mobileNumber.length < 10 && (
                  <p className="text-xs text-muted-foreground">
                    {10 - formData.mobileNumber.length} more digits needed
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    className="border-secondary/30 focus:border-primary pr-10"
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={isLoading || !registrationValidation?.valid}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </motion.div>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </span>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </div>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to Home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
