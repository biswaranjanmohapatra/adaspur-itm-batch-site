import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { getAuthErrorMessage } from '@/lib/authErrors';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const recoveryInUrl = new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery';
    if (recoveryInUrl) setRecoveryReady(true);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setRecoveryReady(true);
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (recoveryInUrl && data.session) setRecoveryReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!recoveryReady) {
      setError('Open the password reset link from your email to continue.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(getAuthErrorMessage(updateError, 'password reset'));
        return;
      }
      await supabase.auth.signOut();
      navigate('/login', { replace: true, state: { message: 'Password updated. Sign in with your new password.' } });
    } catch (caught) {
      setError(getAuthErrorMessage(caught, 'password reset'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a12] p-4 text-gray-200">
      <section className="w-full max-w-md rounded-xl border border-gray-700/60 bg-[#12121c] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-400"><KeyRound aria-hidden="true" /></div>
        <h1 className="text-2xl font-semibold text-amber-400">Choose a new password</h1>
        {!recoveryReady ? (
          <div className="mt-4 space-y-5">
            <p role="status" className="text-sm leading-6 text-gray-400">This page needs a valid password reset link from your email.</p>
            <Link to="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300">Request a new link</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-300">New password</Label>
              <Input id="new-password" type="password" autoComplete="new-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="border-gray-700 bg-[#1a1a28] text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-gray-300">Confirm new password</Label>
              <Input id="confirm-new-password" type="password" autoComplete="new-password" required minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="border-gray-700 bg-[#1a1a28] text-gray-100" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-gray-950 hover:bg-amber-400">
              {loading ? 'Updating…' : 'Update password'}
            </Button>
          </form>
        )}
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-amber-400">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to sign in
        </Link>
      </section>
    </main>
  );
}