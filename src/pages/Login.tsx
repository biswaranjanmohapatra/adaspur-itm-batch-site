import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, LogIn, AlertCircle, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CuteLamp from '@/components/CuteLamp';

export default function Login() {
  const [lampOn, setLampOn] = useState(true);
  const [email, setEmail] = useState('');
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
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError('Invalid email or password');
        setIsLoading(false);
      } else {
        // Turn off lamp before navigating
        setLampOn(false);
        setTimeout(() => {
          navigate('/dashboard');
        }, 600);
      }
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1.2, 1, 1.2],
          }}
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
        Cute Lamp Login
      </motion.h1>

      {/* Main card with lamp */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full max-w-md"
      >
        {/* Card border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-2xl opacity-50" />
        
        {/* Main card */}
        <div className="relative bg-[#12121c] rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Lamp section */}
          <div className="pt-8 pb-4 bg-gradient-to-b from-[#0d0d15] to-[#12121c]">
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
                    className={`w-5 h-5 rounded-full shadow-md ${
                      lampOn 
                        ? 'bg-white' 
                        : 'bg-gray-400'
                    }`}
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
                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    {/* Email input */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-400 text-sm">
                        Email Address
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 bg-[#1a1a28] border-gray-700/50 text-gray-200 placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {/* Password input */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-400 text-sm">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 pr-10 bg-[#1a1a28] border-gray-700/50 text-gray-200 placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20"
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

                    {/* Forgot password link */}
                    <div className="text-right">
                      <Link
                        to="/register"
                        className="text-xs text-gray-500 hover:text-amber-500 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Submit button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold py-5 shadow-lg shadow-amber-500/20 transition-all duration-300"
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
                    </motion.div>

                    {/* Register link */}
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Don't have an account?{' '}
                      <Link
                        to="/register"
                        className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                      >
                        Register here
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
