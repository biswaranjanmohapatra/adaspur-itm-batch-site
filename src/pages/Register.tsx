import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle, Phone, User, Mail, Hash, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateRegistrationNumber, normalizeRegistrationNumber } from '@/lib/registrationValidation';
import CuteLamp from '@/components/CuteLamp';

export default function Register() {
  const [lampOn, setLampOn] = useState(true);
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
        setLampOn(false);
        setTimeout(() => {
          toast({
            title: 'Registration Successful!',
            description: 'Welcome to the ITM Family. You can now access your batch portal.',
          });
          navigate('/dashboard');
        }, 600);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "pl-10 bg-[#1a1a28] border-gray-700/50 text-gray-200 placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20";

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        style={{
          background: 'linear-gradient(90deg, #f97316, #fbbf24, #f97316)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Join ITM Family
      </motion.h1>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full max-w-md"
      >
        {/* Card border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-2xl opacity-50" />

        <div className="relative bg-[#12121c] rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Lamp section */}
          <div className="pt-6 pb-2 bg-gradient-to-b from-[#0d0d15] to-[#12121c]">
            <CuteLamp isOn={lampOn} />

            {/* Lamp switch */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() => setLampOn(!lampOn)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
                    lampOn
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30'
                      : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: lampOn ? 26 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`w-5 h-5 rounded-full shadow-md ${lampOn ? 'bg-white' : 'bg-gray-400'}`}
                  />
                </motion.div>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {lampOn ? 'Turn Off' : 'Turn On'}
                </span>
              </button>
            </div>
          </div>

          {/* Form section - appears/disappears with lamp */}
          <AnimatePresence>
            {lampOn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="studentName" className="text-gray-400 text-sm">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="studentName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.studentName}
                          onChange={(e) => handleChange('studentName', e.target.value)}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Registration Number */}
                    <div className="space-y-1.5">
                      <Label htmlFor="registrationNumber" className="text-gray-400 text-sm">Registration Number *</Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="registrationNumber"
                          type="text"
                          placeholder="e.g., UNITM210001"
                          value={formData.registrationNumber}
                          onChange={(e) => handleChange('registrationNumber', e.target.value.toUpperCase())}
                          required
                          className={`${inputClass} uppercase ${
                            registrationValidation?.valid
                              ? 'border-green-500/50 focus:border-green-500/50'
                              : formData.registrationNumber && !registrationValidation?.valid
                                ? 'border-red-500/50 focus:border-red-500/50'
                                : ''
                          }`}
                        />
                      </div>
                      {formData.registrationNumber && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`flex items-center gap-2 text-xs ${
                            registrationValidation?.valid ? 'text-green-400' : 'text-red-400'
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

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-gray-400 text-sm">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <Label htmlFor="mobileNumber" className="text-gray-400 text-sm">Mobile Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="mobileNumber"
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={formData.mobileNumber}
                          onChange={(e) => handleChange('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          required
                          maxLength={10}
                          className={inputClass}
                        />
                        {formData.mobileNumber.length === 10 && /^[6-9]\d{9}$/.test(formData.mobileNumber) && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                        )}
                      </div>
                      {formData.mobileNumber && formData.mobileNumber.length < 10 && (
                        <p className="text-xs text-gray-500">
                          {10 - formData.mobileNumber.length} more digits needed
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-gray-400 text-sm">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="At least 6 characters"
                          value={formData.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          required
                          className={`${inputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword" className="text-gray-400 text-sm">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Re-enter your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange('confirmPassword', e.target.value)}
                          required
                          className={`${inputClass} pr-10`}
                        />
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-1">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold py-5 shadow-lg shadow-amber-500/20 transition-all duration-300"
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
                    </motion.div>

                    {/* Login link */}
                    <div className="text-center text-sm text-gray-500">
                      Already have an account?{' '}
                      <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                        Sign in here
                      </Link>
                    </div>

                    <div className="text-center">
                      <Link to="/" className="text-xs text-gray-500 hover:text-amber-500 transition-colors">
                        ← Back to Home
                      </Link>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer credit */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-gray-600 text-xs"
      >
        B.Sc ITM • Udayanath College
      </motion.p>
    </div>
  );
}
