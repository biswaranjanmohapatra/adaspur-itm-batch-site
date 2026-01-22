import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface StudentInfo {
  id: string;
  registration_number: string;
  student_name: string;
  batch_id: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  studentInfo: StudentInfo | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, registrationNumber: string, studentName: string, batchId: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudentInfo = async (userId: string) => {
    const { data, error } = await supabase
      .from('registered_students')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (!error && data) {
      setStudentInfo(data);
    }
  };

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!error && data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to avoid potential race conditions
          setTimeout(() => {
            fetchStudentInfo(session.user.id);
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setStudentInfo(null);
          setIsAdmin(false);
        }
        setIsLoading(false);
      }
    );

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchStudentInfo(session.user.id);
        checkAdminRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (
    email: string,
    password: string,
    registrationNumber: string,
    studentName: string,
    batchId: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) return { error };

    // If signup successful and we have a user, create the student record
    if (data.user) {
      const { error: insertError } = await supabase
        .from('registered_students')
        .insert({
          user_id: data.user.id,
          registration_number: registrationNumber,
          student_name: studentName,
          batch_id: batchId,
        });

      if (insertError) {
        return { error: insertError as unknown as Error };
      }

      // Add student role
      await supabase
        .from('user_roles')
        .insert({
          user_id: data.user.id,
          role: 'student',
        });
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setStudentInfo(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        studentInfo,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
