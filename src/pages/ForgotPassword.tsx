import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, KeyRound, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { getAuthErrorMessage } from '@/lib/authErrors';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) {
        setError(getAuthErrorMessage(resetError, 'password reset'));
        return;
      }
      setSent(true);
    } catch (caught) {
      setError(getAuthErrorMessage(caught, 'password reset'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a12] p-4 text-gray-200">
      <section className="w-full max-w-md rounded-xl border border-gray-700/60 bg-[#12121c] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
          {sent ? <CheckCircle aria-hidden="true" /> : <KeyRound aria-hidden="true" />}
        </div>
        <h1 className="text-2xl font-semibold text-amber-400">Reset your password</h1>
        {sent ? (
          <p className="mt-3 text-sm leading-6 text-gray-400">
            If an account exists for that email, a password reset link will arrive shortly. Check your inbox and spam folder.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm leading-6 text-gray-400">Enter the email address used for your student account.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && <p role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-gray-300">Email address</Label>
                <div className="relative">
                  <Mail aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="border-gray-700 bg-[#1a1a28] pl-10 text-gray-100" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-gray-950 hover:bg-amber-400">
                {loading ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
          </>
        )}
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-amber-400">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to sign in
        </Link>
      </section>
    </main>
  );
}